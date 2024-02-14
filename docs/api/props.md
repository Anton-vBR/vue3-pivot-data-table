---
outline: deep
---

# Props

## Required

<table>
<thead>
<tr>
    <th v-for="key in ['name',  'type' , 'description']" :key="key">
    {{ key }}
    </th>
</tr>
</thead>

<tbody>
<tr v-for="value, key in requiredProps" :key='"item" + key'>
<td>
{{ key }}
</td>

<td>
    {{ value['type'].toString()  }}
</td>
<td>
    {{ value['description']  }}
</td>
</tr>
</tbody>
</table>

## Optional

<table>
<thead>
<tr>
    <th v-for="key in ['name', 'default', 'type' , 'description']" :key="key">
    {{ key }}
    </th>
</tr>
</thead>

<tbody>
<tr v-for="value, key in nonRequiredProps" :key='"item" + key'>
<td>
{{ key }}
</td>
<td>
    {{ value['default']  }}
</td>
<td>
    {{ value['type'].toString()  }}
</td>
<td>
    {{ value['description']  }}
</td>
</tr>
</tbody>
</table>

<script setup lang="ts">

import { computed } from 'vue'
import { useData } from 'vitepress'
const { site, theme, page, frontmatter } = useData()

import propsWithDefault from '../../src/propsWithDefault'


const requiredProps = computed(() => {
    const filteredObject: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(propsWithDefault)) {
    if (typeof value === 'object' && value !== null && 'required' in value) {
        if (value['required'] === true) {
            filteredObject[key] = value;
        }
    }
    }
    return filteredObject
})


const nonRequiredProps = computed(() => {
    const filteredObject: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(propsWithDefault)) {
        if (!(typeof value === 'object' && value !== null && 'required' in value)) {
        filteredObject[key] = value;       
        }
    }
    return filteredObject
}
)


</script>



