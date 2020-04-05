<template>
  <div id="locale-picker">
    <div class="center">
      <b class="language">{{ $t('sa.myAccount.language') }}</b>
    </div>
    <div class="row">
      <div class="col s2 push-s2 l3 push-l1">
        <a class="btn-floating btn-small black waves-effect waves-light" @click="changeLocale('fr')" :class="{ 'grey darken-2': $store.state.locale === 'fr' }">fr</a>
      </div>
      <div class="col s2 push-s2 l3 push-l1">
        <a class="btn-floating btn-small black waves-effect waves-light" @click="changeLocale('en')" :class="{ 'grey darken-2': $store.state.locale === 'en' }">en</a>
      </div>
      <div class="col s2 push-s2 l3 push-l1">
        <a class="btn-floating btn-small black waves-effect waves-light" @click="changeLocale('de')" :class="{ 'grey darken-2': $store.state.locale === 'de' }">de</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocalePicker',
  methods: {
    changeLocale(newLocale) {
      this.$store.commit('changeLocale', newLocale)
      this.$i18n.locale = newLocale
    }
  }
}
</script>

<style scoped>
#locale-picker {
  width: 220px;
}

.btn-floating {
  margin: 10px;
}

.language {
  color: #bdbdbd;
  font-size: 1.2rem;
}
</style>