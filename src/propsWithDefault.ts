import { PropType } from 'vue';
import type { SortType, Row, Column, FilterOption, Item, Value } from '../types/main';

export default {
  items: {
    type: Array as PropType<Item[]>,
    default: () => [],
    required: true,
    description: 'Array of data objects, should be a flat array.',
  },
  values: {
    type: Array as PropType<Value[]>,
    default: () => [],
    required: true,
    description: 'Array of value objects representing the metrics',
  },
  rows: {
    type: Array as PropType<Row[]>,
    default: () => [],
    description: 'Array of row objects representing the dimensions on rows',
  },
  column: {
    type: Object as PropType<Column>,
    default: null,
    description: 'Single column object representing the dimension on columns',
  },
  locale: {
    type: String,
    default: 'en-US',
    description: 'Locale setting for the table.',
  },
  currentPage: {
    type: Number,
    default: 1,
    description: 'Current page number.',
  },
  noRowsCustom: {
    type: Boolean,
    default: false,
    description: 'Indicates whether to use custom rows when no data is available.',
  },
  emptyMessage: {
    type: String,
    default: 'No Available Data',
    description: 'Message to display when there is no available data.',
  },
  filterOptions: {
    type: Array as PropType<FilterOption[]>,
    default: null,
    description: 'Array of filter options for the table.',
  },
  hideFooter: {
    type: Boolean,
    default: false,
    description: 'Indicates whether to hide the table footer.',
  },
  hideHeader: {
    type: Boolean,
    default: false,
    description: 'Indicates whether to hide the table header.',
  },
  loading: {
    type: Boolean,
    default: false,
    description: 'Indicates whether the table is in a loading state.',
  },
  rowsPerPage: {
    type: Number,
    default: 25,
    description: 'Number of rows per page.',
  },
  searchField: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
    description: 'Field or fields to search within.',
  },
  rowsItems: {
    type: Array as PropType<number[]>,
    default: () => [25, 50, 100],
  },
  rowsOfPageSeparatorMessage: {
    type: String,
    default: 'of',
  },
  searchValue: {
    type: String,
    default: '',
    description: 'Value to search for within the specified field(s).',
  },
  showIndex: {
    type: Boolean,
    default: false,
    description: 'Indicates whether to display an index column.',
  },
  showIndexSymbol: {
    type: String,
    default: '#',
    description: 'Symbol used for the index column.',
  },
  showIndexClass: {
    type: String,
    default: '',
    description: 'Class used for the index column.',
  },
  oddRowClass: {
    type: String,
    default: 'odd-row',
    description: 'CSS class applied to odd-numbered rows.',
  },
  evenRowClass: {
    type: String,
    default: 'even-row',
    description: 'CSS class applied to even-numbered rows.',
  },
  oddRowCellClass: {
    type: String,
    default: 'odd-row-cell',
    description: 'CSS class applied to cells in odd-numbered rows.',
  },
  customTableRowClass: {
    type: Function as PropType<({ index, item }: { index: number; item: Item }) => string[]>,
    default: () => null,
    description: 'Custom function to apply classes to tablerows <tr>.',
  },
  customTableDataClass: {
    type: Function as PropType<({ index, item, header }: { index: number; item: Item; header: Value }) => string[]>,
    default: () => null,
    description: 'Custom function to apply classes to tablerows <td>.',
  },
  evenRowCellClass: {
    type: String,
    default: 'even-row-cell',
    description: 'CSS class applied to cells in even-numbered rows.',
  },
  sortBy: {
    type: String,
    default: '',
    description: 'Field or fields to sort by.',
  },
  sortType: {
    type: String as PropType<SortType>,
    default: 'asc',
    description: 'Sort type or types (ascending or descending).',
  },
  sortColumnValue: {
    type: String as PropType<SortType>,
    default: '',
    description: 'Sort columnValue when column is active',
  },
  tableClassName: {
    type: String,
    default: '',
    description: 'CSS class applied to the table element.',
  },
  innerTableClassName: {
    type: String,
    default: '',
    description: 'CSS class applied to the inner table element.',
  },
  headerClassName: {
    type: String,
    default: '',
    description: 'CSS class applied to the table header element.',
  },
  mustSort: {
    type: Boolean,
    default: false,
    description: 'Indicates whether sorting is required.',
  },
  tableNodeId: {
    type: String,
    default: '',
    description: 'ID attribute for the table element.',
  },
  nullFillText: {
    type: String,
    default: '-',
    description: 'Text to be shown if cellvalue is null',
  },
};
