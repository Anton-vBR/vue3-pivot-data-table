<script setup lang="ts">
import PivotDataTable from '@/src/components/PivotDataTable.vue'
import { Value, Column, Item } from '@/types/main.d.ts';

const column: Column = { text: 'Fruit', value: 'fruit' };

const values: Value[] = [{ text: 'Sales', value: 'sales', sortable: true, prefix: '$' }];

const items: Item[] = [
  { fruit: 'Tomato', sales: 30, day: 'Tuesday' },
  { fruit: 'Orange', sales: 20, day: 'Thursday' },
  { fruit: 'Tomato', sales: 30, day: 'Monday' },
];
</script>


# Error

Errorhandling-page. TODO.

## Column

### Output

<PivotDataTable 
:items="items" 
:values="values" 
:column="column" 
/>

### Input

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

const values: Value[] = [{ text: 'Sales', value: 'sales', sortable: true, prefix: '$' }];

const items: Item[] = [
  { fruit: 'Tomato', sales: 30, day: 'Tuesday' },
  { fruit: 'Orange', sales: 20, day: 'Thursday' },
  { fruit: 'Tomato', sales: 30, day: 'Monday' },
];
</script>
```
