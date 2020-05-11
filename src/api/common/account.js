import { stringify } from 'qs'
import request from '../../utils/request'

export async function signIn (params) {
  return await request('Common/Account/SignInFromPda', {
    method: 'POST',
    body: params
  })
}

export async function signOut (params) {
  return await request(`/logout?${stringify(params)}`)
}
