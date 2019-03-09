import ItemBase from './ItemBase';

export default ({ templates }) => ({
  template: templates.ItemList,

  components: {
    'item-base': ItemBase({ templates }),
  },

  computed: {
    items() {
      return this.$store.getters.matched;
    },

    total() {
      return this.$store.getters.total;
    },

    displayItems() {
      return this.$store.getters.displayItems;
    },
  },
});
