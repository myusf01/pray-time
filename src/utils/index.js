import {
  cityUrl,
  countryUrl,
  requestOptions,
  timingsUrl,
  townUrl,
  timingsByDateUrl
} from './urlInfo'

import { convertToDate, convertJson } from './convertFunctions'

const defaultCountry = { id: 225, name: 'Turkey', iso2: 'TR' }
const defaultCity = { id: 2170, name: 'Istanbul', iso2: '34' }
const defaultTown = { id: 107632, name: 'Fatih' }
export {
  convertToDate,
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
}
