<template>
  <div id="news_page">
    <div class="row">
      <div class="container">
        <div v-if="!editForm.show">
          <div class="center">
            <h1>{{ currentNews.title }}</h1>
            <span v-html="$t('news.author', { author: currentNews.author })" v-if="currentNews.author"></span>
            <span v-html="$t('news.date', { date: $d(getDate(currentNews.date)) })" v-if="currentNews.date"></span>.
          </div>
          <p>{{ currentNews.content }}</p>
        </div>
        <div v-else>
          <div class="center">
            <input type="text" class="input-h1" v-model="editForm.title">
          </div>
          <input type="text" class="input-p" v-model="editForm.content">
        </div>
        <div class="center" v-if="$store.getters.hasPerm('write', 1)">
          <i class="material-icons action-icon medium red-text" @click="deleteNews()">delete</i>
          <i class="material-icons action-icon medium" @click="editForm.show = true" v-if="!editForm.show">edit</i>
          <i class="material-icons action-icon medium green-text" @click="editNews()" v-else>check</i>
        </div>
        <div class="center">
          <router-link class="btn-floating btn-back black waves-effect waves-light" :to="'/' + $t('links.news')"><i class="material-icons left">arrow_back</i></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsPage',
  data() {
    return {
      editForm: {
        show: false,
        title: null,
        author: null,
        date: null,
        content: null
      }
    }
  },
  mounted() {
    this.editForm.title = this.currentNews.title
    this.editForm.content = this.currentNews.content
  },
  computed: {
    currentNews() {
      return this.$store.getters['news/getByPath'](this.$router.currentRoute.params.newsPath)
    }
  },
  methods: {
    getDate(date) {
      return Date.parse(date)
    },
    deleteNews() {
      this.$store.dispatch('news/delete', { id: this.currentNews.id }).then(() => {
        this.$router.push('/' + this.$t('links.news'))
      })
    },
    editNews() {
      this.$store.dispatch('news/edit', { id: this.currentNews.id, title: this.editForm.title, content: this.editForm.content }).then(() => {
        this.$store.dispatch('news/get').then(() => {
          this.editForm.show = false
          this.editForm.title = this.currentNews.title
          this.editForm.content = this.currentNews.content
        })
      })
    }
  }
}
</script>

<style scoped>
h1 {
  margin-bottom: 7px;
}

p {
  font-size: 1.3rem;
}
</style>