import each from 'lodash/each';
import cloneDeep from 'lodash/cloneDeep';
import matchItems from '../utils/matchItems';

export default ({ templates }, layout) => ({
  props: {
    option: {
      type: Object,
      default() {
        return {
          data: [],
          displayName: 'Multiple',
          name: 'multiple',
          type: 'multiple',
        };
      },
    },
  },

  template: templates[layout],

  computed: {
    value: {
      get() {
        const { name } = this.option;
        return this.$store.state.preselect[name] || [];
      },
      set(value) {
        const { name } = this.option;
        if (value.length) {
          this.$store.dispatch('select', { name, value });
        } else {
          this.$store.dispatch('deselect', { name });
        }

        this.$emit('updateRouter', true);
      },
    },

    counters() {
      const { selected, items, filters } = this.$store.state;
      const { option } = this;
      const { data, name } = option;
      const counters = {};

      each(data, (item) => {
        const fakeSelected = cloneDeep(selected);
        fakeSelected[name] = [item.value];

        const fakeMatched = matchItems(items, fakeSelected, filters);
        counters[item.value] = fakeMatched.length;
      });

      return counters;
    },
  },
});
