<template>
  <div class="media media-comment">
    <img
      :src="userImage"
      alt="Image placeholder"
      class="avatar avatar-lg media-comment-avatar rounded-circle">
    <div class="media-body">
      <div class="media-comment-text">
        <h6 class="h5 mt-0">{{ userName }}</h6>
        <p
          class="text-sm lh-160"
          v-html="text"/>
        <div class="icon-actions">
          <a
            href="#"
            class="like active">
            <i class="ni ni-like-2"/>
            <span class="text-muted">{{ likeCount }} likes</span>
          </a>
          <a href="#">
            <i class="ni ni-curved-next"/>
            <span class="text-muted">{{ shareCount }} shares</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Comment',
  props: {
    userImage: {
      type: String,
      default: 'img/theme/team-1.jpg'
    },
    userName: {
      type: String,
      default: 'Michael Lewis'
    },
    text: {
      type: String,
      default: 'Cras sit amet nibh libero nulla vel metus scelerisque ante sollicitudin. Cras purus odio vestibulum in vulputate viverra turpis.'
    },
    likeCount: {
      type: Number,
      default: 0
    },
    shareCount: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style>
</style>
