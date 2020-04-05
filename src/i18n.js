import Vue from 'vue'
import VueI18n from 'vue-i18n'
import fr from './strings/lang/fr'
import en from './strings/lang/en'
import de from './strings/lang/de'
import dateTimeFormats from './strings/lang/dateTimeFormats.js'

Vue.use(VueI18n)

export default new VueI18n({
  locale: navigator.language.split('-')[0],
  fallbackLocale: 'fr',
  messages: {
    fr, en, de
  },
  dateTimeFormats: dateTimeFormats
})