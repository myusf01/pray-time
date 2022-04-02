<template>
  <div :class="activeTime">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['activeTime']),
    ...mapActions(['fetchTimings'])
  },
  beforeMount() {
    this.fetchTimings
  }
}
</script>
