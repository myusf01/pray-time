export default {
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
  }
}
