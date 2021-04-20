<template>
  <div class="base-pagination">
    <button
      class="base-pagination__button"
      :class="[!hasPrev ? 'base-pagination__button--disabled' : false]"
      :disabled="!hasPrev"
      @click="changePage(prevPage)"
    >
      <img src="/icons/arrow.svg" alt="" class="base-pagination__icon" />
    </button>

    <div class="base-pagination__content">
      <ul class="base-pagination__list">
        <li class="base-pagination__list-item" v-if="hasFirst">
          <button @click="changePage(1)" class="base-pagination__list-button">
            1
          </button>
        </li>

        <li class="base-pagination__list-item base-pagination__list-item--dots" v-if="hasFirst">
          ...
        </li>

        <li class="base-pagination__list-item" v-for="page in pages" :key="page">
          <button
            @click="changePage(page)"
            class="base-pagination__list-button"
            :class="[current === page ? 'base-pagination__list-button--active' : false]"
          >
            {{ page }}
          </button>
        </li>

        <li class="base-pagination__list-item base-pagination__list-item--dots" v-if="hasLast">
          ...
        </li>

        <li class="base-pagination__list-item" v-if="hasLast">
          <button
            @click="changePage(totalPages)"
            class="base-pagination__list-button"
            :class="[current === totalPages ? 'base-pagination__list-button--active' : false]"
          >
            {{ totalPages }}
          </button>
        </li>
      </ul>
    </div>

    <button
      class="base-pagination__button"
      :class="[!hasNext ? 'base-pagination__button--disabled' : false]"
      :disabled="!hasNext"
      @click="changePage(nextPage)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        class="base-pagination__button-icon"
      >
        <path
          d="M1 13L7 7L1 1"
          stroke="#132B50"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="base-pagination__button-path"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'BasePagination',
  props: {
    total: {
      type: Number,
      required: false,
      default: 0,
    },
    current: {
      type: Number,
      required: false,
      default: 1,
    },
    perPage: {
      type: Number,
      required: false,
      default: 5,
    },
    pageRange: {
      type: Number,
      required: false,
      default: 2,
    },
  },
  computed: {
    pages() {
      const pages = [];

      for (let i = this.rangeStart; i <= this.rangeEnd; i += 1) {
        pages.push(i);
      }

      return pages;
    },
    rangeStart() {
      const start = this.current - this.pageRange;
      return start > 0 ? start : 1;
    },
    rangeEnd() {
      const end = this.current + this.pageRange;
      return end < this.totalPages ? end : this.totalPages;
    },
    totalPages() {
      return Math.ceil(this.total / this.perPage);
    },
    nextPage() {
      return this.current + 1;
    },
    prevPage() {
      return this.current - 1;
    },
    hasFirst() {
      return this.rangeStart !== 1;
    },
    hasLast() {
      return this.rangeEnd < this.totalPages;
    },
    hasPrev() {
      return this.current > 1;
    },
    hasNext() {
      return this.current < this.totalPages;
    },
  },
  methods: {
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit('page-change', page);
      }
    },
  },
};
</script>

<style lang="scss" src="./BasePagination.scss" />
