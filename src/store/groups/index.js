import axios from 'axios'

import news from './news'

var apiBaseUrl = 'https://fgberlin.com/api'

const groups = {
  namespaced: true,
  modules: {
    news
  },
  state: {
    current: null
  },
  actions: {
    get ({ commit }, { groupId }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/groups/get.php',
          JSON.stringify({ ssid: this.state.ssid, groupId: groupId })
        )
        .then(r => r.data)
        .then(group => {
          commit('load', group)
          resolve()
        })
      })
    },
    getAll ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/getAll.php',
          JSON.stringify({ ssid: this.state.ssid })
        )
        .then(r => r.data)
        .then(all => {
          commit('loadAll', all)
          resolve()
        })
        .catch(err => {
          commit('logout')
          reject(err)
        })
      })
    },
    getNextDays ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/getNextDays.php',
          JSON.stringify({ ssid: this.state.ssid })
        )
        .then(r => r.data)
        .then(all => {
          commit('loadNextDays', all)
          resolve()
        })
        .catch(err => {
          commit('logout')
          reject(err)
        })
      })
    }
  },
  mutations: {
    load(state, data) {
      state.current = data
    }
  }
}

export default groups