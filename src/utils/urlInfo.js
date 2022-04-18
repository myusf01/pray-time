// const timingsUrl = `${process.env.VUE_APP_CORS_URL}/${process.env.VUE_APP_ADHAN_API_URL}`
// const timingsByDateUrl = `${process.env.VUE_APP_CORS_URL}/${process.env.VUE_APP_ADHAN_API_BY_DATE_URL}`
const countryUrl = `${process.env.VUE_APP_CORS_URL}/${process.env.VUE_APP_COUNTRY_API_URL}`
const tuneObj = {
  Imsak: 10,
  Fajr: 0,
  Sunrise: -5,
  Dhuhr: 5,
  Asr: 3,
  Sunset: 0,
  Maghrib: 6,
  Isha: 2,
  Midnight: 0
}

const cityUrl = (state) => `${countryUrl}/${state.userCountry.iso2}/states`
const townUrl = (state) =>
  `${countryUrl}/${state.userCountry.iso2}/states/${state.userCity.iso2}/cities`

function timingsByDateUrl(date, method, town, city, country) {
  const baseUrl = `${process.env.VUE_APP_CORS_URL}/${process.env.VUE_APP_ADHAN_API_BY_DATE_URL}`
  const tune = Object.values(tuneObj).join()
  return `${baseUrl}/${date}?method=${method}&tune=${tune}&address=${town},${city},${country}`
}

function timingsUrl(method, town, city, country) {
  const baseUrl = `${process.env.VUE_APP_CORS_URL}/${process.env.VUE_APP_ADHAN_API_URL}`
  // get values from tune object then convert to string.
  const tune = Object.values(tuneObj).join()
  return `${baseUrl}method=${method}&tune=${tune}&address=${town},${city},${country}`
}

function getHeader() {
  const headers = new Headers()
  headers.append('X-CSCAPI-KEY', process.env.VUE_APP_COUNTRY_API_KEY)
  return headers
}
const requestOptions = {
  method: 'GET',
  headers: getHeader(),
  redirect: 'follow'
}

export {
  timingsUrl,
  countryUrl,
  timingsByDateUrl,
  cityUrl,
  townUrl,
  requestOptions
}
