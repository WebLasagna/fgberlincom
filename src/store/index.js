import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
import router from '../router'
import i18n from '../i18n'

import news from './news'
import account from './account'
import diary from './diary'
import groups from './groups'
import admin from './admin'
import websiteManagement from './websiteManagement'

Vue.use(Vuex)

var apiBaseUrl = 'https://fgberlin.com/api'

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    news: news,
    account: account,
    diary: diary,
    groups: groups,
    admin: admin,
    websiteManagement: websiteManagement
  },
  state: {
    open: false,
    ssid: null,
    status: "guest",
    theme: 'dark',
    locale: navigator.language.split('-')[0],
    all: null
  },
  actions: {
    sendForm ({ commit }, { type, name, contactMethod, content }) {
      var payload = {
        type: type,
        name: name,
        content: content
      }
      if(this.state.ssid && this.state.account.user) payload.userId = this.state.account.user.userId
      if(type === 'question') payload.contactMethod = contactMethod
      return new Promise((resolve, reject) => {
        axios.post(apiBaseUrl + '/sendForm.php',
          JSON.stringify(payload)
        )
        .then(r => r.data)
        .then(resCode => {
          if(resCode === 'success') resolve()
          else reject(resCode)
        })
      })
    }
  },
  mutations: {
    changeTheme(state, newTheme) {
      if(newTheme === 'dark') {
        let lightThemeLinkEl = document.querySelector("#light-theme-style")
        if(lightThemeLinkEl) {
          let parentNode = lightThemeLinkEl.parentNode
          parentNode.removeChild(lightThemeLinkEl)
        }
        state.theme = 'dark'
      }
      else if(newTheme === 'light') {
        let lightThemeLinkEl = document.createElement("style")
        lightThemeLinkEl.type = 'text/css'
        var css = 'body { background-color: #fff; }'
        lightThemeLinkEl.innerHTML = css
        lightThemeLinkEl.setAttribute("id", "light-theme-style")
        let docHead = document.querySelector("head")
        docHead.append(lightThemeLinkEl)
        state.theme = 'light'
      }
    },
    changeLocale(state, newLocale) {
      state.locale = newLocale
    },
    logout(state) {
      state.ssid = null
      state.status = 'guest'
      state.user = null
      this.commit('changeTheme', 'dark')
      this.commit('changeLocale', navigator.language.split('-')[0])
      state.groups.class = {}
      state.groups.news = []
      state.admin = {}
      state.websiteManagement = {}
      state.all = null
      router.push({ path: '/' + i18n.t('links.sa.login') })
    },
    loadSSID(state, data) {
      state.ssid = data
    },
    loadAll(state, data) {
      state.all = data
    },
    loadNextDays(state, data) {
      state.nextDays = data
    },
    loadClassStudents(state, data) {
      state.groups.class.students = data
    },
    loadGroupNews(state, { group, news }) {
      if(!news.length) return
      var groupNews = {
        group: group,
        news: news
      }
      state.groups.news.push(groupNews)
    }
  },
  getters: {
    hasPerm: (state) => (type, perm) => {
      if(!state.ssid || !state.account.user || !state.account.user.permissions) return false
      if(type === 'read') var permissions = state.account.user.permissions.read
      else if(type === 'write') var permissions = state.account.user.permissions.write
      if(permissions.includes(perm) || permissions.find(currentPerm => currentPerm.id === perm)) {
        return true
      }
      else {
        return false
      }
    },
    studentHasPerm: (state) => (currentStudent, type, perm) => {
      if(perm === 'class') perm = currentStudent.groups[0]
      if(type === 'read') var permissions = currentStudent.permissions.read
      else if(type === 'write') var permissions = currentStudent.permissions.write
      if(permissions.includes(perm) || permissions.includes('all')) {
        return true
      }
      else {
        return false
      }
    }
  }
})