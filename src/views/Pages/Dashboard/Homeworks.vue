<template>
  <div>
    <!-- ======================================= -->
    <!-- == "Base header" ====================== -->
    <!-- ======================================= -->
    <base-header
      type="primary"
      class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Devoirs</h6>
          <nav
            aria-label="breadcrumb"
            class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb/>
          </nav>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6 card-wrapper">
      <div
        class="row"
        style="margin-top: 20%; transform: translateY(-20%); margin-bottom: 12%">
        <card
          type="frame"
          class="col-10 mx-auto text-center">
          <h1 class="text-default">Cette fonctionnalité n'est pas encore disponible !</h1>
          <h4 class="font-weight-300">Mais elle arrivera très prochainement, donc restez attentif !</h4>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'

export default {
  components: {
    RouteBreadCrumb
  }
}
</script>
