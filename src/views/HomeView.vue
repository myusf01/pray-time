<template>
  <div class="home">
    <Time />
  </div>
</template>

<script>
// @ is an alias to /src
import Time from "@/components/Time.vue"

export default {
  name: "HomeView",
  components: {
    Time,
  },
  methods: {
    async fetchData() {
      const data = await fetch(process.env.VUE_APP_API_URL)
      return data
    },
  },
}
</script>
