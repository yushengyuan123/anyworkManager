import Vue from 'vue'
import Vuex from 'vuex'
import examPaper from "./examPaper/examPaper";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  mutations: {
    addUserInfo(state, newVl) {
      state.userInfo = newVl;
    },
    delUserInfo(state) {
      state.userInfo = null;
    }
  },
  actions: {
  },
  modules: {
    examPaper: examPaper
  }
})
