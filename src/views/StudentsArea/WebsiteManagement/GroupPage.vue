<template>
  <div id="group-page">
    <div class="row regular-row">
      <div class="center spinner" v-if="loading">
        <Spinner />
      </div>
      <div class="container" v-else>
        <div class="center">
          <div class="card green">
            <div class="card-content">
              <span class="card-title">{{ $t('sa.websiteManagement.groupPage.title', { id: currentGroup.id }) }}</span>
              <form @submit.prevent="edit()">
                <div class="field">
                  <div class="row">
                    <div class="col">
                      <span class="field-title">{{ $t('sa.websiteManagement.groupPage.name') }} : </span>
                      <span class="field-content" v-if="!editGroupForm.nameForm.show">{{ currentGroup.name }}</span>
                      <input type="text" class="edit-input" v-model="editGroupForm.nameForm.name" v-if="editGroupForm.nameForm.show">
                    </div>
                    <div class="col">
                      <i class="material-icons action-icon" @click="editGroupForm.nameForm.show = true" v-if="!editGroupForm.nameForm.show">edit</i>
                      <i class="material-icons action-icon" @click="editGroupForm.nameForm.show = false" v-if="editGroupForm.nameForm.show && !editGroupForm.nameForm.name">close</i>
                      <i class="material-icons action-icon" @click="edit()" v-if="editGroupForm.nameForm.show && editGroupForm.nameForm.name">check</i>
                    </div>
                  </div>
                </div>
              </form>
              <form @submit.prevent="edit()">
                <div class="field">
                  <div class="row">
                    <div class="col">
                      <span class="field-title">{{ $t('sa.websiteManagement.groupPage.displayName') }} : </span>
                      <span class="field-content" v-if="!editGroupForm.displayNameForm.show">{{ currentGroup.displayName }}</span>
                      <input type="text" class="edit-input" v-model="editGroupForm.displayNameForm.displayName" v-if="editGroupForm.displayNameForm.show">
                    </div>
                    <div class="col">
                      <i class="material-icons action-icon" @click="editGroupForm.displayNameForm.show = true" v-if="!editGroupForm.displayNameForm.show">edit</i>
                      <i class="material-icons action-icon" @click="editGroupForm.displayNameForm.show = false" v-if="editGroupForm.displayNameForm.show && !editGroupForm.displayNameForm.displayName">close</i>
                      <i class="material-icons action-icon" @click="edit()" v-if="editGroupForm.displayNameForm.show && editGroupForm.displayNameForm.displayName">check</i>
                    </div>
                  </div>
                </div>
              </form>
              <div class="field">
                <span class="field-title">{{ $t('sa.websiteManagement.groupPage.subjects') }}</span>
                <div class="row list-chip-row">
                  <div class="col" v-for="subject in this.editGroupForm.subjects" :key="subject.id">
                    <div class="subject-chip green darken-2"><i class="material-icons action-icon" @click="removeGroupSubject(subject.id)">close</i><span class="caps">{{ getSubjectName(subject.subjectId) }}</span></div>
                  </div>
                  <div class="col">
                    <div class="subject-chip green darken-2" :class="{ 'waves-effect waves-light': !editGroupForm.subjectsForm.show }">
                      <i class="material-icons action-icon" @click="editGroupForm.subjectsForm.show = true" v-if="!editGroupForm.subjectsForm.show">add</i>
                      <i class="material-icons action-icon" @click="editGroupForm.subjectsForm.show = false" v-if="editGroupForm.subjectsForm.show && !editGroupForm.subjectsForm.subject">close</i><i class="material-icons action-icon" @click="addGroupSubject()" v-if="editGroupForm.subjectsForm.subject">check</i><input type="text" class="subject-input" v-model="editGroupForm.subjectsForm.subject" v-if="editGroupForm.subjectsForm.show">
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <b class="field-title">{{ $t('sa.websiteManagement.groupPage.members') }}</b>
                <div class="row" v-if="currentGroup.members.length">
                  <div class="col s3" v-for="student in currentGroup.members" :key="student.id">
                    <div class="student-chip waves-effect student-chip-link" :class="{ 'green darken-2': student.status === 'verified', 'orange': student.status === 'pending', 'red': student.status === 'banned' }" @click="goToStudentPage(student.userId)">{{ student.firstname }}</div>
                  </div>
                </div>
                <div class="row" v-else>
                  <b>{{ $t('sa.websiteManagement.groupPage.noMembers') }}</b>
                </div>
              </div>
              <a class="btn red darken-3 waves-effect waves-light" v-if="!deleteGroupConfirm" @click="deleteGroupConfirm = true"><i class="material-icons left">delete</i>{{ $t('sa.websiteManagement.groupPage.deleteGroupButton') }}</a>
              <div v-else>
                <a class="btn-floating red darken-4 waves-effect waves-light" @click="deleteGroup()"><i class="material-icons left">check</i></a>
                <a class="btn-floating green darken-3 waves-effect waves-light" @click="deleteGroupConfirm = false"><i class="material-icons left">close</i></a>
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
import subjects from '../../../strings/subjects'
export default {
  name: 'GroupPage',
  components: {
    Spinner
  },
  data() {
    return {
      loading: true,
      editGroupForm: {
        subjects: [],
        nameForm: {
          show: false,
          name: null
        },
        displayNameForm: {
          show: false,
          displayName: null
        },
        subjectsForm: {
          show: false,
          subject: null
        }
      },
      deleteGroupConfirm: false
    }
  },
  mounted() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    this.$store.dispatch('websiteManagement/groups/get', { groupId: parseInt(this.$router.currentRoute.params.groupId) }).then(() => {
      this.loading = false
      this.editGroupForm.nameForm.name = this.currentGroup.name
      this.editGroupForm.displayNameForm.displayName = this.currentGroup.displayName
      this.editGroupForm.subjects = this.currentGroup.subjects
    })
  },
  computed: {
    currentGroup() {
      return this.$store.state.websiteManagement.groups.current
    }
  },
  methods: {
    getSubjectName(subjectId) {
      return this.$t(subjects.find(subject => subject.id === subjectId).stringCode)
    },
    addGroupSubject() {
      if (!this.editGroupForm.subjects.length) var aiId = 1
      else var aiId = this.editGroupForm.subjects[this.editGroupForm.subjects.length - 1].id + 1
      var subjectId = subjects.find(subject => this.$t(subject.stringCode) === this.editGroupForm.subjectsForm.subject).id
      this.editGroupForm.subjects.push({
        id: aiId,
        subjectId: subjectId
      })
      this.editGroupForm.subjectsForm.show = false
      this.editGroupForm.subjectsForm.subject = null
    },
    removeGroupSubject(subjectId) {
      this.editGroupForm.subjects = this.editGroupForm.subjects.filter(subject => subject.id !== subjectId)
    },
    goToStudentPage(userId) {
      this.$router.push({
        path: '/' + this.$t('links.sa.websiteManagement.studentPage') + '/' + userId
      })
    },
    edit() {
      this.$store.dispatch('websiteManagement/groups/edit', {
        groupId: this.currentGroup.id,
        name: this.editGroupForm.nameForm.name,
        displayName: this.editGroupForm.displayNameForm.displayName,
        subjects: this.editGroupForm.subjects
      }).then(() => {
        this.$store.dispatch('websiteManagement/groups/get', { groupId: this.currentGroup.id }).then(() => {
          this.editGroupForm.nameForm.show = false
          this.editGroupForm.displayNameForm.show = false
          this.editGroupForm.subjectsForm.show = false
        })
      })
    },
    deleteGroup() {
      this.$store.dispatch('websiteManagement/groups/delete', {
        groupId: this.currentGroup.id
      }).then(() => {
        this.$router.push({
          path: '/' + this.$t('links.sa.websiteManagement.main')
        })
        M.toast({
          html: this.$t('sa.websiteManagement.groupPage.groupDeleted')
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
}

b {
  color: #000;
}

p {
  font-size: 1.4rem;
}

.centered-label {
  margin-left: 10px;
}

.subject-chip {
  display: inline-flex;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 25px;
  padding: 3px 5px 3px 5px;
  margin: 3px;
  -webkit-transition: .3s ease-out;
  transition: .3s ease-out;
}

.subject-input {
  color: #fff;
  font-size: 1.2rem !important;
  font-weight: 600;
  width: 100px !important;
  height: 30px !important;
  margin: 0 5px 2px 5px !important;
}

.action-icon {
  color: #000;
  cursor: pointer;
  font-size: 1.6rem;
  padding: 1px;
}

.btn-floating {
  margin: 3px;
}
</style>