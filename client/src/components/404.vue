<template>
  <div class="error-page window-height window-width column items-center no-wrap"  :style="{'background-image': `url(${require('../assets/layout/caffeine-strong-100x100.png')})`}">
    <div class="error-code flex flex-center" :style="{'background-image': `url(${require('../assets/layout/caffeine-light-100x100.png')})`}">
      404
    </div>
    <div>
      <div class="error-card shadow-4 column flex-center no-wrap"  :style="{'background-image': `url(${require('../assets/layout/caffeine-strong-100x100.png')})`}">
        <q-icon name="error_outline" color="grey-5" />
        <p class="caption text-center" style="color: #fff">Oops. Nothing here...</p>
        <p class="text-center group">
          <q-btn
            v-if="canGoBack"
            color="cyan-10"
            push
            @click="goBack"
            icon="keyboard_arrow_left"
          >
            Go back
          </q-btn>
          <q-btn
            color="grey-8"
            push
            @click="$router.replace('/')"
            icon-right="home"
          >
            Go home
          </q-btn>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { QBtn, QIcon } from 'quasar'

export default {
  components: {
    QBtn,
    QIcon
  },
  data () {
    return {
      canGoBack: window.history.length > 1
    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="stylus">
.error-page
  .error-code
    height 50vh
    width 100%
    padding-top 15vh
    font-size 30vmax
    color rgba(255, 255, 255, .2)
    overflow hidden
  .error-card
    border-radius 2px
    margin-top -50px
    width 80vw
    max-width 600px
    padding 25px
    > i
      font-size 5rem
</style>
