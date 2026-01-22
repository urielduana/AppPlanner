<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  type?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <input
    :type="props.type ?? 'text'"
    :placeholder="props.placeholder"
    :value="props.modelValue"
    @input="onInput"
    class="border rounded focus:outline-none focus:ring focus:border-blue-500 p-2 w-full border-slate-600"
  />
</template>
