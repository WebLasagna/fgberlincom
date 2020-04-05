<template>
  <div id="website-management">
    <div class="row">
      <div class="container">
        <div class="center">
          <h1>{{ $t('sa.websiteManagement.title') }}</h1>
        </div>
        <div class="row">
          <div class="col s12 m6 l4 center">
            <h2>{{ $t('sa.websiteManagement.studentAccounts') }}</h2>
            <div v-if="!addStudentForm.show">
              <div v-if="studentsListLoading">
                <Spinner />
              </div>
              <div v-if="!studentsListLoading && !students.length">
                <b>{{ $t('sa.websiteManagement.noStudents') }}</b>
              </div>
              <div class="row" v-if="!studentsListLoading">
                <div class="col s6" v-for="student in students" :key="student.userId">
                  <div class="student-chip waves-effect waves-light tdrotate" :class="{ 'green-text': student.status === 'verified', 'orange-text': student.status === 'pending', 'red-text': student.status === 'banned' }" @click="goToStudentPage(student.userId)">{{ student.firstname }}</div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="card green">
                <div class="card-content">
                  <div class="input-field">
                    <input type="text" id="student-firstname" v-model="addStudentForm.firstname">
                    <label for="student-firstname">{{ $t('sa.firstname') }}</label>
                  </div>
                  <div class="input-field">
                    <input type="text" id="student-lastname" v-model="addStudentForm.lastname">
                    <label for="student-lastname">{{ $t('sa.lastname') }}</label>
                  </div>
                  <div class="row">
                    <div class="col" v-for="group in addStudentForm.groups" :key="group">
                      <div class="list-chip green darken-2"><i class="material-icons action-icon" @click="removeGroupFromStudent(group)">close</i>{{ group }}</div>
                    </div>
                    <div class="col">
                      <div class="list-chip green darken-2" :class="{ 'waves-effect waves-light': !addStudentForm.addGroupForm.show }">
                        <i class="material-icons action-icon" @click="addStudentForm.addGroupForm.show = true" v-if="!addStudentForm.addGroupForm.show">add</i>
                        <i class="material-icons action-icon" @click="addStudentForm.addGroupForm.show = false" v-if="addStudentForm.addGroupForm.show && !addStudentForm.addGroupForm.group">close</i><i class="material-icons action-icon" @click="addGroupToStudent" v-if="addStudentForm.addGroupForm.show && addStudentForm.addGroupForm.group">check</i><input type="text" class="list-chip-input" v-model="addStudentForm.addGroupForm.group" v-if="addStudentForm.addGroupForm.show">
                      </div>
                    </div>
                  </div>
                  <div class="input-field">
                    <input type="text" id="student-username" v-model="addStudentForm.username">
                    <label for="student-username">{{ $t('sa.username') }}</label>
                  </div>
                  <div class="input-field">
                    <input :type="addStudentForm.showPassword" id="student-password" v-model="addStudentForm.password">
                    <i class="material-icons right toggle-icon" @click="toggleStudentFormPassword">remove_red_eye</i>
                    <label for="student-password">{{ $t('sa.password') }}</label>
                  </div>
                  <div class="left">
                    <i class="material-icons small check-icon" @click="addStudentForm.show = false">arrow_back</i>
                  </div>
                  <div class="right" v-if="addStudentForm.firstname && addStudentForm.lastname && addStudentForm.groups.length && addStudentForm.username && addStudentForm.password">
                    <i class="material-icons small check-icon" @click="addStudent" v-if="!addStudentForm.success">check</i>
                    <i class="material-icons small added" v-if="addStudentForm.success">check</i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row btn-row">
              <a class="btn-floating btn-large black waves-effect waves-light" @click="addStudentForm.show = true" v-if="!addStudentForm.show"><i class="material-icons large">add</i></a>
            </div>
          </div>
          <div class="col s12 m6 l4 center">
            <h2>{{ $t('sa.websiteManagement.groups') }}</h2>
            <div v-if="!addGroupForm.show">
              <div v-if="groupsListLoading">
                <Spinner />
              </div>
              <div v-if="!groupsListLoading && !groups.length">
                <b>{{ $t('sa.websiteManagement.noGroups') }}</b>
              </div>
              <div class="row" v-if="!groupsListLoading && groups.length">
                <div class="col s6" v-for="group in groups" :key="group.id">
                  <div class="group-chip waves-effect waves-light tdrotate" :class="randomTextColor()" @click="goToGroupPage(group.id)">{{ group.name }}</div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="card green">
                <div class="card-content">
                  <div class="input-field">
                    <input type="text" class="input-card-title" id="group-name" v-model="addGroupForm.name">
                    <label for="group-name">{{ $t('sa.websiteManagement.groupPage.name') }}</label>
                  </div>
                  <div class="input-field">
                    <input type="text" id="display-name" v-model="addGroupForm.displayName">
                    <label for="group-display-name">{{ $t('sa.websiteManagement.groupPage.displayName') }}</label>
                  </div>
                  <b class="subjects-label left">{{ $t('sa.websiteManagement.groupPage.subjects') }}</b>
                  <br>
                  <div class="row">
                    <div class="col" v-for="subject in addGroupForm.subjects" :key="subject.id">
                      <div class="subject-chip green darken-2 capitalize"><i class="material-icons action-icon" @click="removeGroupSubject(subject.id)">close</i>
                        <p>{{ getSubjectName(subject.subjectId) }}</p>
                      </div>
                    </div>
                    <div class="col">
                      <div class="subject-chip green darken-2" :class="{ 'waves-effect waves-light': !addGroupForm.subjectsForm.show }">
                        <i class="material-icons action-icon" @click="addGroupForm.subjectsForm.show = true" v-if="!addGroupForm.subjectsForm.show">add</i>
                        <i class="material-icons action-icon" @click="addGroupForm.subjectsForm.show = false" v-if="addGroupForm.subjectsForm.show && !addGroupForm.subjectsForm.subject">close</i><i class="material-icons action-icon" @click="addGroupSubject()" v-if="addGroupForm.subjectsForm.subject">check</i><input type="text" class="subject-input" v-model="addGroupForm.subjectsForm.subject" v-if="addGroupForm.subjectsForm.show">
                      </div>
                    </div>
                  </div>
                  <div class="left">
                    <i class="material-icons small check-icon" @click="addGroupForm.show = false">arrow_back</i>
                  </div>
                  <div class="right" v-if="addGroupForm.name && addGroupForm.displayName">
                    <i class="material-icons small check-icon" @click="addGroup()" v-if="!addGroupForm.success">check</i>
                    <i class="material-icons small added" v-if="addGroupForm.success">check</i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row btn-row">
              <a class="btn-floating btn-large black waves-effect waves-light" @click="addGroupForm.show = true" v-if="!addGroupForm.show"><i class="material-icons large">add</i></a>
            </div>
          </div>
          <div class="col s12 m6 l4 center">
            <h2>{{ $t('sa.websiteManagement.referralLinks') }}</h2>
            <div v-if="!addReferralLinkForm.show">
              <div v-if="referralLinksListLoading">
                <Spinner />
              </div>
              <div v-if="!referralLinksListLoading && !referralLinks.length">
                <b>{{ $t('sa.websiteManagement.noReferralLinks') }}</b>
              </div>
              <div class="row" v-if="!referralLinksListLoading && referralLinks.length">
                <div class="col s6" v-for="link in referralLinks" :key="link.id">
                  <div class="referral-link-chip waves-effect waves-light tdrotate" :class="{ 'green-text': link.used, 'white-text': !link.used }" @click="goToReferralLinkPage(link.id)">{{ link.code }}</div>
                  <span class="referral-link-creator" v-if="link.user">({{ link.user.firstname }})</span>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="card green">
                <div class="card-content">
                  <div class="input-field">
                    <input type="text" id="referral-code" v-model="addReferralLinkForm.code">
                    <i class="material-icons right toggle-icon" @click="generateRandomReferralCode">font_download</i>
                    <label for="referral-code">{{ $t('sa.websiteManagement.referralLinkPage.code') }}</label>
                  </div>
                  <div class="fgb-collapsible" :class="{ 'waves-effect': !addReferralLinkForm.additionalInfos.show }">
                    <div class="fgb-collapsible-header" @click="toggleCollapsible" :class="{ 'waves-effect': addReferralLinkForm.additionalInfos.show }">
                      <span>{{ $t('sa.websiteManagement.referralLinkPage.additionalInfos') }}</span>
                      <i class="material-icons right" v-if="addReferralLinkForm.additionalInfos.show">keyboard_arrow_down</i>
                      <i class="material-icons right" v-else>keyboard_arrow_up</i>
                    </div>
                    <div v-if="addReferralLinkForm.additionalInfos.show">
                      <div class="input-field">
                        <input type="text" name="firstname" id="referral-firstname" v-model="addReferralLinkForm.additionalInfos.firstname">
                        <label for="referral-firstname">{{ $t('sa.firstname') }}</label>
                      </div>
                      <div class="input-field">
                        <input type="text" name="lastname" id="referral-lastname" v-model="addReferralLinkForm.additionalInfos.lastname">
                        <label for="referral-lastname">{{ $t('sa.lastname') }}</label>
                      </div>
                      <div class="input-field">
                        <input type="text" name="username" id="referral-username" v-model="addReferralLinkForm.additionalInfos.username">
                        <label for="referral-username">{{ $t('sa.username') }}</label>
                      </div>
                      <div v-show="addReferralLinkForm.additionalInfos.usernameError" class="row">
                        <div class="error-message">
                          <p>{{ $t('error.username') }}</p>
                        </div>
                      </div>
                      <div class="input-field">
                        <input :type="addReferralLinkForm.additionalInfos.showPassword" name="password" id="referral-password" v-model="addReferralLinkForm.additionalInfos.password">
                        <i class="material-icons right toggle-icon" @click="toggleReferralLinkFormPassword">remove_red_eye</i>
                        <label for="referral-password">{{ $t('sa.password') }}</label>
                      </div>
                    </div>
                  </div>
                  <div class="input-field">
                    <input type="url" id="referral-custom-image" v-model="addReferralLinkForm.customImage">
                    <label for="referral-custom-image">{{ $t('sa.websiteManagement.referralLinkPage.customImage') }}</label>
                  </div>
                  <div class="left">
                    <i class="material-icons small check-icon" @click="addReferralLinkForm.show = false">arrow_back</i>
                  </div>
                  <div class="right" v-if="addReferralLinkForm.code">
                    <i class="material-icons small check-icon" @click="addReferralLink" v-if="!addReferralLinkForm.success">check</i>
                    <i class="material-icons small added" v-if="addReferralLinkForm.success">check</i>
                  </div>
                </div>
              </div>
            </div>
            <div class="row btn-row">
              <a class="btn-floating btn-large black waves-effect waves-light" @click="addReferralLinkForm.show = true" v-if="!addReferralLinkForm.show"><i class="material-icons large">add</i></a>
            </div>
          </div>
          <div class="col s12 m6 l4 center">
            <h2>{{ $t('sa.websiteManagement.forms') }}</h2>
            <div class="row">
              <div v-if="formsListLoading">
                <Spinner />
              </div>
              <div v-if="!formsListLoading && !forms.length">
                <b>{{ $t('sa.websiteManagement.noForms') }}</b>
              </div>
              <div class="row" v-if="!formsListLoading && forms.length">
                <div class="col s6" v-for="form in forms" :key="form.id">
                  <div class="form-chip waves-effect waves-light tdrotate" :class="randomTextColor()" @click="goToFormPage(form.id)">{{ form.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="center">
            <h2 class="dev-title">Dev</h2>
          </div>
          <h2>Links :</h2>
            <h3>Crowdin : <a href="https://traduction.fgberlin.com" target="_blank">traduction.fgberlin.com</a></h3>
            <h3><a href="https://www.notion.so/FGBerlin-com-10dfead27d19405094c7f8df8a2c46ec" target="_blank">Notion page</a></h3>
          <a class="btn red waves-effect" @click="closeWebsite()">close website</a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="center">
        <router-link class="btn-floating btn-back black waves-effect waves-light" :to="'/' + $t('links.sa.main')"><i class="material-icons">arrow_back</i></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '../../../components/Spinner'
import subjects from '../../../strings/subjects'
import textColors from '../../../strings/textColors'
export default {
  name: 'WebsiteManagement',
  components: {
    Spinner
  },
  mounted() {
    M.AutoInit()
    this.$store.dispatch('websiteManagement/students/getAll').then(() => {
      this.studentsListLoading = false
    })
    this.$store.dispatch('websiteManagement/groups/getAll').then(() => {
      this.groupsListLoading = false
    })
    this.$store.dispatch('websiteManagement/referralLinks/getAll').then(() => {
      this.referralLinksListLoading = false
    })
    this.$store.dispatch('websiteManagement/forms/getAll').then(() => {
      this.formsListLoading = false
    })
  },
  computed: {
    students() {
      return this.$store.state.websiteManagement.students.all
    },
    groups() {
      return this.$store.state.websiteManagement.groups.all
    },
    referralLinks() {
      return this.$store.state.websiteManagement.referralLinks.all
    },
    forms() {
      return this.$store.state.websiteManagement.forms.all
    }
  },
  data() {
    return {
      message: null,
      studentsListLoading: true,
      groupsListLoading: true,
      referralLinksListLoading: true,
      formsListLoading: true,
      addStudentForm: {
        show: false,
        firstname: null,
        lastname: null,
        groups: [],
        username: null,
        password: null,
        showPassword: 'password',
        success: null,
        addGroupForm: {
          show: false,
          group: null
        }
      },
      addGroupForm: {
        show: false,
        name: null,
        displayName: null,
        subjects: [],
        subjectsForm: {
          show: false,
          subject: null
        },
        success: null
      },
      addReferralLinkForm: {
        show: false,
        code: null,
        customImage: null,
        additionalInfos: {
          firstname: null,
          lastname: null,
          groups: [],
          username: null,
          password: null,
          showPassword: 'password',
          show: false
        },
        success: null
      }
    }
  },
  methods: {
    randomTextColor() {
      return textColors[Math.floor(Math.random() * textColors.length)]
    },
    goToStudentPage(userId) {
      this.$router.push({ path: '/' + this.$t('links.sa.websiteManagement.studentPage') + '/' + userId })
    },
    goToGroupPage(groupId) {
      this.$router.push({ path: '/' + this.$t('links.sa.websiteManagement.groupPage') + '/' + groupId })
    },
    goToReferralLinkPage(referralLinkId) {
      this.$router.push({ path: '/' + this.$t('links.sa.websiteManagement.referralLinkPage') + '/' + referralLinkId })
    },
    goToFormPage(formId) {
      this.$router.push({ path: '/' + this.$t('links.sa.websiteManagement.formPage') + '/' + formId })
    },
    toggleStudentFormPassword() {
      if (this.addStudentForm.showPassword === 'password') {
        this.addStudentForm.showPassword = 'text'
      } else {
        this.addStudentForm.showPassword = 'password'
      }
    },
    toggleReferralLinkFormPassword() {
      if (this.addReferralLinkForm.additionalInfos.showPassword === 'password') {
        this.addReferralLinkForm.additionalInfos.showPassword = 'text'
      } else {
        this.addReferralLinkForm.additionalInfos.showPassword = 'password'
      }
    },
    toggleCollapsible() {
      if (this.addReferralLinkForm.additionalInfos.show) {
        this.addReferralLinkForm.additionalInfos.show = false
      } else {
        this.addReferralLinkForm.additionalInfos.show = true
      }
    },
    generateRandomReferralCode() {
      var randomCode = ""
      var alphabet = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,r,s,t,u,v,w,x,y,z,1,2,3,4,5,6,7,8,9,0".split(",")
      var rand = null
      for (var x = 0; x < 6; x++) {
        rand = Math.floor(Math.random() * alphabet.length)
        randomCode += alphabet[rand]
      }
      this.addReferralLinkForm.code = randomCode
    },
    addGroupToStudent() {
      this.addStudentForm.groups.push(this.addStudentForm.addGroupForm.group)
      this.addStudentForm.addGroupForm.show = false
      this.addStudentForm.addGroupForm.group = null
    },
    removeGroupFromStudent(group) {
      this.addStudentForm.groups.splice(this.addStudentForm.groups.indexOf(group), 1)
    },
    addStudent() {
      this.$store.dispatch('websiteManagement/students/add', {
        firstname: this.addStudentForm.firstname,
        lastname: this.addStudentForm.lastname,
        groups: this.addStudentForm.groups,
        username: this.addStudentForm.username,
        password: this.addStudentForm.password
      }).then(() => {
        this.addStudentForm.success = true
        this.$store.dispatch('websiteManagement/referralLinks/getAll')
        setTimeout(() => {
          this.addStudentForm.show = false
        }, 3000)
        setTimeout(() => {
          this.addStudentForm.success = false
          this.addStudentForm.firstname = null
          this.addStudentForm.lastname = null
          this.addStudentForm.groups = []
          this.addStudentForm.username = null
          this.addStudentForm.password = null
        }, 8000)
      })
    },
    addGroup() {
      this.$store.dispatch('websiteManagement/groups/add', {
        name: this.addGroupForm.name,
        displayName: this.addGroupForm.displayName,
        subjects: this.addGroupForm.subjects
      }).then(() => {
        this.addGroupForm.success = true
        this.$store.dispatch('websiteManagement/groups/getAll')
        setTimeout(() => {
          this.addGroupForm.show = false
        }, 3000)
        setTimeout(() => {
          this.addGroupForm.success = false
          this.addGroupForm.name = null
          this.addGroupForm.displayName = null
          this.addGroupForm.subjects = []
        }, 8000)
      })
    },
    getSubjectName(subjectId) {
      return this.$t(subjects.find(subject => subject.id === subjectId).stringCode)
    },
    addGroupSubject() {
      if (!this.addGroupForm.subjects.length) var aiId = 1
      else var aiId = this.addGroupForm.subjects[this.addGroupForm.subjects.length - 1].id + 1
      var subjectId = subjects.find(subject => this.$t(subject.stringCode) === this.addGroupForm.subjectsForm.subject).id
      this.addGroupForm.subjects.push({
        id: aiId,
        subjectId: subjectId
      })
      this.addGroupForm.subjectsForm.show = false
      this.addGroupForm.subjectsForm.subject = null
    },
    removeGroupSubject(subjectId) {
      this.addGroupForm.subjects = this.addGroupForm.subjects.filter(subject => subject.id !== subjectId)
    },
    addReferralLink() {
      var payload = {
        additionalInfos: {}
      }
      payload.ssid = this.$store.state.ssid
      payload.code = this.addReferralLinkForm.code
      if (this.addReferralLinkForm.additionalInfos.firstname) payload.additionalInfos.firstname = this.addReferralLinkForm.additionalInfos.firstname
      if (this.addReferralLinkForm.additionalInfos.lastname) payload.additionalInfos.lastname = this.addReferralLinkForm.additionalInfos.lastname
      if (this.addReferralLinkForm.additionalInfos.groups.length) payload.additionalInfos.groups = this.addReferralLinkForm.additionalInfos.groups
      if (this.addReferralLinkForm.additionalInfos.username) payload.additionalInfos.username = this.addReferralLinkForm.additionalInfos.username
      if (this.addReferralLinkForm.additionalInfos.password) payload.additionalInfos.password = this.addReferralLinkForm.additionalInfos.password
      if (this.addReferralLinkForm.customImage) payload.customImage = this.addReferralLinkForm.customImage
      this.$store.dispatch('websiteManagement/referralLinks/add', payload).then(() => {
        this.addReferralLinkForm.success = true
        this.$store.dispatch('websiteManagement/referralLinks/getAll')
        setTimeout(() => {
          this.addReferralLinkForm.show = false
        }, 3000)
        setTimeout(() => {
          this.addReferralLinkForm.success = false
          this.addReferralLinkForm.code = null
          this.addReferralLinkForm.additionalInfos.firstname = null
          this.addReferralLinkForm.additionalInfos.lastname = null
          this.addReferralLinkForm.additionalInfos.groups = []
          this.addReferralLinkForm.additionalInfos.username = null
          this.addReferralLinkForm.additionalInfos.password = null
          this.addReferralLinkForm.customImage = null
        }, 8000)
      })
    },
    closeWebsite() {
      this.$store.state.open = false
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.btn-row {
  margin-top: 20px;
}

.toggle-icon {
  cursor: pointer;
  position: relative;
  top: -42px;
  right: 10px;
  color: #424242;
}

.group-chip {
  display: inline-flex;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 700;
  background-color: #23272A;
  border-radius: 25px;
  padding: 12px 18px 12px 18px;
  margin-top: 10px;
  -webkit-transition: .3s ease-out;
  transition: .3s ease-out;
}

.referral-link-chip {
  display: inline-flex;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  background-color: #23272A;
  border-radius: 25px;
  padding: 5px 8px 5px 8px;
  margin-top: 10px;
  -webkit-transition: .3s ease-out;
  transition: .3s ease-out;
}

.referral-link-creator {
  display: block;
  color: #bdbdbd;
  font-size: 0.7rem;
}

.form-chip {
  display: inline-flex;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 700;
  background-color: #23272A;
  border-radius: 25px;
  padding: 8px 12px 8px 12px;
  margin-top: 10px;
  -webkit-transition: .3s ease-out;
  transition: .3s ease-out;
}

.student-ship:hover,
.group-chip:hover,
.referral-link-chip:hover,
.form-chip:hover {
  box-shadow: 1px 1px 3px #757575;
}

.card {
  display: inline-flex;
}

.card-content {
  padding: 25px;
}

.card-title,
input.input-card-title {
  color: #000;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
}

p,
input.input-card-content {
  color: #fff;
  font-size: 1.3rem;
}

.subjects-label {
  color: #000;
}

.subject-chip {
  display: inline-flex;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 25px;
  padding: 3px 5px 3px 5px;
  margin-top: 5px;
  -webkit-transition: .3s ease-out;
  transition: .3s ease-out;
}

.subject-chip p::first-letter {
  text-transform: uppercase !important;
}

.subject-input {
  color: #fff;
  font-size: 1.2rem !important;
  font-weight: 600;
  width: 100px !important;
  height: 30px !important;
  margin: 0 5px 2px 5px !important;
}

.fgb-collapsible {
  background-color: #43a047;
  padding: 8px 10px 8px 10px;
  border-radius: 20px;
}

.fgb-collapsible-header {
  cursor: pointer;
}

.check-icon {
  margin-top: 5px;
  cursor: pointer;
}

.action-icon {
  padding: 2px;
  color: #000;
  cursor: pointer;
}

.added {
  margin-top: 5px;
  color: #388e3c;
  font-weight: 600;
}

.dev-title
{
  font-weight: 600;
  font-size: 1.8rem;
}
</style>