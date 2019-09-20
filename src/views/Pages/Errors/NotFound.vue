<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-info py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-4">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="display-2 text-white">Oups !</h1>
              <p class="text-lead text-white my-4">La page vous cherchez semble ne pas exister...</p>
              <router-link
                to="/home"
                class="font-weight-bold text-white mt-5">
                <i class="fas fa-long-arrow-alt-left"/>
                Retour vers l'accueil
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"/>
        </svg>
      </div>
    </div>

    <!-- Page content -->
    <section class="py-8 bg-default">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-md-6">
            <img
              src="img/theme/landing-2.png"
              alt="Image"
              class="img-fluid">
          </div>
          <div class="col-md-6">
            <div class="pr-md-5">
              <h1 class="text-light">Explorer le site</h1>
              <p class="text-light">Si vous avez atterit ici par hasard, n'hésitez pas à cliquer sur le bouton suivant pour atterir sur une page aléatoire.</p>
              <router-link
                to="/home"
                class="btn btn-primary my-2 mt-5">Explorer le site</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'NotFound'
}
</script>
