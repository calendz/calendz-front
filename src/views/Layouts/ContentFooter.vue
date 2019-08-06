<template>
  <footer class="footer px-4 mx-2">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6">
        <div class="copyright text-center text-lg-left text-muted">
          © {{ year }} <a
            href="https://arthurdufour.com/"
            class="font-weight-bold ml-1"
            target="_blank">Arthur Dufour</a> &
          <a
            href="https://alexandretuet.com/"
            class="font-weight-bold ml-1"
            target="_blank">Alexandre Tuet</a>
        </div>
      </div>
      <div class="col-lg-6">
        <ul class="nav nav-footer justify-content-center justify-content-lg-end">
          <li class="nav-item">
            <a
              href="https://github.com/calendz"
              class="nav-link"
              target="_blank">Github</a>
          </li>
          <li class="nav-item">
            <a
              href="http://blog.creative-tim.com"
              class="nav-link"
              target="_blank">Blog</a>
          </li>
          <li class="nav-item">
            <a
              href="https://www.creative-tim.com/license"
              class="nav-link"
              target="_blank">License</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
<style></style>
