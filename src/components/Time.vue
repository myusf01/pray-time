<template>
  <div
    v-if="!isActiveTime"
    class="inactive-card-container padding-sm shadow-2xl"
    :class="[currentTime, { 'active-time': isActiveTime }]"
  >
    <div class="inactive-text text-xl sm:text-2xl text-slate-100">
      <span class="">{{ timing }}</span>
      <span class="font-bold">{{ hour }}</span>
    </div>
  </div>
  <div
    v-else
    class="inactive-card-container active-card-container drop-shadow-2xl"
    :class="[currentTime, { 'active-time': isActiveTime }]"
  >
    <div class="mx-auto space-y-10 p-2 text-slate-100 my-auto">
      <div class="active-text mb-[30%]">
        <router-link
          class="block font-bold text-3xl md:text-5xl underline"
          to="/settings"
          >{{ userCity }}</router-link
        >
        <div class="active-text space-y-1">
          <span class="text-xl md:text-3xl">
            {{ dayInfo.hijri.stringEN }}
          </span>
          <span class="md:text-2xl">
            {{ dayInfo.gregorian.string }}
          </span>
        </div>
      </div>
      <div class="active-text text-2xl md:text-4xl">
        <span class="font-bold">{{ timing }}</span>
        <span class="">{{ hour }}</span>
      </div>
    </div>
    <div
      class="counter m-auto active-text space-y-0 p-3 rounded-full shadow-md shadow-zinc-500-300/50 text-stone-100 bg-slate-50/10 w-32 h-32 text-lg md:w-40 md:h-40 md:text-3xl"
    >
      <span>{{ remaining }}</span>
      <span class="font-medium text-2xl">to {{ next }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TimeComponent',
  props: {
    timing: String,
    hour: String,
    currentTime: String,
    remaining: String,
    dayInfo: Object
  },
  computed: {
    ...mapGetters(['userCity', 'nextTime']),
    isActiveTime() {
      return this.timing === this.currentTime
    },
    next() {
      return this.nextTime
    }
  }
}
</script>
