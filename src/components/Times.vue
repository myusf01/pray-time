<template>
  <Time :times="todayTimes" :currentTime="activeTime" />
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
    ...mapGetters(['today', 'activeTime']),
    todayTimes: (getters) => {
      const today = getters.today
      return {
        Imsak: today.Imsak,
        Sunrise: today.Sunrise,
        Dhuhr: today.Dhuhr,
        Asr: today.Asr,
        Maghrib: today.Maghrib,
        Isha: today.Isha
      }
    }
  }
}
</script>
