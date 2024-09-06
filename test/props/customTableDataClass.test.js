/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import PivotDataTable from '../../src/components/PivotDataTable.vue';

const pivot = { text: 'Fruit', value: 'fruit' };
const measures = [{ text: 'Sales', value: 'sales' }];

describe('Adds class to tbody > tr > td', () => {
  it('should add class', async () => {
    const items = [{ fruit: 'Tomato', sales: 30 }];
    const wrapper = mount(PivotDataTable, {
      props: {
        items,
        measures,
        customTableDataClass: () => {
          return ['custom-data-class'];
        },
      },
    });
    await flushPromises();

    const liItem = wrapper.find('tbody').find('tr').find('td');
    expect(liItem.classes()).toContain('custom-data-class');
  });

  it('should add class with condition', async () => {
    const items = [
      { fruit: 'Tomato', sales: 30 },
      { fruit: 'Banana', sales: 40 },
    ];
    const wrapper = mount(PivotDataTable, {
      props: {
        items,
        measures,
        customTableDataClass: ({ item }) => {
          if (item.sales === 30) {
            return ['custom-data-class'];
          }
        },
      },
    });
    await flushPromises();

    const liItem = wrapper.find('tbody').find('tr').find('td');
    expect(liItem.classes()).toContain('custom-data-class');

    const liItem2 = wrapper.find('tbody').findAll('tr')[1].find('td');
    expect(liItem2.classes()).not.toContain('custom-data-class');
  });

  it('should add class with pivot condition', async () => {
    const items = [{ fruit: 'Tomato', sales: 30 }];
    const wrapper = mount(PivotDataTable, {
      props: {
        items,
        measures,
        pivot,
        customTableDataClass: ({ item }) => {
          if (item.fruit === 'Tomato') {
            return ['custom-data-class'];
          }
        },
      },
    });
    // console.log(wrapper.html());
    await flushPromises();

    const liItem = wrapper.find('tbody').find('tr').find('td');
    expect(liItem.classes()).toContain('custom-data-class');
  });
});
