import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * 试卷存放store
 */
export default {
    namespace: true,

    state: {
        //试卷列表
        examPaper: [],

        //目前选中的试卷
        currentFocusPaper: 0,

        //目前选中的组织,
        currentFocusOrg: -1,

        //监控是否有组件或者修改，如果有。把这个字段置为true，通知更新, false 不更新
        //相当于一个trigger 触发器
        flush: false
    },

    getters: {
        getCurrentPaperId: (state) => {
            return state.currentFocusPaper
        },

        getCurrentOrg: (state) => {
            return state.currentFocusOrg
        },

        getFlush: (state) => {
            return state.flush
        }
    },

    mutations: {
        addPaper(state, list) {
            for (let i = 0; i < list.length; i++) {
                state.examPaper.push({
                    id: i,
                    testPaperId: list[i].testpaperId,
                    title: list[i].testpaperTitle
                })
            }
        },

        currentPaperChange(state, newPaperId) {
            state.currentFocusPaper = newPaperId
        },

        currentOrgChange(state, newPaperId) {
            state.currentFocusOrg = newPaperId
        },

        notifyFlush(state, newValue) {
            state.flush = newValue
        }
    },
    actions: {

    },
    modules: {

    }
}
