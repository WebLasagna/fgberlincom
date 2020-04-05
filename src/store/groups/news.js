import axios from 'axios'

var apiBaseUrl = 'https://fgberlin.com/api'

const news = {
  namespaced: true,
  state: {
    posts: []
  },
  actions: {
    get ({ commit }, { group }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/groups/news/get.php',
          JSON.stringify({ ssid: this.state.ssid, groupId: group.id })
        )
        .then(r => r.data)
        .then(groupNews => {
          commit('load', { group: group, news: groupNews })
          resolve()
        })
        .catch(err => {
          commit('logout')
          reject(err)
        })
      })
    },
    add ({ commit }, { groupId, title, content }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/groups/news/add.php',
          JSON.stringify({ ssid: this.state.ssid, groupId: groupId, title: title, content: content })
        )
        .then(r => r.data)
        .then(resCode => {
          if(resCode === "success") resolve()
          else reject(resCode)
        })
        .catch(err => {
          commit('logout')
          reject(err)
        })
      })
    },
    delete ({ commit }, { newsId }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/groups/news/delete.php',
          JSON.stringify({ ssid: this.state.ssid, newsId: newsId })
        )
        .then(r => r.data)
        .then(resCode => {
          if(resCode === "success") resolve()
          else reject(resCode)
        })
        .catch(err => {
          commit('logout')
          reject(err)
        })
      })
    },
    edit ({ commit }, { newsId, title, content }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/editClassNews.php',
          JSON.stringify({ ssid: this.state.ssid, newsId: newsId, title: title, content: content })
        )
        .then(r => r.data)
        .then(resCode => {
          if(resCode === "success") resolve()
          else reject(resCode)
        })
        .catch(err => {
          commit('logout')
          reject(err)
        })
      })
    }
  },
  mutations: {

  }
}

export default news