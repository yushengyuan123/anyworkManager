import Vue from 'vue'
import Vuex from 'vuex'
import examPaper from "./examPaper/examPaper";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    examPaper: examPaper
  }
})
