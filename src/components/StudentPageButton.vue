<template>
  <div id="student-page-button">
    <a class="btn-floating btn-small btn-student-page green darken-1 waves-effect" @click="goToCreatorStudentPage"><i class="material-icons">arrow_forward</i></a>
  </div>
</template>

<style scoped>
#student-page-button {
  display: inline;
}

.btn-student-page {
  margin-left: 10px !important;
}
</style>

<script>
export default {
  name: 'StudentPageButton',
  props: ['userId'],
  methods: {
    goToCreatorStudentPage() {
      var studentPageUrl
      if (this.$store.getters.hasPerm('read', 'all')) {
        studentPageUrl = 'links.sa.websiteManagement.studentPage'
      } else {
        studentPageUrl = 'links.sa.admin.studentPage'
      }
      this.$router.push({
        path: '/' + this.$t(studentPageUrl) + '/' + this.userId
      })
    }
  }
}
</script>