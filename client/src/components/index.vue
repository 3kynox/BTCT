<template>
  <div class="index-page bg-grey-10 window-height window-width column items-center no-wrap">
    <div class="banner bg-blue-grey-10 flex flex-center">
      <img src="~assets/gb-logo-standalone.png">
    </div>
    <div class="text-center">
      <div class="card bg-grey-10 shadow-4 column no-wrap flex-center group">
        <img src="~assets/gb-logo.png">

        <p>
          <button @click="logIn('admin', 'admin')">Login</button>
        </p>

        <q-btn
          color="cyan-10"
          push
          @click="$router.push('/dashboard')"
          class="full-width"
          icon="layers"
        >
          Go to Dashboard
        </q-btn>
        <q-btn
          color="secondary"
          push
          class="full-width"
          @click="$router.push('/config')"
          icon="launch"
        >
          Configure Gunbot
        </q-btn>

        <a
          class="row flex-center text-secondary"
          style="margin-top: 15px; font-size: .75rem"
        >
          <div>Privacy Policy</div>
        </a>
      </div>
    </div>
    <a class="ribbon" href="https://github.com/GuntharDeNiro/BTCT/tree/saas-dev" :title="`Fork Project on Github`"></a>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { QBtn } from 'quasar'

const logInQuery = gql`
  mutation logIn($username: String!, $password: String!) {
    logIn(strategy: "local", username: $username, password: $password) {
      accessToken
    }
  }
`

export default {
  methods: {
    logIn (username, password) {
      this.$apollo.mutate({
        mutation: logInQuery,
        variables: {
          username,
          password
        }
      }).then((response) => {
        localStorage.setItem('token', response.data.logIn.accessToken)
        return this.$router.push('/dashboard')
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  components: {
    QBtn
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.index-page
  .banner
    height 50vh
    width 100%
    font-size 30vmax
    color rgba(255, 255, 255, .2)
    overflow hidden
    img
      width 250px
  .card
    width 80vw
    max-width 500px
    padding 10px 25px
    margin-top -90px
    border-radius 2px
    img
      height 180px

.ribbon
  width 12.1em
  height 12.1em
  position absolute
  overflow hidden
  top 0
  right 0
  z-index 39
  pointer-events none
  font-size 15px
  text-decoration none
  text-indent -999999px
  opacity 0.7
  &.fixed
    position fixed
  &:before
    content ''
    padding .38em 0
    background-color white
    background-image linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .15))
    box-shadow 0 .15em .23em 0 rgba(0, 0, 0, .5)
    pointer-events auto
  &:after
    content attr(title)
    color #424242
    line-height 1.54em
    text-decoration none
    text-align center
    text-indent 0
    padding .15em 0
    margin .15em 0

  &:before, &:after
    position absolute
    display block
    width 15.38em
    height 1.74em
    top 3.23em
    right -3.23em
    transform rotate(45deg)
</style>
