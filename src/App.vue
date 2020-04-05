<template>
  <div id="app" :class="{ 'light': $store.state.theme === 'light' }">
    <Navbar />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
@import './assets/styles/materialize.min.css';
@import './assets/styles/material-icons.css';
@import './assets/styles/cookieconsent.min.css';

@import './app.scss';
</style>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  mounted() {
    if(this.$store.state.theme === 'light') {
      this.$store.commit('changeTheme', 'light')
    }
    this.$socket.client.emit('socketLogin', Math.random().toString())
    if (this.$store.state.open) {
      window.cookieconsent.initialise({
        "palette": {
          "popup": {
            "background": "#4caf50"
          },
          "button": {
            "background": "#81c784",
            "text": "#000"
          }
        },
        "theme": "edgeless",
        "content": {
          "message": this.$t('cookieConsent.message'),
          "dismiss": this.$t('cookieConsent.dismiss'),
          "link": this.$t('cookieConsent.link'),
          "href": '/' + this.$t('links.privacy')
        }
      })
    }
  }
}
</script>