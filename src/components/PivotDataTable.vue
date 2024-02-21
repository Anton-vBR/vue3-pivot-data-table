<template>
  <div
    ref="dataTable"
    class="vue3-pivot-data-table"
    :class="[tableClassName]"
    @scroll="($event) => $emit('scroll', $event)"
  >
    <table
      :id="tableNodeId"
      :class="{
        [innerTableClassName]: true,
        'show-shadow': showShadow,
      }"
    >
      <slot v-if="slots['customize-headers']" name="customize-headers" v-bind="{ headersForRender, updateSortField }" />
      <thead v-else-if="headersForRender.length && !hideHeader" :class="[headerClassName]">
        <tr v-for="(headerRowGroup, i) in headersForRenderParents" :key="'headerRowGroup' + i">
          <th
            v-for="(header, index) in headerRowGroup"
            :key="'columnHeader' + index"
            :colspan="header.count"
            :class="[
              {
                shadow: index === 0,
                [header.cssClass ?? '']: true,
                [header.type ?? '']: true,
              },
            ]"
          >
            <span class="header">
              <slot
                v-if="slots[`header-${header.type}-${header.text}`]"
                :name="`header-${header.type}-${header.text}`"
                v-bind="header"
              />

              <slot v-else-if="slots['header']" name="header" v-bind="header" />
              <span v-else class="header-text"> {{ header.text }} </span>
            </span>
          </th>
        </tr>
        <tr>
          <th
            v-for="(header, index) in headersForRender"
            :key="index"
            :role="'button'"
            :tabindex="0"
            :class="[
              {
                sortable: header.sortable,
                none: header.sortable && header.sortType === 'none',
                desc: header.sortable && header.sortType === 'desc',
                asc: header.sortable && header.sortType === 'asc',
                shadow: index === 0,
                [header.cssClass ?? '']: true,
                [header.type ?? '']: true,
              },
            ]"
            @click.stop="
              header.sortable && header.sortType
                ? updateSortField(header.value, header.sortType, false, header.columnValue)
                : null
            "
          >
            <span class="header">
              <slot v-if="slots[`header-${header.value}`]" :name="`header-${header.value}`" v-bind="header" />
              <slot
                v-else-if="slots[`header-${header.value.toLowerCase()}`]"
                :name="`header-${header.value.toLowerCase()}`"
                v-bind="header"
              />
              <slot v-else-if="slots['header']" name="header" v-bind="header" />
              <span v-else class="header-text">
                {{ header.text }}
              </span>
              <slot v-if="header.sortable && slots[`sort-icon`]" name="sort-icon" v-bind="header"></slot>
              <i
                v-else-if="header.sortable"
                :key="header.sortType ? header.sortType : 'none'"
                class="sortType-icon"
                :class="{ desc: header.sortType === 'desc' }"
              ></i>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in pageItems"
          :id="`row-${index}`"
          :key="index"
          :class="[{ [oddRowClass]: (index + 1) % 2 === 0 }, { [evenRowClass]: index % 2 === 0 }]"
          :role="'button'"
          :tabindex="0"
        >
          <td
            v-for="(header, i) in headersForRender"
            :key="i"
            :role="headersForRender[i].clickable || headersForRender[i].hoverable ? 'button' : ''"
            tabindex="0"
            :class="[
              {
                [oddRowCellClass]: (index + 1) % 2 === 0,
                [evenRowCellClass]: index % 2 === 0,
                shadow: i === 0,
                [header.cssClass ?? '']: true,
                [header.type ?? '']: true,
              },
            ]"
            @click="clickCell(item, headersForRender[i], index, $event)"
            @mouseover="emits('mouseover', item, headersForRender[i], $event)"
            @mouseleave="emits('mouseleave', item, $event)"
          >
            <slot
              v-if="slots[`item-${header.value}`]"
              :name="`item-${header.value}`"
              v-bind="column ? item.items.find((x: Item) => x[column.value] === header.columnValue) : item"
            />

            <slot v-else-if="slots['item']" name="item" v-bind="{ column, item }" />

            <template v-else-if="column">
              {{ generateCellContentBasedOnColumn(header, item, column, locale, nullFillText) }}
            </template>

            <template v-else>
              {{ generateCellContent(header, item, locale, nullFillText) }}
            </template>
          </td>
        </tr>
      </tbody>

      <slot
        v-if="slots['customize-footers']"
        name="customize-footers"
        v-bind="{
          headersForRender,
          updateSortField,
        }"
      />
    </table>
  </div>

  <slot v-if="errors.length" name="errors">
    <div id="errors">
      <ul>
        <li v-for="(error, ind) in errors" :key="'error' + ind">
          <span style="color: red">{{ error.type }}:</span> {{ error.text }}
        </li>
      </ul>
    </div>
  </slot>

  <slot v-else-if="!items.length && !loading && noRowsCustom" name="no-rows-custom"> Slot: no-rows-custom </slot>

  <slot v-else-if="!items.length && !loading" name="no-rows">
    {{ emptyMessage }}
  </slot>

  <slot v-else-if="!pageItems.length && !loading" name="empty-message">
    {{ emptyMessage }}
  </slot>

  <slot
    v-if="slots['footer']"
    name="footer"
    v-bind="{
      currentPageFirstIndex,
      currentPageLastIndex,
      rowsOfPageSeparatorMessage,
      totalItemsLength,
      isFirstPage,
      isLastPage,
      currentPaginationNumber,
      maxPaginationNumber,
      nextPage,
      prevPage,
      updatePage,
    }"
  ></slot>

  <div v-else-if="!hideFooter">
    {{ `${currentPageFirstIndex}–${currentPageLastIndex}` }}
    {{ rowsOfPageSeparatorMessage }}
    {{ totalItemsLength }}

    <button @click="prevPage">{{ '<' }}</button>

    {{ currentPage }}
    of
    {{ maxPaginationNumber }}

    <button @click="nextPage">></button>
  </div>

  <!-- 
  <h3> Test purposes </h3> 
  <div>headersForRender: <textarea style="width: 80%; height: 80px" type="text" :value="JSON.stringify(headersForRender, null, 2)" /></div> 
  -->
</template>

<script lang="ts" setup>
import { ref, toRefs, useSlots, provide, watch, onMounted } from 'vue';
import type { Item } from '../../types/main';
import type { HeaderForRender } from '../../types/internal';

import propsWithDefault from '../propsWithDefault';

import useTotalItems from '../hooks/useTotalItems';
import useHeaders from '../hooks/useHeaders';
import useRows from '../hooks/useRows';
import usePagination from '../hooks/usePagination';
import usePageItems from '../hooks/usePageItems';

import tEmits from '../emits';

import { generateCellContent, generateCellContentBasedOnColumn } from '../utils';

const errors = ref<{ type: string; text: string }[]>([]);
const dataTable = ref();
provide('dataTable', dataTable);

const props = defineProps(propsWithDefault);

const {
  values,
  rows,
  column,
  locale,
  tableNodeId,
  currentPage,
  filterOptions,
  emptyMessage,
  noRowsCustom,
  items,
  loading,
  mustSort,
  rowsItems,
  rowsPerPage,
  searchField,
  searchValue,
  showIndex,
  sortBy,
  sortType,
  showIndexSymbol,
  showIndexClass,
  nullFillText,
} = toRefs(props);

const slots = useSlots();
const emits = defineEmits(tEmits);

// Creates the headers
const { clientSortOptions, headersForRenderParents, headersForRender, updateSortField } = useHeaders(
  items,
  showIndexSymbol,
  rows,
  values,
  column,
  mustSort,
  showIndex,
  showIndexClass,
  sortBy,
  sortType,
  emits,
);

// Responsible for searching => filtering (number filters) => sorting
const { totalItems, totalItemsLength } = useTotalItems(
  headersForRender,
  clientSortOptions,
  filterOptions,
  items,
  column,
  rows,
  searchField,
  searchValue,
  emits,
);

const { rowsItemsComputed, rowsPerPageRef, updateRowsPerPage } = useRows(rowsItems, rowsPerPage);

const { currentPaginationNumber, maxPaginationNumber, isLastPage, isFirstPage, nextPage, prevPage, updatePage } =
  usePagination(currentPage, loading, totalItemsLength, rowsPerPageRef);

// Adds index (if sent as prop) and filters out items to be shown (PageItems) from TotalItems
const { currentPageFirstIndex, currentPageLastIndex, pageItems } = usePageItems(
  currentPaginationNumber,
  rowsPerPageRef,
  showIndex,
  totalItems,
  column,
);

const clickCell = (item: Item, header: HeaderForRender, index: number, $event: MouseEvent) => {
  emits('clickCell', item, header, index, $event);
};

watch(rowsPerPageRef, () => {
  updatePage(1);
});

watch([searchValue, filterOptions], () => {
  updatePage(1);
});

watch(
  [items, column],
  () => {
    columnDataChecks();
  },
  { immediate: true },
);

// fixed-columns shadow -- work in progress -- TODO
const showShadow = ref(false);

function columnDataChecks() {
  errors.value = [];
  if (column.value && Array.isArray(column.value)) {
    errors.value.push({
      type: 'propError',
      text: 'column is of type Array',
    });
  } else if (column.value && duplicatesExist()) {
    errors.value.push({
      type: 'dataShapeError',
      text: 'duplicate item Objects (by rows * columns) found in items',
    });
  }
}

onMounted(() => {
  dataTable.value.addEventListener('scroll', () => {
    showShadow.value = dataTable.value.scrollLeft > 0;
  });
});

const expose = {
  currentPageFirstIndex,
  currentPageLastIndex,
  clientItemsLength: totalItemsLength,
  totalItems,
  maxPaginationNumber,
  currentPaginationNumber,
  isLastPage,
  isFirstPage,
  nextPage,
  prevPage,
  updatePage,
  updateSortField,
  rowsPerPageOptions: rowsItemsComputed,
  rowsPerPageActiveOption: rowsPerPageRef,
  updateRowsPerPageActiveOption: updateRowsPerPage,
};

defineExpose(expose);

// Function that checks if duplicate..
function duplicatesExist(): boolean {
  const dimensions = [...rows.value.map((x) => x.value), column.value.value];
  const duplicateSet = new Set();
  for (let i = 0; i < items.value.length; i++) {
    const shouldBeUnique = dimensions.map((x) => items.value[i][x]).join('|');
    if (duplicateSet.has(shouldBeUnique)) {
      return true;
    }
    duplicateSet.add(shouldBeUnique);
  }
  return false;
}
</script>

<style lang="scss" scoped>
@import '../scss/vue3-pivot-data-table.scss';
</style>
