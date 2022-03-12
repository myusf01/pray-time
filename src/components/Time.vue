<template>
  <div
    class="time-card-container"
    v-for="(hour, timing) in times"
    :key="timing"
  >
    <div class="text-container">
      <p class="text-xl text-right">{{ timing }}</p>
      <p class="text-right">{{ hour.split(' ')[0] }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeComponent',
  props: { times: Object }
}
</script>
