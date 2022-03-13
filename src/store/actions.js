import { convertJson } from '../utils/index'

const timingsUrl = `${process.env.VUE_APP_CORS_URL}/${process.env.VUE_APP_ADHAN_API_URL}`
const countryUrl = `${process.env.VUE_APP_CORS_URL}/${process.env.VUE_APP_COUNTRY_API_URL}`
const cityUrl = (state) => `${countryUrl}/${state.userCountry.iso2}/states`
const townUrl = (state) =>
  `${countryUrl}/${state.userCountry.iso2}/states/${state.userCity.iso2}/cities`

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
      // const resJson = await res.json()
      const resJson = await res.json()

      const data = !resJson.length ? [convertJson(state.userCountry)] : resJson
      console.log(data)
      commit('GET_CITIES', data)
      // console.log(state.countries)
      // let data
      // if (!resData.length) {
      //   const getCountry = state.countries.find(
      //     (country) => state.countryIsoId === country.iso2
      //   )

      //   data = [JSON.parse(JSON.stringify(getCountry))]
      //   console.log(data)
      //   commit('GET_CITIES', data)
      // } else {
      //   data = resData.sort((a, b) => a.iso2 - b.iso2)
      //   commit('GET_CITIES', data)
      // }
    } catch (e) {
      console.log(e)
    }
  },
  async fetchTowns({ commit, state }) {
    try {
      const res = await fetch(townUrl(state), requestOptions)
      const resJson = await res.json()
      // if (res.status === 200 && !resJson.length) {
      //   const getUserCity = state.cities.find(
      //     (city) => city.iso2 === state.cityIsoId
      //   )
      //   return getUserCity
      // }

      // const data = resJson.sort((a, b) => a.iso2 - b.iso2)
      const data = !resJson.length
        ? [convertJson(state.userCity)]
        : resJson.sort((a, b) => a.iso2 - b.iso2)
      console.log(data)
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
    // const countryList = state.countries
    // const cityList = state.cities
    // const townList = state.towns
    // const cityList = !state.cities.length ? state.countries : state.cities
    // const townList = !state.towns.length ? state.cities : state.towns
    // if (!cityList.length || !townList.length) {
    // }
    // const country = countryList.find(
    //   (country) => state.countryIsoId === country.iso2
    // ).name
    // const city = !state.cities.length
    //   ? country
    //   : cityList.find((city) => state.cityIsoId === city.iso2).name
    // const town = !state.towns.length
    //   ? city
    //   : townList.find((town) => state.userTown.name === town.name).name

    try {
      // `${process.env.VUE_APP_ADHAN_API_URL}city=${city}&country=${country}`
      const res = !country ? await fetch(defaultUrl) : await fetch(apiUrl)
      console.log(res)
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
