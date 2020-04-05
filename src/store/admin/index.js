import axios from 'axios'

import students from './students'

var apiBaseUrl = 'https://fgberlin.com/api'

const admin = {
  namespaced: true,
  modules: {
    students: students
  },
  state: {

  },
  actions: {
    addTestDst ({ commit }, { group, type, subject, date, content }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/addTestDst.php',
          JSON.stringify({ ssid: this.state.ssid, group: group, type: type, subject: subject, date: date, content: content })
        )
        .then(r => r.data)
        .then(resCode => {
          resolve(resCode)
        })
        .catch(err => {
          commit('logout', { root: true })
          reject(err)
        })
      })
    },
    changeStudentInfo ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/changeStudentInfo.php',
          JSON.stringify(payload)
        )
        .then(r => r.data)
        .then(resCode => {
          if (resCode === 'success') resolve()
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
    loadGroupInfo(state, data) {
      state.currentGroup = data
    },
    loadGroupMembers(state, data) {
      state.currentGroup.members = data
    }
  }
}

export default admin