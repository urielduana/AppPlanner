<script setup lang="ts">
type Option = {
  label: string;
  value: string | number | boolean | null;
};

defineProps<{
  modelValue: Option["value"];
  options: Option[];
}>();

defineEmits<{
  (e: "update:modelValue", value: Option["value"]): void;
}>();
</script>

<template>
  <select
    :value="modelValue ?? ''"
    @change="
      $emit(
        'update:modelValue',
        ($event.target as HTMLSelectElement).value === ''
          ? null
          : JSON.parse(($event.target as HTMLSelectElement).value),
      )
    "
    class="border rounded p-2 w-full"
  >
    <option
      v-for="opt in options"
      :key="String(opt.value)"
      :value="JSON.stringify(opt.value)"
    >
      {{ opt.label }}
    </option>
  </select>
</template>
