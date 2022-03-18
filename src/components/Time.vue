<template>
  <div v-if="!isActiveTime" class="inactive-card-container">
    <div class="text-container rotate-left inactive-text text-2xl">
      <p>{{ timing }}</p>
      <p class="font-bold">{{ hour }}</p>
    </div>
  </div>
  <div v-else class="inactive-card-container active-card-container">
    <div class="mx-auto space-y-10">
      <router-link
        class="font-bold active-text block mb-[30%] text-4xl"
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
