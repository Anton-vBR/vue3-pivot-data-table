<template>
  <PivotDataTable inner-table-class-name="dataTable" :dimensions :measures :items :pivot :rows-per-page="10" show-index>
    <template #item-sales="item"> ${{ item.sales }} </template>
  </PivotDataTable>
</template>

<script lang="ts" setup>
import mockItems from '../../mock/fruits';
import PivotDataTable from '../components/PivotDataTable.vue';
import { Measure, Item, Dimension, Pivot } from '../../types/main';

const dimensions: Dimension[] = [
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

const pivot: Pivot = {
  text: 'Fruit',
  value: 'fruit',
};

const measures: Measure[] = [
  {
    text: 'Sales',
    value: 'sales',
    sortable: true,
  },
];

const items: Item[] = mockItems;
</script>
