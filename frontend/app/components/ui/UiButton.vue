<script setup lang="ts">
defineProps<{
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit";
}>();
</script>

<template>
  <div>
    <button
      :type="type ?? 'button'"
      class="px-4 py-2 rounded font-medium transition hover:cursor-pointer w-full"
      :class="{
        'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
        'bg-gray-200 hover:bg-gray-300': variant === 'secondary',
        'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
      }"
    >
      <slot />
    </button>
  </div>
</template>
