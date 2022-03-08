<template>
  <Time :times="today" />
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
    ...mapGetters(['today'])
  }
}
</script>
