<template>
  <div id="admin">
    <div class="row">
      <div class="container">
        <div class="center">
          <h1>{{ $t('sa.admin.title', { class: user.groups[0].displayName }) }}</h1>
        </div>
        <p>{{ $t('sa.admin.intro') }}</p>
        <div class="card blue">
          <div class="card-content" v-if="!showManual">
            <span class="card-title">{{ $t('sa.admin.theGuidebook') }}</span>
            <p>Bienvenue dans l'équipe de <b>FGBerlin.com</b> ! Pour bien comprendre le boulot d'un admin, hésite pas à lire le guide rt à poser des questions sur le groupe WhatsApp.</p>
            <p>Écrit par <b>Octave</b>.</p>
            <a class="btn blue darken-2 waves-effect waves-light" @click="showManual = true">lire</a>
          </div>
          <div class="card-content" v-if="showManual">
            <span class="card-title">Le guide<i class="material-icons right" @click="showManual = false">close</i></span>
            <p>Bienvenue dans l'équipe de <b>FGBerlin.com</b> !</p>
            <p>Ce site a pour but d'aider les élèves du lycée. Pour l'instant, l'objectif du projet est d'avoir une page mise à jour tous les jours donnant accès à chaque élève aux actualités, à l'emploi du temps, aux tests et DSTs, aux cours annulés et aux devoirs de sa classe.</p>
            <p>Notre équipe de développeurs a donc créé <b class="orange-text">l'espace élèves</b>. L'espace élèves, que t'utilises actuellement, donne la possibilité à chaque élève des classes disponibles sur le site de se créer un compte et d'accéder à toutes ces informations.</p>
            <p>C'est là que t'entres en jeu. T'es <b class="purple-text">responsable de ta classe</b>, ce qui veut dire que tu dois actualiser l'espace élèves de ta classe <b class="yellow-text">tous les jours</b>. Tu dois aussi gérer les comptes élèves de ta classe. Pour ajouter des infos sur l'espace élèves de ta classe, il faut utiliser le bouton <i class="material-icons tiny">add</i> que tu retrouveras sur les pages <b class="black-text">Voir tout</b> et <b class="black-text">Actualités</b>.</p>
            <p>Aussi, pour que le projet prenne de l'ampleur, il faut que plus d'élèves du lycée le connaissent. Tu peux aider à ça en faisant de la pub autour de toi. Par exemple, si ta classe a un <b class="green-text text-accent-3">groupe WhatsApp</b>, tu peux envoyer un message pour présenter le site et un petit message de rappel de temps en temps.</p>
            <p>Si t'as des questions, hésite pas à les poser dans le groupe WhatsApp du projet !</p>
            <p><b class="orange-text">Octave</b>, créateur du site.</p>
          </div>
        </div>
        <a class="btn-large green waves-effect waves-light" href="https://chat.whatsapp.com/LbmjwcVctK8220bEZ9tOFY" target="_blank"><i class="material-icons left">open_in_new</i>{{ $t('sa.admin.whatsappGroup') }}</a>
        <h2>{{ $t('sa.admin.studentAccounts') }}</h2>
        <div class="center" v-if="loading">
          <Spinner />
        </div>
        <div class="row" v-if="!loading">
          <div class="col s12 m3" v-for="student in students" :key="student.userId">
            <div class="student-chip waves-effect waves-light tdrotate" :class="{ 'green-text': student.status === 'verified', 'orange-text': student.status === 'pending', 'red-text': student.status === 'banned' }" @click="goToStudentPage(student.userId)">{{ student.firstname }} {{ student.lastname }}</div>
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
import Spinner from '../../components/Spinner'
export default {
  name: 'Admin',
  components: {
    Spinner
  },
  mounted() {
    this.$store.dispatch('admin/students/getAll').then(() => {
      this.loading = false
    })
  },
  computed: {
    user() {
      return this.$store.state.account.user
    },
    students() {
      return this.$store.state.admin.students.all
    }
  },
  data() {
    return {
      showManual: false,
      loading: true
    }
  },
  methods: {
    goToStudentPage(userId) {
      this.$router.push({
        path: '/' + this.$t('links.sa.admin.studentPage') + '/' + userId
      })
    }
  }
}
</script>

<style scoped>
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

p {
  font-size: 1.1rem;
}

.material-icons.right {
  cursor: pointer;
}

a.btn {
  margin-top: 10px;
}

.btn-large {
  margin-top: 15px;
}

.student-chip {
  display: inline-flex;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: #23272A;
  border-radius: 25px;
  padding: 5px 8px 5px 8px;
  margin-top: 10px;
  -webkit-transition: .3s ease-out;
  transition: .3s ease-out;
}

.student-chip:hover {
  box-shadow: 1px 1px 3px #757575;
}

h2 {
  margin-top: 40px;
}
</style>