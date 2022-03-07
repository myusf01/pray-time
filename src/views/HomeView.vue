<template>
  <div class="home">
    <Times />
  </div>
</template>

<script>
// @ is an alias to /src
import Times from '@/components/Times.vue'
import { mapActions } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    Times
  },
  methods: {
    ...mapActions(['fetchTimings'])
  },
  beforeMount() {
    this.fetchTimings()
  }
}
</script>
