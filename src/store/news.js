import axios from 'axios'
import i18n from '../i18n'

var apiBaseUrl = 'https://fgberlin.com/api'

const news = {
  namespaced: true,
  state: {
    posts: []
  },
  actions: {
    get ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(apiBaseUrl + '/news/get.php')
        .then(r => r.data)
        .then(news => {
          commit('load', news)
          resolve()
        })
      })
    },
    add ({ commit }, { type, title, author, date, summary, link }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/news/add.php',
          JSON.stringify({ ssid: this.state.ssid, type: type, title: title, author: author, date: date, summary: summary, content: i18n.t('news.editor.contentExample'), link: link })
        )
        .then(r => r.data)
        .then(resCode => {
          if(resCode === "success") resolve()
          else reject(resCode)
        })
        .catch(err => {
          commit('logout', { root: true })
          reject(err)
        })
      })
    },
    delete ({ commit }, { id }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/news/delete.php',
          JSON.stringify({ ssid: this.state.ssid, id: id })
        )
        .then(r => r.data)
        .then(resCode => {
          if(resCode === "success") resolve()
          else reject(resCode)
        })
      })
    },
    edit ({ commit }, { id, summary, title, content }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/news/edit.php',
          JSON.stringify({ ssid: this.state.ssid, id: id, summary, title: title, content: content })
        )
        .then(r => r.data)
        .then(resCode => {
          if(resCode === "success") resolve()
          else reject()
        })
      })
    }
  },
  mutations: {
    load(state, data) {
      state.posts = data
    }
  },
  getters: {
    getByPath: (state) => (path) => {
      if(state.posts) {
        return state.posts.find(news => news.link === path)
      }
    },
    getWebsiteNews: (state) => {
      if(state.posts) {
        return state.posts.filter(news => news.type === "website")
      }
      else return []
    },
    getSchoolNews: (state) => {
      if(state.posts) {
        return state.posts.filter(news => news.type === "school")
      }
      else return []
    }
  }
}

export default news