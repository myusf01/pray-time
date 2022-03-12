const timingsUrl = `${process.env.VUE_APP_CORS_URL}/${process.env.VUE_APP_ADHAN_API_URL}`
const countryUrl = `${process.env.VUE_APP_CORS_URL}/${process.env.VUE_APP_COUNTRY_API_URL}`
const cityUrl = (state) => `${countryUrl}/${state.countryIsoId}/states`
const townUrl = (state) =>
  `${countryUrl}/${state.countryIsoId}/states/${state.cityIsoId}/cities`

const headers = new Headers()
headers.append('X-CSCAPI-KEY', process.env.VUE_APP_COUNTRY_API_KEY)
const requestOptions = { method: 'GET', headers: headers, redirect: 'follow' }

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
      // const data = await res.json()
      const data = (await res.json()).sort((a, b) => a.iso2 - b.iso2)

      commit('GET_CITIES', data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchTowns({ commit, state }) {
    try {
      const res = await fetch(townUrl(state), requestOptions)
      const data = (await res.json()).sort((a, b) => a.iso2 - b.iso2)
      commit('GET_TOWNS', data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchTimings({ commit, state }) {
    const town = state.townIsoId
    const city = state.cityIsoId
    const country = state.countryIsoId
    try {
      const res = await fetch(
        // `${process.env.VUE_APP_ADHAN_API_URL}city=${city}&country=${country}`
        `${timingsUrl}address=${town},${city},${country}`
      )

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
