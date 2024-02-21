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

export type Column = {
  text: string;
  value: string;
  cssClass?: string;
  formatFunc?: any;
};

export type Row = {
  text: string;
  value: string;
  sortable?: boolean;
  sortFunc?: any;
  sticky?: boolean;
  cssClass?: string;
  formatFunc?: any;
};

export type GroupedRow = {
  key: string;
  rows: Row[];
  items: Item[];
};

export type Value = {
  text: string;
  value: string;
  sortable?: boolean;
  fixed?: boolean;
  width?: number;
  type?: 'row' | 'column';
  columnValue?: string;
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
