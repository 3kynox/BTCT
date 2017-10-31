<template>
  <div class="layout-padding page-dashboard">
    <div class="showcase-top text-center">
      <img src="~assets/gb-logo-standalone.png" />

      <p class="caption">
        Dashboard page
      </p>
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="stylus">

.page-dashboard
  img
    width 100px
    height 100px
    margin-bottom 15px
  .card
    cursor pointer
    position relative
    padding 16px
    p
      color rgba(0, 0, 0, .87)
      margin 15px 0 0 0 !important
    &:before
      content ''
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      border-radius 2px
      opacity 0
      transition opacity .2s
      background currentColor
    &:hover:before
      opacity .4
</style>
