export default {
  namespaced: true,
  state: {
    name: '',
    token: ''
  },
  getters: {},
  actions: {},
  mutations: {
    updateState(state, paylaod) {
      state = { ...state, ...paylaod }
      // Object.assign(state,payload);
    }
  }
}
