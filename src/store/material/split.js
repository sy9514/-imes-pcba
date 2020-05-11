export default {
  namespaced: true,
  state: {
    name: '',
    token: '',
    list: []
  },
  getters: {},
  actions: {
    async getList ({ commit }, paylod) {
      const apiList = () => { }
      return await apiList(paylod)
        .then(data => {
          if (data.Success)
            commit('saveList', data.Result)
        })
    }
  },
  mutations: {
    saveList (state, paylaod) {
      Object.assign(state, { list: paylaod });
    }
  }
}
