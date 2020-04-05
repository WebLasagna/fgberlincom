<template>
  <div class="home">
    <div class="row" v-if="!$store.state.open">
      <div class="container website-closed">
        <h1>FGBerlin<span @click="$store.state.open = true">.</span>com</h1>
        <h2>{{ $t('home.soon') }}</h2>
        <span class="made-by-octave" @click="openOctave">Made with 🧡 by Octave</span>
      </div>
      <LocalePicker class="locale-picker" style="position: fixed; bottom: 0 !important;" />
    </div>
    <div class="row" v-else>
      <div class="container">
        <div class="center">
          <h1>{{ $t('home.title') }}</h1>
        </div>
        <div class="row">
          <div class="col s12 m6">
            <div class="card blue darken-1" :class="{ popall: showPopAll }" @click="goToSA" v-if="$store.state.ssid">
              <div class="card-content" v-if="!showPopAll">
                <span class="card-title">{{ $t('home.mySA') }}</span>
                <p v-html="getTomorrowRecap()"></p>
                <div class="center">
                  <div class="btn-round blue darken-3 waves-effect waves-light">{{ $t('home.SAMoreAbout') }}</div>
                </div>
              </div>
              <div class="card-content popall-card-content" v-else></div>
            </div>
            <div class="card blue waves-effect waves-light" @click="goToRegister" v-if="!$store.state.ssid">
              <div class="card-content">
                <span class="card-title">{{ $t('home.SA') }}</span>
                <p>{{ $t('home.SADescription') }}</p>
                <div class="center">
                  <div class="btn-round blue darken-2 waves-effect waves-light">let's go</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col s12 m6">
            <div class="card red waves-effect waves-light" @click="goToClassRequest">
              <div class="card-content">
                <span class="card-title">We need you!</span>
                <p>{{ $t('home.hireText') }}</p>
                <div class="center">
                  <div class="btn-round red darken-2 waves-effect waves-light">{{ $t('home.hireButton') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="center">
            <h2>{{ $t('home.presentationTitle') }}</h2>
          </div>
          <p v-html="$t('home.presentationText')"></p>
          <p v-html="$t('home.presentationText2')"></p>
          <div class="center presentation">
            <p>{{ $t('home.presentationText3') }}</p>
            <i18n path="home.presentationText4" tag="p">
              <router-link :to="'/' + $t('links.project.main')">{{ $t('home.presentationLinks.project') }}</router-link>
              <router-link :to="'/' + $t('links.news')">{{ $t('home.presentationLinks.news') }}</router-link>
            </i18n>
          </div>
          <div class="row">
            <div class="col s6 center">
              <router-link :to="'/' + $t('links.conditions')">{{ $t('home.conditions') }}</router-link>
            </div>
            <div class="col s6 center">
              <router-link :to="'/' + $t('links.conditions')">{{ $t('home.privacy') }}</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="locale-picker">
        <div class="left col s12 m3 l2">
          <LocalePicker />
        </div>
      </div>
      <div class="made-by-octave">
        <span @click="openOctave">Made with 🧡 by Octave</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.website-closed {
  margin-top: 100px;
  text-align: center;

  h1 {
    font-size: 3.2rem;
    color: #4caf50;
  }

  h2 {
    font-size: 2.3rem;
    margin-bottom: 50px;
  }

  .made-by-octave {
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 700;
    color: #ff9800;
  }
}

.row {
  margin-top: 40px;
}

h1 {
  margin: 10px;
}

h2 {
  font-size: 1.8rem;
  font-weight: 500;
}

p {
  font-size: 1.1rem;
  margin: 7px 0 7px 0;
}

a {
  font-weight: 700;
}

.card {
  width: 80%;
  margin: 10px 10% 10px 10%;
  border-radius: 25px;
  box-shadow: 1px 1px 3px #757575;
}

.popall-card-content {
  height: 180px !important;
  padding: 24px;
}

.card:hover {
  box-shadow: 3px 3px 3px #616161;
  cursor: pointer;
}

.card-title {
  color: #000;
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;
}

.btn-round {
  display: inline-flex;
  border-radius: 25px;
  padding: 6px 9px 6px 9px;
  margin-top: 10px;
  text-transform: uppercase;
}

.presentation {
  margin-top: 40px;
}

.made-by-octave {
  cursor: pointer;
  color: #ff9800;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 40px 10px 5px;
  text-align: right;
}
</style>

<script>
import LocalePicker from '../components/LocalePicker'
export default {
  name: 'Home',
  components: {
    LocalePicker
  },
  data() {
    return {
      showPopAll: false
    }
  },
  methods: {
    getTomorrowRecap() {
      if (this.nextDays[0].testsDsts || this.nextDays[0].homework) {
        var testsDsts
        var homework
        if (this.nextDays[0].testsDsts) {
          if (this.nextDays[0].testsDsts.length === 1) {
            var TDSingularOrPlural = "testDst";
          } else {
            var TDSingularOrPlural = "testsDsts"
          }
          testsDsts = this.$t('home.mySATomorrow.testsDstsDisplay', {
            testDstCount: this.nextDays[0].testsDsts.length,
            testDstSoP: this.$t('home.mySATomorrow.' + TDSingularOrPlural)
          })
        }
        if (this.nextDays[0].homework) {
          if (this.nextDays[0].homework.length === 1) {
            var HSingularOrPlural = "homeworkSingular";
          } else {
            var HSingularOrPlural = "homeworkPlurlal"
          }
          homework = this.$t('home.mySATomorrow.homeworkDisplay', {
            homeworkCount: this.nextDays[0].homework.length,
            homeworkSoP: this.$t('home.mySATomorrow.' + HSingularOrPlural)
          })
        }
        if (this.nextDays[0].testsDsts && this.nextDays[0].homework) {
          return this.$t('home.mySATomorrow.displayAll', {
            testsDstsDisplay: testsDsts,
            homeworkDisplay: homework
          })
        }
      } else {
        return this.$t('home.mySATomorrow.nothingPlanned')
      }
    },
    goToRegister() {
      this.$router.push({
        path: '/' + this.$t('links.sa.register')
      })
    },
    goToSA() {
      if(this.$store.state.theme === 'dark') {
        this.showPopAll = true
        setTimeout(() => {
          this.$router.push({
            path: '/' + this.$t('links.sa.main')
          })
        }, 400)
      }
      else if(this.$store.state.theme === 'light') {
        this.$router.push({
          path: '/' + this.$t('links.sa.main')
        })
      }
    },
    goToClassRequest() {
      this.$router.push({
        path: '/' + this.$t('links.project.main') + '/' + this.$t('links.project.hyped')
      })
    },
    openOctave() {
      window.open('https://lasagna.cf')
    }
  },
  computed: {
    nextDays() {
      return this.$store.state.diary.nextDays
    }
  }
}
</script>