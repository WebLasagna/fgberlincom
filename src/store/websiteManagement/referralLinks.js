import axios from 'axios'

var apiBaseUrl = 'https://fgberlin.com/api'

const referralLinks = {
  namespaced: true,
  state: {
    all: [],
    current: null
  },
  actions: {
    getAll ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/referralLinks/getAll.php',
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
    get ({ commit }, { referralLinkId }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/referralLinks/get.php',
          JSON.stringify({ ssid: this.state.ssid, referralLinkId: referralLinkId })
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
    add ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/referralLinks/add.php',
          JSON.stringify(payload)
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
    edit ({ commit }, { referralLinkId, code, additionalInfos, customImage }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/referralLinks/edit.php',
          JSON.stringify({ ssid: this.state.ssid, referralLinkId: referralLinkId, code: code, additionalInfos: additionalInfos, customImage: customImage })
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
    delete ({ commit }, { referralLinkId }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/referralLinks/delete.php',
          JSON.stringify({ ssid: this.state.ssid, referralLinkId: referralLinkId })
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

export default referralLinks