/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import PivotDataTable from '../../src/components/PivotDataTable.vue';

const pivot = { text: 'Fruit', value: 'fruit' };
const measures = [{ text: 'Sales', value: 'sales' }];

describe('Adds class to tbody > tr', () => {
  it('should add class', async () => {
    const items = [{ fruit: 'Tomato', sales: 30 }];
    const wrapper = mount(PivotDataTable, {
      props: {
        items,
        measures,
        customTableRowClass: () => {
          return ['custom-row-class'];
        },
      },
    });
    await flushPromises();

    const liItem = wrapper.find('tbody').find('tr');
    expect(liItem.classes()).toContain('custom-row-class');
  });

  it('should add class with condition', async () => {
    const items = [
      { fruit: 'Tomato', sales: 30 },
      { fruit: 'Banana', sales: 30 },
    ];
    const wrapper = mount(PivotDataTable, {
      props: {
        items,
        measures,
        customTableRowClass: ({ index }) => {
          if (index === 1) {
            return ['custom-row-class'];
          }
        },
      },
    });
    await flushPromises();

    const liItem = wrapper.find('tbody').find('tr');
    expect(liItem.classes()).not.toContain('custom-row-class');

    const liItem2 = wrapper.find('tbody').findAll('tr')[1];
    expect(liItem2.classes()).toContain('custom-row-class');
  });

  it('should add class with pivot condition', async () => {
    const items = [
      { fruit: 'Tomato', sales: 30 },
      { fruit: 'Banana', sales: 30 },
    ];
    const wrapper = mount(PivotDataTable, {
      props: {
        items,
        measures,
        pivot,
        customTableRowClass: () => {
          return ['custom-row-class'];
        },
      },
    });
    // console.log(wrapper.html());
    await flushPromises();

    const liItem = wrapper.find('tbody').find('tr');
    expect(liItem.classes()).toContain('custom-row-class');
  });
});
