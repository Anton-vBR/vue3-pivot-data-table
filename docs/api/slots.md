---
outline: deep
---

# Slots

<table>

<thead>

<tr>
    <th v-for="key in ['name', 'description']" :key="key">
    {{ key }}
    </th>
</tr>

</thead>

<tbody>

<tr v-for="emit, index in slots" :key='"item" + index'>


<td v-for="key in ['name', 'description']" :key="key">
    {{ emit[key] }}
</td>


</tr>

</tbody>



</table>


<script setup>
import { useData } from 'vitepress'
const { site, theme, page, frontmatter } = useData()

const slots = [
  { "name": "customize-headers", "description": "Slot for customizing table headers" },
  { "name": "header", "description": "Slot for customizing individual headers" },
  { "name": "header-${header.type}-${header.text}", "description": "Slot for customizing headers based on their type and text" },
  { "name": "sort-icon", "description": "Slot for customizing sort icons" },
  { "name": "item-${header.value}", "description": "Slot for customizing individual items based on their value" },
  { "name": "item", "description": "Slot for customizing individual items" },
  { "name": "no-rows-custom", "description": "Slot for custom content when there are no rows, customized" },
  { "name": "no-rows", "description": "Slot for custom content when there are no rows" },
  { "name": "empty-message", "description": "Slot for displaying an empty message" },
  { "name": "footer", "description": "Slot for customizing the footer of the table" }
]
</script>
