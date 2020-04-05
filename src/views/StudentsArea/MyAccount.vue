<template>
  <div id="my-account">
    <div class="row">
      <div class="container">
        <div class="center">
          <h1>{{ $t('sa.myAccount.title') }}</h1>
        </div>
        <div class="center center-flex">
          <div class="card green" v-if="!changePasswordForm.show && !confirmAccountDeletion.show">
            <div class="card-content">
              <div class="row">
                <div class="field">
                  <span class="field-title">{{ $t('sa.firstname') }} : </span>
                  <span class="field-content">{{ user.firstname }}</span>
                </div>
                <div class="field">
                  <span class="field-title">{{ $t('sa.lastname') }} : </span>
                  <span class="field-content">{{ user.lastname }}</span>
                </div>
                <div class="field">
                  <span class="field-title">{{ $t('sa.class') }} : </span>
                  <span class="field-content">{{ user.groups[0].displayName }}</span>
                </div>
              </div>
              <form @submit.prevent="changeUsername">
                <div class="field">
                  <div class="row">
                    <div class="col">
                      <span class="field-title">{{ $t('sa.username') }} : </span>
                      <span v-if="!changeUsernameForm.show" class="field-content">{{ user.username }}</span>
                      <input type="text" class="edit-input" v-model="changeUsernameForm.newUsername" v-if="changeUsernameForm.show">
                    </div>
                    <div class="col">
                      <div v-if="!changeUsernameForm.buttonCooldowned">
                        <i class="material-icons action-icon" @click="changeUsernameForm.show = true" v-if="!changeUsernameForm.show">edit</i>
                        <i class="material-icons action-icon" @click="changeUsernameForm.show = false" v-if="changeUsernameForm.show && !changeUsernameForm.newUsername">close</i>
                        <i class="material-icons action-icon" @click="changeUsername('username')" v-if="changeUsernameForm.show && changeUsernameForm.newUsername">check</i>
                      </div>
                      <i class="material-icons" v-else>access_time</i>
                    </div>
                  </div>
                </div>
              </form>
              <div class="field">
                <div class="row">
                  <div class="col">
                    <span class="field-title">{{ $t('sa.password') }} : </span>
                    <span class="field-content">••••••••</span>
                  </div>
                  <div class="col">
                    <i class="material-icons action-icon" @click="changePasswordForm.show = true">edit</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card green" v-if="changePasswordForm.show">
            <div class="card-content">
              <span class="card-title">{{ $t('sa.myAccount.changePassword') }}</span>
              <form @submit.prevent="changePassword">
                <div class="input-field">
                  <input type="password" name="password" id="old-password" v-model="changePasswordForm.oldPassword">
                  <label for="old-password">{{ $t('sa.password') }}</label>
                </div>
                <div class="input-field">
                  <input type="password" name="password" id="new-password" v-model="changePasswordForm.newPassword">
                  <label for="new-password">{{ $t('sa.myAccount.newPassword') }}</label>
                </div>
                <div class="left">
                  <i class="material-icons action-icon" @click="changePasswordForm.show = false">arrow_back</i>
                </div>
                <div class="center">
                  <button :disabled="!changePasswordForm.oldPassword || !changePasswordForm.newPassword || changePasswordForm.buttonCooldowned" class="btn green darken-2 waves-effect waves-light" type="submit">{{ $t('sa.myAccount.changeButton') }}</button>
                </div>
                <div v-show="changePasswordForm.passwordError" class="row center">
                  <div class="error-message">
                    <p>{{ $t('error.password') }}</p>
                  </div>
                </div>
                <div v-show="changePasswordForm.success" class="row center">
                  <div class="success-message">
                    <p><i class="material-icons check left">check</i> {{ $t('sa.myAccount.passwordChanged') }}</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="card red" v-if="confirmAccountDeletion.show">
            <div class="card-content">
              <span class="card-title">{{ $t('sa.myAccount.deleteAccount') }}</span>
              <form @submit.prevent="deleteAccount">
                <p class="account-deletion-warning">{{ $t('sa.myAccount.deleteAccountWarning') }}</p>
                <div class="input-field">
                  <input type="password" name="password" id="delete-account-password" v-model="confirmAccountDeletion.password">
                  <label for="delete-account-password">{{ $t('sa.password') }}</label>
                </div>
                <div class="left">
                  <i class="material-icons action-icon" @click="confirmAccountDeletion.show = false">arrow_back</i>
                </div>
                <div class="center">
                  <button :disabled="!confirmAccountDeletion.password || confirmAccountDeletion.buttonCooldowned" class="btn red darken-2 waves-effect waves-light" type="submit">{{ $t('sa.myAccount.deleteAccountButton') }}</button>
                </div>
                <div v-show="confirmAccountDeletion.passwordError" class="row center">
                  <div class="error-message">
                    <p>{{ $t('error.password') }}</p>
                  </div>
                </div>
                <div v-show="confirmAccountDeletion.formStatus" class="row center">
                  <div class="success-message">
                    <p><i class="material-icons check left">check</i> {{ $t('sa.myAccount.accountDeleted') }}</p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <br>
          <div class="row-flex">
            <div class="col">
              <router-link class="btn-floating btn-back black waves-effect waves-light" :to="'/' + $t('links.sa.main')"><i class="material-icons left">arrow_back</i></router-link>
            </div>
            <div class="col">
              <a class="btn btn-logout red lighten-1 waves-effect waves-light" @click="logout">{{ $t('sa.myAccount.logoutButton') }}</a>
            </div>
          </div>
          <br>
          <div class="row-flex">
              <div class="col">
                <LocalePicker />
            </div>
          </div>
          <br>
          <div class="row-flex">
            <div class="center">
                <ThemeSwitcher />
            </div>
          </div>
          <br>
          <div class="row-flex">
            <div class="col s12">
              <a class="btn-small red darken-3 waves-effect waves-light" @click="confirmAccountDeletion.show = true" :disabled="confirmAccountDeletion.show">{{ $t('sa.myAccount.deleteAccountButton') }}</a>
            </div>
          </div>
          <br>
          <div class="row-flex">
            <i18n path="sa.myAccount.privacy" tag="p">
              <router-link :to="'/' + $t('links.privacy')">{{ $t('home.privacy') }}</router-link>
            </i18n>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LocalePicker from '../../components/LocalePicker'
import ThemeSwitcher from '../../components/ThemeSwitcher'
export default {
  name: 'MyAccount',
  components: {
    LocalePicker,
    ThemeSwitcher
  },
  data() {
    return {
      changePasswordForm: {
        show: false,
        oldPassword: null,
        newPassword: null,
        showPassword: 'password',
        buttonCooldowned: false,
        passwordError: null,
        success: null
      },
      changeUsernameForm: {
        show: false,
        newUsername: null,
        buttonCooldowned: false
      },
      confirmAccountDeletion: {
        show: false,
        password: null,
        passwordError: null
      }
    }
  },
  mounted() {
    this.$store.dispatch('account/get').then(() => {
      this.changeUsernameForm.newUsername = this.user.username
    })
  },
  computed: {
    user() {
      return this.$store.state.account.user
    }
  },
  methods: {
    logout() {
      this.$store.commit('logout')
    },
    togglePassword() {
      if (this.changePasswordForm.showPassword === 'password') {
        this.changePasswordForm.showPassword = 'text'
      } else {
        this.changePasswordForm.showPassword = 'password'
      }
    },
    changePassword() {
      if (!this.changePasswordForm.oldPassword || !this.changePasswordForm.newPassword) return
      this.changePasswordForm.buttonCooldowned = true
      this.changePasswordForm.passwordError = null
      this.$store.dispatch('account/changePassword', {
        oldPassword: this.changePasswordForm.oldPassword,
        newPassword: this.changePasswordForm.newPassword
      })
      .then(() => {
        this.changePasswordForm.success = true
        setTimeout(() => {
          this.changePasswordForm.success = false
        }, 5000)
        setTimeout(() => {
          this.changePasswordForm.oldPassword = null
          this.changePasswordForm.newPassword = null
          this.changePasswordForm.buttonCooldowned = false
        }, 10000)
      })
      .catch(err => {
        if (err = 'password_error') {
          this.changePasswordForm.passwordError = true
          setTimeout(() => {
            this.changePasswordForm.passwordError = false
          }, 5000)
          setTimeout(() => {
            this.changePasswordForm.buttonCooldowned = false
          }, 5000)
        }
      })
    },
    changeUsername() {
      this.changeUsernameForm.buttonCooldowned = true
      this.$store.dispatch('account/changeUsername', {
          newUsername: this.changeUsernameForm.newUsername
        })
        .then(() => {
          this.$store.dispatch('account/get').then(() => {
            this.changeUsernameForm.newUsername = this.user.username
            this.changeUsernameForm.show = false
          })
          setTimeout(() => {
            this.changeUsernameForm.buttonCooldowned = false
          }, 8000)
        })
    },
    deleteAccount() {
      if (!this.confirmAccountDeletion.password) {
        return this.confirmAccountDeletion.fieldsError = true
      }
      this.confirmAccountDeletion.buttonCooldowned = true
      this.confirmAccountDeletion.fieldsError = false
      this.confirmAccountDeletion.passwordError = false
      setTimeout(() => {
        this.confirmAccountDeletion.buttonCooldowned = false
        this.confirmAccountDeletion.formStatus = false
      }, 3000);
      this.$store.dispatch('account/delete', this.confirmAccountDeletion.password).then(res => {
        this.confirmAccountDeletion.fieldsError = null
        if (res === "password_error") {
          this.confirmAccountDeletion.passwordError = true
        } else if (res === "success") {
          this.confirmAccountDeletion.formStatus = true
          setTimeout(() => {
            this.$store.commit('logout')
          }, 3000)
        }
      })
    }
  }
}
document.addEventListener('DOMContentLoaded', function() {
  M.Modal.init(document.querySelectorAll('.modal'));
})
</script>

<style lang="scss" scoped>
.center-flex > * {
  text-align: left;
}

.card-content>p,
div.col.s8>p {
  font-size: 1.4rem !important;
}

.card {
  display: inline-flex;

  & > * {
    max-width: 350px;
  }
}

.row-flex {
  margin: 10px 0 10px;
}

.btn-logout {
  margin-bottom: 30px;
  height: 47px;
  line-height: 47px;
  font-size: 14px;
  padding: 0 20px;
}

.show-password {
  cursor: pointer;
  position: relative;
  top: -42px;
  right: 10px;
  color: #424242;
}

.account-deletion-warning {
  font-size: 1.1rem;
  padding-bottom: 10px;
}
</style>