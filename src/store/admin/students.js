import axios from 'axios'

var apiBaseUrl = 'https://fgberlin.com/api'

const students = {
  namespaced: true,
  state: {
    all: [],
    current: null
  },
  actions: {
    getAll ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/admin/students/getAll.php',
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
    get ({ commit }, { studentId }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/admin/students/get.php',
          JSON.stringify({ ssid: this.state.ssid, studentId: studentId })
        )
        .then(r => r.data)
        .then(current => {
          commit('loadCurrent', current)
          resolve()
        })
        .catch(err => {
          commit('logout')
          reject(err)
        })
      })
    },
    edit ({ commit, state, rootState }, { studentId, firstname, lastname, username, status }) {
      var payload = {
        ssid: rootState.ssid,
        studentId: studentId
      }
      if(firstname !== state.current.firstname) payload.firstname = firstname
      if(lastname !== state.current.lastname) payload.lastname = lastname
      if(username !== state.current.username) payload.username = username
      if(status !== state.current.status) payload.status = status
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/admin/students/edit.php',
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

export default students