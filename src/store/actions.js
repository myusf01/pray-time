import {
  convertJson,
  cityUrl,
  countryUrl,
  requestOptions,
  timingsUrl,
  townUrl
} from '@/utils'

export default {
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
    const apiUrl = `${timingsUrl}address=${town},${city},${country}`
    const defaultUrl = `${timingsUrl}address=Fatih,İstanbul,Turkey`

    try {
      // `${process.env.VUE_APP_ADHAN_API_URL}city=${city}&country=${country}`
      const res = !country ? await fetch(defaultUrl) : await fetch(apiUrl)
      //   const data = await fetch(
      //     `${process.env.VUE_APP_ADHAN_API_URL}city=${state.cityId}&country=${state.countryId}`
      //   ).json
      const { data } = await res.json()
      commit('GET_TIMINGS', data)
    } catch (e) {
      console.log(e)
    }
  }
}
