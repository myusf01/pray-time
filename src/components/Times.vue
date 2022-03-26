<template>
  <Time
    v-for="(value, key) in todayTimes"
    :timing="key"
    :hour="value"
    :key="key"
    :currentTime="activeTime"
    :remaining="calcRemainingTime"
    :dayInfo="dayInfo"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import Time from './Time.vue'
export default {
  name: 'TimesComponent',
  components: {
    Time
  },
  computed: {
    ...mapGetters(['today', 'activeTime', 'calcRemainingTime', 'dayInfo']),
    todayTimes(getters) {
      const today = getters.today
      const times = {
        Imsak: today.Imsak.format('HH:mm'),
        Sunrise: today.Sunrise.format('HH:mm'),
        Dhuhr: today.Dhuhr.format('HH:mm'),
        Asr: today.Asr.format('HH:mm'),
        Maghrib: today.Maghrib.format('HH:mm'),
        Isha: today.Isha.format('HH:mm')
      }
      return times
    }
  }
}
</script>
