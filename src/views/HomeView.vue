<template>
  <div class="home">
    <Time />
  </div>
</template>

<script>
// @ is an alias to /src
import Time from "@/components/Time.vue";

export default {
  name: "HomeView",
  components: {
    Time,
  },
};
</script>
