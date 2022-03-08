<template>
  <div
    class="flex flex-col justify-center items-center p-5 w-[10vh] bg-slate-100"
    v-for="(hour, timing) in times"
    :key="timing"
  >
    <p class="text-xl">{{ timing }}</p>
    <p class="">{{ hour.split(' ')[0] }}</p>
  </div>
</template>

<script>
export default {
  name: 'TimeComponent',
  props: { times: Object }
}
</script>
