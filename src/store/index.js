import { createStore } from 'vuex'
// import { VuexPersistence } from 'vuex-persist'
import createPersistedState from 'vuex-persistedstate'
import moment from 'moment/moment'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

// const vuexLocalPersistence = new VuexPersistence({
//   storage: window.localStorage
// })
export default createStore({
  plugins: [createPersistedState()],
  state: {
    now: moment(),
    countries: [],
    cities: [],
    towns: [],
    times: [],
    todayTimes: [],
    countryIsoId: '',
    cityIsoId: '',
    townName: '',
    userCountry: {},
    userCity: {},
    userTown: {}
  },
  getters,
  mutations,
  actions
})
