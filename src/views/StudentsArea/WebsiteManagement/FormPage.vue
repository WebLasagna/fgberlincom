<template>
  <div id="form-page">
    <div class="row regular-row">
      <div class="center spinner" v-if="loading">
        <Spinner />
      </div>
      <div class="container" v-else>
        <div class="center">
          <div class="card green">
            <div class="card-content">
              <span class="card-title">{{ $t('sa.websiteManagement.formPage.title', { id: currentForm.id }) }}</span>
              <div class="field">
                <span class="field-title">{{ $t('sa.websiteManagement.formPage.type') }} :</span>
                <span class="field-content" v-if="currentForm.type === 'suggestionReview'">{{ $t('sa.websiteManagement.formPage.suggestionReview') }}</span>
                <span class="field-content" v-if="currentForm.type === 'question'">{{ $t('sa.websiteManagement.formPage.question') }}</span>
              </div>
              <div class="field">
                <span class="field-title">{{ $t('sa.websiteManagement.formPage.name') }} :</span>
                <span class="field-content">{{ currentForm.name }}</span>
              </div>
              <div class="field" v-if="currentForm.contactMethod">
                <span class="field-title">{{ $t('sa.websiteManagement.formPage.contactMethod') }} :</span>
                <span class="field-content">{{ currentForm.contactMethod }}</span>
              </div>
              <div class="field">
                <span class="field-title">{{ $t('sa.websiteManagement.formPage.content') }} :</span>
                <span class="field-content">{{ currentForm.content }}</span>
              </div>
              <a class="btn red darken-3 waves-effect waves-light" v-if="!deleteConfirm" @click="deleteConfirm = true"><i class="material-icons left">delete</i>{{ $t('sa.websiteManagement.formPage.deleteFormButton') }}</a>
              <div v-else>
                <a class="btn-floating red darken-4 waves-effect waves-light" @click="deleteForm()"><i class="material-icons left">check</i></a>
                <a class="btn-floating green darken-3 waves-effect waves-light" @click="deleteConfirm = false"><i class="material-icons left">close</i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="center">
          <router-link class="btn-floating btn-back black waves-effect waves-light" :to="'/' + $t('links.sa.websiteManagement.main')"><i class="material-icons">arrow_back</i></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '../../../components/Spinner'
import StudentPageButton from '../../../components/StudentPageButton'
export default {
  name: 'FormPage',
  components: {
    Spinner,
    StudentPageButton
  },
  data() {
    return {
      loading: true,
      deleteConfirm: false
    }
  },
  mounted() {
    this.$store.dispatch('websiteManagement/forms/get', { formId: parseInt(this.$router.currentRoute.params.formId) }).then(() => {
      this.loading = false
    })
  },
  computed: {
    currentForm() {
      return this.$store.state.websiteManagement.forms.current
    }
  },
  methods: {
    deleteForm() {
      this.$store.dispatch('websiteManagement/forms/delete', { formId: this.currentForm.id }).then(() => {
        this.$router.push('/' + this.$t('links.sa'))
      })
    }
  }
}
</script>

<style scoped>
.spinner {
  margin-top: 15%;
}

.row:not(.regular-row) {
  margin-bottom: 0;
}

.btn,
.btn-floating {
  margin-top: 15px !important;
}

.col {
  padding: 0;
}

.card {
  display: inline-flex;
  margin-top: 5%;
  border-radius: 25px;
  box-shadow: 1px 1px 3px #757575;
}

.card-content {
  text-align: left;
  padding: 25px;
}

.card-title {
  color: #000;
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px !important;
}

b {
  color: #000;
}

p {
  font-size: 1.4rem;
  margin-bottom: 5px !important;
}

.toggle-icon {
  cursor: pointer;
  position: relative;
  top: -42px;
  right: 10px;
  color: #424242;
}

.action-icon {
  color: #000;
  cursor: pointer;
  font-size: 1.6rem;
  padding: 1px;
}

.edit-input {
  color: #fff;
  font-size: 1.3rem !important;
  width: 85px !important;
  height: 30px !important;
  margin: 0 5px 2px 5px !important;
}

.custom-image-edit-input {
  width: 100px !important;
}

.btn-floating {
  margin: 3px;
}
</style>