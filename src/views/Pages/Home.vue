<template>
  <div style="overflow-x: hidden">

    <!--Header-->
    <div class="header bg-gradient-primary pt-9 pb-9">
      <div class="container">
        <div class="header-body">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="pr-5">
                <h1 class="display-2 text-white font-weight-bold mb-0">CALENDZ</h1>
                <h2 class="display-4 text-white font-weight-light">Votre emploi du temps amélioré.</h2>
                <p class="text-white mt-4 font h2 font-weight-light">Calendz est une surcouche à l'emploi du temps fourni par notre campus. Elle vise à améliorer l'esthétique de ce dernier, ainsi qu'à lui rajouter des fonctionnalités...</p>
                <div class="mt-5">
                  <router-link
                    to="/dashboard"
                    class="btn btn-neutral mb-2">
                    <span class="nav-link-inner--text">Accéder au site</span>
                  </router-link>
                  <router-link
                    to="/about"
                    class="btn btn-default mb-2">
                    <span class="nav-link-inner--text">En savoir plus...</span>
                  </router-link>
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
    <section class="py-6 pb-9 bg-default p-3">
      <div class="row justify-content-center text-center">
        <div class="col-md-6">
          <h2 class="display-3 text-white">Un emploi du temps amélioré ?</h2>
          <p class="lead text-white">
            Calendz vous propose votre emploi du temps, actualisé en temps réel, avec une interface améliorée (principallement au niveau esthétique), ainsi que des possibilités de personnalisation. <br> De plus, vous y trouverez d'autres fonctions visant à compléter Beecome.
          </p>
        </div>
      </div>
    </section>
    <section class="section section-lg pt-lg-0 mt--7">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-4">
                <div class="card card-lift--hover shadow border-0">
                  <div class="card-body py-5">
                    <div class="icon icon-shape bg-gradient-primary text-white rounded-circle mb-4">
                      <i class="ni ni-check-bold"/>
                    </div>
                    <h4 class="h3 text-primary text-uppercase">Based on Bootstrap 4</h4>
                    <p class="description mt-3">Argon is built on top of the most popular open source toolkit for developing with HTML, CSS, and JS.</p>
                    <div>
                      <span class="badge badge-pill badge-primary">bootstrap 4</span>
                      <span class="badge badge-pill badge-primary">dashboard</span>
                      <span class="badge badge-pill badge-primary">template</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card card-lift--hover shadow border-0">
                  <div class="card-body py-5">
                    <div class="icon icon-shape bg-gradient-success text-white rounded-circle mb-4">
                      <i class="ni ni-istanbul"/>
                    </div>
                    <h4 class="h3 text-success text-uppercase">Integrated build tools</h4>
                    <p class="description mt-3">Use Argons's included npm and gulp scripts to compile source code, run tests, and more with just a few simple commands.</p>
                    <div>
                      <span class="badge badge-pill badge-success">npm</span>
                      <span class="badge badge-pill badge-success">gulp</span>
                      <span class="badge badge-pill badge-success">build tools</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card card-lift--hover shadow border-0">
                  <div class="card-body py-5">
                    <div class="icon icon-shape bg-gradient-warning text-white rounded-circle mb-4">
                      <i class="ni ni-planet"/>
                    </div>
                    <h4 class="h3 text-warning text-uppercase">Full Sass support</h4>
                    <p class="description mt-3">Argon makes customization easier than ever before. You get all the tools to make your website building process a breeze.</p>
                    <div>
                      <span class="badge badge-pill badge-warning">sass</span>
                      <span class="badge badge-pill badge-warning">design</span>
                      <span class="badge badge-pill badge-warning">customize</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-7">
      <div class="container">
        <div class="row row-grid justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="display-3">Vous aimez l'idée derrière<span class="text-success">notre emploi du temps ?</span></h2>
            <p class="lead">Parce-que si c'est le cas, vous pouvez nous aider à le rendre encore meilleur ! Pour cela vous pouvez contribuer au projet au ouvrant votre pull-request, ou encore nous aider financièrement.</p>
            <div class="btn-wrapper">
              <a
                href="https://github.com/calendz"
                class="btn btn-neutral mb-3 mb-sm-0"
                target="_blank">
                <span class="btn-inner--text">Contribuer</span>
              </a>
              <a
                href="#"
                class="btn btn-success btn-icon mb-3 mb-sm-0">
                <span class="btn-inner--icon"><i class="fas fa-coins"/></span>
                <span class="btn-inner--text">Nous financer</span>
                <span class="badge badge-md badge-pill badge-floating badge-danger border-white">2€</span>
              </a>
            </div>
            <div class="text-center">
              <h4 class="display-4 mb-5 mt-5">Technologies utilisées</h4>
              <div class="row justify-content-center">
                <div class="col-md-2 col-3 my-2">
                  <el-tooltip
                    placement="top"
                    content="Bootstrap 4 - Most popular front-end component library">
                    <a
                      href="https://getbootstrap.com/"
                      target="_blank">
                      <img
                        src="img/theme/bootstrap.jpg"
                        class="img-fluid rounded-circle shadow shadow-lg--hover">
                    </a>
                  </el-tooltip>
                </div>
                <div class="col-md-2 col-3 my-2">
                  <el-tooltip
                    placement="top"
                    content="Vue.js - The progressive javascript framework">
                    <a
                      href="https://vuejs.org/"
                      target="_blank">
                      <img
                        src="img/theme/vue.jpg"
                        class="img-fluid rounded-circle">
                    </a>
                  </el-tooltip>
                </div>
                <div class="col-md-2 col-3 my-2">
                  <el-tooltip
                    placement="top"
                    content="Node.js - JavaScript runtime ">
                    <a
                      href="https://nodejs.org/en/"
                      target="_blank">
                      <img
                        src="img/theme/node.png"
                        class="img-fluid rounded-circle">
                    </a>
                  </el-tooltip>
                </div>
              </div>
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
