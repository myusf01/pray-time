import { convertJson } from '@/utils'
// import { newTimes } from '@/utils/convertTimings'
import moment from 'moment/moment'
import momentDurationFormatSetup from 'moment-duration-format'
import Timing from '@/utils/convertTimings'
momentDurationFormatSetup(moment)

export default {
  today: (state) => {
    const time = convertJson(state.times)
    if (!time.length) return false

    const times = time.find((time) =>
      moment(time.date.gregorian.date, 'DD-MM-YYYY').isSame(
        moment(state.now),
        'day'
      )
    )
    const timings = { ...times.timings, date: times.date.gregorian.date }
    // const timings = times.timings
    const newTimings = new Timing(timings)
    console.log(newTimings)
    // const timingsJson = {
    //   Date: times.date.gregorian.date,
    //   Imsak: timings.Imsak.split(' ')[0],
    //   Sunrise: timings.Sunrise.split(' ')[0],
    //   Dhuhr: timings.Dhuhr.split(' ')[0],
    //   Asr: timings.Asr.split(' ')[0],
    //   Maghrib: timings.Maghrib.split(' ')[0],
    //   Isha: timings.Isha.split(' ')[0]
    // }

    // state.todayTimes = timingsJson
    // return timingsJson
    return newTimings
  },
  tomorrow: (state) => {
    const time = convertJson(state.times)
    if (!time.length) return false
    // const now = convertJson(state.now)
    const times = time.find((time) =>
      moment(time.date.gregorian.date, 'DD-MM-YYYY').isSame(
        moment(state.now).add(1, 'days'),
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
    const todayMoment = moment(state.now)
    if (
      todayMoment.isBetween(
        getters.today.Imsak,
        getters.today.Sunrise,
        null,
        '[)'
      )
    ) {
      return 'Imsak'
    } else if (
      todayMoment.isBetween(
        getters.today.Sunrise,
        getters.today.Dhuhr,
        null,
        '[)'
      )
    ) {
      return 'Sunrise'
    } else if (
      todayMoment.isBetween(getters.today.Dhuhr, getters.today.Asr, null, '[)')
    ) {
      return 'Dhuhr'
    } else if (
      todayMoment.isBetween(
        getters.today.Asr,
        getters.today.Maghrib,
        null,
        '[)'
      )
    ) {
      return 'Asr'
    } else if (
      todayMoment.isBetween(
        getters.today.Maghrib,
        getters.today.Isha,
        null,
        '[)'
      )
    ) {
      return 'Maghrib'
    } else if (
      todayMoment.isBetween(
        getters.today.Isha,
        getters.tomorrow.Imsak.tomorrow.Date,
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
    const imsak = getters.today.Imsak
    return moment(state.now).isBetween(
      moment(state.now).startOf('date'),
      imsak,
      null,
      '[)'
    )
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
      differenceSeconds = !getters.isBeforeImsak
        ? getters.tomorrow.Imsak.diff(moment(state.now), 'second')
        : today.Imsak.diff(moment(state.now), 'second')
      // const isit = getters.isBeforeImsak ? 'yes' : 'no'
      // console.log(isit)
      // differenceSeconds = convertToDate(
      //   getters.tomorrow.Imsak,
      //   getters.tomorrow.Date
      // ).diff(moment(state.now), 'second')
    } else {
      differenceSeconds = today[nextTime].diff(moment(state.now), 'seconds')
    }
    return moment.duration(differenceSeconds, 'seconds').format('HH:mm:ss')
  },
  dayInfo: (state) => {
    const time = convertJson(state.times)
    if (!time.length) return false

    const times = time.find((time) =>
      moment(time.date.gregorian.date, 'DD-MM-YYYY').isSame(
        moment(state.now),
        'day'
      )
    ).date
    const hijri = {
      date: times.hijri.date,
      stringEN: `${times.hijri.month.en} ${times.hijri.day}, ${times.hijri.year}`,
      stringAR: `${times.hijri.month.ar} ${times.hijri.day}, ${times.hijri.year}`
    }
    // const gregorian = times.gregorian
    const gregorian = {
      date: times.gregorian.date,
      string: `${times.gregorian.month.en} ${times.gregorian.day}, ${times.gregorian.year}`
    }

    return { hijri, gregorian }
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
