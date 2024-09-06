import type { SortType } from './main';

export type ServerOptionsComputed = {
  page: number;
  rowsPerPage: number;
  sortBy: string | string[] | null;
  sortType: SortType | SortType[] | null;
};

export type ClientSortOptions = {
  sortBy: string;
  sortDesc: boolean;
  sortPivotValue?: string;
};

export type MultipleSelectStatus = 'allSelected' | 'noneSelected' | 'partSelected';

// eslint-disable-next-line max-len
export type EmitsEventName =
  | 'clickRow'
  | 'selectRow'
  | 'deselectRow'
  | 'expandRow'
  | 'updateSort'
  | 'update:itemsSelected'
  | 'update:serverOptions'
  | 'updateFilter'
  | 'updatePageItems'
  | 'updateTotalItems'
  | 'selectAll';
