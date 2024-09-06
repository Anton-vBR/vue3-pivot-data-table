import { Ref, computed, watch } from 'vue';
import type { Item, Pivot, FilterOption, Dimension, GroupedDimension, HeaderForRender } from '../../types/main';
// import type { ClientSortOptions, EmitsEventName } from "../types/internal";
import { getItemValue } from '../utils';
import { ClientSortOptions, EmitsEventName } from '../../types/internal';

export default function useTotalItems(
  headersForRender: Ref<HeaderForRender[]>,
  clientSortOptions: Ref<ClientSortOptions | null>,
  filterOptions: Ref<FilterOption[]>,
  items: Ref<Item[]>,
  pivot: Ref<Pivot>,
  dimensions: Ref<Dimension[]>,
  searchField: Ref<string | string[]>,
  searchValue: Ref<string>,
  emits: (event: EmitsEventName, ...args: unknown[]) => void,
) {
  const generateSearchingTarget = (item: Item): string => {
    if (typeof searchField.value === 'string' && searchField.value !== '') return getItemValue(searchField.value, item);
    if (Array.isArray(searchField.value)) {
      let searchString = '';
      searchField.value.forEach((field) => {
        searchString += getItemValue(field, item);
      });
      return searchString;
    }
    return Object.values(item).join(' ');
  };

  // items searching
  const itemsSearching = computed((): Item[] | GroupedDimension[] => {
    if (pivot.value) {
      const groupByKeys = dimensions.value.map((x) => x.value);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const groupedData: GroupedDimension[] = items.value.reduce((result, item) => {
        const key = groupByKeys.map((key) => item[key]).join('|');
        const existingGroup = result.find((group: GroupedDimension) => group.key === key);

        if (existingGroup) {
          existingGroup.items.push(item);
        } else {
          const dimensions = Object.fromEntries(Object.entries(item).filter(([key]) => groupByKeys.includes(key)));
          result.push({ key, dimensions, items: [item] });
        }

        return result;
      }, [] as GroupedDimension[]);

      if (searchValue.value !== '') {
        const regex = new RegExp(searchValue.value, 'i');
        return groupedData.filter((item: GroupedDimension) => regex.test(item.key));
      }

      return groupedData;
    }
    // searching feature is not available in server-side mode
    if (searchValue.value !== '') {
      const regex = new RegExp(searchValue.value, 'i');
      return items.value.filter((item) => regex.test(generateSearchingTarget(item)));
    }
    return items.value;
  });
  // items filtering
  const itemsFiltering = computed((): Item[] | GroupedDimension[] => {
    let itemsFiltered = [...itemsSearching.value];

    if (pivot.value) {
      return itemsFiltered;
    }

    if (filterOptions.value) {
      filterOptions.value.forEach((option: FilterOption) => {
        itemsFiltered = itemsFiltered.filter((item) => {
          const { field, comparison, criteria } = option;

          if (typeof comparison === 'function') {
            return comparison(getItemValue(field, item), criteria as string);
          }

          const itemValue: Item = getItemValue(field, item);

          if (itemValue === null) return false; // added 2023-11-12 to not include null

          switch (comparison) {
            case '=':
              return itemValue === criteria;
            case '!=':
              return itemValue !== criteria;
            case '>':
              return itemValue > criteria;
            case '<':
              return itemValue < criteria;
            case '<=':
              return itemValue <= criteria;
            case '>=':
              return itemValue >= criteria;
            case 'between':
              return itemValue >= Math.min(...criteria) && itemValue <= Math.max(...criteria);
            case 'in':
              if (Array.isArray(criteria)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return criteria.includes(itemValue);
              }
              return true;
            default:
              return itemValue === criteria;
          }
        });
      });
      return itemsFiltered;
    }
    return itemsSearching.value;
  });

  watch(
    itemsFiltering,
    (newVal) => {
      if (filterOptions.value) {
        emits('updateFilter', newVal);
      }
    },
    { immediate: true, deep: true },
  );

  // flow: searching => filtering => sorting
  // (last step: sorting)
  const totalItems = computed((): Item[] => {
    if (clientSortOptions.value === null) {
      return itemsFiltering.value;
    }

    const itemsFilteringSorted = [...itemsFiltering.value];

    const { sortBy, sortDesc, sortPivotValue } = clientSortOptions.value;
    const sortFunc = headersForRender.value.find((x) => x.value === sortBy)?.sortFunc;

    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    const sortedItems = itemsFilteringSorted.sort((a, b) => {
      let aValue;
      let bValue;

      if (pivot.value) {
        if (sortPivotValue) {
          aValue = sortFunc
            ? sortFunc(a.items.find((x: Item) => x[pivot.value.value] === sortPivotValue)?.[sortBy])
            : a.items.find((x: Item) => x[pivot.value.value] === sortPivotValue)?.[sortBy];
          bValue = sortFunc
            ? sortFunc(b.items.find((x: Item) => x[pivot.value.value] === sortPivotValue)?.[sortBy])
            : b.items.find((x: Item) => x[pivot.value.value] === sortPivotValue)?.[sortBy];
        } else {
          aValue = sortFunc ? sortFunc(a.dimensions[sortBy]) : a.dimensions[sortBy];
          bValue = sortFunc ? sortFunc(b.dimensions[sortBy]) : b.dimensions[sortBy];
        }
      } else {
        aValue = sortFunc ? sortFunc(getItemValue(sortBy as string, a)) : getItemValue(sortBy as string, a);
        bValue = sortFunc ? sortFunc(getItemValue(sortBy as string, b)) : getItemValue(sortBy as string, b);
      }

      // Check for null values
      if (aValue == null && bValue != null) return 1; // a is null, b is not, a goes last
      if (aValue != null && bValue == null) return -1; // b is null, a is not, b goes last
      if (aValue == null && bValue == null) return 0; // both are null, keep original order

      // Regular comparison
      if (aValue < bValue) return sortDesc ? 1 : -1;
      if (aValue > bValue) return sortDesc ? -1 : 1;

      return 0;
    });

    return sortedItems;
  });

  // eslint-disable-next-line max-len
  const totalItemsLength = computed((): number => totalItems.value.length);

  return {
    totalItems,
    totalItemsLength,
  };
}
