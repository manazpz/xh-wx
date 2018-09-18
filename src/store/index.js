import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import rt from './modules/router'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    rt
  },
  mutations,
  getters
})

export default store
