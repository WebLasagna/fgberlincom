<template>
  <div id="news">
    <div class="row">
      <div class="container">
        <div class="center">
          <h1>{{ $t('news.title') }}</h1>
        </div>
        <div v-if="loading">
          <div class="center">
            <Spinner />
          </div>
        </div>
        <div v-if="!loading">
          <div class="row">
            <div class="col s12 m6">
              <div class="center">
                <h2 class="green-text">{{ $t('news.websiteNewsTitle') }}</h2>
              </div>
              <div class="center" v-if="!addWebsiteNewsForm.show">
                <div v-if="!websiteNews.length">
                  <p>{{ $t('news.noNews') }}</p>
                </div>
                <div class="row" v-if="websiteNews.length">
                  <div v-for="post in websiteNews" :key="post.title">
                    <div class="card green">
                      <div class="card-content">
                        <span class="card-title">{{ post.title }}</span>
                        <p>
                          <span v-if="!editSummaryForm.show || editSummaryForm.id !== post.id">{{ post.summary }}</span>
                          <textarea class="materialize-textarea edit-input" type="text" v-model="editSummaryForm.summary" v-if="editSummaryForm.show && editSummaryForm.id === post.id"></textarea>
                          <i class="material-icons action-icon" @click="toggleEditSummaryForm(post.id)" v-if="!editSummaryForm.show || editSummaryForm.id !== post.id">edit</i>
                          <i class="material-icons action-icon" @click="editSummaryForm.show = false" v-if="editSummaryForm.summary === post.summary && editSummaryForm.show">close</i>
                          <i class="material-icons action-icon" @click="editSummary(post.id)" v-if="editSummaryForm.summary !== post.summary && editSummaryForm.show  && editSummaryForm.id === post.id">check</i>
                        </p>
                        <router-link class="btn green darken-2 waves-effect waves-light" :to="'/' + $t('links.news') + '/' + post.link">{{ $t('news.moreButton') }}</router-link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="center" v-if="hasPerm('write', 1)">
                  <a class="btn-floating btn-large black waves-effect waves-light" @click="addWebsiteNewsForm.show = true"><i class="material-icons large">add</i></a>
                </div>
              </div>
              <div class="center" v-else>
                <div class="card green">
                  <div class="card-content">
                    <input type="text" class="input-card-title" v-model="addWebsiteNewsForm.title">
                    <textarea class="materialize-textarea input-card-content" v-model="addWebsiteNewsForm.summary"></textarea>
                    <div class="input-field">
                      <input type="text" id="add-news-author" v-model="addWebsiteNewsForm.author">
                      <label for="add-news-author">{{ $t('news.editor.author') }}</label>
                    </div>
                    <Datepicker v-model="addWebsiteNewsForm.date" format="d MMMM yyyy" :monday-first="true" :language="fr" calendar-class="black-text green round" />
                    <div class="input-field">
                      <input type="text" id="add-news-link" v-model="addWebsiteNewsForm.link">
                      <label for="add-news-link">{{ $t('news.editor.link') }}</label>
                    </div>
                    <i class="material-icons small action-icon left" @click="addWebsiteNewsForm.show = false">arrow_back</i>
                    <i class="material-icons small action-icon right" @click="addWebsiteNews()" v-if="!addWebsiteNewsForm.success && addWebsiteNewsForm.title && addWebsiteNewsForm.summary && addWebsiteNewsForm.link">check</i>
                    <i class="material-icons small added right" v-if="addWebsiteNewsForm.success">check</i>
                  </div>
                </div>
              </div>
            </div>
            <div class="col s12 m6">
              <div class="center">
                <h2 class="orange-text">{{ $t('news.schoolNewsTitle') }}</h2>
              </div>
              <div class="center" v-if="!addSchoolNewsForm.show">
                <div v-if="!schoolNews.length">
                  <p>{{ $t('news.noNews') }}</p>
                </div>
                <div class="row" v-if="schoolNews.length">
                  <div v-for="post in schoolNews" :key="post.title">
                    <div class="card orange">
                      <div class="card-content">
                        <span class="card-title">{{ post.title }}</span>
                        <p>
                          <span v-if="!editSummaryForm.show || editSummaryForm.id !== post.id">{{ post.summary }}</span>
                          <textarea class="materialize-textarea edit-input" type="text" v-model="editSummaryForm.summary" v-if="editSummaryForm.show && editSummaryForm.id === post.id"></textarea>
                          <i class="material-icons action-icon" @click="toggleEditSummaryForm(post.id)" v-if="!editSummaryForm.show || editSummaryForm.id !== post.id">edit</i>
                          <i class="material-icons action-icon" @click="editSummaryForm.show = false" v-if="editSummaryForm.summary === post.summary && editSummaryForm.show">close</i>
                          <i class="material-icons action-icon" @click="editSummary(post.id)" v-if="editSummaryForm.summary !== post.summary && editSummaryForm.show  && editSummaryForm.id === post.id">check</i>
                        </p>
                        <router-link class="btn orange darken-2 waves-effect waves-light" :to="'/' + $t('links.news') + '/' + post.link">{{ $t('news.moreButton') }}</router-link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="center" v-if="hasPerm('write', 1)">
                  <a class="btn-floating btn-large black waves-effect waves-light" @click="addSchoolNewsForm.show = true"><i class="material-icons large">add</i></a>
                </div>
              </div>
              <div class="center" v-else>
                <div class="card orange">
                  <div class="card-content">
                    <input type="text" class="input-card-title" v-model="addSchoolNewsForm.title">
                    <textarea class="materialize-textarea input-card-content" v-model="addSchoolNewsForm.summary"></textarea>
                    <div class="input-field">
                      <input type="text" id="add-news-author" v-model="addSchoolNewsForm.author">
                      <label for="add-news-author">{{ $t('news.editor.author') }}</label>
                    </div>
                    <Datepicker v-model="addSchoolNewsForm.date" format="d MMMM yyyy" :monday-first="true" :language="fr" calendar-class="black-text green round" />
                    <div class="input-field">
                      <input type="text" id="add-news-link" v-model="addSchoolNewsForm.link">
                      <label for="add-news-link">{{ $t('news.editor.link') }}</label>
                    </div>
                    <i class="material-icons small action-icon left" @click="addSchoolNewsForm.show = false">arrow_back</i>
                    <i class="material-icons small action-icon right" @click="addSchoolNews()" v-if="!addSchoolNewsForm.success && addSchoolNewsForm.title && addSchoolNewsForm.summary && addSchoolNewsForm.link">check</i>
                    <i class="material-icons small added right" v-if="addSchoolNewsForm.success">check</i>
                  </div>
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
import Datepicker from 'vuejs-datepicker'
import {
  fr,
  en,
  de
} from 'vuejs-datepicker/dist/locale'
export default {
  name: 'News',
  components: {
    Spinner,
    Datepicker
  },
  data() {
    return {
      loading: true,
      addWebsiteNewsForm: {
        show: false,
        type: null,
        title: null,
        author: this.$store.state.user.firstname,
        date: null,
        link: null,
        summary: null,
        success: null
      },
      addSchoolNewsForm: {
        show: false,
        type: null,
        title: null,
        author: this.$store.state.user.firstname,
        date: null,
        link: null,
        summary: null,
        success: null
      },
      editSummaryForm: {
        show: false,
        id: null,
        summary: null
      },
      fr: fr,
      en: en,
      de: de
    }
  },
  mounted() {
    this.$store.dispatch('news/get').then(() => {
      this.loading = false
    })
  },
  computed: {
    news() {
      return this.$store.state.news.posts
    },
    websiteNews() {
      return this.$store.getters['news/getWebsiteNews']
    },
    schoolNews() {
      return this.$store.getters['news/getSchoolNews']
    }
  },
  methods: {
    hasPerm(type, perm) {
      return this.$store.getters.hasPerm(type, perm)
    },
    toggleEditSummaryForm(id) {
      this.editSummaryForm.id = id
      this.editSummaryForm.summary = this.news.find(news => news.id === id).summary
      this.editSummaryForm.show = true
    },
    editSummary(id) {
      this.$store.dispatch('news/edit', {
        id: id,
        summary: this.editSummaryForm.summary
      }).then(() => {
        this.$store.dispatch('news/get').then(() => {
          this.editSummaryForm.show = false
        })
      })
    },
    addWebsiteNews() {
      this.$store.dispatch('news/add', {
        type: 'website',
        title: this.addWebsiteNewsForm.title,
        summary: this.addWebsiteNewsForm.summary,
        author: this.addWebsiteNewsForm.author,
        date: this.addWebsiteNewsForm.date,
        link: this.addWebsiteNewsForm.link,
        content: this.$t('news.editor.contentExample')
      }).then(() => {
        this.addWebsiteNewsForm.success = true
        this.$store.dispatch('news/get')
        setTimeout(() => {
          this.addWebsiteNewsForm.show = false
        }, 3000)
        setTimeout(() => {
          this.addWebsiteNewsForm.success = false
          this.addWebsiteNewsForm.title = null
          this.addWebsiteNewsForm.summary = null
          this.addWebsiteNewsForm.author = null
          this.addWebsiteNewsForm.date = null
          this.addWebsiteNewsForm.link = null
        }, 8000)
      })
    },
    addSchoolNews() {
      this.$store.dispatch('news/add', {
        type: 'school',
        title: this.addSchoolNewsForm.title,
        summary: this.addSchoolNewsForm.summary,
        author: this.addSchoolNewsForm.author,
        date: this.addSchoolNewsForm.date,
        link: this.addSchoolNewsForm.link,
        content: this.$t('news.editor.contentExample')
      }).then(() => {
        this.addSchoolNewsForm.success = true
        this.$store.dispatch('news/get')
        setTimeout(() => {
          this.addSchoolNewsForm.show = false
        }, 3000)
        setTimeout(() => {
          this.addSchoolNewsForm.success = false
          this.addSchoolNewsForm.title = null
          this.addSchoolNewsForm.summary = null
          this.addSchoolNewsForm.author = null
          this.addSchoolNewsForm.date = null
          this.addSchoolNewsForm.link = null
        }, 8000)
      })
    }
  }
}
</script>

<style scoped>
h2 {
  font-size: 2rem;
}

.card {
  display: inline-flex;
}

.card-content {
  padding: 30px;
}

.card-title,
input.input-card-title {
  color: #000;
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
}

p,
.edit-input {
  color: #fff !important;
  font-size: 1.2rem !important;
}

.btn {
  margin-top: 10px;
}

.action-icon {
  margin: 5px;
}

.added {
  margin-top: 5px;
  color: #388e3c;
  font-weight: 600;
}
</style>