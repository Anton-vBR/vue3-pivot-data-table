<template>
  Expanded items: {{ myPivotDataTable?.expandingItemIndexList }}
  <PivotDataTable
    ref="myPivotDataTable"
    table-class-name="myWrapperClass"
    inner-table-class-name="myTableClass"
    :dimensions
    :measures
    :items
    :pivot
    :rows-per-page="-1"
    hide-footer
    :show-index="false"
    show-index-class="sticky-col"
    :split-dimension-headers="true"
    locale="en-US"
    @click-cell="alert"
    @expand-row="expandRowStuff"
  >
    <template #[`header-pivot-Tomato`]="header">{{ header.text }} **</template>
    <template #header-sales="header">{{ header.text }} *</template>
    <template #header-parent-Sales="header">{{ header.text }} (tooltip here?)</template>

    <template #expand="{ index, item }: { index: number; item: Item }">
      <!-- <div :key="item.expandLoading + ':' + index" v-if="item.expandLoading">Loading... {{ item.expandLoading }}</div> -->
      <!-- <div v-else class="expand">
        <p>Item data: {{ JSON.stringify(item) }}</p>
      </div> -->

      <div v-if="loadingItems.includes(index)" class="expand">Loading... {{ index }}</div>
      <div v-else>Item data: {{ JSON.stringify(item) }}</div>
    </template>
    <!-- <template #item-sales="item"> {{ item.sales }} (ARROW HERE) </template> -->
    <template #sort-icon> (icon here)</template>
    <!-- <template #footer="{ currentPageFirstIndex }">Footer here {{ currentPageFirstIndex }}</template> -->
  </PivotDataTable>
</template>

<script lang="ts" setup>
import mockItems from '../../mock/fruits';
import PivotDataTable from '../components/PivotDataTable.vue';
import { Measure, Item, Dimension, Pivot } from '../../types/main';
import { Ref, ref, toRaw } from 'vue';

const loadingItems = ref([] as number[]);

async function expandRowStuff(index: number, item: Item) {
  item.expandLoading = true;
  loadingItems.value.push(index);
  console.log('Expand row event - load data here', item);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log('Data loaded');
  item.expandLoading = false;
  item['expandLoading'] = false;
  loadingItems.value = loadingItems.value.filter((x) => x !== index);
  //  { ...item };
  // items.value[index] = JSON.parse(JSON.stringify(item));
}

const dimensions: Dimension[] = [
  {
    text: 'Weeknum',
    value: 'weeknum',
    cssClass: 'sticky-col',
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

// const randomKey = ref(0);

const myPivotDataTable = ref<InstanceType<typeof PivotDataTable> | null>(null);

const pivot: Pivot = {
  text: 'Fruit',
  value: 'fruit',
  formatFunc: (x: string) => 'Hej!' + x,
};

const measures: Measure[] = [
  {
    text: 'Outcome',
    value: 'sales',
    sortable: true,
    // formatFunc: new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', minimumFractionDigits: 1 }).format,
    numberFormat: { style: 'currency', currency: 'SEK', minimumFractionDigits: 3 },
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

const items: Ref<Item[]> = ref(
  mockItems.filter((x) => !(x.fruit === 'Tomato' && x.weekday === 'Tuesday')),
  // .map((x) => ({ ...x, expandLoading: false })),
);

function alert(obj: Dimension) {
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
