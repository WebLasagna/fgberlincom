import axios from 'axios'

var apiBaseUrl = 'https://fgberlin.com/api'

const groups = {
  namespaced: true,
  state: {
    all: [],
    current: null
  },
  actions: {
    getAll ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/groups/getAll.php',
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
    get ({ commit }, { groupId }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/groups/get.php',
          JSON.stringify({ ssid: this.state.ssid, groupId: groupId })
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
    add ({ commit }, { name, displayName, subjects }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/groups/add.php',
          JSON.stringify({ ssid: this.state.ssid, name: name, displayName: displayName, subjects: subjects })
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
    edit ({ commit, state }, { groupId, name, displayName, subjects }) {
      var payload = {
        ssid: this.state.ssid,
        groupId: groupId
      }
      if(name !== state.current.name) payload.name = name
      if(displayName !== state.current.displayName) payload.displayName = displayName
      if(subjects !== state.current.subjects) payload.subjects = subjects
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/groups/edit.php',
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
    delete ({ commit }, { groupId }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/groups/delete.php',
          JSON.stringify({ ssid: this.state.ssid, groupId: groupId })
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

export default groups