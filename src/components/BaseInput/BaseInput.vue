<template>
  <div class="base-input">
    <label class="base-input__label" v-if="label">{{ label }}</label>
    <input
      class="base-input__inner"
      :value="modelValue"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    label: {
      type: String,
      required: false,
      default: '',
    },
    name: {
      type: String,
      required: false,
      default: '',
    },
    modelValue: {
      type: String,
      required: false,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: '',
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['update:modelValue'],
};
</script>
<style lang="scss" scoped src="./BaseInput.scss" />
