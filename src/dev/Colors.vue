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
    :custom-table-data-class="customTableDataClass"
    :custom-table-row-class="customTableRowClass"
    locale="sv-SE"
    @click-cell="alert"
  >
    <template #[`header-column-Tomato`]="header">{{ header.text }} **</template>
    <template #header-sales="header">{{ header.text }} *</template>
    <template #header-parent-Sales="header">{{ header.text }} (tooltip here?)</template>
    <!-- <template #item-sales="item"> {{ item.sales }} (ARROW HERE) </template> -->
    <template #sort-icon> (icon here)</template>
    <!-- <template #footer="{ currentPageFirstIndex }">Footer here {{ currentPageFirstIndex }}</template> -->
  </PivotDataTable>
  <!-- show-index-class="sticky-col" -->
</template>

<script lang="ts" setup>
function customTableRowClass({ index }: { index: number }) {
  if (index === 0) {
    return ['selectedRow'];
  } else if (index === 1) {
    return ['selectedRow', 'opacityRow'];
  }
  return [];
}

function customTableDataClass({ header, item }: { header: Value; item: Item }) {
  //&& item['sales_change'] >= 0

  let l: string[] = [];

  if (item && header.value === 'sales_change' && item['sales_change'] <= 0) {
    l.push('redText');
  }

  if (item && header.value === 'sales_change' && item.sales === 33) {
    l.push('greenBackground');
  }

  return l;
}

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
  formatFunc: (x: any) => 'Hej!' + x,
};

const values: Value[] = [
  {
    text: 'Outcome',
    value: 'sales',
    sortable: true,
    // formatFunc: new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', minimumFractionDigits: 1 }).format,
    numberFormat: { style: 'currency', currency: 'SEK', minimumFractionDigits: 0 },
    parent: {
      text: 'Sales',
    },
  },
  {
    text: 'Change',
    value: 'sales_change',
    sortable: true,
    numberFormat: { style: 'percent', minimumFractionDigits: 0 },
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

  .redText {
    color: red;
  }

  .selectedRow {
    background-color: yellow;
  }

  .greenBackground {
    background-color: rgb(172, 239, 183);
  }

  .selectedRow + .opacityRow {
    opacity: 0.2;
  }

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
