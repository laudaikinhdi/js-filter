export default ({ templates }) => ({
  template: templates.ItemPagination,

  data() {
    const { sizes } = this.$store.state.page;
    return {
      pagination: {
        currentPage: 1,
        numPages: 0,
      },
      size: sizes[0],
      pageToGo: 1,
    };
  },

  computed: {
    total() {
      return this.$store.getters.total;
    },

    pageSize() {
      return this.$store.state.page.size;
    },

    pageSizes() {
      return this.$store.state.page.sizes;
    },

    currentPage() {
      return this.$store.state.page.current;
    },
  },

  watch: {
    currentPage(val) {
      this.pagination.currentPage = val;
    },
  },

  methods: {
    onCurrentChange() {
      const { currentPage } = this.pagination;
      this.$store.dispatch('setCurrentPage', currentPage);
      this.pageToGo = currentPage;
      this.$emit('updateRouter');
    },

    onSizeChange() {
      const { size } = this;
      this.$store.dispatch('setCurrentPage', 1);
      this.$store.dispatch('setPageSize', size);
    },

    setPage() {
      const { currentPage, numPages } = this.pagination;
      if (isNaN(this.pageToGo) || this.pageToGo > numPages || Math.round(this.pageToGo) < 0) {
        this.pageToGo = currentPage;
      } else {
        this.$store.dispatch('setCurrentPage', +this.pageToGo);
      }
      this.$emit('updateRouter');
    },
  },
});
