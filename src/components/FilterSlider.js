import formatNumber from '../utils/formatNumber';

export default ({ templates }) => ({
  props: {
    option: {
      type: Object,
      default() {
        return {
          data: [],
          displayName: 'Slider',
          name: 'slider',
          type: 'slider',
        };
      },
    },
  },

  template: templates.FilterSlider,

  computed: {
    value: {
      get() {
        const { name } = this.option;
        const { min, max } = this.option.data;
        return this.$store.state.preselect[name] || [min, max];
      },
      set(value) {
        const { name } = this.option;
        const { min, max } = this.option.data;
        if (min === value[0] && max === value[1]) {
          this.$store.dispatch('deselect', { name });
        } else {
          this.$store.dispatch('select', { name, value });
        }

        this.$emit('updateRouter', true);
      },
    },
  },

  methods: {
    formatTooltip(val) {
      const { format } = this.$store.state;
      const { name } = this.option;
      return formatNumber(val, name, format);
    },
  },
});
