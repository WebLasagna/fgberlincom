<template>
  <div id="account-banned">
    <div class="row">
      <div class="container">
        <div class="center">
          <div class="card red darken-1">
            <div class="card-content">
              <span class="card-title">{{ $t('sa.accountBanned.title') }}</span>
              <i18n path="sa.accountBanned.explanation" tag="p">
                <router-link :to="'/' + $t('links.conditions')">{{ $t('sa.accountBanned.conditions') }}</router-link>
              </i18n>
              <i18n path="sa.accountBanned.appeal" tag="p">
                <a href="https://instagram.com/fgberlincom" target="_blank">@fgberlincom</a>
                <a href="mailto:contact@fg-berlin.ga">contact@fgberlin.com</a>
              </i18n>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountBanned',
  mounted() {
    this.$store.dispatch('getStatus')
  }
}
</script>

<style scoped>
.card {
  display: inline-flex;
  margin-top: 10%;
  border-radius: 25px;
  box-shadow: 1px 1px 3px #757575;
  -webkit-transition: 0.3s ease;
  transition: 0.3s ease;
}

.card-content {
  padding: 25px;
}

.card-title {
  color: #000;
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
}

p {
  color: #fff;
  font-size: 1.3rem;
}

a {
  font-weight: 600;
  color: #1565c0;
}
</style>