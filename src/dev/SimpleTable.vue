<template>
  <PivotDataTable
    inner-table-class-name="dataTable"
    :rows="rows"
    :values="values"
    :items="items"
    sort-by="weekday"
    sort-type="desc"
    :rows-per-page="10"
    show-index
    show-index-class="sticky-col"
    @click-cell="alert"
  >
    <!-- <template #item-sales="item"> ${{ item.sales }} </template> -->
  </PivotDataTable>
</template>

<script lang="ts" setup>
import mockItems from '../../mock/fruits';
import PivotDataTable from '../components/PivotDataTable.vue';
import { Value, Item, Row } from '../../types/main';

const rows: Row[] = [
  {
    text: 'Weekday',
    value: 'weekday',
    sortable: true,
    sortFunc: (weekday: string) => {
      const weekdaysOrder: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return weekdaysOrder.indexOf(weekday);
    },
    cssClass: 'sticky-col',
  },
  {
    text: 'Fruit',
    value: 'fruit',
  },
];

const values: Value[] = [
  {
    text: 'Sales',
    value: 'sales',
    sortable: true,
    prefix: '$',
    suffix: ' kr',
  },
];

const items: Item[] = mockItems;

function alert(obj: Row) {
  window.alert(JSON.stringify(obj));
}
</script>
