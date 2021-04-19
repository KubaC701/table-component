<template>
  <base-table :data="data" :columns="columns" v-if="data" />
  <p v-if="isLoading">Loading</p>
</template>

<script>
import { computed, ref } from 'vue';
import BaseTable from '../BaseTable/BaseTable.vue';
import fetchData from '../../helpers/fetchData';

export default {
  name: 'UsersTable',
  components: {
    BaseTable,
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
    const data = ref(null);
    const error = ref('');
    const isLoading = ref(true);

    const columns = computed(() => [
      { label: 'Name', value: 'name' },
      { label: 'Email', value: 'email' },
      { label: 'Company name', value: 'companyName' },
      { label: 'City', value: 'addressCity' },
      { label: 'Website', value: 'website' },
    ]);

    fetchData(props.endpoint, null, {
      resolve: (json) => {
        data.value = json.map((element) => ({
          ...element,
          companyName: element.company.name,
          addressCity: element.address.city,
        }));
      },
      reject: (errorMessage) => {
        error.value = errorMessage;
      },
      atLast: () => {
        isLoading.value = true;
      },
    });

    return {
      columns,
      data,
      error,
      isLoading,
    };
  },
};
</script>
<style lang="scss" scoped src="./UsersTable.scss" />
