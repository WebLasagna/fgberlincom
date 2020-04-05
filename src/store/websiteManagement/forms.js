import axios from 'axios'

var apiBaseUrl = 'https://fgberlin.com/api'

const forms = {
  namespaced: true,
  state: {
    all: [],
    current: null
  },
  actions: {
    getAll ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/forms/getAll.php',
          JSON.stringify({ ssid: this.state.ssid })
        )
        .then(r => r.data)
        .then(all => {
          commit('loadAll', all)
          resolve()
        })
        .catch(err => {
          commit('logout', { root: true })
          reject(err)
        })
      })
    },
    get ({ commit }, { formId }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/forms/get.php',
          JSON.stringify({ ssid: this.state.ssid, formId: formId })
        )
        .then(r => r.data)
        .then(current => {
          commit('loadCurrent', current)
          resolve()
        })
        .catch(err => {
          commit('logout', { root: true })
          reject(err)
        })
      })
    },
    delete ({ commit }, { formId }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/forms/delete.php',
          JSON.stringify({ ssid: this.state.ssid, formId: formId })
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
    }
  },
  mutations: {
    loadAll(state, data) {
      state.all = data
    },
    loadCurrent(state, data) {
      state.current = data
    }
  }
}

export default forms