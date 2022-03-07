import moment from 'moment/moment'

export default {
  today: (state) => {
    const theDay = state.times.find((time) =>
      moment(time.date.gregorian.date, 'DD-MM-YYYY').isSame(moment(), 'day')
    )
    console.log(theDay)
    return theDay
  }
}
