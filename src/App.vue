<template>
  <div style="max-width: 800px">
    <div style="display: flex; flex-direction: row">
      <button v-for="comp in components" :key="`component ${comp.name}`" @click="toggleComponent(comp.name)">
        {{ comp.name }}
      </button>
    </div>

    <div style="display: flex; flex-direction: column">
      <component :is="components.find((x) => x.name === currentComponent)?.component" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Component } from 'vue';

import SimpleTable from './dev/SimpleTable.vue';
import SimpleWithPivot from './dev/SimpleWithPivot.vue';
import SimpleWithPivotAndTwoValues from './dev/SimpleWithPivotAndTwoValues.vue';
import NestedWithPivotAndTwoValues from './dev/NestedWithPivotAndTwoValues.vue';
import Colors from './dev/TableColors.vue';

const toggleComponent = (component: string) => {
  currentComponent.value = component;
};

const components: { name: string; component: Component }[] = [
  {
    name: 'SimpleTable',
    component: SimpleTable,
  },
  {
    name: 'SimpleWithPivot',
    component: SimpleWithPivot,
  },
  {
    name: 'SimpleWithPivotAndTwoValues',
    component: SimpleWithPivotAndTwoValues,
  },
  {
    name: 'NestedWithPivotAndTwoValues',
    component: NestedWithPivotAndTwoValues,
  },
  {
    name: 'Colors',
    component: Colors,
  },
];

const currentComponent = ref<string>(components[components.length - 1].name);
</script>
