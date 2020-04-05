import axios from 'axios'

var apiBaseUrl = 'https://fgberlin.com/api'

const account = {
  namespaced: true,
  state: {
    user: null,
    referral: null
  },
  actions: {
    login ({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/account/login.php',
          JSON.stringify({ username: username, password: password })
        )
        .then(r => r.data)
        .then(res => {
          if (res === 'credentials_error') {
            reject('credentials_error')
          } else if(res.length === 20) {
            commit('loadSSID', res, { root: true })
            resolve()
          }
        })
        .catch((err) => {
          commit('logout', null, { root: true })
          console.error(err)
        })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/account/logout.php',
          JSON.stringify({ ssid: this.state.ssid })
        )
        .then(r => r.data)
        .then(resCode => {
          if(resCode === "success") commit('logout', null, { root: true })
          else reject(resCode)
        })
      })
    },
    
    get ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/account/get.php',
          JSON.stringify({ ssid: this.state.ssid })
        )
        .then(r => r.data)
        .then(account => {
          commit('loadAccount', account)
          resolve()
        })
        .catch(err => {
          commit('logout', null, { root: true })
          reject(err)
        })
      })
    },
    getReferralInfo ({ commit }, { referralCode }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/account/getReferralInfo.php',
          JSON.stringify({ referralCode: referralCode })
        )
        .then(r => r.data)
        .then(res => {
          if(res.id) {
            commit('loadReferralInfo', res)
            resolve()
          }
          else reject(res)
        })
      })
    },
    register ({ commit }, { firstname, lastname, uclass, username, password }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/account/register.php',
          JSON.stringify({ firstname: firstname, lastname: lastname, class: uclass, username: username, password: password })
        )
        .then(r => r.data)
        .then(res => {
          if (res === 'username_error') {
            reject(res)
          } else if(res.length === 20) {
            commit('loadSSID', res)
            axios.post(apiBaseUrl + '/account/get.php',
              JSON.stringify({ ssid: this.state.ssid })
            )
            .then(r => r.data)
            .then(res => {
              commit('loadAccount', res)
            })
            .then(() => {
              router.push({ path: '/' + i18n.t('links.sa.accountValidation') })
              resolve()
            })
          }
        })
      })
    },
    changeUsername ({ commit }, { newUsername }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/account/changeUsername.php',
          JSON.stringify({ ssid: this.state.ssid, newUsername: newUsername })
        )
        .then(r => r.data)
        .then(resCode => {
          if (resCode === 'success') resolve()
          else reject(resCode)
        })
        .catch(err => {
          commit('logout', null, { root: true })
          reject(err)
        })
      })
    },
    changePassword ({ commit }, { oldPassword, newPassword }) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/account/changePassword.php',
          JSON.stringify({ ssid: this.state.ssid, oldPassword: oldPassword, newPassword: newPassword })
        )
        .then(r => r.data)
        .then(resCode => {
          if (resCode === 'success') resolve()
          else reject(resCode)
        })
        .catch(err => {
          commit('logout', null, { root: true })
          reject(err)
        })
      })
    },
    deleteAccount ({ commit }, password) {
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/account/deleteAccount.php',
          JSON.stringify({ ssid: this.state.ssid, password: password })
        )
        .then(r => r.data)
        .then(resCode => {
          resolve(resCode)
        })
        .catch(err => {
          commit('logout', null, { root: true })
          reject(err)
        })
      })
    }
  },
  mutations: {
    loadAccount(state, data) {
      state.user = data
    },
    loadReferralInfo(state, data) {
      state.referral = data
    }
  },
  getters: {
    
  }
}

export default account