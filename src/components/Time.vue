<template>
  <div v-for="(hour, timing) in times" :key="timing">
    <p class="text-xl">{{ timing }}</p>
    <p>{{ hour.split(' ')[0] }}</p>
  </div>
</template>

<script>
export default {
  name: 'TimeComponent',
  props: { times: Object }
}
</script>
