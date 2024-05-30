import { ref, Ref, computed } from 'vue';
import { Item, Value, Column, SortType, Row } from '../../types/main';
import type { HeaderForRender, ClientSortOptions, EmitsEventName } from '../../types/internal';

export default function useHeaders(
  items: Ref<Item[]>,
  showIndexSymbol: Ref<string>,
  rows: Ref<Row[]>,
  values: Ref<Value[]>,
  column: Ref<Column>,
  mustSort: Ref<boolean>,
  showIndex: Ref<boolean>,
  showIndexClass: Ref<string>,
  sortBy: Ref<string>,
  sortType: Ref<SortType>,
  sortColumnValue: Ref<string>,
  emits: (event: EmitsEventName, ...args: any[]) => void,
) {
  const columnDomain = computed<string[]>(() => {
    if (column.value) {
      return [...new Set(items.value.map((item) => item[column.value.value]))];
    } else {
      return [];
    }
  });

  // eslint-disable-next-line max-len
  const generateClientSortOptions = (
    sortByValue: string,
    sortTypeValue: SortType,
    sortColumnValueValue: string,
  ): ClientSortOptions | null => {
    if (sortByValue && sortByValue !== '') {
      return {
        sortBy: sortByValue,
        sortDesc: sortTypeValue === 'desc',
        sortColumnValue: sortColumnValueValue,
      };
    }
    return null;
  };

  const clientSortOptions = ref<ClientSortOptions | null>(
    generateClientSortOptions(sortBy.value, sortType.value, sortColumnValue.value),
  );

  let fixedHeaders: HeaderForRender[] = [];
  const headersForRender = computed((): HeaderForRender[] => {
    if (column.value) {
      const headers: HeaderForRender[] = columnDomain.value.flatMap((columnValue: string) => {
        const headerGroup: HeaderForRender[] = values.value.map((obj) => ({
          ...obj,
          columnValue,
        }));
        return headerGroup;
      });
      fixedHeaders = [
        ...(rows.value.map((x) => ({ ...x, type: 'tableRow' })) as HeaderForRender[]),
        ...(headers.map((x) => ({ ...x, type: 'tableValue' })) as HeaderForRender[]),
      ];
    } else {
      fixedHeaders = [
        ...(rows.value.map((x) => ({ ...x, type: 'tableRow' })) as HeaderForRender[]),
        ...(values.value.map((x) => ({ ...x, type: 'tableValue' })) as HeaderForRender[]),
      ];
    }

    // sorting
    const headersSorting: HeaderForRender[] = fixedHeaders.map((header: HeaderForRender) => {
      const headerSorting: HeaderForRender = Object.assign(header);
      if (headerSorting.sortable) headerSorting.sortType = 'none';

      if (
        clientSortOptions.value &&
        headerSorting.value === clientSortOptions.value.sortBy &&
        clientSortOptions.value.sortColumnValue
      ) {
        if (clientSortOptions.value.sortColumnValue === headerSorting.columnValue) {
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
      headersWithIndex = headersSorting;
    } else {
      const headerIndex: HeaderForRender = {
        text: showIndexSymbol.value,
        value: 'index',
        cssClass: showIndexClass.value,
      };
      headersWithIndex = [headerIndex, ...headersSorting];
    }

    return headersWithIndex;
  });

  const headersForRenderParents = computed(() => {
    const parentGroups = [];

    if (column.value) {
      const resultArray = headersForRender.value.reduce(
        (accumulator, item) => {
          const originalText: string | null = item.columnValue;
          let text: string | null;

          if (!item.columnValue) {
            text = null;
          } else if (column.value.formatFunc) {
            text = column.value.formatFunc(item.columnValue);
          } else {
            text = item.columnValue;
          }

          const lastEntry = accumulator[accumulator.length - 1];
          if (lastEntry && lastEntry.text === text && !lastEntry.isIndex && lastEntry.originalText === originalText) {
            // Increment count for subsequent occurrences
            lastEntry.count++;
          } else {
            // Add a new entry for a new or first occurrence

            accumulator.push({
              type: 'column',
              isIndex: item.value === 'index',
              text,
              originalText,
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
          originalText: string | null;
        }[],
      );

      parentGroups.push(resultArray);
    }

    if (headersForRender.value.findIndex((x) => x.parent) > -1) {
      const resultArray = headersForRender.value.reduce(
        (accumulator, item) => {
          const text = item.parent?.text || null;
          const columnValue = item.columnValue;

          const lastEntry = accumulator[accumulator.length - 1];
          if (lastEntry && lastEntry.text === text && !lastEntry.isIndex && lastEntry.columnValue === columnValue) {
            // Increment count for subsequent occurrences
            lastEntry.count++;
          } else {
            // Add a new entry for a new or first occurrence
            accumulator.push({
              type: 'parent',
              isIndex: item.value === 'index',
              columnValue,
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
          columnValue: string;
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
    sortColumnValue: string | undefined = undefined,
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
        sortColumnValue,
      };
    }

    emits('updateSort', {
      sortColumnValue,
      sortType,
      sortBy,
    });
  };

  return {
    columnDomain,
    clientSortOptions,
    headerColumns,
    headersForRenderParents,
    headersForRender,
    updateSortField,
  };
}
