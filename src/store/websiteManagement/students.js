import axios from 'axios'

var apiBaseUrl = 'https://fgberlin.com/api'

const students = {
  namespaced: true,
  state: {
    all: []
  },
  actions: {
    addToGroup ({ commit }, { studentId, group }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/students/addToGroup.php',
          JSON.stringify({ ssid: this.state.ssid, studentId: studentId, group: group })
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
    removeFromGroup ({ commit }, { studentId, groupId }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/students/removeFromGroup.php',
          JSON.stringify({ ssid: this.state.ssid, studentId: studentId, groupId: groupId })
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
    addPermission ({ commit }, { studentId, type, permission }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/students/addPermission.php',
          JSON.stringify({ ssid: this.state.ssid, studentId: studentId, type: type, permission: permission })
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
    removePermission ({ commit }, { studentId, type, permission }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/students/removePermission.php',
          JSON.stringify({ ssid: this.state.ssid, studentId: studentId, type: type, permission: permission })
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
    delete ({ commit }, { studentId }) {
      return new Promise((resolve, reject) =>{
        axios.post(apiBaseUrl + '/websiteManagement/students/delete.php',
          JSON.stringify({ ssid: this.state.ssid, studentId: studentId })
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
    getAll ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/students/getAll.php',
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
    add ({ commit }, { firstname, lastname, groups, username, password }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/websiteManagement/students/add.php',
          JSON.stringify({ ssid: this.state.ssid, firstname: firstname, lastname: lastname, groups: groups, username: username, password: password })
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
    }
  }
}

export default students