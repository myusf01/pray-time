<template>
  <div
    ref="dropdown"
    class="dropdown-menu absolute no-scrollbar settings-text upper shadow-lg shadow-gray-400/50"
  >
    <span
      class="block w-full rounded-lg text-stone-800 px-2 cursor-pointer hover:bg-gray-300/30"
      v-for="item in menuArray"
      @click="$emit('selectItem', item)"
      :key="item.id"
      :value="item"
    >
      {{ item.name }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'DropdownMenu',
  data() {
    return {
      menuArray: this.menuList
    }
  },
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    documentClick(e) {
      // manage dropdown menu
      // show or hide on click
      try {
        let el = this.$refs.dropdown
        let target = e.target
        // close menu when user clicked another content
        if (el !== target && !el.contains(target)) {
          this.$emit('close')
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  beforeMount() {
    // add click event listener to trigger our method
    document.addEventListener('click', this.documentClick)
  },
  beforeUnmount() {
    // remove click event after use to prevent unpredicted errors
    document.removeEventListener('click', this.documentClick)
  }
}
</script>

<style></style>
