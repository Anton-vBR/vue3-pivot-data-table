/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PivotDataTable from '../src/components/PivotDataTable.vue';

const dimensions = [
  {
    text: 'Fruit',
    value: 'fruit',
  },
];

const measures = [
  {
    text: 'Sales',
    value: 'sales',
    sortable: true,
    prefix: '$',
    suffix: ' kr',
  },
];

const items = [
  {
    fruit: 'Tomato',
    sales: 30,
  },
  {
    fruit: 'Orange',
    sales: 20,
  },
  {
    fruit: 'Cucumber',
    sales: 12,
  },
  {
    fruit: 'Grapes',
    sales: 120,
  },
  {
    fruit: 'Mango',
    sales: 180,
  },
];

// Correct render
describe('Items', () => {
  it('should render', () => {
    const wrapper = mount(PivotDataTable, {
      props: {
        items,
        measures,
        dimensions,
        rowsPerPage: 5,
      },
    });
    const tdArr = wrapper.findAll('td');
    const firstTd = tdArr.at(0);
    expect(firstTd.text()).toBe('Tomato');
  });
});

// Button Pagination
describe('Button Pagination', () => {
  it('should render', () => {
    const wrapper = mount(PivotDataTable, {
      props: {
        items,
        measures,
        dimensions,
        rowsPerPage: 5,
      },
    });
    expect(wrapper.find('.vue3-pivot-data-table').exists()).toBe(true);
  });
});
