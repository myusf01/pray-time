<template>
  <nav class="flex justify-center space-x-4">
    <router-link to="/">Home</router-link>
    <router-link to="/settings">{{ userCity.name }}</router-link>
  </nav>
  <router-view />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['userCity'])
  }
}
</script>
