import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import VueAnalytics from 'vue-analytics'
import VueCarousel from 'vue-carousel'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'
import './registerServiceWorker'

Vue.use(VueAnalytics, {
  id: 'UA-127467151-1',
  router
})
Vue.use(VueCarousel)
const socket = io('https://fgberlincom-socketio.octavelr.repl.co')
Vue.use(VueSocketIOExt, socket, { store })

let cc = require('./assets/scripts/cookieconsent.min.js')

import fr from './strings/lang/fr'
import en from './strings/lang/en'
import de from './strings/lang/de'
import dateTimeFormats from './strings/lang/dateTimeFormats.js'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: store.state.locale,
  fallbackLocale: 'fr',
  messages: {
    fr, en, de
  },
  dateTimeFormats: dateTimeFormats
})

Vue.config.productionTip = false

let app

app = new Vue({
  i18n,
  router,
  store,
  axios,
  cc,
  render: h => h(App)
}).$mount('#app')

if(store.state.locale) {
  i18n.locale = store.state.locale
}