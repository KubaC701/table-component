<template>
  <main class="user" v-if="data">
    <base-input
      v-model="query"
      type="search"
      name="search"
      placeholder="Search"
      class="user-table__input"
      v-if="search"
    />
    <base-table
      :columns="columns"
      :data="chunks[page - 1] || []"
      :pagination="pagination"
      :sorting="sorting"
      @change="handleChange"
    />
    <base-pagination
      :total="data.length"
      v-model:current="page"
      class="user-table__pagination"
      :perPage="ROWS_PER_PAGE"
    />
  </main>
  <p v-if="isLoading">Loading</p>
</template>

<script>
import { computed, ref, watch } from 'vue';
import BaseTable from '../BaseTable/BaseTable.vue';
import BaseInput from '../BaseInput/BaseInput.vue';
import BasePagination from '../BasePagination/BasePagination.vue';

import fetchData from '../../helpers/fetchData';

export default {
  name: 'UsersTable',
  components: {
    BaseTable,
    BaseInput,
    BasePagination,
  },
  props: {
    endpoint: {
      type: String,
      required: false,
      default: '',
    },
    search: {
      type: Boolean,
      required: false,
      default: false,
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
  setup(props) {
    const ROWS_PER_PAGE = 3;

    const data = ref(null);
    const fetchedData = ref(null);
    const error = ref('');
    const isLoading = ref(true);
    const query = ref('');
    const page = ref(1);

    const columns = computed(() => [
      { label: 'Name', value: 'name' },
      { label: 'Email', value: 'email' },
      { label: 'Company name', value: 'companyName' },
      { label: 'City', value: 'addressCity' },
      { label: 'Website', value: 'website' },
    ]);

    const chunks = computed(() => {
      const chunksArray = [];
      for (let i = 0; i < data.value.length; i += ROWS_PER_PAGE) {
        chunksArray.push(data.value.slice(i, i + ROWS_PER_PAGE));
      }
      return chunksArray;
    });

    fetchData(props.endpoint, null, {
      resolve: (json) => {
        fetchedData.value = json.map((element) => ({
          ...element,
          companyName: element.company.name,
          addressCity: element.address.city,
        }));
        data.value = fetchedData.value;
      },
      reject: (errorMessage) => {
        error.value = errorMessage;
      },
      atLast: () => {
        isLoading.value = false;
      },
    });

    const handleChange = (newData) => {
      console.log(newData);
      data.value = newData;
    };

    watch(query, () => {
      data.value = fetchedData.value.filter((element) => {
        const values = Object.values(element).map((el) => el.toString().toLowerCase());
        return values.some((item) => item.includes(query.value.toLowerCase()));
      });
    });

    return {
      columns,
      chunks,
      data,
      error,
      fetchedData,
      isLoading,
      handleChange,
      query,
      page,
      ROWS_PER_PAGE,
    };
  },
};
</script>
<style lang="scss" scoped src="./UsersTable.scss" />
