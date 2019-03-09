import find from 'lodash/find';
import every from 'lodash/every';
import filter from 'lodash/filter';
import toLower from 'lodash/toLower';
import includes from 'lodash/includes';
import intersection from 'lodash/intersection';

const testText = (itemValue, value) => {
  const needle = toLower(value);
  const haystack = toLower(itemValue);
  return includes(haystack, needle);
};

const testSlider = (itemValue, value) => {
  const [min, max] = value;
  return itemValue >= min && itemValue <= max;
};

const testDate = (itemValue, value) => {
  const [start, end] = value;
  const startDateTime = `${start} 00:00:00`;
  const endDateTime = `${end} 23:59:59`;
  return itemValue >= startDateTime && itemValue <= endDateTime;
};

const testSingle = (itemValue, value) => includes(itemValue.value, value);

const testMultiple = (itemValue, value) => {
  const common = intersection(itemValue.value, value);
  return !!common.length;
};

export default (items, selected, filters) => filter(items, (item) => {
  const test = every(selected, (value, name) => {
    if (item[name] === undefined) {
      return false;
    }

    const { type } = find(filters, f => f.name === name);
    const itemValue = item[name];
    if (type === 'text') {
      return testText(itemValue, value);
    }

    if (type === 'slider') {
      return testSlider(itemValue, value);
    }

    if (type === 'date') {
      return testDate(itemValue, value);
    }

    if (type === 'radio' || type === 'select') {
      return testSingle(itemValue, value);
    }

    if (type === 'checkbox' || type === 'multiselect') {
      return testMultiple(itemValue, value);
    }

    return false;
  });

  return test;
});
