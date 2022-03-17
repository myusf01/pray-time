<template>
  <div
    class="time-card-container"
    v-for="(hour, timing) in times"
    :key="timing"
  >
    <div class="text-container">
      <div class="active-time" v-if="timing === currentTime">
        Time is active
      </div>
      <p class="text-xl text-right">{{ timing }}</p>
      <p class="text-right">{{ hour }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeComponent',
  props: { times: Object, currentTime: String },
  computed: {
    isActiveTime() {
      return this.times === this.currentTime
    }
  },
  data() {
    return {
      activeTime: ''
    }
  }
}
</script>
