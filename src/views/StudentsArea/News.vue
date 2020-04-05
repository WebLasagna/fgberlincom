<template>
  <div id="news">
    <div class="row">
      <div class="container">
        <div class="center">
          <h1>{{ $t('news.title') }}</h1>
          <div class="row" v-if="loading">
            <Spinner />
          </div>
          <div class="row" v-else>
            <div v-if="!addEditNewsForm.show">
              <div class="center" v-if="!news || !news.length">
                <p>{{ $t('sa.news.noNews') }}</p>
              </div>
              <div v-if="news && news.length">
                <div v-for="groupNews in news" :key="groupNews.group.id">
                  <h2>{{ $t('sa.news.title', { group: groupNews.group.displayName }) }}</h2>
                  <div class="center" v-for="news in groupNews.news" :key="news.id">
                    <div class="card" :class="randomColor()">
                      <div class="card-content">
                        <span class="card-title">{{ news.title }}</span>
                        <p v-html="news.content"></p>
                        <div class="row" v-if="hasPerm('write', groupNews.group.name)">
                          <div class="col s6">
                            <i class="material-icons action-icon" @click="deleteNews(article.id)">delete</i>
                          </div>
                          <div class="col s6">
                            <i class="material-icons action-icon" @click="toggleEditNews(article.id)">edit</i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="center" v-if="hasPerm('write', 'class')">
                <a class="btn-floating btn-large black waves-effect waves-light" @click="showAddEditNewsForm('add')"><i class="material-icons large">add</i></a>
              </div>
            </div>
            <div v-if="hasPerm('write', 'class') && addEditNewsForm.show">
              <div class="center">
                <div class="card" :class="randomAddColor">
                  <div class="card-content">
                    <div class="input-field">
                      <select id="mselect" v-model="addEditNewsForm.groupId">
                        <option value="" disabled selected>{{ $t('sa.admin.add.choose') }}</option>
                        <option v-for="group in getAuthorizedGroups()" :key="group.id" :value="group.id">{{ group.name }}</option>
                      </select>
                      <label>{{ $t('sa.admin.add.group') }}</label>
                    </div>
                    <input type="text" class="input-card-title" v-model="addEditNewsForm.title">
                    <input type="text" class="input-card-content" v-model="addEditNewsForm.content">
                    <div class="left">
                      <i class="material-icons small action-icon" @click="addEditNewsForm.show = null">arrow_back</i>
                    </div>
                    <div class="right" v-if="addEditNewsForm.title && addEditNewsForm.content">
                      <i class="material-icons small action-icon" @click="addNews()" v-if="addEditNewsForm.show === 'add' && !addEditNewsForm.success">check</i>
                      <i class="material-icons small action-icon" @click="editNews()" v-if="addEditNewsForm.show === 'edit' && !addEditNewsForm.success">check</i>
                      <i class="material-icons small added" v-if="addEditNewsForm.success">check</i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="center">
            <router-link class="btn-floating btn-back black waves-effect waves-light" :to="'/' + $t('links.sa.main')"><i class="material-icons left">arrow_back</i></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import colors from '../../strings/colors'
import Spinner from '../../components/Spinner'

export default {
  name: 'News',
  components: {
    Spinner
  },
  mounted() {
    this.$store.state.user.groups = []
    this.$store.state.user.groups.forEach(group => {
      this.$store.dispatch('getGroupNews', { group: group })
    })
    this.loading = false
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    news() {
      return this.$store.state.groups.news
    },
    randomAddColor() {
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    }
  },
  data() {
    return {
      loading: true,
      colors: colors,
      addEditNewsForm: {
        show: false,
        success: null,
        groupId: null,
        title: null,
        content: null,
        currentEdit: null
      }
    }
  },
  methods: {
    hasPerm(perm) {
      return this.$store.getters.hasPerm(perm)
    },
    randomColor() {
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    },
    showAddEditNewsForm(type) {
      this.addEditNewsForm.show = type
      setTimeout(() => {
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
      }, 1)
    },
    getAuthorizedGroups() {
      var writePerms = this.$store.state.user.permissions.write
      var groups = this.$store.state.user.groups
      var authorizedGroups = []
      groups.forEach(group => {
        if(this.$store.getters.hasPerm('write', group.name)) authorizedGroups.push(group)
      })
      return authorizedGroups
    },
    addNews() {
      this.$store.dispatch('addGroupNews', {
          groupId: this.addEditNewsForm.groupId,
          title: this.addEditNewsForm.title,
          content: this.addEditNewsForm.content
        })
        .then(() => {
          this.addEditNewsForm.success = true
          this.$store.dispatch('getGroupNews')
          setTimeout(() => {
            this.addEditNewsForm.show = false
          }, 3000)
          setTimeout(() => {
            this.addEditNewsForm.success = false
            this.addEditNewsForm.title = null
            this.addEditNewsForm.content = null
          }, 8000)
        })
    },
    deleteNews(newsId) {
      this.$store.dispatch('deleteClassNews', newsId).then(() => {
        this.loading = true
        this.$store.dispatch('getClassNews').then(() => {
          this.loading = false
        })
      })
    },
    toggleEditNews(newsId) {
      var news = this.news.find(news => news.id === newsId)
      this.addEditNewsForm.currentEdit = news.id
      this.addEditNewsForm.title = news.title
      this.addEditNewsForm.content = news.content
      this.addEditNewsForm.show = 'ee'
    },
    editNews() {
      this.$store.dispatch('editClassNews', {
        newsId: this.addEditNewsForm.currentEdit,
        newTitle: this.addEditNewsForm.title,
        newContent: this.addEditNewsForm.content
      }).then(() => {
        this.addEditNewsForm.success = true
        this.$store.dispatch('getClassNews')
        setTimeout(() => {
          this.addEditNewsForm.show = false
        }, 3000)
        setTimeout(() => {
          this.addEditNewsForm.success = false
          this.addEditNewsForm.title = null
          this.addEditNewsForm.content = null
        }, 8000)
      })
    }
  }
}
</script>

<style scoped>
.card {
  display: inline-flex;
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

.row {
  margin: 0;
}

.center {
  margin-bottom: 20px;
}

.added {
  margin-top: 5px;
  color: #4caf50;
  font-weight: 600;
}
</style>