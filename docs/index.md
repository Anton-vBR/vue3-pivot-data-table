---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "vue3-pivot-data-table"
  tagline: Minimalistic data table for Vue3
  actions:
    - theme: brand
      text: Get started
      link: /introduction/get-started
    - theme: brand
      text: Examples
      link: /examples/basic
    - theme: brand
      text: Props
      link: /api/props
    - theme: brand
      text: Emits
      link: /api/emits
    - theme: brand
      text: Expose
      link: /api/expose
    - theme: brand
      text: Slots
      link: /api/slots

---


<div style="width: 80%; margin:0 auto;">

<div class="drag-drop-container">
    <div class="group">
      <h2>Dimensions</h2>
      <div class="dimensions" @drop="addToDimensions" @dragover.prevent>
        <h3>Not in use</h3>
        <button
          v-for="dimension in dimensions"
          :key="dimension.id"
          class="dimension"
          draggable="true"
          @dragstart="dragStart(dimension, 'dimensions')"
        >
          Dim: {{ dimension.text }}
        </button>
      </div>
      <div class="columns" @drop="addToColumns" @dragover.prevent>
        <h3>Columns</h3>
        <button
          v-for="column in columns"
          :key="column.id"
          class="dimension"
          draggable="true"
          @dragstart="dragStart(column, 'columns')"
        >
          Dim: {{ column.text }}
        </button>
      </div>
      <div class="rows" @drop="addToRows" @dragover.prevent>
        <h3>Rows</h3>
        <button
          v-for="row in rows"
          :key="row.id"
          class="dimension"
          draggable="true"
          @dragstart="dragStart(row, 'rows')"
        >
          Dim: {{ row.text }}
        </button>
      </div>
    </div>

  <div class="group">
    <h2>Values</h2>
    <div class="values" @drop="addToValues" @dragover.prevent>
      <h3>Not in use</h3>
      <button
        v-for="value in availableValues"
        :key="value.id"
        class="value"
        draggable="true"
        @dragstart="dragStart(value, 'availableValues')"
      >
        Value: {{ value.parent.text + ' ' + value.text }}
      </button>
    </div>
    <div class="values-zone" @drop="addToValuesZone" @dragover.prevent>
        <h3>Values</h3>
      <button
        v-for="value in values"
        :key="value.id"
        class="value"
        draggable="true"
        @dragstart="dragStart(value, 'values')"
      >
        Value: {{  value.parent.text + ' ' + value.text }}
      </button>
    </div>
  </div>
</div>

<label>
  <input type="checkbox" v-model="showIndex" />
  Show Index
</label>

<label>
  <input type="checkbox" v-model="templateFooter" />
  Include footer (#customize-footers)
</label>


<PivotDataTable
    table-class-name="myWrapperClass"
    inner-table-class-name="myTableClass"
    :rows="rows"
    :values="values"
    :items="items"
    :column="columns[0]"
    :rows-per-page="-1"
    hide-footer
    :show-index="showIndex"
    locale="en-US"
    @click-cell="alert"
  >

  <template v-if="templateFooter" #customize-footers="{ headersForRender }">
    <tfoot>
      <tr>
      <td>
      Footer
      </td>
        <td
          :colspan="headersForRender.length - 1"
        >
          Footer content
        </td>
      </tr>
    </tfoot>
  </template>

  </PivotDataTable>

</div>


<script setup lang="ts">
import mockItems from '@/mock/fruits.ts'
import PivotDataTable from '@/src/components/PivotDataTable.vue'
import { ref } from 'vue'
import { Value, Item, Row, Column } from '@/types/main.d.ts';

  const dimensions = ref([{
  text: 'Fruit',
  value: 'fruit',
}]);
    const columns = ref([]);
    const rows = ref([

  {
    text: 'Weekday',
    value: 'weekday',
    sortable: true,
    sortFunc: (weekday: string) => {
      const weekdaysOrder: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return weekdaysOrder.indexOf(weekday);
    },
  },
]);

    const availableValues = ref([ {
    text: 'Change',
    value: 'sales_change',
    sortable: true,
    numberFormat: { style: 'percent', minimumFractionDigits: 0 },
    parent: {
      text: 'Sales',
    },
  },]);

    const values = ref(
      [
  {
    text: 'Outcome',
    value: 'sales',
    sortable: true,
    numberFormat: { style: 'currency', currency: 'USD', minimumFractionDigits: 1 },
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
]
    );

    const dragStart = (item, origin) => {
      event.dataTransfer.setData('item', JSON.stringify({ item, origin }));
    };

    const addToColumns = () => {
      const { item, origin } = JSON.parse(event.dataTransfer.getData('item'));

      if (columns.value.length > 0) {
        window.alert('max 1 column')
        return
      }
      if (item.parent) {
        window.alert('no values allowed')
        return
      }
      columns.value.push(item);
      removeFromOrigin(item, origin);
    };

    const addToRows = () => {
      const { item, origin } = JSON.parse(event.dataTransfer.getData('item'));
           if (item.parent) {
        window.alert('no values allowed')
        return
      }
      rows.value.push(item);
      removeFromOrigin(item, origin);
    };

    const addToDimensions = () => {
      const { item, origin } = JSON.parse(event.dataTransfer.getData('item'));
           if (item.parent) {
        window.alert('no values allowed')
        return
      }
      dimensions.value.push(item);
      removeFromOrigin(item, origin);
    };

    const addToValues = () => {
      const { item, origin } = JSON.parse(event.dataTransfer.getData('item'));
      if (!(item.parent)) {
        window.alert('no values allowed')
        return
      }
      availableValues.value.push(item);
      removeFromOrigin(item, origin);
    };

    const addToValuesZone = () => {
      const { item, origin } = JSON.parse(event.dataTransfer.getData('item'));
       if (!(item.parent)) {
        window.alert('no values allowed')
        return
      }
      values.value.push(item);
      removeFromOrigin(item, origin);
    };

    const removeFromOrigin = (item, origin) => {
      switch (origin) {
        case 'dimensions':
          dimensions.value = dimensions.value.filter(i => i.value !== item.value);
          break;
        case 'columns':
          columns.value = columns.value.filter(i => i.value !== item.value);
          break;
        case 'rows':
          rows.value = rows.value.filter(i => i.value !== item.value);
          break;
        case 'values':
          values.value = values.value.filter(i => i.value !== item.value);
          break;
        case 'availableValues':
          availableValues.value = availableValues.value.filter(i => i.value !== item.value);
          break;
      }
    };
const showIndex = ref(false);
const templateFooter = ref(false);
const items: Item[] = ref(mockItems)

function alert(obj) {
  window.alert(JSON.stringify(obj));
}


</script>








<style lang="scss">



thead>tr{background-color: #f2f2f2}

tbody>tr:nth-child(even){background-color: #f2f2f2}

.vue3-pivot-data-table {
  max-width: 1152px;
  max-height: 400px;
}

:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(-30deg, hsl(200deg 100% 65%), red);
}

:root.dark .VPHero .VPImage {
  filter: drop-shadow(0 4px 8px black);
}

.myWrapperClass {
  overflow-y: auto;

  table {
    border-collapse: collapse;
    width: 100%;
  }

  table,
  th,
  td {
    border: 1px solid rgb(235, 235, 235);
    padding: 4px;

  }

  tbody > tr > td.value {
    text-align: right;
  };

  thead > tr > :first-child {
    position: sticky;
    left: 0;
    border-right: 1px solid rgb(235, 235, 235);
    border-bottom: 1px solid rgb(235, 235, 235);
    background-color: #f2f2f2;
  }

  tbody > tr > td:first-child {
    text-align: left;
    position: sticky;
    left: 0;
    border-right: 1px solid rgb(235, 235, 235);
    border-bottom: 1px solid rgb(235, 235, 235);
  }

  tfoot > tr > :first-child {
    position: sticky;
    left: 0;
    border-right: 1px solid rgb(235, 235, 235);
    border-bottom: 1px solid rgb(235, 235, 235);
    background-color: #f2f2f2;
  }

  thead {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #f9f9f9;
  }

  
  tfoot {
    position: sticky;
    bottom: 0;
    z-index: 1;
    background-color: #f9f9f9;
  }

  tbody > tr[role="button"] {

    &:hover {
      cursor: pointer;
      background-color: rgb(255, 248, 239);
      td:first-child  {
        background-color: rgb(255, 248, 239);
      }
    }

    &:not(:hover) {
      td.even-row-cell:first-child  {
        background-color: white;
      }

      td.odd-row-cell:first-child {
        background-color: #f2f2f2;
      }
    }

  }
}

</style>

<style scoped>
.drag-drop-container {
  display: flex;
  
}

.group {
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 10px;
}

.dimensions,
.values,
.columns,
.rows,
.values-zone {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  margin: 2px;
  padding: 4px 8px;
  border-radius: 10px;
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
}

button.value {
    background-color: red;
  color: white;

}



h2 {
  margin-top: 0;
}
</style>