import map from 'lodash/map';
import sortBy from 'lodash/sortBy';

export default (items, sortingConfig) => {
  const { by, direction } = sortingConfig;

  if (by === 'position') {
    if (direction === 'asc') {
      return items;
    }
    return map(items, item => item).reverse();
  }

  if (direction === 'asc') {
    return sortBy(items, [by, 'id']);
  }

  return sortBy(items, [by, 'id']).reverse();
};
