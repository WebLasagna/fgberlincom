<template>
  <div id="privacy">
    <div class="row">
      <div class="container">
        <div class="center">
          <h1>Politique de Confidentialité</h1>
        </div>
        <span class="translation-warning" v-if="$store.state.locale === 'en' || $store.state.locale === 'de'"><i class="material-icons left">warning</i>{{ $t('translationWarning') }}</span>
        <p>Date de dernière modification : 28 février 2019.</p>
        <h2>Présentation de la Politique de Confidentialité :</h2>
        <p>Cette Politique de Confidentialité présente notre politique avec le respect des informations recueillies auprès des visiteurs du Site et des utilisateurs de l'Application et/ou du Service. Selon la loi en vigueur, FGBerlin.com est le « contrôleur de données » des données personnelles recueillies par le Service.</p>
        <h2>Les informations que nous recueillons :</h2>
        <h3>Données de votre Compte</h3>
        <p>Lors de la création de votre compte sur l'espace élèves (le « Compte »), vous devez renseigner certaines informations confidentielles comme votre prénom, votre nom de famille, votre classe et un mot de passe. Toutes ces informations sont stockées dans une base de données sécurisée. Votre mot de passe est haché et n'est donc accessible que par vous. Les autres informations confidentielles de votre compte comme votre prénom, votre nom de famille ou votre classe ne sont potentiellement transmises qu'aux élèves de votre classe.</p>
        <p>Ces données peuvent aussi être utilisées dans le cadre de l'amélioration du Service, par exemple, à des fins d'analyse d'audience plus profondes. Elles ne seront pas communiquées à des tiers. Les données de votre Compte sont stockées aussi longtemps que vous utiliserez le Service avec votre Compte. Si vous supprimez votre Compte, les données de celui-ci sont immédiatement supprimées.</p>
        <p>Lors de la création de votre Compte ou lors de toute nouvelle connexion à votre Compte, un cookie est stocké sur votre navigateur (le cookie <i>SSID</i>) et permet de vous connecter automatiquement à votre Compte si vous réutilisez le même appareil. Vous pouvez le supprimer en vous déconnectant de votre Compte grâce au bouton approprié situé dans l'onglet Mon compte de l'espace élèves.</p>
        <h3>Données de votre utilisation du Service</h3>
        <p>Nous utilisons Google Analytics lors de votre utilisation du Service à des fins de mesure d'audience. Google Analytics utilise principalement des cookies propriétaires permettant de générer des rapports sur vos interactions avec le Service. Vous pouvez désactiver les cookies ou supprimer un cookie individuel. <a href="https://policies.google.com/technologies/cookies">En savoir plus</a>.</p>
        <p>En outre, Google Analytics est compatible avec un <a href="https://tools.google.com/dlpage/gaoptout/">module complémentaire</a> de navigateur que vous pouvez installer de manière facultative afin de désactiver la mesure Google Analytics pour tout site auquel vous accédez. Notez que ce module complémentaire désactive seulement la mesure Google Analytics.</p>
        <p>Google Analytics collecte également les adresses IP (Internet Protocol) pour assurer la sécurité du Service et indiquer à l'Équipe de quelle région (pays, État ou ville) vous provenez (on appelle cela la "géolocalisation par IP"). Bien que Google Analytics fournisse une méthode permettant de masquer les adresses IP collectées (voir ci-dessous), notez que l'Équipe a accès à votre adresse IP, et ce même si vous avez installé le module de désactivation de Google Analytics.</p>
        <h2>Nous contacter :</h2>
        <p>Veuillez nous contacter si vous avez des questions à propos de cette Politique de Confidentialité ou des pratiques des Services concernant les informations. Vous pouvez nous contacter à <b><a href="mailto: contact@fgberlin.com">contact@fgberlin.com</a></b> ou via notre compte Instagram <b><a href="https://instagram.com/fgberlincom" target="_blank">@fgberlincom</a></b>.</p>
        <div class="center">
          <a class="btn-floating btn-back black waves-effect waves-light" @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Privacy'
}
</script>