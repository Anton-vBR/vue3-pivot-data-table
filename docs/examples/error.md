<script setup lang="ts">
import PivotDataTable from '@/src/components/PivotDataTable.vue'
import { Measure, Pivot, Item } from '@/types/main.d.ts';

const pivot: Pivot = { text: 'Fruit', value: 'fruit' };

const measures: Measure[] = [{ text: 'Sales', value: 'sales', sortable: true, prefix: '$' }];

const items: Item[] = [
  { fruit: 'Tomato', sales: 30, day: 'Tuesday' },
  { fruit: 'Orange', sales: 20, day: 'Thursday' },
  { fruit: 'Tomato', sales: 30, day: 'Monday' },
];
</script>


# Error

Errorhandling-page. TODO.

## Pivot

### Output

<PivotDataTable 
:items 
:measures 
:pivot 
/>

### Input

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

const measures: Measure[] = [{ text: 'Sales', value: 'sales', sortable: true, prefix: '$' }];

const items: Item[] = [
  { fruit: 'Tomato', sales: 30, day: 'Tuesday' },
  { fruit: 'Orange', sales: 20, day: 'Thursday' },
  { fruit: 'Tomato', sales: 30, day: 'Monday' },
];
</script>
```
