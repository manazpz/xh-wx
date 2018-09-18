const app = {
  state: {
    isNight:false,       //是否为夜间模式
  },
  mutations: {
    SET_IS_NIGHT: (state, night) => {
      state.isNight = night
    }
  },
  actions: {
    setIsNight({ commit }, night) {
      commit('SET_IS_NIGHT', night)
    }
  }
}

export default app
