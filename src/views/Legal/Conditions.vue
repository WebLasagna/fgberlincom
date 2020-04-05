<template>
  <div id="conditions">
    <div class="row">
      <div class="container">
        <div class="center">
          <h1>Conditions d'utilisation</h1>
        </div>
        <span class="translation-warning" v-if="$store.state.locale === 'en' || $store.state.locale === 'de'"><i class="material-icons left">warning</i>{{ $t('translationWarning') }}</span>
        <p>Date de dernière modification : 27 juin 2019.</p>
        <h2>Présentation et acceptation des Conditions d'utilisation</h2>
        <p>Ces Conditions d'utilisation (« Conditions ») sont un accord légal entre l'équipe de FGBerlin.com (l' « Équipe », « nous », « nos » ou « notre ») et vous (« vous », « vos » ou « votre »). FGBerlin.com est une association non-declarée composée de 5 élèves du Lycée français de Berlin. En utilisant ou en visitant le site FGBerlin.com (le « Site »), qui est aussi appelé le « Service », vous déclarez (1) avoir 10 ans ou plus, (2) si vous êtes majeur dans votre juridiction, vous déclarez avoir lu, compris et accepté d'être lié par les Conditions, (3) si vous avez entre 10 ans et la majorité civile dans votre juridiction, que votre représentant légal a passé ces Conditions en revue et les a acceptées et (4) que vous êtes actuellement scolarisé·e au Lycée français de Berlin (le « Lycée »).</p>
        <p>L'Équipe se réserve le droit de mettre à jour ces Conditions, que nous pourrions mettre en œuvre pour les raisons incluant, mais non limitées à, la conformité aux modifications des lois ou l'adéquation avec l'amélioration du Service. Si les changements ont un effet sur votre utilisation du Service ou vos droits légaux, nous vous avertirons sous moins de sept jours avant l'implémentation de ces changements. À moins que nous déclarions le contraire, votre utilisation continue du Service après notre publication des modifications constituera votre acceptation et votre accord envers ces changements. Si vous vous opposez aux changements, votre recours sera l'arrêt de l'utilisation du Service.</p>
        <h2>Utilisation et données du Service</h2>
        <p>Le Service est une plateforme de consultation de données relatives au Lycée (les Données). Ces Données ont pour but d'être utiles aux élèves du Lycée et comprennent, entre autres, des informations relatives aux examens et devoirs à venir. Ces Données sont destinées à l'usage exclusif des élèves. La publication, la modification et la suppression de certaines de ces Données dépendent d'un ou plusieurs sous-traitants (les Administrateurs) qui contribuent bénévolement à l'amélioration et au maintien du service. En aucun cas l'Équipe ne garantit la véracité des informations fournies par ces Données. L'Équipe se réserve le droit de modifier ou de supprimer ces Données sans préavis. Si les Données publiées par les Administrateurs s'avèrent ne pas être en conformité avec les présentes Conditions, elles seront supprimées dans un délai de 7 jours.</p>
        <p>En aucun cas vous ne pouvez utiliser le Service d'une autre manière que tel que défini dans les présentes Conditions. Vous acceptez de ne pas utiliser l'exploration de données, des robots, des spiders, ou des outils similaires destinés à la collecte et l'extraction des Données.</p>
        <p>L'Équipe se réserve le droit de modifier ou d'interrompre le Service (ou toute partie) temporairement ou de manière permanente, avec ou sans préavis. Ces interruptions surviennent uniquement dans le cadre de l'amélioration du Service.</p>
        <h2>Votre Compte</h2>
        <p>Vous êtes responsable de vos identifiants de connexion et de toute activité résultant de l'utilisation de ces derniers ou de toute autre activité sur votre compte élève (« Compte ») sur le Service. Si vous ne disposez pas d'un Compte lors de l'accès à l'espace élèves et que vous êtes un élève du Lycée, vous serez invité à en créer un en fournissant votre prénom, votre nom, votre classe, un nom d'utilisateur et un mot de passe. Vous représentez et vous portez garant que les informations que vous nous fournissez à votre inscription et à tout autre moment sont vraies, précises, actuelles et complètes. Nous nous réservons le droit de refuser tout nom d'utilisateur ou de résilier votre nom d'utilisateur ou d'empêcher l'utilisation d'un nom d'utilisateur à notre seule discrétion et sans aucune responsabilité envers vous. Vous êtes responsable de la conservation du caractère confidentiel de vos identifiants de connexion et êtes entièrement responsable de toute activité se produisant par l'utilisation de vos identifiants ou de votre Compte. Vous acceptez de nous avertir immédiatement si vous pensez que le caractère confidentiel de vos identifiants de connexion a été compromis ou si vous suspectez une utilisation non autorisée de votre Compte. Vous acceptez le fait que nous ne serons pas responsables de toute perte ou tout dommage provenant d'une utilisation non autorisée de vos identifiants.</p>
        <p>La protection des informations liées à votre Compte est notre priorité. Pour plus d'informations concernant la gestion de vos données personnelles associées à votre Compte, consultez notre <router-link :to="'/' + $t('links.privacy')">Politique de Confidentialité</router-link>.</p>
        <p>Vous pouvez résilier votre Compte à tout moment et pour toute raison en supprimant votre compte à l'aide du bouton approprié situé dans l'onglet Mon compte de votre espace élève. L'Équipe résiliera votre Compte et mettra fin à votre accès au Service (ou, à la seule discrétion de l'Équipe, aux parties applicables du Service) à tout moment et pour toute raison. L'Équipe n'est pas obligée de vous fournir de préavis ou d'avertissement en amont de cette résiliation. Suite à la résiliation, vous pouvez perdre votre Compte et toute information et donnée y étant associée.</p>
        <h2>Impressum</h2>
        <p>FGBerlin.com Team<br>Derfflingerstraße 7<br>10785 Berlin<br>Deutschland<br><br>E-Mail : admin@fgberlin.com<br><br>Verantwortlicher gemäß §10 Abs.3 MDStV:<br>Tilman<br>Derfflingerstraße 7<br>10785 Berlin<br>Deutschland<br><br>Redaktion:<br>Octave</p>
        <div class="center">
          <a class="btn-floating btn-back black waves-effect waves-light" @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Conditions'
}
</script>