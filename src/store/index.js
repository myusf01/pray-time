import { createStore } from 'vuex'
import { VuexPersistence } from 'vuex-persist'
import moment from 'moment/moment'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

const vuexLocalPersistence = new VuexPersistence({
  storage: window.localStorage
})
export default createStore({
  plugins: [vuexLocalPersistence.plugin],
  state: {
    now: moment(),
    countries: [],
    cities: [],
    towns: [],
    times: []
  },
  getters,
  mutations,
  actions
})
