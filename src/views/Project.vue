<template>
  <div id="project">
    <div class="row">
      <div class="container">
        <div class="center">
          <h1>{{ $t('project.title') }}</h1>
        </div>
        <p v-html="$t('project.intro')"></p>
        <i18n path="project.saIntro1" tag="p">
          <b class="orange-text lowercase">{{ $t('sa.title') }}</b>
          <router-link :to="'/' + $t('links.sa.main')">{{ $t('project.saLink') }}</router-link>
        </i18n>
        <p v-html="$t('project.saIntro2')"></p>
        <i18n path="project.saClassRequest" tag="b">
          <a class="link" @click="scrollToCR">{{ $t('project.saClassRequestLink') }}</a>
        </i18n>
        <p v-html="$t('project.devTeam')"></p>
        <p v-html="$t('project.contact')"></p>
        <div class="divider"></div>
        <h2>{{ $t('project.teamTitle') }}</h2>
        <i18n path="project.team" tag="p">
          <a class="link" @click="openOctave">Octave</a>
          <b class="red-text">Baptiste</b>
          <b class="red-text">Rontis</b>
          <b class="red-text">Hayaan</b>
          <b class="red-text">Elena</b>
          <b class="teal-text">Emil</b>
          <b class="teal-text">Elena</b>
        </i18n>
        <h2 :id="$t('links.project.hyped')">{{ $t('project.subClassTitle') }}</h2>
        <p v-html="$t('project.subClass')"></p>
        <form @submit.prevent="sendCRForm">
          <div class="input-field">
            <input type="text" name="name" id="cr-name" v-model="CRForm.name">
            <label for="cr-name">{{ $t('project.forms.name') }}</label>
          </div>
          <div class="input-field">
            <input type="text" name="class" id="cr-class" v-model="CRForm.class">
            <label for="cr-class">{{ $t('sa.class') }}</label>
          </div>
          <button class="btn green darken-2 waves-effect waves-light" type="submit" :disabled="!CRForm.name || !CRForm.class">{{ $t('project.forms.send') }}</button>
          <br>
          <div class="success-message" v-if="CRForm.status">
            <p class="success-p"><i class="material-icons check left">check</i> {{ $t('project.forms.sent') }}</p>
          </div>
        </form>
        <p class="feedback-intro">{{ $t('project.feedbackIntro') }}</p>
        <h2>{{ $t('project.suggestionsReviews') }}</h2>
        <form @submit.prevent="sendSRForm">
          <div class="input-field">
            <input type="text" name="name" id="sr-name" v-model="SRForm.name">
            <label for="sr-name">{{ $t('project.forms.name') }}</label>
          </div>
          <div class="input-field">
            <textarea class="materialize-textarea" name="suggestion-review" id="suggestion-review" v-model="SRForm.content"></textarea>
            <label for="suggestion-review">{{ $t('project.forms.suggestionReview') }}</label>
          </div>
          <button class="btn green darken-2 waves-effect waves-light" type="submit" :disabled="!SRForm.name || !SRForm.content">{{ $t('project.forms.send') }}</button>
          <div class="success-message" v-if="SRForm.status">
            <p class="success-p"><i class="material-icons check left">check</i> {{ $t('project.forms.sent') }}</p>
          </div>
        </form>
        <b>{{ $t('project.feedbackThank') }}</b>
        <h2 class="questions-title">{{ $t('project.questions') }}</h2>
        <form @submit.prevent="sendQForm">
          <div class="input-field">
            <input type="text" name="name" id="q-name" v-model="QForm.name">
            <label for="q-name">{{ $t('project.forms.name') }}</label>
          </div>
          <div class="input-field">
            <input type="text" name="name" id="q-contact-method" v-model="QForm.contactMethod">
            <label for="q-contact-method">{{ $t('project.forms.contactMethod') }}</label>
          </div>
          <div class="input-field">
            <textarea class="materialize-textarea" name="question" id="question" v-model="QForm.content"></textarea>
            <label for="question">{{ $t('project.forms.question') }}</label>
          </div>
          <button class="btn green darken-2 waves-effect waves-light" type="submit" :disabled="!QForm.name || !QForm.contactMethod || !QForm.content">{{ $t('project.forms.send') }}</button>
          <br>
          <div class="success-message" v-if="QForm.status">
            <p class="success-p"><i class="material-icons check left">check</i> {{ $t('project.forms.sent') }}</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  name: 'Project',
  data() {
    return {
      CRForm: {
        name: null,
        class: null,
        status: null,
        buttonCooldowned: null
      },
      SRForm: {
        name: null,
        content: null,
        fieldsError: false,
        status: null,
        buttonCooldowned: false
      },
      QForm: {
        name: null,
        contactMethod: null,
        content: null,
        fieldsError: false,
        status: null,
        buttonCooldowned: false
      }
    }
  },
  methods: {
    openOctave () {
      window.open('https://lasagna.cf')
    },
    scrollToCR() {
      this.$el.querySelector('#' + this.$t('links.project.hyped')).scrollIntoView()
    },
    sendSRForm() {
      this.buttonCooldowned = true
      this.$store.dispatch('sendForm', {
        type: 'suggestionReview',
        name: this.SRForm.name,
        content: this.SRForm.content
      })
      .then(() => {
        this.SRForm.status = true
        this.SRForm.buttonCooldowned = true
        setTimeout(() => {
          this.SRForm.status = false
          this.SRForm.buttonCooldowned = false
        }, 10000)
      })
    },
    sendQForm() {
      this.buttonCooldowned = true
      this.$store.dispatch('sendForm', {
        type: 'question',
        name: this.QForm.name,
        contactMethod: this.QForm.contactMethod,
        content: this.QForm.content
      })
      .then(() => {
        this.QForm.status = true
        this.QForm.buttonCooldowned = true
        setTimeout(() => {
          this.QForm.status = false
          this.QForm.buttonCooldowned = false
        }, 10000)
      })
    },
  },
  mounted() {
    if (this.$router.currentRoute.params.id === this.$t('links.project.hyped')) {
      this.scrollToCR()
    }
  }
}
</script>

<style scoped>
p > b
{
  font-size: 1.1rem;
}

b
{
  font-size: 1.3rem;
}

.btn
{
  margin-bottom: 30px;
}

.card {
  width: 400px;
  border-radius: 25px;
}

.error-message {
  display: inline-flex;
  text-align: center;
  padding: 3px 5px 3px 5px;
  margin-top: 15px;
  box-shadow: 1px 1px 3px #757575;
  border-radius: 25px;
  background-color: #f44336;
  width: fit-content;
}

.error-p {
  margin: 0;
  font-size: 1rem;
}

.success-message {
  display: inline-flex;
  text-align: center;
  padding: 3px 5px 3px 5px;
  box-shadow: 1px 1px 3px #757575;
  border-radius: 25px;
  background-color: #43a047;
  width: fit-content;
}

.success-p {
  margin: 0;
  font-size: 1rem;
}

label,
label.active,
input:focus+label {
  color: #bdbdbd !important;
}

input,
textarea {
  color: #fff;
}

.questions-title {
  margin-top: 40px;
}
</style>