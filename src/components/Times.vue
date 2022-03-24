<template>
  <Time
    v-for="(value, key) in todayTimes"
    :timing="key"
    :hour="value"
    :key="key"
    :currentTime="activeTime"
    :remaining="calcRemainingTime(activeTime, today)"
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
    ...mapGetters(['today', 'activeTime', 'calcRemainingTime']),
    todayTimes(getters) {
      const today = getters.today
      const times = {
        Imsak: today.Imsak,
        Sunrise: today.Sunrise,
        Dhuhr: today.Dhuhr,
        Asr: today.Asr,
        Maghrib: today.Maghrib,
        Isha: today.Isha
      }
      return times
    }
  }
}
</script>
