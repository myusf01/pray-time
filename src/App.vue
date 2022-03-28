<template>
  <div :class="activeTime">
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['activeTime'])
  }
}
</script>
