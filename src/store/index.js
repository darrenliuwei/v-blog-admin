import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token
    token: localStorage.getItem('token'),
    // 要修改的文章数据
    editArticle: null
  },
  mutations: {
    // 设置token
    SET_TOKEN(state, payload) {
      state.token = payload
      localStorage.setItem('token', payload)
    },
    // 删除token
    DEL_TOKEN(state) {
      state.token = null
      localStorage.removeItem('token')
    },
    // 修改文章数据
    editArticle(state, article) {
      state.editArticle = article
    }
  },
  actions: {},
  modules: {}
})
