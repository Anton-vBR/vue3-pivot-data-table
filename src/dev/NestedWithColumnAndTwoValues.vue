<template>
  <PivotDataTable
    table-class-name="myWrapperClass"
    inner-table-class-name="myTableClass"
    :rows="rows"
    :values="values"
    :items="items"
    :column="column"
    :rows-per-page="-1"
    hide-footer
    show-index
    show-index-class="sticky-col"
    locale="en-US"
    @click-cell="alert"
  >
    <template #[`header-column-Tomato`]="header">{{ header.text }} **</template>
    <template #header-sales="header">{{ header.text }} *</template>
    <template #header-parent-Sales="header">{{ header.text }} (tooltip here?)</template>
    <!-- <template #item-sales="item"> {{ item.sales }} (ARROW HERE) </template> -->
    <template #sort-icon> (icon here)</template>
    <!-- <template #footer="{ currentPageFirstIndex }">Footer here {{ currentPageFirstIndex }}</template> -->
  </PivotDataTable>
</template>

<script lang="ts" setup>
import mockItems from '../../mock/fruits';
import PivotDataTable from '../components/PivotDataTable.vue';
import { Value, Item, Row, Column } from '../../types/main';

const rows: Row[] = [
  {
    text: 'Weeknum',
    value: 'weeknum',
  },
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
    text: 'Outcome',
    value: 'sales',
    sortable: true,
    format: { style: 'currency', currency: 'SEK', minimumFractionDigits: 1 },
    parent: {
      text: 'Sales',
    },
  },
  {
    text: 'Change',
    value: 'sales_change',
    sortable: true,
    format: { style: 'percent', minimumFractionDigits: 0 },
    parent: {
      text: 'Sales',
    },
  },
  {
    text: 'Outcome',
    value: 'units',
    sortable: true,
    parent: {
      text: 'Units',
    },
    suffix: ' pcs',
  },
];

const items: Item[] = mockItems.filter((x) => !(x.fruit === 'Tomato' && x.weekday === 'Tuesday'));

function alert(obj: Row) {
  window.alert(JSON.stringify(obj));
}
</script>

<style lang="scss">
.myWrapperClass {
  overflow-y: auto;

  .myTableClass {
    table,
    th,
    td {
      border: 1px solid black;
    }
  }

  thead > tr > .sticky-col {
    background-color: white;
  }

  .sticky-col {
    position: sticky;
    left: 0;
    z-index: 1;
  }

  [role='button'] {
    &:hover {
      background-color: blue;
    }

    &:not(:hover) > .sticky-col {
      background-color: white;
    }
  }
}
</style>
