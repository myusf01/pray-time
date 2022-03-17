const timingsUrl = `${process.env.VUE_APP_CORS_URL}/${process.env.VUE_APP_ADHAN_API_URL}`
const countryUrl = `${process.env.VUE_APP_CORS_URL}/${process.env.VUE_APP_COUNTRY_API_URL}`

const cityUrl = (state) => `${countryUrl}/${state.userCountry.iso2}/states`
const townUrl = (state) =>
  `${countryUrl}/${state.userCountry.iso2}/states/${state.userCity.iso2}/cities`

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

export { timingsUrl, countryUrl, cityUrl, townUrl, requestOptions }
