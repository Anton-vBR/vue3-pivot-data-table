<script setup lang="ts">
import PivotDataTable from '@/src/components/PivotDataTable.vue'
import { Value, Row, Item } from '@/types/main.d.ts';

const rows: Row[] = [{ text: 'Fruit', value: 'fruit' }];

const values: Value[] = [{ text: 'Sales', value: 'sales', sortable: true, prefix: '$' }];

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

<PivotDataTable :items="items" :values="values" :rows="rows" />

### Input

```vue
<template>
    <PivotDataTable 
        :items="items" 
        :values="values" 
        :rows="rows" 
    />
</template>

<script setup>

import type { Row, Value, Item } from "vue3-pivot-data-table";

const rows: Row[] = [{ text: 'Fruit', value: 'fruit' }];

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

## Without pagination

Add and set the properties rowsPerPage (-1 to disable pagination) and hideFooter (true to disable footer object)

### Output

<PivotDataTable :items="items" :values="values" :rows="rows" :rows-per-page="-1" hide-footer />

### Input

```vue{6,7}
<template>
    <PivotDataTable 
        :items="items" 
        :values="values" 
        :rows="rows"
        :rows-per-page="-1" 
        hide-footer
    />
</template>

<script setup>

'same as above'

</script>

```


