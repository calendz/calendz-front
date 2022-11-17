<template>
  <div>
    <h3># Accéder rapidement à une date/utilisateur</h3>
    <p>
      Le moyen le plus rapide pour naviguer rapidement vers une date est de modifier l'URL de la page en rajoutant le paramètre <code>?date=</code> en utilisant le format "DD-MM-YYYY".<br>
      Par exemple : <code>?date=24-12-2020</code> affichera la semaine du 24 décembre 2020.
    </p>

    <p>
      Vous pouvez également utiliser le paramètre <code>?user=</code> pour afficher l'emploi du temps d'une autre personne.<br>
      Par exemple : <code>?user=doryan.chaigneau</code> affichera l'emploi du temps de Doryan Chaigneau.
    </p>

    <base-alert type="primary">
      <strong>Astuce : </strong> vous pouvez combiner deux paramètres : <code class="text-white">?user=doryan.chaigneau&date=09-09-2022</code>.
    </base-alert>

    <h3># Afficher l'emploi du temps d'un intervenant</h3>
    <p>
      Vous pouvez afficher l'emploi du temps de n'importe quel intervenant en utilisant la fonction de recherche (de la même manière que pour les apprenants).
    </p>
  </div>
</template>
