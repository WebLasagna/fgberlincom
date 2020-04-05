<template>
  <div id="referral-link-page">
    <div class="row regular-row">
      <div class="center spinner" v-if="loading">
        <Spinner />
      </div>
      <div class="container" v-else>
        <div class="center">
          <div class="card green">
            <div class="card-content">
              <span class="card-title">{{ $t('sa.websiteManagement.referralLinkPage.title', { id: this.currentReferralLink.id }) }}</span>
              <div class="row">
                <div class="col s8">
                  <p><b>{{ $t('sa.websiteManagement.referralLinkPage.code') }} : </b><span v-if="!editReferralLinkForm.codeForm.show">{{ currentReferralLink.code }}</span><input type="text" class="edit-input" v-model="editReferralLinkForm.codeForm.code" v-if="editReferralLinkForm.codeForm.show"></p>
                </div>
                <div class="col">
                  <i class="material-icons action-icon" @click="editReferralLinkForm.codeForm.show = true" v-if="!editReferralLinkForm.codeForm.show">edit</i>
                  <i class="material-icons action-icon" @click="editReferralLinkForm.codeForm.show = false" v-if="editReferralLinkForm.codeForm.show && !editReferralLinkForm.codeForm.code">close</i>
                  <i class="material-icons action-icon" @click="editReferralLinkInfo" v-if="editReferralLinkForm.codeForm.show && editReferralLinkForm.codeForm.code">check</i>
                </div>
              </div>
              <p><b>{{ $t('sa.websiteManagement.referralLinkPage.creator') }} :</b> {{ currentReferralLink.creator.firstname + " " + currentReferralLink.creator.lastname }}
                <StudentPageButton :userId="currentReferralLink.creator.userId" />
              </p>
              <p><b>{{ $t('sa.websiteManagement.referralLinkPage.additionalInfos') }} :</b></p>
              <div class="row">
                <div class="input-field">
                  <input type="text" name="firstname" id="referral-firstname" v-model="editReferralLinkForm.additionalInfosForm.firstname">
                  <label for="referral-firstname">{{ $t('sa.firstname') }}</label>
                </div>
                <div class="input-field">
                  <input type="text" name="lastname" id="referral-lastname" v-model="editReferralLinkForm.additionalInfosForm.lastname">
                  <label for="referral-lastname">{{ $t('sa.lastname') }}</label>
                </div>
                <div class="input-field">
                  <input type="text" name="username" id="referral-username" v-model="editReferralLinkForm.additionalInfosForm.username">
                  <label for="referral-username">{{ $t('sa.username') }}</label>
                </div>
                <div v-show="editReferralLinkForm.additionalInfosForm.usernameError" class="row">
                  <div class="error-message">
                    <p>{{ $t('error.username') }}</p>
                  </div>
                </div>
                <div class="input-field">
                  <input :type="editReferralLinkForm.additionalInfosForm.showPassword" name="password" id="referral-password" v-model="editReferralLinkForm.additionalInfosForm.password">
                  <i class="material-icons right toggle-icon" @click="togglePassword">remove_red_eye</i>
                  <label for="referral-password">{{ $t('sa.password') }}</label>
                </div>
              </div>
              <div class="row">
                <div class="col s8">
                  <p><b>{{ $t('sa.websiteManagement.referralLinkPage.customImage') }} : </b><span v-if="!editReferralLinkForm.customImageForm.show">{{ currentReferralLink.customImage }}</span><input type="text" class="edit-input custom-image-edit-input" v-model="editReferralLinkForm.customImageForm.customImage" v-if="editReferralLinkForm.customImageForm.show"></p>
                </div>
                <div class="col">
                  <i class="material-icons action-icon" @click="editReferralLinkForm.customImageForm.show = true" v-if="!editReferralLinkForm.customImageForm.show">edit</i>
                  <i class="material-icons action-icon" @click="editReferralLinkForm.customImageForm.show = false" v-if="editReferralLinkForm.customImageForm.show && !editReferralLinkForm.customImageForm.customImage">close</i>
                  <i class="material-icons action-icon" @click="editReferralLinkInfo" v-if="editReferralLinkForm.customImageForm.show && editReferralLinkForm.customImageForm.customImage">check</i>
                </div>
              </div>
              <a class="btn red darken-3 waves-effect waves-light" v-if="!deleteConfirm" @click="deleteConfirm = true"><i class="material-icons left">delete</i>{{ $t('sa.websiteManagement.referralLinkPage.deleteReferralLinkButton') }}</a>
              <div v-else>
                <a class="btn-floating red darken-4 waves-effect waves-light" @click="deleteReferralLink()"><i class="material-icons left">check</i></a>
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
  name: 'ReferralLinkPage',
  components: {
    Spinner,
    StudentPageButton
  },
  data() {
    return {
      loading: true,
      editReferralLinkForm: {
        codeForm: {
          show: false,
          code: null
        },
        additionalInfosForm: {
          show: false,
          firstname: null,
          lastname: null,
          groups: [],
          username: null,
          password: null,
          showPassword: 'password',
          usernameError: null
        },
        customImageForm: {
          show: false,
          customImage: null
        }
      },
      deleteConfirm: false
    }
  },
  mounted() {
    this.$store.dispatch('websiteManagement/referralLinks/get', { referralLinkId: this.$router.currentRoute.params.referralLinkId }).then(() => {
      this.loading = false
      this.editReferralLinkForm.codeForm.code = this.currentReferralLink.code
      this.editReferralLinkForm.customImageForm.customImage = this.currentReferralLink.customImage
      var user = this.currentReferralLink.user
      if (!user) return
      if (user.firstname) this.editReferralLinkForm.additionalInfosForm.firstname = user.firstname
      if (user.lastname) this.editReferralLinkForm.additionalInfosForm.lastname = user.lastname
      if (user.groups) this.editReferralLinkForm.additionalInfosForm.groups = user.groups
      if (user.username) this.editReferralLinkForm.additionalInfosForm.username = user.username
      if (user.password) this.editReferralLinkForm.additionalInfosForm.password = user.password
    })
  },
  computed: {
    currentReferralLink() {
      return this.$store.state.websiteManagement.referralLinks.current
    }
  },
  methods: {
    editReferralLinkInfo() {
      var additionalInfos = {}
      var form = this.editReferralLinkForm.additionalInfosForm
      if (form.firstname) additionalInfos.firstname = form.firstname
      if (form.lastname) additionalInfos.lastname = form.lastname
      if (form.username) additionalInfos.username = form.username
      if (form.password) additionalInfos.password = form.password
      this.$store.dispatch('websiteManagement/referralLinks/edit', {
        referralLinkId: this.currentReferralLink.id,
        code: this.editReferralLinkForm.codeForm.code,
        additionalInfos: additionalInfos,
        customImage: this.editReferralLinkForm.customImageForm.customImage
      }).then(() => {
        this.$store.dispatch('websiteManagement/referralLinks/get', { referralLinkId: this.currentReferralLink.id }).then(() => {
          this.editReferralLinkForm.codeForm.show = false
          this.editReferralLinkForm.additionalInfosForm.show = false
          this.editReferralLinkForm.customImageForm.show = false
        })
      })
    },
    togglePassword() {
      if (this.editReferralLinkForm.additionalInfosForm.showPassword === 'password') {
        this.editReferralLinkForm.additionalInfosForm.showPassword = 'text'
      } else {
        this.editReferralLinkForm.additionalInfosForm.showPassword = 'password'
      }
    },
    deleteReferralLink() {
      this.$store.dispatch('websiteManagement/referralLinks/delete', {
        referralLinkId: this.currentReferralLink.id
      }).then(() => {
        this.$router.push({
          path: '/' + this.$t('links.sa.websiteManagement.main')
        })
        M.toast({
          html: this.$t('sa.websiteManagement.referralLinkPage.referralLinkDeleted')
        })
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