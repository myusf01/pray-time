import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.css'

async function init() {
  const tz = store.state.todayTimes.timezone
  store.commit('UPDATE_TIME', tz)
  setInterval(() => {
    store.commit('UPDATE_TIME', tz)
  }, 1000)

  if (!store.state.countries.length) {
    await store.dispatch('init')
  }
  if (!store.state.tomorrowTimes.length) {
    await store.dispatch('fetchTimingsTomorrow')
  }

  createApp(App).use(store).use(router).mount('#app')
}

init()
