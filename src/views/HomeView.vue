<template>
  <div
    class="page-container home sm:max-w-3xl min-w-[310px] md:max-w-5xl lg:max-w-full"
  >
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
