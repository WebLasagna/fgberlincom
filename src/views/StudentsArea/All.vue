<template>
  <div id="all">
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col s12 m4 center">
            <h2>{{ $t('sa.all.testsDsts') }}</h2>
            <div v-if="loading">
              <Spinner />
            </div>
            <transition name="fade" mode="out-in">
              <div v-if="!loading">
                <div class="chip-no-content" v-if="!all[0]">
                  <h3>{{ $t('sa.all.noTestsDsts') }}</h3>
                </div>
                <div v-else v-for="testDst in all[0].testDsts" :key="testDst.id">
                  <span v-if="checkDateDisplay('td', testDst.id)" class="date">{{ $d(getDate(testDst.date), 'long') }}</span>
                  <br>
                  <div class="card" :class="randomColor()">
                    <div class="card-content">
                      <span class="card-title">{{ getTestDSTTitle(testDst.type, testDst.subject) }}</span>
                      <p>{{ testDst.content }}</p>
                    </div>
                  </div>
                </div>
                <div class="center" v-if="hasAddPerm">
                  <router-link class="btn-floating btn-large black waves-effect waves-light" :to="'/' + $t('links.sa.addTestDst')"><i class="material-icons large">add</i></router-link>
                </div>
              </div>
            </transition>
          </div>
          <div class="col s12 m4 center">
            <h2>{{ $t('sa.all.homework') }}</h2>
            <div v-if="loading">
              <Spinner />
            </div>
            <transition name="fade" mode="out-in">
              <div v-if="!loading">
                <div class="chip-no-content" v-if="!all[1]">
                  <h3>{{ $t('sa.all.noHomework') }}</h3>
                </div>
                <div v-else v-for="homework in all[1].homework" :key="homework.id">
                  <span class="date">{{ $d(getDate(homework.date), 'long') }}</span>
                  <div class="card" :class="randomColor()">
                    <div class="card-content">
                      <span class="card-title">{{ getHomeworkTitle(homework.subject) }}</span>
                      <p>{{ homework.content }}</p>
                    </div>
                  </div>
                </div>
                <div class="center" v-if="hasAddPerm">
                  <router-link class="btn-floating btn-large black waves-effect waves-light" :to="'/' + $t('links.sa.addHomework')"><i class="material-icons large">add</i></router-link>
                </div>
              </div>
            </transition>
          </div>
          <div class="col s12 m4 center">
            <h2>{{ $t('sa.all.canceledCourses') }}</h2>
            <div v-if="loading">
              <Spinner />
            </div>
            <transition name="fade" mode="out-in">
              <div v-if="!loading">
                <div class="chip-no-content" v-if="!all[2]">
                  <h3>{{ $t('sa.all.noCanceledCourses') }}</h3>
                </div>
                <div v-else v-for="deletedCourse in all[2].deletedCourse" :key="deletedCourse.id">
                  <span class="date">{{ $d(getDate(deletedCourse.date), 'long') }}</span>
                  <div class="card" :class="randomColor()">
                    <div class="card-content">
                      <span class="card-title">{{ getCanceledCourseTitle(deletedCourse.subject) }}</span>
                      <p>{{ deletedCourse.details }}</p>
                    </div>
                  </div>
                </div>
                <div class="center" v-if="hasAddPerm">
                  <router-link class="btn-floating btn-large black waves-effect waves-light" :to="'/' + $t('links.sa.addCanceledCourse')"><i class="material-icons large">add</i></router-link>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="center">
          <router-link class="btn-floating btn-back black waves-effect waves-light" :to="'/' + $t('links.sa.main')"><i class="material-icons">arrow_back</i></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "../../components/Spinner"
import colors from "../../strings/colors"
import types from "../../strings/types"
import subjects from "../../strings/subjects"
export default {
  name: 'All',
  components: {
    Spinner
  },
  mounted() {
    this.$store.dispatch('getAll').then(() => {
      this.loading = false
    })
  },
  data() {
    return {
      loading: true
    }
  },
  methods: {
    randomColor() {
      return colors[Math.floor(Math.random() * colors.length)]
    },
    getDate(date) {
      var year = parseInt("20" + date.toString().slice(0, 2))
      var month = parseInt(date.toString().slice(2, 4)) - 1
      var day = parseInt(date.toString().slice(4, 6))
      return new Date(year, month, day);
    },
    checkDateDisplay(type, id) {
      if (type === "td") {
        var testDsts = this.all[0]
        var testDst = testDsts.find(td => td.id === id)
        if (testDst) {
          if (testDst.date === testDst.date) return false
          else return true
        } else return true
      }
    },
    getCanceledCourseTitle(subject) {
      var subject = this.$t(subjects.find(currentSubject => currentSubject.id === subject).stringCode)
      var subFL = subject.slice(0, 1)
      var preposition
      if (subFL === 'a' || subFL === 'e' || subFL === 'i' || subFL === 'h') {
        preposition = "d'"
      } else {
        preposition = "de "
      }
      return this.$t('sa.canceledCourse', {
        preposition: preposition,
        subject: subject
      })
    },
    getTestDSTTitle(type, subject) {
      var type = this.$t(types.find(currentType => currentType.id === type).stringCode)
      var subject = this.$t(subjects.find(currentSubject => currentSubject.id === subject).stringCode)
      var subFL = subject.slice(0, 1)
      var preposition
      if (subFL === 'a' || subFL === 'e' || subFL === 'i' || subFL === 'h') {
        preposition = "d'"
      } else {
        preposition = "de "
      }
      return this.$t('sa.testDst', {
        type: type,
        preposition: preposition,
        subject: subject
      })
    },
    getHomeworkTitle(subject) {
      var subject = this.$t(subjects.find(currentSubject => currentSubject.id === subject).stringCode)
      var subFL = subject.slice(0, 1)
      var preposition
      if (subFL === 'a' || subFL === 'e' || subFL === 'i' || subFL === 'h') {
        preposition = "d'"
      } else {
        preposition = "de "
      }
      return this.$t('sa.homework', {
        preposition: preposition,
        subject: subject
      })
    }
  },
  computed: {
    testDsts() {
      this.$store.state.all.forEach(group => {

      })
    },
    hasAddPerm() {
      return this.$store.getters.hasPerm('read', this.$store.state.user.class)
    }
  }
}
</script>

<style scoped>
.row {
  margin-top: 30px;
}

h2 {
  font-size: 1.9rem;
  font-weight: 600;
}

.chip-no-content {
  display: inline-flex;
  color: #fff;
  margin: 10px 0 8px 0;
  padding: 9px;
  box-shadow: 1px 1px 3px #424242;
  border-radius: 25px;
  background-color: #23272A;
  width: fit-content;
}

.chip-no-content>h3 {
  margin: 0;
  font-size: 1rem;
}

.date {
  font-size: 1.2rem;
  font-weight: 500;
}

*::first-letter {
  text-transform: uppercase;
}

.material-icons::first-letter {
  text-transform: none;
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

.card-title {
  color: #000;
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
}

.card.yellow,
.card.amber,
.card.lime {
  color: #757575;
}

p {
  font-size: 1.3rem;
}

.btn-large i {
  font-size: 2rem;
}

.btn-floating.btn-large {
  margin-top: 20px;
}
</style>