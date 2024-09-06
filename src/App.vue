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
import SimpleWithColumn from './dev/SimpleWithColumn.vue';
import SimpleWithColumnAndTwoValues from './dev/SimpleWithColumnAndTwoValues.vue';
import NestedWithColumnAndTwoValues from './dev/NestedWithColumnAndTwoValues.vue';
import Colors from './dev/Colors.vue';

const toggleComponent = (component: string) => {
  currentComponent.value = component;
};

const components: { name: string; component: Component }[] = [
  {
    name: 'SimpleTable',
    component: SimpleTable,
  },
  {
    name: 'SimpleWithColumn',
    component: SimpleWithColumn,
  },
  {
    name: 'SimpleWithColumnAndTwoValues',
    component: SimpleWithColumnAndTwoValues,
  },
  {
    name: 'NestedWithColumnAndTwoValues',
    component: NestedWithColumnAndTwoValues,
  },
  {
    name: 'Colors',
    component: Colors,
  },
];

const currentComponent = ref<string>(components[components.length - 1].name);
</script>
