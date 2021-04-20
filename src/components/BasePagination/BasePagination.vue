<template>
  <div class="base-pagination">
    <button
      class="base-pagination__button"
      :class="!hasPrev && 'base-pagination__button--disabled'"
      :disabled="!hasPrev"
      @click="changePage(current - 1)"
    >
      <img
        src="/icons/arrow.svg"
        alt=""
        class="base-pagination__icon base-pagination__icon--prev"
      />
    </button>

    <div class="base-pagination__content">
      <span class="base-pagination__current">
        {{ current }}
      </span>
      <span class="base-pagination__slash">/</span>
      <span class="base-pagination__total">
        {{ totalPages }}
      </span>
    </div>

    <button
      class="base-pagination__button"
      :class="!hasNext && 'base-pagination__button--disabled'"
      :disabled="!hasNext"
      @click="changePage(current + 1)"
    >
      <img
        src="/icons/arrow.svg"
        alt=""
        class="base-pagination__icon base-pagination__icon--next"
      />
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'BasePagination',
  props: {
    total: {
      type: Number,
      required: false,
      default: 0,
    },
    perPage: {
      type: Number,
      required: false,
      default: 3,
    },
    current: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  emits: ['update:current'],
  setup(props, { emit }) {
    const totalPages = computed(() => Math.ceil(props.total / props.perPage));
    const hasPrev = computed(() => props.current > 1);
    const hasNext = computed(() => props.current < totalPages.value);

    const changePage = (page) => {
      emit('update:current', page);
    };
    return {
      changePage, hasPrev, hasNext, totalPages,
    };
  },
};
</script>

<style lang="scss" src="./BasePagination.scss" />
