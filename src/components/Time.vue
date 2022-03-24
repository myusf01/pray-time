<template>
  <div v-if="!isActiveTime" class="inactive-card-container padding-sm">
    <div class="inactive-text text-xl sm:text-2xl">
      <span class="">{{ timing }}</span>
      <span class="font-bold">{{ hour }}</span>
    </div>
  </div>
  <div v-else class="inactive-card-container active-card-container">
    <div class="mx-auto space-y-10 p-2">
      <router-link
        class="active-text font-bold text-center block mb-[30%] text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
        to="/settings"
        >{{ userCity }}</router-link
      >
      <div class="active-text text-2xl md:text-4xl">
        <span class="">{{ timing }}</span>
        <span class="font-bold">{{ hour }}</span>
        <span>{{ remaining }} remained.</span>
      </div>
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
    remaining: String
  },
  computed: {
    ...mapGetters(['userCity']),
    isActiveTime() {
      return this.timing === this.currentTime
    }
  }
}
</script>
