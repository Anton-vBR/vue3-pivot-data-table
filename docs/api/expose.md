---
outline: deep
---

# Expose

<table>

<thead>

<tr>
    <th v-for="key in ['name', 'description']" :key="key">
    {{ key }}
    </th>
</tr>

</thead>

<tbody>

<tr v-for="emit, index in expose" :key='"item" + index'>


<td v-for="key in ['name', 'description']" :key="key">
    {{ emit[key] }}
</td>


</tr>

</tbody>



</table>


<script setup>
import { useData } from 'vitepress'
const { site, theme, page, frontmatter } = useData()

const expose = [
  {"name": "currentPageFirstIndex", "description": "Current index of the first item on the current page"},
  {"name": "currentPageLastIndex", "description": "Current index of the last item on the current page"},
  {"name": "clientItemsLength", "description": "Total number of items in the client-side data"},
  {"name": "totalItems", "description": "All items after sorting, filter and numberFilter"},
  {"name": "maxPaginationNumber", "description": "Maximum pagination number"},
  {"name": "currentPaginationNumber", "description": "Current pagination number"},
  {"name": "isLastPage", "description": "Indicates whether it's the last page"},
  {"name": "isFirstPage", "description": "Indicates whether it's the first page"},
  {"name": "nextPage", "description": "Function to navigate to the next page"},
  {"name": "prevPage", "description": "Function to navigate to the previous page"},
  {"name": "updatePage", "description": "Function to update the current page"},
  {"name": "updateSortField", "description": "Function to change the sort"},
  {"name": "rowsPerPageOptions", "description": "Options for the number of rows per page"},
  {"name": "rowsPerPageActiveOption", "description": "Currently selected number of rows per page"},
  {"name": "updateRowsPerPageActiveOption", "description": "Function to update the selected number of rows per page"}
]

</script>



