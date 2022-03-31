import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.css'

async function init() {
  store.commit('UPDATE_TIME')
  setInterval(() => {
    store.commit('UPDATE_TIME')
  }, 1000)

  if (!store.state.countries.length) {
    await store.dispatch('init')
  }
  if (!store.getters.tomorrow) {
    await store.dispatch('fetchTimings')
    await store.dispatch('fetchTimingsTomorrow')
  }

  createApp(App).use(store).use(router).mount('#app')
}

init()
