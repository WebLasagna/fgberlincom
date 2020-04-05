<template>
  <div id="theme-switcher">
    <div class="switch">
      <label>
        <span class="theme-name">{{ $t('sa.myAccount.dark') }}</span>
        <input :checked="$store.state.theme === 'light'" type="checkbox" @click="switchTheme">
        <span class="lever"></span>
        <span class="theme-name">{{ $t('sa.myAccount.light') }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemeSwitcher',
  methods: {
    switchTheme() {
      if(this.$store.state.theme === 'dark') {
        this.$store.commit('changeTheme', 'light')
      }
      else if(this.$store.state.theme === 'light') {
        this.$store.commit('changeTheme', 'dark')
      }
    }
  }
}
</script>

<style scoped>
.switch {
  margin-bottom: 20px;
}
.switch label input[type=checkbox]:checked+.lever {
  background-color: #4caf50;
}

.theme-name {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
}
</style>