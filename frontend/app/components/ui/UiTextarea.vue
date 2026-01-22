<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <textarea
    :placeholder="props.placeholder"
    :value="props.modelValue"
    @input="onInput"
    class="border rounded p-2 w-full min-h-20 focus:outline-none focus:ring"
  />
</template>
