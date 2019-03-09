import each from 'lodash/each';
import find from 'lodash/find';
import formatNumber from '../utils/formatNumber';

export default ({ templates }) => ({
  template: templates.FilterSelected,

  computed: {
    items() {
      const { preselect, format, filters } = this.$store.state;
      const items = [];
      each(preselect, (value, key) => {
        const filterItem = find(filters, f => f.name === key);
        if (filterItem) {
          const { displayName, type, name } = filterItem;
          if (type === 'text') {
            items.push({
              type,
              name,
              value,
              displayName,
              displayValue: value,
            });
          }

          if (type === 'slider') {
            const [min, max] = value;
            const formatedMin = formatNumber(min, key, format);
            const formatedMax = formatNumber(max, key, format);
            items.push({
              type,
              name,
              displayName,
              displayValue: `${formatedMin} - ${formatedMax}`,
            });
          }

          if (type === 'date') {
            const [start, end] = value;
            items.push({
              type,
              name,
              value,
              displayName,
              displayValue: `From ${start} to ${end}`,
            });
          }

          if (type === 'radio' || type === 'select') {
            const { data } = filterItem;
            const { displayValue } = find(data, i => i.value === value);
            items.push({
              type, name, value, displayName, displayValue,
            });
          }

          if (type === 'checkbox' || type === 'multiselect') {
            const { data } = filterItem;
            each(value, (val) => {
              const { displayValue } = find(data, i => i.value === val);
              items.push({
                type,
                name,
                value: val,
                displayName,
                displayValue,
              });
            });
          }
        }
      });
      return items;
    },
  },

  methods: {
    clearAll() {
      this.remove(this.items);
    },

    remove(items) {
      each(items, (item) => {
        const { name, type, value } = item;
        if (type === 'checkbox' || type === 'multiselect') {
          this.$store.dispatch('deselectOnMultiple', { name, value });
        } else {
          this.$store.dispatch('deselect', { name });
        }
      });

      this.$emit('updateRouter', true);
    },
  },
});
