import type { SortType } from './main';

export type ServerOptionsComputed = {
  page: number;
  rowsPerPage: number;
  sortBy: string | string[] | null;
  sortType: SortType | SortType[] | null;
};

export type HeaderForRender = {
  text: string;
  value: string;
  sortable?: boolean;
  sortType?: SortType | 'none';
  fixed?: boolean;
  width?: number;
  sortFunc?: any;
  hoverable?: boolean;
  clickable?: boolean;
  parent?: { text: string };
  columnValue?: any;
  cssClass?: string;
  type?: string;
  formatFunc?: any;
  numberFormat?: any;
  prefix?: string;
  suffix?: string;
};

export type ClientSortOptions = {
  sortBy: string;
  sortDesc: boolean;
  columnValue?: string;
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
