import {
  convertJson,
  cityUrl,
  countryUrl,
  requestOptions,
  timingsUrl,
  townUrl,
  timingsByDateUrl,
  defaultCountry,
  defaultCity,
  defaultTown
} from '@/utils'
import moment from 'moment-timezone'

const method = 13
export default {
  async init({ commit, dispatch }) {
    try {
      await dispatch('fetchCountries')
      commit('SET_USER_COUNTRY', defaultCountry)
      await dispatch('fetchCities')
      commit('SET_USER_CITY', defaultCity)
      await dispatch('fetchTowns')
      commit('SET_USER_TOWN', defaultTown)
      await dispatch('fetchTimings')
      await dispatch('fetchTimingsTomorrow')
      await dispatch('setTimezone')
    } catch (e) {
      console.log(e)
    }
  },
  async setTimezone({ state }) {
    try {
      const tz = state.todayTimes.timezone
      moment.tz.setDefault(tz)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchCountries({ commit }) {
    try {
      const res = await fetch(countryUrl, requestOptions)
      const data = await res.json()
      commit('GET_COUNTRIES', data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchCities({ commit, state }) {
    try {
      const res = await fetch(cityUrl(state), requestOptions)
      // const resJson = await res.json()
      const resJson = await res.json()

      const data = !resJson.length
        ? [convertJson(state.userCountry)]
        : resJson.sort((a, b) => a.iso2 - b.iso2)
      commit('GET_CITIES', data)
      commit('GET_TOWNS', [])
    } catch (e) {
      console.log(e)
    }
  },
  async fetchTowns({ commit, state }) {
    try {
      const res = await fetch(townUrl(state), requestOptions)
      const resJson = await res.json()

      const data = !resJson.length
        ? [convertJson(state.userCity)]
        : resJson.sort((a, b) => a.iso2 - b.iso2)
      commit('GET_TOWNS', data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchTimings({ commit, state }) {
    const town = state.userTown.name
    const city = state.userCity.name
    const country = state.userCountry.name

    const apiUrl = timingsUrl(method, town, city, country)

    try {
      const res = await fetch(apiUrl)

      const { data } = await res.json()

      commit('GET_TIMINGS', data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchTimingsTomorrow({ commit, state }) {
    const town = state.userTown.name
    const city = state.userCity.name
    const country = state.userCountry.name
    const date = moment(state.now, 'DD-MM-YYYY')
      .add(1, 'days')
      .format('DD-MM-YYYY')
    const apiUrl = timingsByDateUrl(date, method, town, city, country)

    try {
      const res = await fetch(apiUrl)
      const { data } = await res.json()
      commit('SET_TOMORROW_TIMINGS', data)
    } catch (e) {
      console.log(e)
    }
  }
}
