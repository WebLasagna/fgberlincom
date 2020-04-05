<template>
    <div id="register">
        <div class="row">
            <div class="container">
                <div class="col s12 m6 offset-m2 l5 offset-l3">
                    <div class="card green darken-1">
                        <div class="card-content center">
                            <span class="card-title">{{ $t('sa.createAccount') }}</span>
                            <form @submit.prevent="createAccount">
                                <div class="input-field">
                                    <input type="text" name="firstname" id="firstname" v-model="firstname">
                                    <label for="firstname">{{ $t('sa.firstname') }}</label>
                                </div>
                                <div class="input-field">
                                    <input type="text" name="lastname" id="lastname" v-model="lastname">
                                    <label for="lastname">{{ $t('sa.lastname') }}</label>
                                </div>
                                <div class="input-field">
                                    <select v-model="uclass">
                                        <option value="" disabled selected>{{ $t('sa.selectClass') }}</option>
                                        <option value="9a1">9a1</option>
                                        <option value="9b1">9b1</option>
                                        <option value="9b2">9b2</option>
                                        <option value="9b3">9b3</option>
                                        <option value="10b1">10b1</option>
                                    </select>
                                    <label>{{ $t('sa.class') }}</label>
                                </div>
                                <div class="input-field">
                                    <input type="text" name="username" id="username" v-model="username">
                                    <label for="username">{{ $t('sa.username') }}</label>
                                </div>
                                <div v-show="usernameError" class="row">
                                    <div class="error-message">
                                        <p>{{ $t('error.username') }}</p>
                                    </div>
                                </div>
                                <div class="input-field">
                                    <input :type="showPassword" name="password" id="password" v-model="password">
                                    <i class="material-icons right show-password" @click="togglePassword">remove_red_eye</i>
                                    <label for="password">{{ $t('sa.password') }}</label>
                                </div>
                                <div v-show="passwordConfirmError" class="row">
                                    <div class="error-message">
                                        <p>{{ $t('error.password') }}</p>
                                    </div>
                                </div>
                                <div v-show="fieldsError" class="row">
                                    <div class="error-message">
                                        <p>{{ $t('error.fields') }}</p>
                                    </div>
                                </div>
                                <i18n path="sa.conditionsAgreement" tag="span" class="conditions">
                                    <router-link to="/conditions" class="conditions">{{ $t('sa.conditions') }}</router-link>
                                </i18n>
                                <button :disabled="buttonCooldowned" class="btn green darken-2 waves-effect waves-light" type="submit">{{ $t('sa.createAccountButton') }}</button>
                            </form>
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
import { isNullOrUndefined } from 'util';
export default {
    name: 'CreateAccount',
    data() {
        return {
            firstname: null,
            lastname: null,
            uclass: null,
            username: null,
            password: null,
            showPassword: 'password',
            fieldsError: null,
            passwordConfirmError: null,
            usernameError: null,
            buttonCooldowned: false
        }
    },
    methods: {
        togglePassword () {
            if(this.showPassword === 'password') {
                this.showPassword = 'text'
            } else {
                this.showPassword = 'password'
            }
        },
        createAccount() {
            if (!this.firstname || !this.lastname || !this.uclass || !this.username || !this.password) {
                this.usernameError = false
                this.passwordConfirmError = false
                this.fieldsError = true
                return
            }
            if(this.passwordConfirm !== this.password) {
                this.passwordConfirmError
            }
            this.buttonCooldowned = true
            setTimeout(() => {
                this.buttonCooldowned = false
            }, 3000);
            this.$store.dispatch('register', { firstname: this.firstname, lastname: this.lastname, uclass: this.uclass, username: this.username, password: this.password }).then(() => {
                this.$store.dispatch('getUserInfo')
            }).catch((error) => {
                if(error === "username_error") {
                    this.fieldsError = false
                    this.usernameError = true
                }
            })
        }
    },
    mounted() {
      M.AutoInit();
    }
}
</script>

<style scoped>
.card
{
  margin-top: 50px;
  border-radius: 25px;
  box-shadow: 1px 1px 3px #757575;
  -webkit-transition: 0.3s ease;
  transition: 0.3s ease;
}
.card-title
{
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
}
.error-message
{
  display: inline-flex;
  padding: 3px 5px 3px 5px;
  box-shadow: 1px 1px 3px #9e9e9e;
  border-radius: 25px;
  background-color: #f44336;
  width: fit-content;
}
.btn
{
    margin-top: 5px;
}
.show-password
{
    cursor: pointer;
    position: relative;
    top: -42px;
    right: 10px;
    color: #424242;
}
.conditions
{
    display: inline-block;
}
a.conditions
{
    color: #1565c0;
    font-weight: 600;
}
input
{
    color: #fff;
}
</style>