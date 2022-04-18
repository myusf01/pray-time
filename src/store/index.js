import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import moment from 'moment-timezone'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

// const vuexLocalPersistence = new VuexPersistence({
//   storage: window.localStorage
// })
export default createStore({
  plugins: [createPersistedState()],
  state: {
    now: moment().tz(getters.timeZone.tz),
    countries: [],
    cities: [],
    towns: [],
    times: [],
    todayTimes: [],
    tomorrowTimes: [],
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
