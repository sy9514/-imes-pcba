import Vue from 'vue'
import Vuex from 'vuex'
import account from './common/account'
import split from './material/split'
// import { parse } from 'qs'
//, stringify
import { signIn } from '../api/common/account'
import app from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  modules: {
    account,
    split
  },
  state: {
    signed: true,
    nick: 'Admin',
    email: '',
    isAdmin: false,
    accessToken: 'bd3ecee4a27e9dc36462d6469d7a0e1c',
    menus: []
  },
  getters: {
    signed: state => state.signed || localStorage.getItem('token') !== null,
    profile: state =>
      state.nick == '' ? JSON.parse(localStorage.getItem('profile')) : state
  },
  actions: {
    async accountSignIn ({ commit }, paylod) {
      return await signIn(paylod)
        .then(data => {
          if (data.Success)
            commit('saveLogon', data.Result)
        })
    }
  },
  mutations: {
    saveLogon (state, payload) {
      // console.log(payload)
      localStorage.setItem('profile', JSON.stringify(payload))
      Object.assign(state, {
        ...payload, signed: true
      })
    },
    saveLogoff (state) {
      localStorage.removeItem('token')
      localStorage.removeItem('profile')
      Object.assign(state, {
        signed: false,
        nick: '',
        email: '',
        isAdmin: false,
        accessToken: '',
        menus: []
      })
      app.$router.push('account/sign')
      //state = { signed: false }
    }
  }
})
