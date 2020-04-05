<template>
	<div id="register">
		<div class="row">
			<div class="container">
				<div class="col s12 m6 offset-m3 l5 offset-l3">
					<div class="center" v-if="loading">
						<Spinner/>
					</div>
					<div class="card green darken-1" v-if="step === 1">
						<div class="card-content center" v-if="!codeParam">
							<span class="card-title">{{ $t('sa.createAccount') }}</span>
							<div class="row moff">
								<form @submit.prevent="getReferralInfo()">
                  <div class="col">
                    <div class="input-field">
                      <input type="text" class="referral-code-input" name="referral-code" id="referral-code" v-model="referralCodeForm.referralCode">
                      <label for="referral-code">{{ $t('sa.referralCode') }}</label>
                    </div>
                  </div>
                  <div class="col">
                    <a class="btn-floating btn-back green darken-2 waves-effect waves-light" type="submit" @click="getReferralInfo()" :disabled="referralCodeForm.buttonCooldowned"><i class="material-icons">arrow_forward</i></a>
                  </div>
                </form>
							</div>
							<div v-show="referralCodeForm.error">
								<div class="error-message">
									<p>{{ $t('error.referralCode') }}</p>
								</div>
							</div>
						</div>
						<div v-else>
							<div class="card-content center">
								<span class="referral-code">{{ codeParam }}</span>
							</div>
						</div>
					</div>
					<div class="card green" v-if="step === 2">
						<div class="card-content">
							<span class="card-title">{{ $t('sa.createAccount') }}</span>
							<div v-if="!referral.user || !referral.user.firstname">
								<div class="input-field">
									<input type="text" name="firstname" id="firstname" v-model="additionalInfosForm.firstname">
									<label for="firstname">{{ $t('sa.firstname') }}</label>
								</div>
							</div>
							<div v-if="!referral.user || !referral.user.lastname">
								<div class="input-field">
									<input type="text" name="lastname" id="lastname" v-model="additionalInfosForm.lastname">
									<label for="lastname">{{ $t('sa.lastname') }}</label>
								</div>
							</div>
							<div v-if="!referral.user || !referral.user.class">
								<select v-model="additionalInfosForm.class">
									<option value="" disabled selected>{{ $t('sa.selectClass') }}</option>
									<option value="9a1">9a1</option>
									<option value="9b1">9b1</option>
									<option value="9b2">9b2</option>
									<option value="9b3">9b3</option>
									<option value="10b1">10b1</option>
								</select>
							</div>
							<div v-if="!referral.user || !referral.user.username">
								<div class="input-field">
									<input type="text" name="username" id="username" v-model="additionalInfosForm.username">
									<label for="username">{{ $t('sa.username') }}</label>
								</div>
								<div v-show="additionalInfosForm.usernameError" class="row">
									<div class="error-message">
										<p>{{ $t('error.username') }}</p>
									</div>
								</div>
							</div>
							<div v-if="!referral.user || !referral.user.password">
								<div class="input-field">
									<input :type="additionalInfosForm.showPassword" name="password" id="password" v-model="additionalInfosForm.password">
									<i class="material-icons right show-password" @click="togglePassword">remove_red_eye</i>
									<label for="password">{{ $t('sa.password') }}</label>
								</div>
							</div>
              <div class="center">
                <i18n path="sa.conditionsAgreement" tag="span">
                  <router-link class="conditions" :to="'/' + $t('links.conditions')">{{ $t('sa.conditions') }}</router-link>
                </i18n>
                <br>
                <button :disabled="additionalInfosForm.buttonCooldowned || !additionalInfosForm.firstname || !additionalInfosForm.lastname || !additionalInfosForm.class || !additionalInfosForm.username" class="btn green darken-2 waves-effect waves-light" type="submit">{{ $t('sa.createAccountButton') }}</button>
              </div>
						</div>
					</div>
					<div class="center">
						<span>{{ $t('sa.hasAccount') }}</span>
						<br>
						<router-link class="btn green darken-2 waves-effect waves-light" :to="'/' + $t('links.sa.login')">{{ $t('sa.loginButton') }}</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Spinner from '../../components/Spinner'
export default {
  name: 'Register',
  components: {
    Spinner
  },
  data() {
    return {
      loading: false,
      step: 1,
      referralCodeForm: {
        referralCode: null,
        error: null,
        buttonCooldowned: false
      },
      additionalInfosForm: {
        firstname: null,
        lastname: null,
        class: null,
        username: null,
        password: null,
        showPassword: 'password',
        usernameError: null,
        buttonCooldowned: false
      }
    }
  },
  /* mounted() {
    this.$store.dispatch('account/', this.$router.currentRoute.params.referral_code).then(() => {
      this.loading = true
      this.editReferralLinkForm.codeForm.code = this.currentReferralLink.code
      this.editReferralLinkForm.customImageForm.customImage = this.currentReferralLink.customImage
      var user = this.currentReferralLink.user
      if (!user) return
      if (user.firstname) this.editReferralLinkForm.additionalInfosForm.firstname = user.firstname
      if (user.lastname) this.editReferralLinkForm.additionalInfosForm.lastname = user.lastname
      if (user.firstname) this.editReferralLinkForm.additionalInfosForm.groups = user.groups
      if (user.firstname) this.editReferralLinkForm.additionalInfosForm.username = user.username
      if (user.firstname) this.editReferralLinkForm.additionalInfosForm.password = user.password
    })
  }, */
  computed: {
    codeParam() {
      return this.$router.currentRoute.params.referralCode
    },
    referral() {
      return this.$store.state.account.referral
    }
  },
  methods: {
    togglePassword() {
      if (this.additionalInfosForm.showPassword === 'password') {
        this.additionalInfosForm.showPassword = 'text'
      } else {
        this.additionalInfosForm.showPassword = 'password'
      }
		},
		getReferralInfo() {
      this.referralCodeForm.buttonCooldowned = true
      setTimeout(() => {
        this.referralCodeForm.buttonCooldowned = false
      }, 3000)
      this.$store.dispatch('account/getReferralInfo', { referralCode: this.referralCodeForm.referralCode }).then(() => {
        this.step = 2
      }).catch(err => {
        if(err === "code_error") {
          this.referralCodeForm.error = true
        }
      })
		},
    createAccount() {
      this.buttonCooldowned = true
      setTimeout(() => {
        this.buttonCooldowned = false
      }, 3000);
      this.$store.dispatch('account/register', {
        firstname: this.additionalInfosForm.firstname,
        lastname: this.additionalInfosForm.lastname,
        class: this.additionalInfosForm.class,
        username: this.additionalInfosForm.username,
        password: this.additionalInfosForm.password
      }).then(() => {
        this.$store.dispatch('account/getUserInfo')
      }).catch((error) => {
        if (error === "username_error") {
          this.usernameError = true
        }
      })
    }
  },
  mounted() {
    M.AutoInit()
  }
}
</script>

<style scoped>
.card {
  margin-top: 50px;
  border-radius: 25px;
  box-shadow: 1px 1px 3px #757575;
  -webkit-transition: 0.3s ease;
  transition: 0.3s ease;
}

.card-title {
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
}

.referral-code {
  color: #000;
  font-size: 2.7rem;
  font-weight: 700;
}

.referral-code-input {
  font-size: 1.5rem !important;
  font-weight: 600;
}

.error-message {
  display: inline-flex;
  padding: 3px 5px 3px 5px;
  box-shadow: 1px 1px 3px #9e9e9e;
  border-radius: 25px;
  background-color: #f44336;
  width: fit-content;
}

.btn, .btn-back {
  margin-top: 5px;
}

.input-field {
	margin-bottom: 0;
}

.show-password {
  cursor: pointer;
  position: relative;
  top: -42px;
  right: 10px;
  color: #424242;
}

.conditions {
  display: inline-block;
}

a.conditions {
  color: #1565c0;
  font-weight: 600;
}

input {
  color: #fff;
}
</style>