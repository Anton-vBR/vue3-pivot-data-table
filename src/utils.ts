import { Item, Pivot, HeaderForRender } from '../types/main';

export function getItemValue(pivot: string, item: Item) {
  if (pivot.includes('.')) {
    const keys = pivot.split('.');
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
  return item[pivot];
}

function applyFormat(content: unknown, header: HeaderForRender, locale: string, nullFillText: string | null) {
  if (content == null) {
    return nullFillText;
  }
  if (Array.isArray(content)) {
    return content.join(', ');
  }
  if (header.formatFunc) {
    content = header.formatFunc(content);
  } else if (header.numberFormat) {
    content = new Intl.NumberFormat(locale, header.numberFormat).format(content);
  }
  if (header.prefix) {
    content = header.prefix + content;
  }
  if (header.suffix) {
    content = content + header.suffix;
  }
  return content;
}

export function generateCellContent(header: HeaderForRender, item: Item, locale: string, nullFillText: string | null) {
  const content = getItemValue(header.value, item);
  return applyFormat(content, header, locale, nullFillText);
}

export function generateCellContentBasedOnPivot(
  header: HeaderForRender,
  item: Item,
  pivot: Pivot,
  locale: string,
  nullFillText: string | null,
) {
  let content: unknown;
  if (header.pivotValue) {
    content = item.items.find((x: Item) => x[pivot.value] === header.pivotValue)?.[header.value];
  } else {
    content = getItemValue(header.value, item['dimensions']);
  }

  return applyFormat(content, header, locale, nullFillText);
}
