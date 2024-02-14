<script setup lang="ts">
import PivotDataTable from '@/src/components/PivotDataTable.vue'
import { Value, Item, Column } from '@/types/main.d.ts';

const column: Column = { text: 'Fruit', value: 'fruit' };

const values: Value[] = [{ text: 'Sales', value: 'sales', sortable: true}];

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

<PivotDataTable :items="items" :values="values" :column="column" />


**Input**


```vue
<template>
    <PivotDataTable 
        :items="items" 
        :values="values" 
        :column="column" 
    />
</template>

<script setup>

import type { Column, Value, Item } from "vue3-pivot-data-table";

const column: Column = { text: 'Fruit', value: 'fruit' };

const values: Value[] = [{ text: 'Sales', value: 'sales', sortable: true}];

const items: Item[] = [
  { fruit: 'Tomato', sales: 30 },
  { fruit: 'Orange', sales: 20 },
  { fruit: 'Cucumber', sales: 12 },
  { fruit: 'Grapes', sales: 120 },
  { fruit: 'Mango', sales: 180 },
];

</script>
```