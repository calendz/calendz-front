<template>
  <div style="overflow-x: hidden">

    <!--Header-->
    <div class="header bg-blue pt-9 pb-9">
      <div class="container">
        <div class="header-body">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="pr-5">
                <h1 class="display-2 text-white font-weight-bold mb-0">CALENDZ</h1>
                <h2 class="display-4 text-white font-weight-light">Votre emploi du temps amélioré.</h2>
                <p class="text-white mt-4 font h2 font-weight-light text-justify">Calendz est une alternative à l'emploi du temps fourni par notre campus. Il vise à améliorer l'esthétique de ce dernier, ainsi qu'à lui rajouter des fonctionnalités...</p>
                <div class="mt-5">
                  <router-link
                    to="/dashboard"
                    class="btn btn-neutral mb-2">
                    <span class="nav-link-inner--text">Accéder au site</span>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="row pt-5">
                <img
                  src="img/theme/landing-3.png"
                  alt="Image"
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
    <section class="py-6 pb-9 bg-default">
      <div class="row justify-content-center text-center">
        <div class="col-md-6 col-11">
          <h2 class="display-3 text-white">Un emploi du temps amélioré ?</h2>
          <p class="lead text-white text-justify">
            Calendz vous propose votre emploi du temps, actualisé en temps réel, avec une interface améliorée (principalement au niveau esthétique), ainsi que des possibilités de personnalisation. Vous pourrez également profiter d'autres fonctionnalités, visant à compléter 360 Learning.
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
                  <div class="card-body py-4 h-100">
                    <div class="icon icon-shape bg-gradient-primary text-white rounded-circle mb-4">
                      <i class="ni ni-check-bold"/>
                    </div>
                    <h4 class="h3 text-primary text-uppercase">Votre emploi du temps</h4>
                    <p class="description mt-3 text-justify">Une interface épurée, personnalisable et entièrement responsive afin de vous faciliter l'accès à votre emploi du temps.</p>
                    <div>
                      <span class="badge badge-pill badge-primary">emploi du temps</span>
                      <span class="badge badge-pill badge-primary mr-1">actualisation temps réel</span>
                      <span class="badge badge-pill badge-primary">personnalisation</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card card-lift--hover shadow border-0">
                  <div class="card-body py-4 h-100">
                    <div class="icon icon-shape bg-gradient-warning text-white rounded-circle mb-4">
                      <i class="ni ni-ui-04"/>
                    </div>
                    <h4 class="h3 text-warning text-uppercase">Gestion des devoirs</h4>
                    <p class="description mt-3 text-justify">Un espace dédié à la gestion des devoirs. Ajoutez vous même les devoirs pour vous ou votre classe, définissez une date d'expiration et obtenez des rappels</p>
                    <div>
                      <span class="badge badge-pill badge-warning">devoirs</span>
                      <span class="badge badge-pill badge-warning mx-1">organisation</span>
                      <span class="badge badge-pill badge-warning">todo-list</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card card-lift--hover shadow border-0">
                  <div class="card-body py-4 h-100">
                    <div class="icon icon-shape bg-gradient-success text-white rounded-circle mb-4">
                      <i class="ni ni-ruler-pencil"/>
                    </div>
                    <h4 class="h3 text-success text-uppercase">Une idée de fonctionnalité ?</h4>
                    <p class="description mt-3 text-justify">Calendz est avant tout développé <b>par</b> des étudiants, <b>pour</b> les étudiants. Une idée de fonctionnalité ?<br>N'hésitez pas à nous en faire part !</p>
                    <div>
                      <span class="badge badge-pill badge-success">collaboration</span>
                      <span class="badge badge-pill badge-success mx-1">open-source</span>
                      <span class="badge badge-pill badge-success">gratuit</span>
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
            <p class="lead">Si c'est le cas, vous pouvez nous aider à le rendre encore meilleur ! Pour cela vous pouvez contribuer au projet au ouvrant votre pull-request, ou encore nous aider financièrement.
              <br>
              De plus, nous avons ouvert une API permettant à quiconque de récupérer la liste des cours par personne et par date.
              <a
                href="https://docs.api-calendar.calendz.app/"
                target="_blank"
                rel="noreferrer noopenner">En savoir plus</a>
            </p>
            <div class="btn-wrapper">
              <a
                href="https://github.com/calendz"
                target="_blank"
                rel="noreferrer noopenner"
                class="btn btn-neutral mb-3 mb-sm-0">
                <span class="btn-inner--text">Contribuer</span>
              </a>
              <a
                href="https://paypal.me/calendz/2"
                target="_blank"
                rel="noreferrer noopenner"
                class="btn btn-success btn-icon mb-3 mb-sm-0">
                <span class="btn-inner--icon"><i class="fas fa-coins"/></span>
                <span class="btn-inner--text">Nous financer</span>
                <span class="badge badge-md badge-pill badge-floating badge-danger border-white">2€</span>
              </a>
            </div>

            <div class="mt-7">
              <p class="display-4">Ils nous aident à financer Calendz</p>
              <div class="avatar rounded-circle">
                <!-- Arthur Dufour -->
                <el-tooltip
                  content="Arthur Dufour"
                  placement="bottom">
                  <img
                    class="mx-2"
                    src="https://cdn.discordapp.com/avatars/255065617705467912/b4b7413f8c24e7a5f5fcdee5c2f626da.png"
                    alt="Arthur Dufour">
                </el-tooltip>

                <!-- Alexandre Tuet -->
                <el-tooltip
                  content="Alexandre Tuet"
                  placement="bottom">
                  <img
                    class="mx-2"
                    src="https://media-exp1.licdn.com/dms/image/C4D03AQFiQff42OzX-Q/profile-displayphoto-shrink_200_200/0?e=1605139200&v=beta&t=2iFtMMxHtgBfcSjZnJbRSapOQFqpm0wM6GJBfxbp9ks"
                    alt="Alexandre Tuet">
                </el-tooltip>

                <!-- Valentin Lardet -->
                <el-tooltip
                  content="Valentin Lardet"
                  placement="bottom">
                  <img
                    class="mx-2"
                    src="img/theme/default-pp.png"
                    alt="Valentin Lardet">
                </el-tooltip>
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
</style>
