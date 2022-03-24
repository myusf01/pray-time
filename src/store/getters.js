import { convertJson, convertToDate } from '@/utils'
// import { newTimes } from '@/utils/convertTimings'
import moment from 'moment/moment'
import momentDurationFormatSetup from 'moment-duration-format'
momentDurationFormatSetup(moment)

export default {
  today: (state) => {
    const time = convertJson(state.times)
    if (!time.length) return false

    const times = time.find((time) =>
      moment(time.date.gregorian.date, 'DD-MM-YYYY').isSame(moment(), 'day')
    )
    // const timings = { ...times.timings, date: times.date.gregorian.date }
    const timings = times.timings
    // const newTimings = new newTimes(timings)
    // console.log(newTimings)
    const timingsJson = {
      Date: times.date.gregorian.date,
      Imsak: timings.Imsak.split(' ')[0],
      Sunrise: timings.Sunrise.split(' ')[0],
      Dhuhr: timings.Dhuhr.split(' ')[0],
      Asr: timings.Asr.split(' ')[0],
      Maghrib: timings.Maghrib.split(' ')[0],
      Isha: timings.Isha.split(' ')[0]
    }

    state.todayTimes = timingsJson
    return timingsJson
    // return newTimings
  },
  tomorrow: (state) => {
    const time = convertJson(state.times)
    if (!time.length) return false
    // const now = convertJson(state.now)
    const times = time.find((time) =>
      moment(time.date.gregorian.date, 'DD-MM-YYYY').isSame(
        moment().add(1, 'days'),
        'day'
      )
    )
    const timings = times.timings
    // const newTimings = new newTimes(timings)
    // console.log(newTimings)
    const timingsJson = {
      Date: times.date.gregorian.date,
      Imsak: timings.Imsak.split(' ')[0],
      Sunrise: timings.Sunrise.split(' ')[0],
      Dhuhr: timings.Dhuhr.split(' ')[0],
      Asr: timings.Asr.split(' ')[0],
      Maghrib: timings.Maghrib.split(' ')[0],
      Isha: timings.Isha.split(' ')[0]
    }

    return timingsJson
  },
  userCity: (state) => {
    const userTown = convertJson(state.userTown).name
    return !userTown ? 'Select City' : userTown
  },
  activeTime: (state, getters) => {
    const todayDate = getters.todayDate
    const todayMoment = moment()
    if (
      todayMoment.isBetween(
        convertToDate(getters.today.Imsak, todayDate),
        convertToDate(getters.today.Sunrise, todayDate),
        null,
        '[)'
      )
    ) {
      return 'Imsak'
    } else if (
      todayMoment.isBetween(
        convertToDate(getters.today.Sunrise, todayDate),
        convertToDate(getters.today.Dhuhr, todayDate),
        null,
        '[)'
      )
    ) {
      return 'Sunrise'
    } else if (
      todayMoment.isBetween(
        convertToDate(getters.today.Dhuhr, todayDate),
        convertToDate(getters.today.Asr, todayDate),
        null,
        '[)'
      )
    ) {
      return 'Dhuhr'
    } else if (
      todayMoment.isBetween(
        convertToDate(getters.today.Asr, todayDate),
        convertToDate(getters.today.Maghrib, todayDate),
        null,
        '[)'
      )
    ) {
      return 'Asr'
    } else if (
      todayMoment.isBetween(
        convertToDate(getters.today.Maghrib, todayDate),
        convertToDate(getters.today.Isha, todayDate),
        null,
        '[)'
      )
    ) {
      return 'Maghrib'
    } else if (
      todayMoment.isBetween(
        convertToDate(getters.today.Isha, todayDate),
        convertToDate(getters.tomorrow.Imsak, getters.tomorrow.Date),
        null,
        '[)' || getters.isBeforeImsak
      )
    ) {
      return 'Isha'
    }
  },
  todayDate: (state) => {
    const date = convertJson(state.todayTimes).Date
    return date
  },
  isBeforeImsak: (state, getters) => {
    // const today = convertJson(state.now)
    const todayDate = getters.todayDate
    const imsak = convertToDate(getters.today.Imsak, todayDate)

    return moment().isBetween(moment().startOf('date'), imsak, null, '[)')
  },

  nextTime: () => (activeTime) => {
    switch (activeTime) {
      case 'Imsak':
        return 'Sunrise'
      case 'Sunrise':
        return 'Dhuhr'
      case 'Dhuhr':
        return 'Asr'
      case 'Asr':
        return 'Maghrib'
      case 'Maghrib':
        return 'Isha'
      case 'Isha':
        return 'Imsak'
    }
  },
  calcRemainingTime: (state, getters) => (activeTime, today) => {
    // const todayTimes = today
    // const tomorrowTimes = getters.tomorrow
    // const now = moment(state.now)
    let differenceSeconds
    const nextTime = getters.nextTime(activeTime)

    if (nextTime === 'Imsak') {
      differenceSeconds = getters.isBeforeImsak
        ? convertToDate(today.Imsak, today.Date).diff(
            moment(state.now),
            'second'
          )
        : convertToDate(getters.tomorrow.Imsak, getters.tomorrow.Date).diff(
            moment(state.now),
            'second'
          )
    } else {
      differenceSeconds = convertToDate(today[nextTime], today.Date).diff(
        moment(state.now),
        'seconds'
      )
    }
    return moment.duration(differenceSeconds, 'seconds').format('HH:mm:ss')
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
