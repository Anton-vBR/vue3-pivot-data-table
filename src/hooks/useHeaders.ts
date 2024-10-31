import { ref, Ref, computed } from 'vue';
import { Item, Measure, Pivot, SortType, Dimension, HeaderForRender } from '../../types/main';
import type { ClientSortOptions, EmitsEventName } from '../../types/internal';

export default function useHeaders(
  items: Ref<Item[]>,
  showIndexSymbol: Ref<string>,
  dimensions: Ref<Dimension[]>,
  measures: Ref<Measure[]>,
  pivot: Ref<Pivot>,
  mustSort: Ref<boolean>,
  showIndex: Ref<boolean>,
  showIndexClass: Ref<string>,
  sortBy: Ref<string>,
  sortType: Ref<SortType>,
  sortPivotValue: Ref<string>,
  splitDimensionHeaders: Ref<boolean>,
  emits: (event: EmitsEventName, ...args: any[]) => void,
) {
  const pivotDomain = computed<string[]>(() => {
    if (pivot.value) {
      return [...new Set(items.value.map((item) => item[pivot.value.value]))];
    } else {
      return [];
    }
  });

  // eslint-disable-next-line max-len
  const generateClientSortOptions = (
    sortByValue: string,
    sortTypeValue: SortType,
    sortPivotValueValue: string,
  ): ClientSortOptions | null => {
    if (sortByValue && sortByValue !== '') {
      return {
        sortBy: sortByValue,
        sortDesc: sortTypeValue === 'desc',
        sortPivotValue: sortPivotValueValue,
      };
    }
    return null;
  };

  const clientSortOptions = ref<ClientSortOptions | null>(
    generateClientSortOptions(sortBy.value, sortType.value, sortPivotValue.value),
  );

  let fixedHeaders: HeaderForRender[] = [];
  const headersForRender = computed((): HeaderForRender[] => {
    if (pivot.value) {
      const headers: HeaderForRender[] = pivotDomain.value.flatMap((pivotValue: string, index: number) => {
        const headerGroup: HeaderForRender[] = measures.value.map((obj) => ({
          ...obj,
          pivotValue,

          // newColumn: pivotDomain.value[pivotInd - 1] === pivotDomain.value[pivotInd],
        }));
        return [
          { ...headerGroup[0], colType: `firstEntry ${index % 2 === 0 ? 'evenPivot' : 'oddPivot'}` },
          ...headerGroup
            .slice(1)
            .map((x) => ({ ...x, colType: `nonFirstEntry ${index % 2 === 0 ? 'evenPivot' : 'oddPivot'}` })),
        ];
      });
      fixedHeaders = [
        ...(dimensions.value.map((x) => ({ ...x, type: 'tableRow' })) as HeaderForRender[]),
        ...(headers.map((x) => ({ ...x, type: 'tableValue' })) as HeaderForRender[]),
      ];
    } else {
      fixedHeaders = [
        ...(dimensions.value.map((x) => ({ ...x, type: 'tableRow' })) as HeaderForRender[]),
        ...(measures.value.map((x) => ({ ...x, type: 'tableValue' })) as HeaderForRender[]),
      ];
    }

    // sorting
    const headersSorting: HeaderForRender[] = fixedHeaders.map((header: HeaderForRender) => {
      const headerSorting: HeaderForRender = Object.assign(header);
      if (headerSorting.sortable) headerSorting.sortType = 'none';

      if (
        clientSortOptions.value &&
        headerSorting.value === clientSortOptions.value.sortBy &&
        clientSortOptions.value.sortPivotValue
      ) {
        if (clientSortOptions.value.sortPivotValue === headerSorting.pivotValue) {
          headerSorting.sortType = clientSortOptions.value.sortDesc ? 'desc' : 'asc';
        } else {
          headerSorting.sortType = 'none';
        }
      } else if (clientSortOptions.value && headerSorting.value === clientSortOptions.value.sortBy) {
        headerSorting.sortType = clientSortOptions.value.sortDesc ? 'desc' : 'asc';
      }

      return headerSorting;
    });

    // show index
    let headersWithIndex: HeaderForRender[] = [];
    if (!showIndex.value) {
      // headersWithIndex = headersSorting;

      headersWithIndex = headersSorting.map((x) => ({ ...x, cssClass: [x.cssClass ?? '', x.colType].join(' ') }));
    } else {
      const headerIndex: HeaderForRender = {
        text: showIndexSymbol.value,
        value: 'index',
        cssClass: showIndexClass.value,
      };
      headersWithIndex = [
        headerIndex,
        ...headersSorting.map((x) => ({ ...x, cssClass: [x.cssClass ?? '', x.colType].join(' ') })),
      ];
    }

    return headersWithIndex;
  });

  const headersForRenderParents = computed(() => {
    const parentGroups = [];

    if (pivot.value) {
      const resultArray = headersForRender.value.reduce(
        (accumulator, item) => {
          const originalText: string | null = item.pivotValue;
          let text: string | null;

          if (!item.pivotValue) {
            text = null;
          } else if (pivot.value.formatFunc) {
            text = pivot.value.formatFunc(item.pivotValue);
          } else {
            text = item.pivotValue;
          }

          const lastEntry = accumulator[accumulator.length - 1];
          if (
            lastEntry &&
            (item.type === 'tableValue' ? true : !splitDimensionHeaders.value) &&
            (lastEntry.parent?.text !== null || item.parent?.text !== null) &&
            lastEntry.text === text &&
            !lastEntry.isIndex &&
            lastEntry.originalText === originalText
          ) {
            // Increment count for subsequent occurrences
            lastEntry.count++;
          } else {
            // Add a new entry for a new or first occurrence
            accumulator.push({
              type: 'pivot',
              isIndex: item.value === 'index',
              text,
              originalText,
              count: 1,
              cssClass: item.cssClass ?? '',
              parent: item.parent,
            });
          }

          return accumulator;
        },
        [] as {
          text: string | null;
          count: number;
          type: string;
          isIndex: boolean;
          cssClass: string;
          originalText: string | null;
          parent: { text: string } | undefined;
        }[],
      );

      parentGroups.push(resultArray);
    }

    if (headersForRender.value.findIndex((x) => x.parent) > -1) {
      const resultArray = headersForRender.value.reduce(
        (accumulator, item) => {
          const text = item.parent?.text || null;
          const pivotValue = item.pivotValue;

          const lastEntry = accumulator[accumulator.length - 1];

          if (
            lastEntry &&
            (item.type === 'tableValue' ? true : !splitDimensionHeaders.value) &&
            (lastEntry.text !== null || text !== null) &&
            lastEntry.text === text &&
            !lastEntry.isIndex &&
            lastEntry.pivotValue === pivotValue
          ) {
            // Increment count for subsequent occurrences
            lastEntry.count++;
          } else {
            // Add a new entry for a new or first occurrence
            accumulator.push({
              type: 'parent',
              isIndex: item.value === 'index',
              pivotValue,
              text,
              count: 1,
              cssClass: item.cssClass ?? '',
            });
          }

          return accumulator;
        },
        [] as {
          text: string | null;
          count: number;
          type: string;
          isIndex: boolean;
          cssClass: string;
          pivotValue: string;
        }[],
      );

      parentGroups.push(resultArray);
    }

    return parentGroups;
  });

  const headerColumns = computed((): string[] => headersForRender.value.map((header) => header.value));

  const updateSortField = (
    sortBy: string,
    receivedSortType: SortType | 'none',
    assignNewSortType: boolean = false,
    sortPivotValue: string | undefined = undefined,
  ) => {
    let sortType: SortType | null = null;

    if (assignNewSortType) {
      sortType = receivedSortType === 'none' ? null : receivedSortType;
    } else if (receivedSortType === 'none') {
      sortType = 'asc';
    } else if (receivedSortType === 'asc') {
      sortType = 'desc';
    } else {
      sortType = mustSort.value ? 'asc' : null;
    }

    if (sortType === null) {
      clientSortOptions.value = null;
    } else {
      clientSortOptions.value = {
        sortBy,
        sortDesc: sortType === 'desc',
        sortPivotValue,
      };
    }

    emits('updateSort', {
      sortPivotValue,
      sortType,
      sortBy,
    });
  };

  return {
    clientSortOptions,
    headerColumns,
    headersForRenderParents,
    headersForRender,
    updateSortField,
  };
}
