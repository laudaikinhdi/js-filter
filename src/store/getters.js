import chunk from 'lodash/chunk';
import matchItems from '../utils/matchItems';
import sortItems from '../utils/sortItems';

export default {
  matched({
    items, selected, sorting, filters,
  }) {
    const matched = Object.keys(selected).length ? matchItems(items, selected, filters) : items;
    const sorted = sortItems(matched, sorting);

    return sorted;
  },

  total(state, { matched }) {
    return matched.length;
  },

  displayItems({ page }, { matched }) {
    const { size } = page;
    const pages = chunk(matched, size);
    const { current } = page;
    return pages[current - 1];
  },
};
