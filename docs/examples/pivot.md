<script setup lang="ts">
import PivotDataTable from '@/src/components/PivotDataTable.vue'
import { Measure, Item, Pivot } from '@/types/main.d.ts';

const pivot: Pivot = { text: 'Fruit', value: 'fruit' };

const measures: Measure[] = [{ text: 'Sales', value: 'sales', sortable: true}];

const items: Item[] = [
  { fruit: 'Tomato', sales: 30 },
  { fruit: 'Orange', sales: 20 },
  { fruit: 'Cucumber', sales: 12 },
  { fruit: 'Grapes', sales: 120 },
  { fruit: 'Mango', sales: 180 },
];
</script>


# Examples

**Output**

<PivotDataTable :items :measures :pivot />


**Input**


```vue
<template>
    <PivotDataTable 
        :items 
        :measures 
        :pivot 
    />
</template>

<script setup>

import type { Pivot, Measure, Item } from "vue3-pivot-data-table";

const pivot: Pivot = { text: 'Fruit', value: 'fruit' };

const measures: Measure[] = [{ text: 'Sales', value: 'sales', sortable: true}];

const items: Item[] = [
  { fruit: 'Tomato', sales: 30 },
  { fruit: 'Orange', sales: 20 },
  { fruit: 'Cucumber', sales: 12 },
  { fruit: 'Grapes', sales: 120 },
  { fruit: 'Mango', sales: 180 },
];

</script>
```