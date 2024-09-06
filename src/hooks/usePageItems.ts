import { Ref, computed, ComputedRef } from 'vue';
import { Pivot, GroupedDimension, Item } from '../../types/main';

export default function usePageItems(
  currentPaginationNumber: Ref<number>,
  rowsPerPageRef: Ref<number>,
  showIndex: Ref<boolean>,
  totalItems: ComputedRef<Item[] | GroupedDimension[]>,
  pivot: Ref<Pivot>,
) {
  const currentPageFirstIndex = computed((): number => (currentPaginationNumber.value - 1) * rowsPerPageRef.value + 1);

  const currentPageLastIndex = computed((): number => {
    return Math.min(totalItems.value.length, currentPaginationNumber.value * rowsPerPageRef.value);
  });

  // items in current page
  const itemsInPage = computed((): Item[] | GroupedDimension[] => {
    if (rowsPerPageRef.value === -1) {
      return totalItems.value;
    }

    return totalItems.value.slice(currentPageFirstIndex.value - 1, currentPageLastIndex.value);
  });

  const itemsWithIndex = computed((): Item[] | GroupedDimension[] => {
    if (showIndex.value) {
      if (pivot.value) {
        return itemsInPage.value.map((item, index) => {
          item['dimensions'] = { index: currentPageFirstIndex.value + index, ...item['dimensions'] };
          return item;
        });
      }

      return itemsInPage.value.map((item, index) => ({ index: currentPageFirstIndex.value + index, ...item }));
    }
    return itemsInPage.value;
  });

  // items for render
  const pageItems = computed((): Item[] | GroupedDimension[] => {
    return itemsWithIndex.value;
  });

  return {
    currentPageFirstIndex,
    currentPageLastIndex,
    pageItems,
  };
}
