<template>
  <div
    ref="dropdown"
    class="dropdown-menu absolute no-scrollbar settings-text upper shadow-lg shadow-gray-400/50"
  >
    <input
      class="h-10 w-full my-4 rounded-lg text-stone-800 p-4 cursor-pointer hover:bg-gray-200/30"
      v-model="searchQuery"
      type="text"
      placeholder="Search"
    />
    <span
      class="block py-1 w-full rounded-lg text-stone-800 px-2 cursor-pointer hover:bg-gray-300/30"
      v-for="item in filterArray"
      @click="$emit('selectItem', item)"
      :key="item.id"
      :value="item.name"
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
      menuArray: this.menuList,
      searchQuery: ''
    }
  },
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    filterArray() {
      const query = this.searchQuery.toLowerCase()
      if (this.searchQuery === '') {
        return this.menuArray
      }
      return this.menuArray.filter((user) => {
        return Object.values(user).some((word) =>
          String(word).toLowerCase().includes(query)
        )
      })
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
