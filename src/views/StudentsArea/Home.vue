<template>
  <div id="students-area">
    <div class="row">
      <div class="container">
        <div class="center">
          <h1>{{ $t('sa.title') }}</h1>
        </div>
        <div class="row">
          <div class="col s12 m4 center">
            <h2>{{ $t('sa.today.title') }}</h2>
            <carousel :paginationEnabled="false" centerMode :perPage="1" navigationEnabled navigationPrevLabel="<i class='material-icons next-icon hide-on-small-only'>keyboard_arrow_left</i>" navigationNextLabel="<i class='material-icons next-icon hide-on-small-only'>keyboard_arrow_right</i>">
              <slide v-for="period in periods" :key="period.uid">
                <div class="card blue today-card waves-effect" @click="goToPeriodDetails(period.id)">
                  <div class="card-content">
                    <span class="c-title">{{ getPeriodTitle(period.type, period.subject) }}</span>
                    <span class="timespan-location">{{ getPeriodLocation(period.location) }}</span>
                    <span class="timespan-director">{{ getPeriodDirector(period.director) }}</span>
                    <div class="progress">
                      <div class="determinate blue darken-3" :style="'width:' + progress + '%'">
                        <span class="progress-time">{{ Math.round(progress) }} min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </slide>
            </carousel>
            <div class="row" v-if="loadingNews">
              <Spinner/>
            </div>
            <div class="row" v-else>
              <h2>{{ $t('sa.spotlightNews') }}</h2>
              <div class="card spotlight-card" :class="randomColor()">
                <div class="card-content">
                  <span class="card-title">{{ this.$store.state.class.news[0].title }}</span>
                  <p>{{ this.$store.state.class.news[0].content }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col s12 m5">
            <div class="row">
              <div class="col s12 m7 push-m1 center">
                <h2>{{ getNextDayDate(nextDays[currentNextDay].date) }}</h2>
              </div>
              <div class="col m2 push-m1 hide-on-small-only">
                <a class="btn-floating black waves-effect waves-light" @click="navigateDays('previous')" v-if="currentNextDay > 0"><i class="material-icons left">navigate_before</i></a>
              </div>
              <div class="col m2 push-m1 hide-on-small-only">
                <a class="btn-floating black waves-effect waves-light" @click="navigateDays('next')" v-if="currentNextDay < nextDays.length-1"><i class="material-icons right">navigate_next</i></a>
              </div>
            </div>
            <div class="center" v-if="!nextDays[currentNextDay].canceledCourses && !nextDays[currentNextDay].testsDsts && !nextDays[currentNextDay].homework">
              <p>{{ $t('sa.nothingPlanned') }}</p>
            </div>
            <div v-if="nextDays[currentNextDay].canceledCourses">
              <div class="center" v-for="canceledCourse in nextDays[currentNextDay].canceledCourses" :key="canceledCourse.id">
                <div class="card red darken-2 canceled-course">
                  <div class="card-content">
                    <span class="card-title">{{ getCanceledCourseTitle(canceledCourse.subject) }}</span>
                    <p>{{ canceledCourse.details }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="nextDays[currentNextDay].testsDsts">
              <div class="col s12 center" v-for="testDst in nextDays[currentNextDay].testsDsts" :key="testDst.id">
                <div class="card" :class="randomColor()">
                  <div class="card-content">
                    <span class="card-title">{{ getTestDSTTitle(testDst.type, testDst.subject) }}</span>
                    <p>{{ testDst.content }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="nextDays[currentNextDay].homework">
              <div class="col s12 center" v-for="homework in nextDays[currentNextDay].homework" :key="homework.id">
                <div class="card" :class="randomColor()">
                  <div class="card-content">
                    <span class="card-title">{{ getHomeworkTitle(homework.subject) }}</span>
                    <p>{{ homework.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col s12 m3 center">
            <div class="col s6 m12">
              <div class="card quite-black waves-effect waves-light others" @click="goToAll">
                <div class="card-content">
                  <span class="card-title">{{ $t('sa.seeAll') }}</span>
                </div>
              </div>
            </div>
            <div class="col s6 m12">
              <div class="card quite-black waves-effect waves-light others" @click="goToNews">
                <div class="card-content">
                  <span class="card-title deep-orange-text">{{ $t('sa.news.button') }}</span>
                </div>
              </div>
            </div>
            <div class="col s6 m12">
              <div class="card quite-black waves-effect waves-light others" @click="goToTimetable">
                <div class="card-content">
                  <span class="card-title yellow-text">{{ $t('sa.timetable') }}</span>
                </div>
              </div>
            </div>
            <div class="col s6 m12">
              <div class="card quite-black waves-effect waves-light others" @click="goToMyClass">
                <div class="card-content">
                  <span class="card-title blue-text">{{ $t('sa.myClass.title') }}</span>
                </div>
              </div>
            </div>
            <div class="col s6 m12">
              <div class="card quite-black waves-effect waves-light others" @click="goToMyAccount">
                <div class="card-content">
                  <span class="card-title teal-text">{{ $t('sa.myAccount.title') }}</span>
                </div>
              </div>
            </div>
            <div class="col s6 m12" v-if="hasPerm('write', user.groups[0].id)">
              <div class="card quite-black waves-effect waves-light others" @click="goToAdmin">
                <div class="card-content">
                  <span class="card-title" :class="randomTextColor()">{{ $t('sa.admin.button') }}</span>
                </div>
              </div>
            </div>
            <div class="col s6 m12" v-if="hasPerm('write', 1)">
              <div class="card quite-black waves-effect waves-light others" @click="goToWebsiteManagement">
                <div class="card-content">
                  <span class="card-title" :class="randomTextColor()">{{ $t('sa.websiteManagement.button') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '../../components/Spinner'
import colors from '../../strings/colors'
import textColors from '../../strings/textColors'
import periodTypes from '../../strings/periodTypes'
import locations from '../../strings/locations'
import directors from '../../strings/directors'
import types from '../../strings/types'
import subjects from '../../strings/subjects'
export default {
  name: 'StudentsArea',
  components: {
    Spinner
  },
  data() {
    return {
      loadingNews: true,
      currentNextDay: 0
    }
  },
  mounted() {
    this.$store.dispatch('account/get')
  },
  computed: {
    user() {
      return this.$store.state.account.user
    },
    progress() {
      return this.$store.state.diary.today.progress
    },
    periods() {
      return this.$store.state.diary.today.periods
    },
    nextDays() {
      return this.$store.state.diary.nextDays
    },
    currentDate() {
      var date = new Date
      var year = date.getFullYear().toString()
      var month = (date.getMonth() + 1).toString()
      var day = date.getDate().toString()
      return new Date(`${year}-${month}-${day}`);
    }
  },
  methods: {
    randomColor() {
      return colors[Math.floor(Math.random() * colors.length)]
    },
    randomTextColor() {
      return textColors[Math.floor(Math.random() * textColors.length)]
    },
    hasPerm(type, perm) {
      return this.$store.getters.hasPerm(type, perm)
    },
    getPeriodTitle(typeId, subjectId) {
      var type = this.$t(periodTypes.find(currentType => typeId === currentType.id).stringCode)
      var subject = this.$t(subjects.find(currentSubject => subjectId === currentSubject.id).stringCode)
      var subFL = subject.slice(0, 1)
      var preposition
      if (subFL === 'a' || subFL === 'e' || subFL === 'i' || subFL === 'h') {
        preposition = "d'"
      } else {
        preposition = "de "
      }
      return this.$t('sa.periodTitle', {
        type: type,
        preposition: preposition,
        subject: subject
      })
    },
    getPeriodLocation(locationId) {
      return locations.find(currentLocation => locationId === currentLocation.id).name
    },
    getPeriodDirector(directorId) {
      var director = directors.find(currentDirector => directorId === currentDirector.id)
      var gender
      if (director.gender === 1) gender = this.$t('sa.directors.nonBinary')
      else if (director.gender === 2) gender = this.$t('sa.directors.female')
      else if (director.gender === 3) gender = this.$t('sa.directors.male')
      return gender + " " + director.name
    },
    goToPeriodDetails(id) {
      this.$router.push('/' + this.$t('links.sa.today') + '/' + id)
    },
    getHomeworkTitle(subjectId) {
      var subject = this.$t(subjects.find(currentSubject => subjectId === currentSubject.id).stringCode)
      var subFL = subject.slice(0, 1)
      var preposition
      if (subFL === 'a' || subFL === 'e' || subFL === 'i' || subFL === 'h') {
        preposition = "d'"
      }
      else {
        preposition = "de "
      }
      return this.$t('sa.homework', {
        preposition: preposition,
        subject: subject
      })
    },
    goToTomorrowDetails() {
      setTimeout(() => {
        // this.$router.push({ path: '/tomorrow/details' })
      }, 400);
    },
    getNextDayDate(date) {
      var year = parseInt("20" + date.toString().slice(0, 2))
      var month = parseInt(date.toString().slice(2, 4))
      var day = parseInt(date.toString().slice(4, 6))
      var date = new Date(`${year}-${month}-${day}`)
      var today = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
      var date1_tomorrow = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate() - 1);
      var date1_after_tomorrow = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate() - 2);
      if (date1_tomorrow.getFullYear() == today.getFullYear() && date1_tomorrow.getMonth() == today.getMonth() && date1_tomorrow.getDate() == today.getDate()) {
        return this.$t('sa.forDay', {
          day: this.$t('sa.tomorrow')
        })
      } else {
        if (date1_after_tomorrow.getFullYear() == today.getFullYear() && date1_after_tomorrow.getMonth() == today.getMonth() && date1_after_tomorrow.getDate() == today.getDate()) {
          return this.$t('sa.forDay', {
            day: this.$t('sa.afterTomorrow')
          })
        } else {
          var spliceNum1 = 0
          var spliceNum2 = 1
          if (navigator.language.split('-')[0] === "en") {
            spliceNum1 = 1
            spliceNum2 = 2
          }
          var day = this.$d(date, 'long').split(' ').splice(spliceNum1, spliceNum2)
          if (navigator.language.split('-')[0] === "en") day = day.toString().toLowerCase()
          return this.$t('sa.forDay', {
            day: day
          })
        }
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
    },
    navigateDays(nav) {
      if (nav === "next") {
        this.currentNextDay += 1
      } else if (nav === "previous") {
        this.currentNextDay -= 1
      }
    },
    goToAll() {
      this.$router.push({
        path: '/' + this.$t('links.sa.all')
      })
    },
    goToNews() {
      this.$router.push({
        path: '/' + this.$t('links.sa.news')
      })
    },
    goToTimetable() {
      this.$router.push({
        path: '/' + this.$t('links.sa.timetable')
      })
    },
    goToMyClass() {
      this.$router.push({
        path: '/' + this.$t('links.sa.myClass')
      })
    },
    goToMyAccount() {
      this.$router.push({
        path: '/' + this.$t('links.sa.myAccount')
      })
    },
    goToAdmin() {
      this.$router.push({
        path: '/' + this.$t('links.sa.admin.main')
      })
    },
    goToWebsiteManagement() {
      this.$router.push({
        path: '/' + this.$t('links.sa.websiteManagement.main')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  margin-top: 20px;
  margin-bottom: 5px;
}

h2 {
  font-size: 1.9rem;
}

.today-card {

  text-align: center;
  cursor: pointer;

  .card-content {
    padding-bottom: 0;

    .c-title {
      display: block;
      font-size: 2rem;
      font-weight: 600;
    }

    .c-title::first-letter {
      text-transform: capitalize;
    }

    .timespan-location {
      color: #bdbdbd;
      font-size: 1.4rem;
      font-weight: 500;
    }

    .timespan-director {
      margin-left: 10px;
      color: #424242;
      font-size: 1.1rem;
    }

    .progress {
      border-radius: 12px;
      height: 26px;

      .progress-time
      {
        margin: 2px;
        font-size: 0.8rem;
      }
    }
  }
}

.col.s12>.card {
  display: inline-flex;
}

.card {
  margin-top: 10px;
}

.card-content {
  padding: 20px;
}

.card-title {
  color: #000;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
}

.card-title::first-letter {
  text-transform: capitalize;
}

.card.yellow,
.card.amber,
.card.lime {
  color: #757575;
}

p {
  font-size: 1.3rem;
}

.spotlight-card
{
  margin-top: 20px;
}

.others>.card-content {
  padding: 15px;
}

.others>.card-content>.card-title {
  margin-bottom: 0 !important;
  cursor: pointer;
  color: #fff;
  font-weight: 400;
}

.btn-floating {
  margin-top: 12px;
}

.btn {
  margin: 15px 0 15px 0;
}

@media only screen and (max-width: 600px) {
  .others>.card-content>.card-title {
    font-size: 1.4rem;
  }

  .others>.card-content {
    padding: 12px;
  }
}

.canceled-course {
  display: inline-flex;
}

.canceled-course>.card-content {
  padding: 12px;
}

.canceled-course>.card-content>span {
  font-size: 1.2rem;
  margin: 0;
}

.canceled-course>.card-content>p {
  font-size: 1.1rem;
}

.material-icons.tiny {
  margin-right: 5px;
}
</style>