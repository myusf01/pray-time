<template>
  <Time v-for="time in times" :key="time.date.readable" :times="time.timings" />
  <div>
    {{ today }}
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Time from './Time.vue'
export default {
  name: 'TimesComponent',
  components: {
    Time
  },
  computed: {
    ...mapGetters(['today']),
    ...mapState(['times'])
  }
}
</script>
