export const emits = [
  { name: 'scroll', description: 'Triggered when scrolling' },
  { name: 'clickRow', description: 'Triggered when a row is clicked' },
  { name: 'clickCell', description: 'Triggered when a cell is clicked' },
  { name: 'updateSort', description: 'Triggered when sorting is updated' },
  { name: 'updateFilter', description: 'Triggered when filtering is updated' },
  { name: 'updatePageItems', description: 'Triggered when page items are updated' },
  { name: 'updateTotalItems', description: 'Triggered when total items are updated' },
  { name: 'mouseover', description: 'Triggered when mouse is over' },
  { name: 'mouseleave', description: 'Triggered when mouse leaves' },
];

export default emits.map((x) => x.name);
