const fruitsData = [
  {
    fruit: 'Tomato',
    units: 12,
    sales: 30,
    sales_change: 0.01,
    margin: 20,
  },
  {
    fruit: 'Orange',
    units: 13,
    sales: 20,
    sales_change: 0.01,
    margin: 12,
  },
  {
    fruit: 'Cucumber',
    units: 2,
    sales: 12,
    sales_change: 0.01,
    margin: 5,
  },
  {
    fruit: 'Grapes',
    sales: 120,
    units: 90,
    sales_change: 0.01,
    margin: 2,
  },
  {
    fruit: 'Mango',
    sales: 180,
    units: 120,
    sales_change: 0.01,
    margin: -2,
  },
];

const daysOfWeek: string[] = Array.from({ length: 7 }, (_, index) =>
  new Date(0, 0, index + 1).toLocaleDateString('en-US', { weekday: 'long' }),
);

const mockItems = daysOfWeek.flatMap((weekday, index) => {
  const adjustedFruitsData = fruitsData.map(({ fruit, sales, units, sales_change, margin }) => ({
    weekday,
    weeknum: index,
    fruit,
    units: units - index,
    sales: sales + index,
    sales_change: sales_change + index * (index % 2 ? 0.002 : -0.002),
    margin: margin + index - (index % 2) * 2,
  }));
  return adjustedFruitsData;
});

export default mockItems;
