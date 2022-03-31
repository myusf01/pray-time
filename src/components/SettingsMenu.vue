<template>
  <div class="relative w-full">
    <button
      @click.stop="isShow = !isShow"
      :disabled="isDisabled"
      :class="[{ 'bg-slate-300/50 text-slate-500': isDisabled }]"
      class="settings-item pl-6 justify-between settings-text overflow-hidden bg-stone-100 text-stone-800 shadow-lg shadow-gray-300/50"
    >
      {{ menuLabel }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        :class="[{ 'opacity-40': isDisabled }]"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
        />
      </svg>
    </button>
    <DropdownMenu
      v-if="isShow"
      :menuList="menuList"
      @close="isShow = false"
      @selectItem="
        (e) => {
          $emit('selectedItem', e)
          isShow = false
        }
      "
    />
  </div>
</template>

<script>
import DropdownMenu from './DropdownMenu.vue'
export default {
  name: 'SettingsMenu',
  data() {
    return {
      isShow: false,
      menuTitle: this.menuLabel
    }
  },
  props: {
    menuList: Array,
    menuLabel: { type: String, default: 'Select' }
  },
  components: {
    DropdownMenu
  },
  computed: {
    isDisabled() {
      return !this.menuList.length
    }
  }
}
</script>
