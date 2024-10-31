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
  dimensions: Dimension[];
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
  prefix?: string;
  suffix?: string;
};
