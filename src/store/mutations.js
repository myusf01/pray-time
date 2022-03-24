import moment from 'moment/moment'
export default {
  UPDATE_TIME(state) {
    state.now = moment()
  },
  GET_COUNTRIES(state, data) {
    state.countries = data
  },
  GET_CITIES(state, data) {
    state.cities = data
  },
  GET_TOWNS(state, data) {
    state.towns = data
  },
  GET_TIMINGS(state, data) {
    state.times = data
  },
  SET_COUNTRY_ID(state, data) {
    state.countryIsoId = data
  },
  SET_CITY_ID(state, data) {
    state.cityIsoId = data
  },
  SET_TOWN_ID(state, data) {
    state.userTown.name = data
  },
  SET_USER_COUNTRY(state, data) {
    state.userCountry = data
  },
  SET_USER_CITY(state, data) {
    state.userCity = data
  },
  SET_USER_TOWN(state, data) {
    state.userTown = data
  }
}
