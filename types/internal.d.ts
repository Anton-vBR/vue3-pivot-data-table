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

export type EmitsEventName =
  | 'scroll'
  | 'clickRow'
  | 'clickCell'
  | 'updateSort'
  | 'updateFilter'
  | 'updatePageItems'
  | 'updateTotalItems'
  | 'mouseover'
  | 'mouseleave';
