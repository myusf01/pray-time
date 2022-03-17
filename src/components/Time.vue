<template>
  <div class="time-card-container">
    <div class="text-container">
      <div class="active-time" v-if="isActiveTime">Time is active</div>
      <p class="text-xl text-right">{{ timing }}</p>
      <p class="text-right">{{ hour }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeComponent',
  props: { timing: String, hour: String, currentTime: String },
  computed: {
    isActiveTime() {
      return this.timing === this.currentTime
    }
  }
}
</script>
