/* eslint-disable */
<template>
  <div id="navbar" v-if="$store.state.open">
    <nav>
      <div class="nav-wrapper green">
        <a href="#" data-target="sidenav" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <router-link to="/" class="brand-logo">FGBerlin.com</router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li class="col s12 waves-effect waves-light">
            <router-link :to="'/' + $t('links.sa.login')" v-if="!$store.state.user">{{ $t('navbar.studentsArea') }}</router-link>
            <router-link :to="'/' + $t('links.sa.main')" v-else>{{ $t('navbar.studentsArea') }}</router-link>
          </li>
          <li class="col s12 waves-effect waves-light">
            <router-link :to="'/' + $t('links.project.main')">{{ $t('navbar.project') }}</router-link>
          </li>
          <li class="col s12 waves-effect waves-light">
            <router-link :to="'/' + $t('links.news')">{{ $t('navbar.news') }}</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <ul class="sidenav green" id="sidenav" @click="closeSidenav">
      <li>
        <router-link class="col s12 waves-effect waves-light" :to="'/' + $t('links.sa.main')">{{ $t('navbar.studentsArea') }}</router-link>
      </li>
      <li>
        <router-link class="col s12 waves-effect waves-light" :to="'/' + $t('links.project.main')">{{ $t('navbar.project') }}</router-link>
      </li>
      <li>
        <router-link class="col s12 waves-effect waves-light" :to="'/' + $t('links.news')">{{ $t('navbar.news') }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    closeSidenav () {
      var sidenav = document.querySelector('.sidenav')
      var instance = M.Sidenav.getInstance(sidenav)
      instance.close()
    }
  }
}
document.addEventListener('DOMContentLoaded', function () {
  var sidenav = document.querySelectorAll('.sidenav')
  M.Sidenav.init(sidenav)
})
</script>

<style scoped>
* {
  color: #ffffff !important;
}
.brand-logo {
  margin-left: 15px;
}
#nav-mobile {
  margin-inline-end: 30%;
}
</style>
