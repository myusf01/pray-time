import moment from 'moment/moment'

export default {
  today: (state) => {
    const theDay = state.times.find((time) =>
      moment(time.date.gregorian.date, 'DD-MM-YYYY').isSame(moment(), 'day')
    )
    // console.log(theDay)
    // const timingsJson = JSON.parse(JSON.stringify(theDay.timings))
    const timings = theDay.timings
    const timingsJson = {
      Imsak: timings.Imsak,
      Sunrise: timings.Sunrise,
      Dhuhr: timings.Dhuhr,
      Asr: timings.Asr,
      Maghrib: timings.Maghrib,
      Isha: timings.Isha
    }
    // console.log(timingsJson)
    return timingsJson
  },
  userCity: (state) => {
    const findCity = state.cities.find((city) => state.cityIsoId === city.iso2)
    return findCity
  }
}

// Asr: "15:33 (+03)"
// Dhuhr: "12:16 (+03)"
// Fajr: "05:00 (+03)"
// Imsak: "04:50 (+03)"
// Isha: "19:27 (+03)"
// Maghrib: "18:05 (+03)"
// Midnight: "00:16 (+03)"
// Sunrise: "06:27 (+03)"
// Sunset: "18:05 (+03)"
