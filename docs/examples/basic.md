<script setup lang="ts">
import PivotDataTable from '@/src/components/PivotDataTable.vue'
import { Measure, Dimension, Item } from '@/types/main.d.ts';

const rows: Dimension[] = [{ text: 'Fruit', value: 'fruit' }];

const measures: Measure[] = [{ text: 'Sales', value: 'sales', sortable: true, prefix: '$' }];

const items: Item[] = [
  { fruit: 'Tomato', sales: 30 },
  { fruit: 'Orange', sales: 20 },
  { fruit: 'Cucumber', sales: 12 },
  { fruit: 'Grapes', sales: 120 },
  { fruit: 'Mango', sales: 180 },
];
</script>


# Basic

Define a row (e.g. fruit) and a value (e.g. sales) and add items.

## With pagination

### Output

<PivotDataTable :items :measures :dimensions />

### Input

```vue
<template>
    <PivotDataTable 
        :items 
        :measures 
        :dimensions 
    />
</template>

<script setup>

import type { Dimension, Measure, Item } from "vue3-pivot-data-table";

const rows: Dimension[] = [{ text: 'Fruit', value: 'fruit' }];

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

## Without pagination

Add and set the properties rowsPerPage (-1 to disable pagination) and hideFooter (true to disable footer object)

### Output

<PivotDataTable :items :measures :dimensions :rows-per-page="-1" hide-footer />

### Input

```vue{6,7}
<template>
    <PivotDataTable 
        :items 
        :measures 
        :dimensions
        :rows-per-page="-1" 
        hide-footer
    />
</template>

<script setup>

'same as above'

</script>

```


