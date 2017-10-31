export default {
  state: {
    backRoute: '/',
    hash: '',
    icon: '',
    iframeTabs: false,
    title: 'Gunbot Dashboard',
    tabs: []
  },
  set (newState) {
    this.state.title = newState.title || ''
    this.state.hash = newState.hash || ''
    this.state.icon = newState.icon || ''
    this.state.iframeTabs = newState.iframeTabs || false
    this.state.backRoute = newState.backRoute || '/dashboard'
    this.state.tabs = newState.tabs || []
  }
}
