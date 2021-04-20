<template>
  <div class="base-table">
    <table class="base-table__inner">
      <thead class="base-table__header">
        <th class="base-table__header-column" v-for="column in columns" :key="column.value">
          <span v-if="sorting">
            {{ column.label }}
          </span>
          <button
            type="button"
            v-else
            @click="handleSort(column.value)"
            class="base-table__header-button"
          >
            {{ column.label }}
          </button>
        </th>
      </thead>

      <tbody class="base-table__body">
        <template v-if="!isEmpty">
          <tr class="base-table__row" v-for="item in data" :key="item.id">
            <td class="base-table__cell" v-for="column in columns" :key="column.value">
              <span v-if="!isEmail(item[column.value])">
                {{ item[column.value] }}
              </span>
              <a class="base-table__email" :href="`mailto:${item[column.value]}`" v-else>
                {{ item[column.value] }}
              </a>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td class="base-table__no-results" colspan="100%">
            No results
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  name: 'BaseTable',
  props: {
    data: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    sorting: {
      type: Boolean,
      required: false,
      default: false,
    },
    pagination: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const isEmpty = computed(() => props.data.length === 0);
    const order = ref(false);
    const isEmail = (value) => value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

    const handleSort = (column) => {
      order.value = !order.value;
      emit(
        'change',
        [...props.data].sort((a, b) => {
          const columnA = a[column].toLowerCase();
          const columnB = b[column].toLowerCase();

          const sortAscending = columnA > columnB ? 1 : -1;
          const sortDescending = columnA < columnB ? 1 : -1;
          return order.value ? sortAscending : sortDescending;
        }),
      );
    };

    return { handleSort, isEmpty, isEmail };
  },
};
</script>
<style lang="scss" scoped src="./BaseTable.scss" />
