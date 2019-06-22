<template>
  <div style="overflow-x: hidden">

    <!--Header-->
    <div class="header bg-gradient-purple pt-9 pb-9">
      <div class="container">
        <div class="header-body">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="pr-5">
                <h1 class="display-2 text-white font-weight-bold mb-0">Arthur Dufour</h1>
                <h2 class="display-4 text-white font-weight-light">Étudiant en ingénierie informatique.</h2>
                <p class="text-white mt-4 font h2 font-weight-light">Passioné par l'informatique et de nature curieuse, j'explore le plus de technologies possible en montant divers petits projets, que je présentent et administrent depuis ce site.</p>
                <div class="mt-5">
                  <router-link
                    to="/portfolio"
                    class="btn btn-neutral my-2">Voir mes projets personnels</router-link>
                  <router-link
                    to="/dashboard"
                    class="btn btn-default my-2">Accès au dashboard</router-link>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="row pt-5">
                <img
                  src="img/theme/landing-2.png"
                  class="img-fluid">
              </div>
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
    <section class="py-6 pb-7 bg-default">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-md-6 order-md-2">
            <img
              src="img/theme/man-with-computer.svg"
              class="img-fluid">
          </div>
          <div class="col-md-6 order-md-1 text-white">
            <div class="pr-md-5 text-center">
              <h2 class="display-3 text-white">A propos de moi<span>Étudiant en ingénierie informatique</span></h2>
              <div class="icon icon-lg icon-shape icon-shape-secondary rounded-circle mt-2 mb-0">
                <i class="ni ni-settings" />
              </div>
              <p class="lead">Je suis actuellement étudiant en deuxième année à l'EPSI, où je compte achever un Bac+5. Passionné par le développement, je n'hésite pas à me plonger dans tout ce qui me passe sous la main.
              <br>Par conséquent, j'ai mis en place ce site web afin de les exposer et les partager avec vous.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { Tooltip } from 'element-ui'
export default {
  name: 'HomePage',
  components: {
    [Tooltip.name]: Tooltip
  }
}
</script>
<style scoped>
.bg-gradient-purple {
  background: linear-gradient(150deg,#281483 15%,#8f6ed5 70%,#d782d9 94%) !important
}
</style>
