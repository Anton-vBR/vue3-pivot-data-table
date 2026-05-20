import type { DefineComponent } from 'vue';

export type SortType = 'asc' | 'desc';

export type Item = Record<string, any>;

export type FilterOption =
  | {
      field: string;
      comparison: 'between';
      criteria: [number, number];
    }
  | {
      field: string;
      comparison: '=' | '!=';
      criteria: number | string;
    }
  | {
      field: string;
      comparison: '>' | '>=' | '<' | '<=';
      criteria: number;
    }
  | {
      field: string;
      comparison: 'in';
      criteria: number[] | string[];
    }
  | {
      field: string;
      comparison: (value: any, criteria: string) => boolean;
      criteria: string;
    };

export type Pivot = {
  text: string;
  value: string;
  cssClass?: string;
  formatFunc?: any;
};

export type Dimension = {
  text: string;
  value: string;
  sortable?: boolean;
  sortFunc?: any;
  sticky?: boolean;
  cssClass?: string;
  parent?: { text: string };
  formatFunc?: any;
};

export type GroupedDimension = {
  key: string;
  dimensions: Item;
  items: Item[];
};

export type Measure = {
  text: string;
  value: string;
  sortable?: boolean;
  fixed?: boolean;
  width?: number;
  type?: 'dimension' | 'pivot';
  pivotValue?: string;
  sortFunc?: any;
  formatFunc?: any;
  numberFormat?: any;
  prefix?: string;
  suffix?: string;
  parent?: { text: string };
  sticky?: boolean;
  cssClass?: string;
};

export type UpdateSortArgument = {
  sortType: SortType | null;
  sortBy: string;
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
  pivotValue?: any;
  cssClass?: string;
  type?: string;
  formatFunc?: any;
  numberFormat?: any;
  colType?: string;
  prefix?: string;
  suffix?: string;
};

export interface PivotDataTableProps {
  items: Item[];
  measures: Measure[];
  dimensions?: Dimension[];
  pivot?: Pivot | null;
  locale?: string;
  currentPage?: number;
  noRowsCustom?: boolean;
  emptyMessage?: string;
  filterOptions?: FilterOption[] | null;
  hideFooter?: boolean;
  hideHeader?: boolean;
  loading?: boolean;
  rowsPerPage?: number;
  searchField?: string | string[];
  rowsItems?: number[];
  rowsOfPageSeparatorMessage?: string;
  searchValue?: string;
  showIndex?: boolean;
  showIndexSymbol?: string;
  showIndexClass?: string;
  oddRowClass?: string;
  evenRowClass?: string;
  oddRowCellClass?: string;
  customTableRowClass?: (args: { index: number; item: Item }) => string[];
  customTableDataClass?: (args: { index: number; item: Item; header: HeaderForRender }) => string[];
  evenRowCellClass?: string;
  sortBy?: string;
  sortType?: SortType;
  sortPivotValue?: string;
  tableClassName?: string;
  innerTableClassName?: string;
  headerClassName?: string;
  mustSort?: boolean;
  tableNodeId?: string;
  nullFillText?: string;
  splitDimensionHeaders?: boolean;
}

declare const PivotDataTable: DefineComponent<PivotDataTableProps>;
export default PivotDataTable;
