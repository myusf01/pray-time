import moment from 'moment/moment'

export default class Timing {
  constructor(data) {
    this.Date = data.date
    this.timezone = data.timezone
    this.Imsak = this.convertToDate(data.Imsak.split(' ')[0])
    this.Sunrise = this.convertToDate(data.Sunrise.split(' ')[0])
    this.Dhuhr = this.convertToDate(data.Dhuhr.split(' ')[0])
    this.Asr = this.convertToDate(data.Asr.split(' ')[0])
    this.Maghrib = this.convertToDate(data.Maghrib.split(' ')[0])
    this.Isha = this.convertToDate(data.Isha.split(' ')[0])
  }
  convertToDate(hours) {
    const [hour, minutes] = hours.split(':')
    // console.log(hours)
    // console.log(hour, minutes)
    return moment(this.Date, 'DD-MM-YYYY')
      .hour(hour)
      .minutes(minutes)
      .seconds(0)
      .milliseconds(0)
  }
}
