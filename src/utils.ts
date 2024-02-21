import { HeaderForRender } from '../types/internal';
import { Item, Column } from '../types/main';

export function getItemValue(column: string, item: Item) {
  if (column.includes('.')) {
    const keys = column.split('.');
    const { length } = keys;

    let content;
    let i = 0;

    while (i < length) {
      if (i === 0) {
        content = item[keys[0]];
      } else if (content && typeof content === 'object') {
        content = content[keys[i]];
      } else {
        content = '';
        break;
      }
      i += 1;
    }
    return content ?? '';
  }
  return item[column];
}

function applyFormat(content: any, header: HeaderForRender, locale: string) {
  if (content == null) {
    return null;
  }
  if (Array.isArray(content)) {
    return content.join(', ')
  }
  if (header.format) {
    return new Intl.NumberFormat(locale, header.format).format(content);
  }
  if (header.prefix) {
    content = header.prefix + content;
  }
  if (header.suffix) {
    content = content + header.suffix;
  }
  return content;
}

export function generateCellContent(header: HeaderForRender, item: Item, locale: string) {
  const content = getItemValue(header.value, item);
  return applyFormat(content, header, locale);
}

export function generateCellContentBasedOnColumn(header: HeaderForRender, item: Item, column: Column, locale: string) {
  let content: any;
  if (header.columnValue) {
    content = item.items.find((x: Item) => x[column.value] === header.columnValue)?.[header.value];
  } else {
    content = getItemValue(header.value, item['rows']);
  }

  return applyFormat(content, header, locale);
}
