<template>
  <div class="layout-padding page-dashboard">
    <div class="showcase-top text-center" style="color: #fff;">
      <img src="~assets/gb-logo-standalone.png" />

      <p class="caption">
        Dashboard page
      </p>
      <div v-for="(value, key) in pairIndicators">
        {{ key }}:
        {{ value.Exchange }} -
        {{ value.Pair }} -
        {{ value.Base_balance }} -
        {{ value.Quote_balance }} -
        {{ value.On_Orders }} -
        {{ value.Bid }} -
        {{ value.Ask }} -
        {{ value.Sell }} -
        {{ value.Break_point }} -
        {{ value.Bought_avg }} -
        {{ value.Status_message }} -
        {{ value.Bought_volume }} -
        {{ value.Price }} -
        {{ value.Sold_volume }} -
        {{ value.Averaged_down_volume }} -
        {{ value.Open_order }} -
        {{ value.Last_order }} -
        {{ value.EMA1 }} -
        {{ value.EMA2 }} -
        {{ value.LowBB }} -
        {{ value.HighBB }} -
        {{ value.SMA }} -
        {{ value.Status_message1 }} -
        {{ value.Status_message2 }} -
        {{ value.GB_status }}
        <br><br>
      </div>
    </div>
  </div>
</template>

<script>
import pairIndicators from '../graphql/pairIndicators.gql'

export default {
  data: () => ({
    pairIndicators: ''
  }),
  apollo: {
    pairIndicators: {
      query: pairIndicators,
      variables: {
        exchange: 'poloniex',
        pair: 'BTC_VIA'
      }
    }
  }
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
