export default ({ templates }) => ({
  props: {
    option: {
      type: Object,
      default() {
        return {
          data: [],
          displayName: 'Date',
          name: 'date',
          type: 'date',
        };
      },
    },
  },

  template: templates.FilterDate,

  data() {
    return {
      start: null,
      end: null,
    };
  },

  computed: {
    value() {
      const { name } = this.option;
      return this.$store.state.preselect[name];
    },
  },

  watch: {
    value(currentValue) {
      if (currentValue === undefined) {
        this.start = null;
        this.end = null;
      }
    },
  },

  methods: {
    onChange(val) {
      const { start, end, option } = this;
      const { name } = option;
      if (start && end) {
        this.$store.dispatch('select', { name, value: [start, end] });
        this.$emit('updateRouter', true);
      } else
      if (!val && (start || end)) {
        this.$store.dispatch('deselect', { name });
        this.$emit('updateRouter', true);
      }
    },
  },
});
