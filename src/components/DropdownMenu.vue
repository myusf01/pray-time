<template>
  <div
    ref="dropdown"
    class="dropdown-menu absolute no-scrollbar settings-text upper shadow-lg shadow-gray-400/50"
  >
    <div class="w-full border-b border-gray-300">
      <input
        class="h-10 w-full my-4 py-4 px-3 cursor-pointer rounded-lg text-stone-700 shadow-md shadow-slate-200 border border-slate-200 hover:bg-gray-50/95"
        v-model="searchQuery"
        type="text"
        placeholder="Search"
      />
    </div>
    <span
      class="block py-2 px-3 w-full cursor-pointer rounded-lg text-stone-700 hover:bg-gray-200/50"
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
