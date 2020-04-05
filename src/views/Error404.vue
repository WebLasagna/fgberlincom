<template>
  <div id="error-404">
    <div class="row">
      <div class="container">
        <h1>{{ $t('errorPage.404.title') }}</h1>
        <h2>{{ $t('errorPage.404.text') }}</h2>
        <router-link class="btn green darken-2 waves-effect waves-light" to="/"><i class="material-icons left">arrow_back</i>{{ $t('errorPage.returnToHomepage') }}</router-link>
      </div>
    </div>
  </div>
</template>