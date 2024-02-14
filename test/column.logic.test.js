/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import PivotDataTable from '../src/components/PivotDataTable.vue';

const column = { text: 'Fruit', value: 'fruit' };
const values = [{ text: 'Sales', value: 'sales' }];

describe('Parameter checks', () => {
  it('should show error when passing array of columns', async () => {
    const items = [{ fruit: 'Tomato', sales: 30 }];
    const wrapper = mount(PivotDataTable, {
      props: {
        items,
        values,
        column: [column],
        rowsPerPage: 5,
      },
    });
    await flushPromises();
    const liItem = wrapper.find('#errors').find('li');
    expect(liItem.text()).toBe('propError: column is of type Array');
  });
});

describe('Column domain', () => {
  it('should create correct column domain', () => {
    const items = [
      { fruit: 'Tomato', sales: 30 },
      { fruit: 'Orange', sales: 20 },
      { fruit: 'Cucumber', sales: 12 },
    ];
    const wrapper = mount(PivotDataTable, {
      props: {
        items,
        values,
        column,
        rowsPerPage: 5,
      },
    });
    const thArr = wrapper.find('tr').findAll('th');
    expect(thArr.map((x) => x.text())).toStrictEqual(['Tomato', 'Orange', 'Cucumber']);
  });
});

describe('Duplicate check', () => {
  it('should ...', async () => {
    const items = [
      { fruit: 'Tomato', sales: 30 },
      { fruit: 'Orange', sales: 20 },
      { fruit: 'Tomato', sales: 30 },
    ];
    const wrapper = mount(PivotDataTable, {
      props: {
        items,
        values,
        column,
        rowsPerPage: 5,
      },
    });

    await flushPromises();
    const liItem = wrapper.find('#errors').find('li');
    expect(liItem.text()).toBe('dataShapeError: duplicate item Objects (by rows * columns) found in items');
  });
});

// TODO

//wrapper.find('tbody').findAll('tr').length === 1;
