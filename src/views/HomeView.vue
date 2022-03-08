<template>
  <div
    class="bg-amber-500 flex flex-row justify-center space-x-6 w-screen h-screen"
  >
    <div class="flex flex-row justify-center">
      <Times />
    </div>
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
