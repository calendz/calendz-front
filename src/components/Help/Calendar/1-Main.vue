<template>
  <div>
    <div>
      <h3># Partie fonctionnelle</h3>
      <p>
        L'emploi du temps se veut simple et efficace.<br>
        <br>
        Vous disposez de trois modes de vue différents, à savoir les modes "Jour", "Semaine" et "Mois" (le mode par défaut sur ordinateur étant le mode "Semaine",
        tandis que le mode par défaut sur mobile est le mode "Jour").<br>
        <br>
        Vous pouvez naviguer d'une semaine à une autre en cliquant sur les flèches situées en haut à droite, ou bien en utilisant les flèches directionnelles de votre clavier.<br>
        Vous pouvez revenir à la date actuelle à tout moment en cliquant sur le bouton "Revenir à aujourd'hui".<br>
        <br>
        Les informations affichées sont :
        <ul>
          <li>Intitulé du module</li>
          <li>Heures de début/fin</li>
          <li>Nom de l'intervenant</li>
          <li>Salle du cours</li>
          <li>BTS (facultatif, pour les options)</li>
        </ul>
      </p>

      <img
        class="img-fluid py-3"
        src="https://i.imgur.com/1BtRpSI.png"
        alt="Capture d'écran emploi du temps">

    </div>

    <br>

    <div>
      <h3># Partie technique</h3>
      <p>
        L'emploi du temps est la fonctionnalité principale de Calendz. C'est la principale raison pour laquelle nous avons créé la plateforme.
        Cependant, son fonctionnement est un petit peu particulier...<br>
        <br>
        En effet, n'ayant pas d'accès aux bases de données qui contiennent les cours de chaques classes/campus,
        nous sommes obligé de récupérer les cours en faisant du scrapping.
      </p>

      <base-alert type="primary">
        <strong>Scrapping :</strong> Le web scraping (parfois appelé harvesting) est une technique d'extraction du contenu de sites Web,
        via un script ou un programme, dans le but de le transformer pour permettre son utilisation dans un autre contexte.
      </base-alert>

      <p>
        Concrètement, cela signifie que lorsque vous accédez à la page "Emploi du temps", un programme (baptisé
        <a
          href="https://github.com/calendz/calendz-api-calendar"
          target="_blank"
          rel="noreferrer noopener">API-Calendar</a>)
          va télécharger la page HTML de l'emploi du temps traditionnel de Beecome, puis en extraire les données (intitulé du cours, salle, heure etc.)
          pour ensuite les retourner au format JSON, et pour qu'elles soient ensuite affichées sur le site grâce à la librairie
        <a
          href="https://fullcalendar.io/"
          target="_blank"
          rel="noreferrer noopener">FullCalendar</a>.
      </p>

    <!-- <img
      class="img-fluid"
      src="https://gblobscdn.gitbook.com/assets%2F-LrtTS-hFZE84mrgJ_gj%2F-LrtcSAFCUo-HQvmScDC%2F-LrtcTaTaQObra6pGqW6%2Fimage.png?alt=media&token=3c6d3191-286b-4f20-8ff1-5d69f96b80ff"> -->
    </div>
  </div>
</template>
