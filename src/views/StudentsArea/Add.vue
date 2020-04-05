<template>
  <div id="add">
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col s12 m6 offset-m2 l5 offset-l3">
            <div class="card green" v-if="currentRoute === '/' + $t('links.sa.addHomework')">
              <div class="card-content">
                <div v-if="loading">
                  <Spinner />
                </div>
                <div class="input-field col s12" v-else>
                  <select id="mselect" v-model="addHomeworkForm.group">
                    <option value="" disabled selected>{{ $t('sa.admin.add.choose') }}</option>
                    <option v-for="group in getAuthorizedGroups()" :key="group.id" :value="group.id">{{ group.name }}</option>
                  </select>
                  <label>{{ $t('sa.admin.add.group') }}</label>
                </div>
                <div class="input-field col s12">
                  <select id="mselect" v-model="addHomeworkForm.subject">
                    <!-- <option value="" disabled selected>{{ $t('sa.admin.add.choose') }}</option>
                                        <option v-for="subject in getGroupSubjects(addHomeworkForm.group)" :key="subject.id" :value="subject.id">{{ subject.name }}</option> -->
                  </select>
                  <label>{{ $t('sa.admin.add.subject') }}</label>
                </div>
                <Datepicker v-model="addHomeworkForm.date" format="d MMMM" :disabled-dates="{ days: [6, 0] }" :monday-first="true" :language="fr" calendar-class="black-text green round" />
                <div class="input-field col s12">
                  <textarea class="materialize-textarea" id="homework-content" v-model="addHomeworkForm.details"></textarea>
                  <label for="homework-content">{{ $t('sa.admin.add.details') }}</label>
                </div>
                <button class="btn green darken-2 waves-effect waves-light">{{ $t('sa.admin.add.button', { type: $t('sa.admin.add.types.homework') }) }}</button>
              </div>
            </div>
            <div class="card green" v-if="currentRoute === '/' + $t('links.sa.addTestDst')">
              <div class="card-content">
                <div class="input-field col s12">
                  <select id="mselect" v-model="addTestDstForm.group">
                    <option value="" disabled selected>{{ $t('sa.admin.add.choose') }}</option>
                    <option v-for="group in getAuthorizedGroups()" :key="group.id" :value="group.id">{{ group.displayName }}</option>
                  </select>
                  <label>{{ $t('sa.admin.add.group') }}</label>
                </div>
                <div class="input-field col s6">
                  <select id="mselect" v-model="addTestDstForm.type">
                    <option value="" disabled selected>{{ $t('sa.admin.add.choose') }}</option>
                    <option :value="1">{{ $t('sa.types.test') }}</option>
                    <option :value="2">{{ $t('sa.types.dst') }}</option>
                  </select>
                  <label>{{ $t('sa.admin.add.type') }}</label>
                </div>
                <div class="input-field col s6" :class="{ hide: !addTestDstForm.group }">
                  <select id="mvselect" v-model="addTestDstForm.subject">
                    <option value="" disabled selected>{{ $t('sa.admin.add.choose') }}</option>
                    <option v-for="subject in getGroupSubjects(addTestDstForm.group)" :key="subject.id" :value="subject.id">{{ getSubjectName(subject.id) }}</option>
                  </select>
                  <label>{{ $t('sa.admin.add.subject') }}</label>
                </div>
                <Datepicker v-model="addTestDstForm.date" format="d MMMM" :disabled-dates="{ days: [6, 0] }" :monday-first="true" :language="fr" calendar-class="black-text green round" />
                <div class="input-field col s12">
                  <textarea class="materialize-textarea" id="test-dst-content" v-model="addTestDstForm.content"></textarea>
                  <label for="test-dst-content">{{ $t('sa.admin.add.content') }}</label>
                </div>
                <button class="btn green darken-2 waves-effect waves-light" @click="addTestDst" :disabled="!addTestDstForm.group || !addTestDstForm.type || !addTestDstForm.subject || !addTestDstForm || !addTestDstForm.content">{{ $t('sa.admin.add.button', { type: getTypeName(addTestDstForm.type) }) }}</button>
              </div>
            </div>
            <div class="card green" v-if="currentRoute === '/' + $t('links.sa.addCanceledCourse')">
              <div class="card-content">
                <div class="input-field col s12">
                  <select v-model="addCanceledCourseForm.group">
                    <option value="" disabled selected>{{ $t('sa.admin.add.choose') }}</option>
                    <option v-for="group in getAuthorizedGroups()" :key="group.id" :value="group.id">{{ group.name }}</option>
                  </select>
                  <label>{{ $t('sa.admin.add.group') }}</label>
                </div>
                <div class="input-field col s12">
                  <select v-model="addCanceledCourseForm.subject">
                    <option value="" disabled selected>{{ $t('sa.admin.add.choose') }}</option>
                    <option value="1">{{ $t('sa.subjects.math') }}</option>
                    <option value="2">{{ $t('sa.subjects.french') }}</option>
                    <option value="3">{{ $t('sa.subjects.historyGeo') }}</option>
                  </select>
                  <label>{{ $t('sa.admin.add.subject') }}</label>
                </div>
                <Datepicker v-model="addCanceledCourseForm.date" format="d MMMM" :disabled-dates="{ days: [6, 0] }" :monday-first="true" :language="fr" calendar-class="black-text green round" />
                <div class="input-field col s12">
                  <textarea class="materialize-textarea" id="canceled-course-details" v-model="addCanceledCourseForm.details"></textarea>
                  <label for="canceled-course-details">{{ $t('sa.admin.add.details') }}</label>
                </div>
                <button class="btn green darken-2 waves-effect waves-light">{{ $t('sa.admin.add.button', { type: $t('sa.admin.add.types.canceledCourse') }) }}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="center">
          <router-link class="btn-floating btn-back black waves-effect waves-light" :to="'/' + $t('links.sa.all')"><i class="material-icons large">arrow_back</i></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '../../components/Spinner'
import Datepicker from 'vuejs-datepicker'
import {
  fr,
  en,
  de
} from 'vuejs-datepicker/dist/locale'
import colors from '../../strings/colors'
import types from '../../strings/types'
import subjects from '../../strings/subjects'
export default {
  name: 'Add',
  components: {
    Spinner,
    Datepicker
  },
  data() {
    return {
      currentRoute: this.$router.currentRoute.path,
      addTestDstForm: {
        group: null,
        type: 1,
        subject: null,
        date: null,
        content: null,
        buttonCooldowned: null
      },
      addHomeworkForm: {
        group: null,
        subject: null,
        date: null,
        content: null
      },
      addCanceledCourseForm: {
        group: null,
        subject: null,
        date: null,
        details: null
      },
      loading: true,
      fr: fr,
      en: en,
      de: de
    }
  },
  computed: {
    randomColor() {
      return colors[Math.floor(Math.random() * colors.length)]
    }
  },
  mounted() {
    this.$store.dispatch('getAllGroups').then(() => {
      this.loading = false
    })
    var elems = document.querySelectorAll('#mselect')
    var instances = M.FormSelect.init(elems)
  },
  methods: {
    getTypeName(id) {
      return this.$t(types.find(type => type.id === id).stringCode)
    },
    getAuthorizedGroups() {
      var writePerms = this.$store.state.user.permissions.write
      var groups = this.$store.state.user.groups
      var authorizedGroups = []
      groups.forEach(group => {
        if (this.$store.getters.hasPerm('write', group.name)) authorizedGroups.push(group)
      })
      return authorizedGroups
    },
    getGroupSubjects(groupId) {
      if (typeof groupId !== 'number') return
      var group = this.$store.state.user.groups.find(group => group.id === groupId)
      setTimeout(() => {
        var elems = document.querySelectorAll('#mvselect')
        var instances = M.FormSelect.init(elems)
      }, 1)
      return group.subjects
    },
    getSubjectName(subjectId) {
      var subject = subjects.find(subject => subject.id === subjectId)
      return this.$t(subject.stringCode).replace(/^\w/, c => c.toUpperCase())
    },
    addTestDst() {
      var formDate = this.addTestDstForm.date
      var date = formDate.getFullYear() + ('0' + (formDate.getMonth() + 1)).slice(-2) + ('0' + formDate.getDate()).slice(-2)
      this.addTestDstForm.buttonCooldowned = true
      setTimeout(() => {
        this.addTestDstForm.buttonCooldowned = false
      }, 3000);
      this.$store.dispatch('addTestDst', {
        group: this.addTestDstForm.group,
        type: this.addTestDstForm.type,
        subject: this.addTestDstForm.subject,
        date: date,
        content: this.addTestDstForm.content
      }).then(() => {
        this.$router.push({
          path: '/' + this.$t('links.sa.all')
        })
      })
    }
  }
}
</script>

<style scoped>
.row {
  margin-top: 50px;
}

.card {
  display: inline-flex;
  margin-top: 10px;
  border-radius: 25px;
  box-shadow: 1px 1px 3px #757575;
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

.card.yellow,
.card.amber,
.card.lime {
  color: #757575;
}

.dropdown-content li>span::first-letter,
select>option::first-letter {
  text-transform: capitalize !important;
}

.col.s6>label {
  color: #fff;
}
</style>