<template>
  <div class="hello">
    <h5>Welcome to Gunthy-GUI</h5>
    <ul>
      <li><a href="https://github.com/GuntharDeNiro/BTCT/wiki" target="_blank" rel="noopener">Docs</a></li>
      <li><a href="https://gunthy.org/" target="_blank" rel="noopener">Forums</a></li>
      <li><a href="https://github.com/GuntharDeNiro/Gunthy" target="_blank" rel="noopener">Github</a></li>
      <li><a href="https://bitcointalk.org/index.php?topic=1715214.0" target="_blank" rel="noopener">BitcoinTalk Post</a></li>
    </ul>
    <button @click="testInterval">Start</button>
  </div>
</template>

<script>
import jQuery from 'jquery'
export default {
  name: 'hello',
  methods: {
    testInterval () {
      let $ = jQuery
      let gbStatus

      setInterval(() => {
        $.ajax({
          type: 'PUT',
          contentType: 'application/json',
          url: '/gbstatus',
          success: function (data) {
            gbStatus = data
          }
        })
        console.log(gbStatus)
      }, 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '~variables'

.hello
  margin-top 50px
  a
    color #35495E

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px
</style>
