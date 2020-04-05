<template>
  <div id="account-validation">
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col s12 m8 offset-m2 l7 offset-l2">
            <div class="card green">
              <div class="card-content">
                <span class="card-title">{{ $t('sa.accountValidation.title') }}</span>
                <p>{{ $t('sa.accountValidation.text', { admin: getAdmin }) }}</p>
              </div>
            </div>
            <i18n path="sa.accountValidation.seeAlso" tag="p">
              <router-link :to="'/' + $t('links.news')">{{ $t('sa.accountValidation.news') }}</router-link>
              <a class="insta" href="https://instagram.com/fgberlincom" target="_blank">@fgberlincom</a>
            </i18n>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store'
export default {
  name: 'AccountValidation',
  beforeRouteEnter(to, from, next) {
    if (!store.state.class.admin) {
      store.dispatch('getClassAdmin').then(() => {
        next()
      })
    } else {
      next()
    }
  },
  mounted() {
    store.dispatch('getStatus').then(() => {
      if (store.state.status !== "pending") {
        this.$router.push({
          path: '/' + this.$t('links.sa.main')
        })
      }
    })
  },
  computed: {
    getAdmin() {
      return this.$store.state.class.admin.firstname
    }
  }
}
</script>

<style scoped>
.card {
  margin-top: 50px;
  border-radius: 25px;
  box-shadow: 1px 1px 3px #757575;
  -webkit-transition: 0.3s ease;
  transition: 0.3s ease;
}

.card-title {
  font-size: 1.9rem;
  color: #000;
  font-weight: 600;
  text-align: center;
}

p {
  font-size: 1.2rem;
}

a {
  font-weight: 600;
}
</style>