<template>
  <div>
    <p>
      Vous pouvez à tout moment afficher l'emploi du temps d'un camarade.<br>
      <br>
      Pour cela il vous suffit d'entrez "prénom.nom" dans la petite barre de recherche située en haut à droite de la page, puis d'appuyer sur "Entrée" pour valider.<br>
      (Vous pouvez ensuite utiliser la croix pour tout supprimer et revenir à votre emploi du temps.<br>
      <br>
      Vous remarquerez que les cours s'affichent en gris afin de ne pas oublier que vous êtes entrain de visualiser un emploi du temps qui n'est pas le votre.
    </p>

    <div class="d-flex flex-wrap justify-content-center pb-3">
      <img
        class="img-fluid px-3"
        style="max-height: 500px"
        src="https://i.imgur.com/FAZB7PB.png"
        alt="Capture d'écran emploi du temps">
    </div>

    <base-alert type="primary">
      <strong>Astuce : </strong>Cette fonctionnalité fonctionne pour tous les élèves EPSI / WIS, quelque soit le campus, la classe ou le groupe !
    </base-alert>

    <base-alert type="warning">
      <strong>Attention : </strong>Cette fonctionnalité n'est pas disponible depuis la version mobile du site !
    </base-alert>
  </div>
</template>
