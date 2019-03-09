import map from 'lodash/map';
import each from 'lodash/each';

export default ({ selected, page, sorting }) => {
  const query = {};

  each(selected, (value, key) => {
    if (Array.isArray(value)) {
      const vals = map(value, v => encodeURIComponent(v));
      query[key] = vals.join(',');
    } else {
      query[key] = value;
    }
  });

  if (page.current > 1) {
    query.page = page.current;
  }

  const { by, direction } = sorting;
  if (by !== 'position') {
    query.sortby = by;
  }
  if (direction === 'desc') {
    query.sortdir = direction;
  }

  return query;
};
