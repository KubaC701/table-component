<template>
  <table class="base-table">
    <thead class="base-table__header">
      <th class="base-table__header-column" v-for="column in columns" :key="column.value">
        {{ column.label }}
      </th>
    </thead>

    <tbody class="base-table__body">
      <template v-if="!isEmpty">
        <tr class="base-table__row" v-for="item in data" :key="item.id">
          <td class="base-table__cell" v-for="column in columns" :key="column.value">
            {{ item[column.value] }}
          </td>
        </tr>
      </template>
      <tr class="base-table__no-results" v-else>
        No results
      </tr>
    </tbody>
  </table>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'BaseTable',
  props: {
    data: {
      type: Object,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const isEmpty = computed(() => props.data.length === 0);

    return { isEmpty };
  },
};
</script>
<style lang="scss" scoped src="./BaseTable.scss" />
