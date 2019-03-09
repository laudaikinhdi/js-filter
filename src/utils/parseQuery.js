import each from 'lodash/each';
import find from 'lodash/find';

export default (query, { filters }) => {
  const selected = {};
  each(query, (value, key) => {
    const filter = find(filters, f => f.name === key);
    if (filter) {
      const { type } = filter;
      if (type === 'text' || type === 'radio' || type === 'select') {
        selected[key] = value;
      } else
      if (type === 'slider') {
        const vals = value.split(',');
        if (vals.length === 2) {
          const [min, max] = vals;
          if (!isNaN(min) && !isNaN(max)) {
            selected[key] = [+min, +max];
          }
        }
      } else
      if (type === 'checkbox' || type === 'multiselect' || type === 'date') {
        const vals = value.split(',');
        if (vals.length) {
          selected[key] = vals;
        }
      }
    }
  });

  return selected;
};
