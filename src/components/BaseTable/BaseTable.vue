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
            <span v-if="!isEmail(item[column.value])">
              {{ item[column.value] }}
            </span>
            <a class="base-table__email" :href="`mailto:${item[column.value]}`" v-else>
              {{ item[column.value] }}
            </a>
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
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const isEmpty = computed(() => props.data.length === 0);
    const isEmail = (value) => value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

    return { isEmpty, isEmail };
  },
};
</script>
<style lang="scss" scoped src="./BaseTable.scss" />
