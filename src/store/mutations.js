import * as types from './mutation_types'
export default {
  //改变模式
  [types.CHANGE_MODEL](state){
    state.app.isNight = !state.app.isNight;
  }
}
