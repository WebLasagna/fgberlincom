<template>
  <div id="my-class">
    <div class="row">
      <div class="container">
        <div class="center">
          <h1>{{ $t('sa.myClass.title') }}</h1>
          <div v-if="loading">
            <Spinner />
          </div>
        </div>
        <transition name="fade" mode="out-in">
          <div v-if="!loading">
            <div class="row">
              <div class="col s3 m2" v-for="student in students" :key="student.userId">
                <div class="student-chip" :class="[randomTextColor(), { 'waves-effect waves-light student-chip-link': isAdmin }]" @click="goToStudentPage(student.userId)">{{ student.firstname }}</div>
              </div>
            </div>
            <div class="center">
              <div class="chip-title">
                <h2>{{ $t('sa.myClass.registeredStudents', { studentsCount: students.length }) }}</h2>
              </div>
              <p>{{ $t('sa.myClass.advertise') }}</p>
            </div>
          </div>
        </transition>
        <div class="center">
          <router-link class="btn-floating btn-back black waves-effect waves-light" :to="'/' + $t('links.sa.main')"><i class="material-icons left">arrow_back</i></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '../../components/Spinner'
import textColors from '../../strings/textColors'
export default {
  name: 'MyClass',
  components: {
    Spinner
  },
  mounted() {
    this.$store.dispatch('groups/get', { groupId: this.$store.state.account.user.groups[0].id }).then(() => {
      this.loading = false
    })
  },
  computed: {
    isAdmin() {
      return this.$store.getters.hasPerm('write', this.$store.state.account.user.groups[0].id)
    },
    students() {
      return this.$store.state.groups.current.members
    }
  },
  data() {
    return {
      loading: true
    }
  },
  methods: {
    randomTextColor() {
      return textColors[Math.floor(Math.random() * textColors.length)]
    },
    goToStudentPage(userId) {
      if (this.isAdmin) {
        this.$router.push({
          path: '/' + this.$t('links.sa.websiteManagement.studentPage') + '/' + userId
        })
      }
    },
  }
}
</script>

<style scoped>
.student-chip {
  font-size: 1.3rem;
  font-weight: 600;
  padding: 5px 8px 5px 8px;
}

h2 {
  margin: 0;
  font-size: 1.6rem;
}

p {
  font-size: 1.2rem;
}

.row {
  margin-bottom: 20px;
}

.chip-title {
  display: inline-flex;
  margin-top: 30px;
  padding: 12px 20px 12px 20px;
  box-shadow: 1px 1px 3px #424242;
  border-radius: 25px;
  background-color: #23272A;
  width: fit-content;
  -webkit-transition: 0.3s ease;
  transition: 0.3s ease;
}

.chip-title:hover {
  color: #2196F3;
}
</style>