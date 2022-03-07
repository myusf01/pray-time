export default {
  async fetchCountries({ commit }) {
    try {
      const data = await (
        await fetch(`${process.env.VUE_APP_COUNTRY_API_URL}`)
      ).json()
      console.log(await data.json())

      commit('GET_COUNTRIES', data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchCities({ commit, state }) {
    try {
      const data = fetch(state.countryId)
      commit('GET_CITIES', data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchTowns({ commit, state }) {
    try {
      const data = fetch(state.cityId)
      commit('GET_TOWNS', data)
    } catch (e) {
      console.log(e)
    }
  },
  async fetchTimings({ commit }) {
    // const city = ''
    // const country = ''
    try {
      const res = await fetch(
        `${process.env.VUE_APP_ADHAN_API_URL}city=Hakkari&country=Turkey`
      )

      //   const data = await fetch(
      //     `${process.env.VUE_APP_ADHAN_API_URL}city=${state.cityId}&country=${state.countryId}`
      //   ).json

      const { data } = await res.json()
      console.log(data)
      commit('GET_TIMINGS', data)
    } catch (e) {
      console.log(e)
    }
  }
}
