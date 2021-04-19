<template>
  <users-table endpoint="https://jsonplaceholder.typicode.com/users" />
</template>

<script>
import UsersTable from './components/UsersTable/UsersTable.vue';

export default {
  name: 'App',
  components: {
    UsersTable,
  },
};
</script>
