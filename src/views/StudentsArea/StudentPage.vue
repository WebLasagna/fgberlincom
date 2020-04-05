<template>
  <div id="student-page">
    <div class="row regular-row">
      <div class="center spinner" v-if="loading">
        <Spinner />
      </div>
      <div class="container" v-else>
        <div class="center">
          <div class="card green">
            <div class="card-content">
              <span class="card-title">{{ $t('sa.studentPage.studentAccount', { id: currentStudent.userId }) }}</span>
              <form @submit.prevent="edit('firstname')">
                <div class="field">
                  <div class="row">
                    <div class="col">
                      <span class="field-title">{{ $t('sa.firstname') }} : </span>
                      <span v-if="!changeFirstnameForm.show" class="field-content">{{ currentStudent.firstname }}</span>
                      <input type="text" class="edit-input" v-model="changeFirstnameForm.firstname" v-if="changeFirstnameForm.show">
                    </div>
                    <div class="col">
                      <i class="material-icons action-icon" @click="changeFirstnameForm.show = true" v-if="!changeFirstnameForm.show">edit</i>
                      <i class="material-icons action-icon" @click="changeFirstnameForm.show = false" v-if="changeFirstnameForm.show && !changeFirstnameForm.firstname">close</i>
                      <i class="material-icons action-icon" @click="edit('firstname')" v-if="changeFirstnameForm.show && changeFirstnameForm.firstname">check</i>
                    </div>
                  </div>
                </div>
              </form>
              <form @submit.prevent="edit('lastname')">
                <div class="field">
                  <div class="row">
                    <div class="col">
                      <span class="field-title">{{ $t('sa.lastname') }} : </span>
                      <span v-if="!changeLastnameForm.show" class="field-content">{{ currentStudent.lastname }}</span>
                      <input type="text" class="edit-input" v-model="changeLastnameForm.lastname" v-if="changeLastnameForm.show">
                    </div>
                    <div class="col s4">
                      <i class="material-icons action-icon" @click="changeLastnameForm.show = true" v-if="!changeLastnameForm.show">edit</i>
                      <i class="material-icons action-icon" @click="changeLastnameForm.show = false" v-if="changeLastnameForm.show && !changeLastnameForm.lastname">close</i>
                      <i class="material-icons action-icon" @click="edit('lastname')" v-if="changeLastnameForm.show && changeLastnameForm.lastname">check</i>
                    </div>
                  </div>
                </div>
              </form>
              <div class="field">
                <span class="field-title">{{ $t('sa.groups') }} :</span>
                <div class="row list-chip-row">
                  <div class="col" v-for="group in currentStudent.groups" :key="group.id">
                    <div class="list-chip green darken-2"><i class="material-icons action-icon" @click="removeFromGroup(group.id)">close</i><span @click="goToGroupPage(group.id)">{{ group.name }}</span></div>
                  </div>
                  <div class="col">
                    <div class="list-chip green darken-2" :class="{ 'waves-effect waves-light': !addGroupForm.show }">
                      <i class="material-icons action-icon" @click="addGroupForm.show = true" v-if="!addGroupForm.show">add</i>
                      <i class="material-icons action-icon" @click="addGroupForm.show = false" v-if="addGroupForm.show && !addGroupForm.group">close</i><i class="material-icons action-icon" @click="addGroup()" v-if="addGroupForm.show && addGroupForm.group">check</i><input type="text" class="list-chip-input" v-model="addGroupForm.group" v-if="addGroupForm.show">
                    </div>
                  </div>
                </div>
              </div>
              <form @submit.prevent="edit('username')">
                <div class="field">
                  <div class="row">
                    <div class="col">
                      <span class="field-title">{{ $t('sa.username') }} : </span>
                      <span v-if="!changeUsernameForm.show" class="field-content">{{ currentStudent.username }}</span>
                      <input type="text" class="edit-input" v-model="changeUsernameForm.username" v-if="changeUsernameForm.show">
                    </div>
                    <div class="col">
                      <i class="material-icons action-icon" @click="changeUsernameForm.show = true" v-if="!changeUsernameForm.show">edit</i>
                      <i class="material-icons action-icon" @click="changeUsernameForm.show = false" v-if="changeUsernameForm.show && !changeUsernameForm.username">close</i>
                      <i class="material-icons action-icon" @click="edit('username')" v-if="changeUsernameForm.show && changeUsernameForm.username">check</i>
                    </div>
                  </div>
                </div>
              </form>
              <div class="field">
                <span class="field-title">{{ $t('sa.studentPage.permissions') }} :</span>
                <span class="field-subtitle">{{ $t('sa.studentPage.readPermissions') }} :</span>
                <div class="row list-chip-row">
                  <div class="col" v-for="perm in currentStudent.permissions.read" :key="perm.id">
                    <div class="list-chip green darken-2"><i class="material-icons action-icon" @click="removePerm('read', perm)" v-if="perm !== 'all' || perm === 'all' && currentStudent.userId !== user.userId && currentStudent.userId !== 12345678">close</i><i class="material-icons action-icon perm-locked" v-if="!isOctave && perm === 'all' || currentStudent.userId === user.userId && perm === 'all'">lock_outline</i><span @click="goToGroupPage(perm.id)">{{ perm.name }}</span></div>
                  </div>
                  <div class="col">
                    <div class="list-chip green darken-2" :class="{ 'waves-effect waves-light': !addReadPermForm.show }">
                      <i class="material-icons action-icon" @click="addReadPermForm.show = true" v-if="!addReadPermForm.show">add</i>
                      <i class="material-icons action-icon" @click="addReadPermForm.show = false" v-if="addReadPermForm.show && !addReadPermForm.perm">close</i><i class="material-icons action-icon" @click="addPerm('read')" v-if="addReadPermForm.show && addReadPermForm.perm">check</i><input type="text" class="list-chip-input" v-model="addReadPermForm.perm" v-if="addReadPermForm.show">
                    </div>
                  </div>
                </div>
                <span class="field-subtitle">{{ $t('sa.studentPage.writePermissions') }} :</span>
                <div class="row list-chip-row">
                  <div class="col" v-for="perm in currentStudent.permissions.write" :key="perm.id">
                    <div class="list-chip green darken-2"><i class="material-icons action-icon" @click="removePerm('write', perm)" v-if="perm !== 'all' || perm === 'all' && currentStudent.userId !== user.userId && currentStudent.userId !== 12345678">close</i><i class="material-icons action-icon perm-locked" v-if="!isOctave && perm === 'all' || currentStudent.userId === user.userId && perm === 'all'">lock_outline</i><span @click="goToGroupPage(perm.id)">{{ perm.name }}</span></div>
                  </div>
                  <div class="col">
                    <div class="list-chip green darken-2" :class="{ 'waves-effect waves-light': !addWritePermForm.show }">
                      <i class="material-icons action-icon" @click="addWritePermForm.show = true" v-if="!addWritePermForm.show">add</i>
                      <i class="material-icons action-icon" @click="addWritePermForm.show = false" v-if="addWritePermForm.show && !addWritePermForm.perm">close</i><i class="material-icons action-icon" @click="addPerm('write')" v-if="addWritePermForm.show && addWritePermForm.perm">check</i><input type="text" class="list-chip-input" v-model="addWritePermForm.perm" v-if="addWritePermForm.show">
                    </div>
                  </div>
                </div>
              </div>
              <div class="field">
                <span class="field-title">{{ $t('sa.studentPage.accountStatus') }} :</span>
                <b class="status green-text text-darken-4" v-if="currentStudent.status === 'verified'">{{ $t('sa.studentPage.accountVerified') }}<i class="material-icons left">check</i></b>
                <b class="status orange-text" v-if="currentStudent.status === 'pending'">{{ $t('sa.studentPage.accountPending') }}<i class="material-icons left">access_time</i></b>
                <b class="status red-text text-darken-3" v-if="currentStudent.status === 'banned'">{{ $t('sa.studentPage.accountBanned') }}<i class="material-icons left">gavel</i></b>
                <div class="row status-row">
                  <div class="col" v-if="currentStudent.status !== 'verified'">
                    <a class="btn-floating green waves-effect waves-light" @click="setStudentStatus('verified')" :disabled="$store.getters.studentHasPerm(currentStudent, 'write', 'all') && !isOctave || currentStudent.userId === user.userId"><i class="material-icons">check</i></a>
                  </div>
                  <div class="col" v-if="currentStudent.status !== 'pending'">
                    <a class="btn-floating orange waves-effect waves-light" @click="setStudentStatus('pending')" :disabled="$store.getters.studentHasPerm(currentStudent, 'write', 'all') && !isOctave || currentStudent.userId === user.userId"><i class="material-icons">access_time</i></a>
                  </div>
                  <div class="col" v-if="currentStudent.status !== 'banned'">
                    <a class="btn-floating red waves-effect waves-light" @click="setStudentStatus('banned')" :disabled="$store.getters.studentHasPerm(currentStudent, 'write', 'all') && !isOctave || currentStudent.userId === user.userId"><i class="material-icons">gavel</i></a>
                  </div>
                </div>
              </div>
              <a class="btn red darken-3 waves-effect waves-light" v-if="!deleteConfirm" @click="deleteConfirm = true" :disabled="$store.getters.studentHasPerm(currentStudent, 'write', 'all') && !isOctave  || currentStudent.userId === user.userId"><i class="material-icons left">delete</i>{{ $t('sa.studentPage.deleteStudentAccountButton') }}</a>
              <div v-else class="row delete-confirm-row">
                <div class="col">
                  <a class="btn-floating red darken-4 waves-effect waves-light" @click="deleteStudent()"><i class="material-icons left">check</i></a>
                </div>
                <div class="col">
                  <a class="btn-floating green darken-3 waves-effect waves-light" @click="deleteConfirm = false"><i class="material-icons left">close</i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="center">
          <a class="btn-floating btn-back black waves-effect waves-light" @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Spinner from '../../components/Spinner'
  export default {
    name: 'StudentPage',
    components: {
      Spinner
    },
    data() {
      return {
        loading: true,
        changeFirstnameForm: {
          show: false,
          firstname: null
        },
        changeLastnameForm: {
          show: false,
          lastname: null
        },
        addGroupForm: {
          show: false,
          group: null
        },
        changeUsernameForm: {
          show: false,
          username: null
        },
        addReadPermForm: {
          show: false,
          perm: null
        },
        addWritePermForm: {
          show: false,
          perm: null
        },
        deleteConfirm: false
      }
    },
    mounted() {
      this.$store.dispatch('admin/students/get', { studentId: this.$router.currentRoute.params.studentId }).then(() => {
        this.loading = false
        this.changeFirstnameForm.firstname = this.currentStudent.firstname
        this.changeLastnameForm.lastname = this.currentStudent.lastname
        this.changeUsernameForm.username = this.currentStudent.username
      })
    },
    computed: {
      currentStudent() {
        return this.$store.state.admin.students.current
      },
      user() {
        return this.$store.state.account.user
      },
      isOctave() {
        if (this.user.userId === 12345678) return true
        else return false
      },
      isManager() {
        var currentType = this.$router.currentRoute.params.type
        if (currentType === 'gestion-du-site' || currentType === 'website-management') return true
        else return false
      },
    },
    methods: {
      edit() {
        this.$store.dispatch('admin/students/edit', { studentId: this.currentStudent.userId, firstname: this.changeFirstnameForm.firstname, lastname: this.changeLastnameForm.lastname, username: this.changeUsernameForm.username }).then(() => {
          this.$store.dispatch('admin/students/get', { studentId: this.currentStudent.userId }).then(() => {
            this.changeFirstnameForm.show = false
            this.changeLastnameForm.show = false
            this.changeUsernameForm.show = false
          })
          this.$store.dispatch('account/get')
        })
      },
      addGroup() {
        this.$store.dispatch('websiteManagement/students/addToGroup', {
          studentId: this.currentStudent.userId,
          group: this.addGroupForm.group
        }).then(() => {
          this.addGroupForm.show = false
          this.addGroupForm.group = null
          this.$store.dispatch('admin/students/get', { studentId: this.currentStudent.userId })
        }).catch(() => {
          this.addGroupForm.group = null
          this.addGroupForm.show = false
        })
      },
      removeFromGroup(groupId) {
        this.$store.dispatch('websiteManagement/students/removeFromGroup', {
          studentId: this.currentStudent.userId,
          groupId: groupId
        }).then(() => {
          this.$store.dispatch('admin/students/get', { studentId: this.currentStudent.userId })
        })
      },
      goToGroupPage(groupId) {
        if(this.isManager) {
          this.$router.push({ path: '/' + this.$t('links.sa.websiteManagement.groupPage') + '/' + groupId })
        }
      },
      addPerm(type) {
        if (type === 'read') {
          var permission = this.addReadPermForm.perm
        } else if (type === 'write') {
          var permission = this.addWritePermForm.perm
        }
        this.$store.dispatch('websiteManagement/students/addPermission', {
          studentId: this.currentStudent.userId,
          type: type,
          permission: permission
        }).then(() => {
          if (type === 'read') {
            this.addReadPermForm.perm = null
            this.addReadPermForm.show = false
          } else if (type === 'write') {
            this.addWritePermForm.perm = null
            this.addWritePermForm.show = false
          }
          this.$store.dispatch('admin/students/get', { studentId: this.currentStudent.userId })
        })
      },
      removePerm(type, perm) {
        this.$store.dispatch('websiteManagement/students/removePermission', {
          studentId: this.currentStudent.userId,
          type: type,
          permission: perm.id
        }).then(() => {
          this.$store.dispatch('admin/students/get', { studentId: this.currentStudent.userId })
        })
      },
      setStudentStatus(status) {
        this.$store.dispatch('admin/students/edit', {
          studentId: this.currentStudent.userId,
          status: status
        }).then(() => {
          this.$store.dispatch('admin/students/get', { studentId: this.currentStudent.userId }).then(() => {
            this.changeFirstnameForm.show = false
            this.changeLastnameForm.show = false
            this.changeUsernameForm.show = false
          })
        })
      },
      deleteStudent() {
        if (this.user.userId === this.currentStudent.userId) {
          setTimeout(() => {
            this.deleteConfirm = false
          }, 3000)
          return
        }
        this.$store.dispatch('admin/students/delete', {
          studentId: this.currentStudent.userId
        }).then(() => {
          this.$router.push('/' + this.$t('links.sa.websiteManagement.main'))
          M.toast({
            html: this.$t('sa.studentPage.studentAccountDeleted')
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

.card {
  display: inline-flex;
  margin-top: 5%;
  border-radius: 25px;
  box-shadow: 1px 1px 3px #757575;
  -webkit-transition: 0.3s ease;
  transition: 0.3s ease;
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

p
{
  font-size: 1.3rem;
}

.row:not(.regular-row) {
  margin-bottom: 0;
}

.col.s8 {
  padding: 0;
}

.status {
  display: block;
  font-weight: 800;
  font-size: 1.2rem;
}

.status-row {
  margin-top: 20px;
}

.action-icon {
  color: #000;
  cursor: pointer;
  font-size: 1.6rem;
  padding: 1px;
}

.perm-locked {
  cursor: not-allowed
}

.delete-confirm-row {
  margin-top: 15px;
}

.btn {
  margin-top: 15px;
}
</style>