<template>
  <PivotDataTable
    inner-table-class-name="dataTable"
    :rows="rows"
    :values="values"
    :items="items"
    :column="column"
    :rows-per-page="10"
    show-index
  >
    <template #item-sales="item"> ${{ item.sales }} </template>
  </PivotDataTable>
</template>

<script lang="ts" setup>
import mockItems from '../../mock/fruits';
import PivotDataTable from '../components/PivotDataTable.vue';
import { Value, Item, Row, Column } from '../../types/main';

const rows: Row[] = [
  {
    text: 'Weekday',
    value: 'weekday',
    sortable: true,
    sortFunc: (weekday: string) => {
      const weekdaysOrder: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return weekdaysOrder.indexOf(weekday);
    },
  },
];

const column: Column = {
  text: 'Fruit',
  value: 'fruit',
};

const values: Value[] = [
  {
    text: 'Sales',
    value: 'sales',
    sortable: true,
  },
];

const items: Item[] = mockItems;
</script>
