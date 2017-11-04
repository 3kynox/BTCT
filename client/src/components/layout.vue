<template>
  <q-layout ref="layout" view="Lhh lpr lFf" reveal :style="{'background-image': `url(${require('../assets/layout/caffeine-medium-100x100.png')})`}">
    <q-toolbar slot="header" :style="{'background-image': `url(${require('../assets/layout/caffeine-strong-100x100.png')})`}" style="height: 120px; background: none;">
      <q-btn flat v-go-back.single="store.backRoute" class="cordova-only electron-only">
        <q-icon name="arrow_back" />
      </q-btn>
      <q-toolbar-title>
        <q-icon
          v-show="store.icon"
          style="font-size: 2rem; margin-right: 5px;"
          :name="store.icon"
        />
        {{ store.title }}
      </q-toolbar-title>
      <q-btn flat class="within-iframe-hide" @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>
    </q-toolbar>

    <q-tabs
      slot="navigation"
      v-if="store.tabs.length > 0"
      :class="{'within-iframe-hide': !store.iframeTabs}"
      :style="{'box-shadow': `none`, '-webkit-box-shadow': `none`, '-moz-box-shadow': `none` }"
    >
      <q-route-tab
        v-for="tab in store.tabs"
        :key="tab.hash"
        slot="title"
        :icon="tab.icon"
        :to="`/dashboard${store.hash}/${tab.hash}`"
        :label="tab.label"
        exact
        replace
      />
    </q-tabs>

    <q-scroll-area
      slot="left"
      style="width: 100%; height: 100%;"
      :style="{'background-image': `url(${require('../assets/layout/caffeine-strong-100x100.png')})`}"
    >
      <div class="row flex-center" style="width: 100%; height: 120px;" :style="{'background-image': `url(${require('../assets/layout/caffeine-light-100x100.png')})`}">
        <img src="~assets/gb-logo-standalone.png" height="80px" />
        <div style="padding-left: 1em; color: white; text-overflow: ellipsis; font-weight: bold;">
          Gunbot v5.0.5.6
        </div>
      </div>
      <q-list no-border>
        <q-side-link
          item
          to="/dashboard"
          exact
          replace
        >
          <q-item-side icon="home" />
          <q-item-main label="Dashboard" />
          <q-item-side right icon="chevron_right" />
        </q-side-link>
        <q-item-separator />
      </q-list>
    </q-scroll-area>

    <router-view />
  </q-layout>
</template>

<script>
import store from './store'
import {
  QScrollArea,
  QList,
  QSideLink,
  QListHeader,
  QItemSide,
  QItemMain,
  QItemSeparator,
  QBtn,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QIcon,
  QTabs,
  QRouteTab,
  GoBack
} from 'quasar'

export default {
  components: {
    QScrollArea,
    QList,
    QSideLink,
    QListHeader,
    QItemSide,
    QItemMain,
    QItemSeparator,
    QBtn,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QIcon,
    QTabs,
    QRouteTab
  },
  directives: {
    GoBack
  },
  data () {
    return {
      store: store.state
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.layout-header
  box-shadow none
.layout-aside.fixed.on-layout
  box-shadow none
</style>