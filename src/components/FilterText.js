export default ({ templates }) => ({
  template: templates.FilterText,

  props: {
    option: {
      type: Object,
      default() {
        return {
          data: [],
          displayName: 'Text',
          name: 'text',
          type: 'text',
        };
      },
    },
  },

  computed: {
    value: {
      get() {
        const { name } = this.option;
        return this.$store.state.preselect[name] || '';
      },
      set(value) {
        const { name } = this.option;
        if (value) {
          this.$store.dispatch('select', { name, value });
        } else {
          this.$store.dispatch('deselect', { name });
        }

        this.$emit('updateRouter', true);
      },
    },
  },
});
