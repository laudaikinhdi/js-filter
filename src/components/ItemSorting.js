export default ({ templates }) => ({
  template: templates.ItemSorting,

  computed: {
    options() {
      return this.$store.state.sorting.options;
    },

    direction() {
      return this.$store.state.sorting.direction;
    },

    value: {
      get() {
        return this.$store.state.sorting.by;
      },
      set(value) {
        this.$store.dispatch('changeSortingBy', value);
        this.$emit('updateRouter');
      },
    },
  },

  methods: {
    changeDirection() {
      const dir = this.direction === 'asc' ? 'desc' : 'asc';
      this.$store.dispatch('changeSortingDirection', dir);
      this.$emit('updateRouter');
    },
  },
});
