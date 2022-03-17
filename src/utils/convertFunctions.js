import moment from 'moment/moment'

function convertJson(response) {
  return JSON.parse(JSON.stringify(response))
}
function convertToDate(hours, date) {
  const [hour, minutes] = hours.split(':')
  // console.log(hours)
  // console.log(hour, minutes)
  return moment(date, 'DD-MM-YYYY')
    .hour(hour)
    .minutes(minutes)
    .seconds(0)
    .milliseconds(0)
}
export { convertToDate, convertJson }
