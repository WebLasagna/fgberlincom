<template>
  <div id="today">
    <div class="row">
      <carousel class="center" :navigateTo="[periodSlideIndex, false]" :paginationEnabled="false" centerMode :perPage="1" navigationEnabled navigationPrevLabel="<i class='material-icons large white-text hide-on-small-only'>keyboard_arrow_left</i>" navigationNextLabel="<i class='material-icons large white-text hide-on-small-only'>keyboard_arrow_right</i>">
        <slide v-for="period in periods" :key="period.id" @pageChange="handlePageChange">
          <div class="center">
            <div class="col s8 push-s2">
              <h1>{{ getPeriodTitle(period.type, period.subject) }}</h1>
              <span class="timespan-location">{{ getPeriodLocation(period.location) }}</span>
              <span class="timespan-director">{{ getPeriodDirector(period.director) }}</span>
              <div class="progress">
                <div class="determinate blue darken-3" :style="'width:' + $store.state.today.progress + '%'">
                  <span class="progress-count">{{ Math.round($store.state.today.progress) }} min</span>
                </div>
              </div>
            </div>
          </div>
        </slide>
      </carousel>
      <div class="center">
        <router-link :to="'/' + $t('links.sa.main')" class="btn-floating btn-back black waves-effect waves-light"><i class="material-icons">arrow_back</i></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import periodTypes from '../../strings/periodTypes'
import subjects from '../../strings/subjects'
import locations from '../../strings/locations'
import directors from '../../strings/directors'
export default {
  name: 'Today',
  computed: {
    periods() {
      return this.$store.state.today.periods
    },
    period() {
      return this.periods.find(period => {
        return period.id === parseInt(this.$router.currentRoute.params.periodId)
      })
    },
    handlePageChange(val) {
      
    },
    periodSlideIndex() {
      return this.$store.state.today.periods.indexOf(this.period)
    }
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 5rem;
  font-weight: 600;
}

h1::first-letter {
  text-transform: capitalize;
}

.timespan-location {
  display: block;
  color: #bdbdbd;
  font-size: 2.8rem;
  font-weight: 500;
}

.timespan-director {
  display: block;
  margin-left: 20px;
  color: #9e9e9e;
  font-size: 2.3rem;
}

.progress {
  border-radius: 17px;
  height: 35px;

  .progress-count {
    font-size: 1.5rem;
    font-weight: 500;
  }
}

.btn-floating {
  margin-top: 40px;
}
</style>