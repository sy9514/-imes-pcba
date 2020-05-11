//request for apicloud app
import { Toast } from 'vant'
import { stringify } from 'qs'
import app from '../main'
import consts from '../config/consts'

function checkError (data) {
  if (data && !data.Success) {
    Toast.fail(data.Error.Message)
  }
  return data
}

function check2 (response) {
  if ('AccessToken' in response.headers) {
    window.__clat = response.headers.AccessToken
    localStorage.setItem('token', window.__clat)
  }
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response.body
  }
  if (response.statusCode == 401) {
    localStorage.removeItem('token')
    Toast.fail('请先登录')

    app.$router.push(
      'account/sign?' + stringify({ redir: window.location.href.split('#')[1] })
    )

    const error = new Error('未登录')
    error.response = response
    throw error
  } else {
    const str = '网络错误 ' + response.statusCode + ',' + response.msg
    Toast.fail(str)
    const error = new Error(str)
    error.response = response.body
    throw error
  }
}

function checkStatus (response) {
  if (response.headers.has('accesstoken')) {
    window.__clat = response.headers.get('accesstoken')
    localStorage.setItem('token', window.__clat)
  }
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }
  if (response.status == 401) {
    localStorage.removeItem('token')
    Toast.fail('请先登录.');
    app.$router.push(
      'account/sign?' + stringify({ redir: window.location.href.split('#')[1] })
    )

    const error = new Error('未登录')
    error.response = response
    throw error
  } else {
    const str = '网络错误 ' + response.status + ',' + response.statusText
    Toast.fail(str)
    const error = new Error(str)
    error.response = response
    throw error
  }
}

function reqapi (url, options) {
  const xp = new Promise((resolve, reject) => {
    const newOptions = { ...options }
    if (typeof window.__clat === 'string') {
      newOptions.headers = {
        AccessToken: window.__clat,
        ...newOptions.headers,
      }
    } else {
      const at = localStorage.getItem('token')
      if (at != '') {
        window.__clat = at
        newOptions.headers = {
          AccessToken: window.__clat,
          ...newOptions.headers,
        }
      }
    }
    if (
      newOptions.method === 'POST' ||
      newOptions.method === 'PUT' ||
      newOptions.method === 'DELETE'
    ) {
      if (!(newOptions.body instanceof FormData)) {
        newOptions.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          ...newOptions.headers,
        }
        newOptions.body = JSON.stringify(newOptions.body)
      } else {
        // newOptions.body is FormData
        newOptions.headers = {
          Accept: 'application/json',
          ...newOptions.headers,
        }
      }
    }

    const params = {
      url: consts.api + url,
      method: newOptions.method,
      returnAll: true,
      headers: newOptions.headers,
      dataType: 'json',
      data: { body: newOptions.body },
      timeout: 15,
    }

    const api = window.api
    api.ajax(params, function (ret, err) {
      //console.log(JSON.stringify(ret))
      if (ret) {
        if (!ret.Success) {
          Toast.fail(ret.Error.Message)
        }
        resolve(ret)
      } else {
        if (err.statusCode == 401) {
          //   const { dispatch } = store
          localStorage.removeItem('token')
          Toast.fail('请先登录.')
          app.$router.push(
            'account/sign?' +
            stringify({ redir: window.location.href.split('#')[1] })
          )
        } else {
          api.sendEvent({
            name: 'offline',
            extra: {
              err: err,
            },
          })
        }
        //console.log(JSON.stringify(err))
        reject(err)
      }
    })
  })
  return (
    xp.then(check2)
      .then(checkError)
      //.then(data => (data))
      .catch((err) => ({ err }))
  )
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request (url, options) {
  url = consts.api + url
  //console.log(url)
  const defaultOptions = {
    credentials: 'include',
  }
  const newOptions = { ...options, ...defaultOptions }
  if (typeof window.__clat === 'string') {
    newOptions.headers = {
      AccessToken: window.__clat,
      ...newOptions.headers,
    }
  } else {
    const at = localStorage.getItem('token')
    if (at != '') {
      window.__clat = at
      newOptions.headers = {
        AccessToken: window.__clat,
        ...newOptions.headers,
      }
    }
  }
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      }
      newOptions.body = JSON.stringify(newOptions.body)
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      }
    }
  }

  return (
    fetch(url, newOptions)
      .then(checkStatus)
      .then(checkError)
      //.then(data => (data))
      .catch((err) => ({ err }))
    //({  err })
  )
}
//
export default window.is_api ? reqapi : request
