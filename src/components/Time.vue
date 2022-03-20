<template>
  <div v-if="!isActiveTime" class="inactive-card-container padding-sm">
    <div class="w-[200px] rotate-left mb-20 space-x-9 text-2xl text-justify">
      <span class="">{{ timing }}</span>
      <span class="font-bold">{{ hour }}</span>
    </div>
  </div>
  <div v-else class="inactive-card-container active-card-container">
    <div class="mx-auto space-y-10 p-2">
      <router-link
        class="font-bold active-text block mb-[30%] sm:text-xl md:text-2xl lg:text-4xl"
        to="/settings"
        >{{ userCity }}</router-link
      >
      <div class="text-container active-text text-2xl">
        <p>{{ timing }}</p>
        <p class="font-bold">{{ hour }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TimeComponent',
  props: { timing: String, hour: String, currentTime: String },
  computed: {
    ...mapGetters(['userCity']),
    isActiveTime() {
      return this.timing === this.currentTime
    }
  }
}
</script>
