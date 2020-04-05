<template>
  <div id="login">
    <div class="row">
      <div class="container">
        <div class="center">
          <h1>{{ $t('sa.login') }}</h1>
          <div class="card green darken-1">
            <div class="card-content">
              <form @submit.prevent="login">
                <div class="input-field">
                  <input type="text" name="username" id="username" v-model="username">
                  <label for="username">{{ $t('sa.username') }}</label>
                </div>
                <div class="input-field">
                  <input type="password" name="password" id="password" v-model="password">
                  <label for="password">{{ $t('sa.password') }}</label>
                </div>
                <div v-show="credentialsError" class="row">
                  <div class="error-message">
                    <p>{{ $t('error.credentials') }}</p>
                  </div>
                </div>
                <button :disabled="!username || !password || buttonCooldowned" class="btn green darken-2 waves-effect waves-light" type="submit">{{ $t('sa.loginButton') }}</button>
              </form>
            </div>
          </div>
          <div class="center">
            <span>{{ $t('sa.noAccount') }}</span>
            <br>
            <router-link class="btn green darken-2 waves-effect waves-light" :to="'/' + $t('links.sa.register')">{{ $t('sa.createAccountButton') }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: null,
      password: null,
      fieldsError: null,
      credentialsError: null,
      buttonCooldowned: false
    }
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        this.credentialsError = false
        this.fieldsError = true
        return
      }
      this.buttonCooldowned = true
      setTimeout(() => {
        this.buttonCooldowned = false
      }, 3000);
      this.$store.dispatch('account/login', {
        username: this.username,
        password: this.password
      }).then(() => {
        this.$socket.client.emit('sendUpdate', 'checkSSID')
        this.$store.dispatch('account/get').then(() => {
          this.$router.push('/' + this.$t('links.sa.main'))
        })
      }).catch((error) => {
        if (error === "credentials_error") {
          this.credentialsError = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  display: inline-flex;
  min-width: 300px;

  & > * {
    min-width: 300px;
  }
}

.btn {
  margin-top: 5px;
}

input {
  color: #fff;
}
</style>