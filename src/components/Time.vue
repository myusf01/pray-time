<template>
  <div
    v-if="!isActiveTime"
    class="inactive-card-container padding-sm bg-gradient-to-b from-[#FBD786] to-[#f7797d] shadow-2xl"
  >
    <div class="inactive-text text-xl sm:text-2xl text-white">
      <span class="">{{ timing }}</span>
      <span class="font-bold">{{ hour }}</span>
    </div>
  </div>
  <div
    v-else
    class="inactive-card-container active-card-container bg-gradient-to-tl from-[#FBD786] to-[#f7797d] drop-shadow-2xl"
  >
    <div class="mx-auto space-y-10 p-2 text-white my-auto">
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
      class="counter active-text ml-auto my-auto p-3 rounded-l-3xl bg-opacity-50 text-2xl text-stone-500 bg-slate-50"
    >
      <span>{{ remaining }} to {{ nextTime(currentTime) }} </span>
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
    }
  }
}
</script>
