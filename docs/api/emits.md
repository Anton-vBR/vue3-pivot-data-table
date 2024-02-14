---
outline: deep
---

# Emits

<table>
<thead>
<tr>
    <th v-for="key in ['name', 'description']" :key="key">
    {{ key }}
    </th>
</tr>
</thead>

<tbody>
<tr v-for="emit, index in emits" :key='"item" + index'>
<td v-for="key in ['name', 'description']" :key="key">
    {{ emit[key] }}
</td>
</tr>
</tbody>
</table>

<script setup>
import { useData } from 'vitepress'
import { emits } from '@/src/emits'

const { site, theme, page, frontmatter } = useData()

</script>



