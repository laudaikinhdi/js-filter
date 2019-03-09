import './Polyfill';
import './scss/App.scss';

import debounce from 'lodash/debounce';
import Vue from 'vue';
import {
  Input,
  Slider,
  DatePicker,
  Radio,
  Checkbox,
  Select,
  Option,
} from 'element-ui';

import UPagination from 'vuejs-uib-pagination';

import Store from './store/index';
import Router from './Router';
import FilterSingle from './components/FilterSingle';
import FilterMultiple from './components/FilterMultiple';
import FilterSelected from './components/FilterSelected';
import FilterDate from './components/FilterDate';
import FilterSlider from './components/FilterSlider';
import FilterText from './components/FilterText';
import ItemPagination from './components/ItemPagination';
import ItemList from './components/ItemList';
import ItemSorting from './components/ItemSorting';
import buildQuery from './utils/buildQuery';
import parseQuery from './utils/parseQuery';

Vue.use(UPagination);
Vue.use(Input);
Vue.use(Slider);
Vue.use(DatePicker);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Option);

window.initApp = (config) => {
  Store.dispatch('init', config);

  const app = new Vue({
    store: Store,

    router: Router,

    components: {
      'filter-selected': FilterSelected(config),
      'filter-checkbox': FilterMultiple(config, 'FilterCheckbox'),
      'filter-multiselect': FilterMultiple(config, 'FilterMultiselect'),
      'filter-radio': FilterSingle(config, 'FilterRadio'),
      'filter-select': FilterSingle(config, 'FilterSelect'),
      'filter-date': FilterDate(config),
      'filter-slider': FilterSlider(config),
      'filter-text': FilterText(config),
      'item-list': ItemList(config),
      'item-pagination': ItemPagination(config),
      'item-sorting': ItemSorting(config),
    },

    template: config.templates.App,

    mounted() {
      this.initRouter();
    },

    computed: {
      filters() {
        return this.$store.state.filters;
      },
    },

    watch: {
      $route() {
        this.debounceInitRoouter(this);
      },
    },

    methods: {
      initRouter() {
        const { query } = this.$route;
        const selected = parseQuery(query, this.$store.state);
        this.$store.dispatch('setPreselect', selected);
        this.$store.dispatch('setSelected', selected);

        const page = query.page && +query.page > 1 ? query.page : 1;
        this.$store.dispatch('setCurrentPage', +page);

        const dir = query.sortdir && query.sortdir === 'desc' ? 'desc' : 'asc';
        this.$store.dispatch('changeSortingDirection', dir);

        if (query.sortby) {
          const { sorting } = this.$store.state;
          const { options } = sorting;
          const by = options[query.sortby] === undefined ? 'position' : query.sortby;
          this.$store.dispatch('changeSortingBy', by);
        }
      },

      debounceInitRoouter: debounce(vm => vm.initRouter(), 100),

      updateRouter(resetPage) {
        this.debounceUpdateRoute(this, resetPage);
      },

      debounceUpdateRoute: debounce((vm, resetPage) => {
        if (resetPage) {
          vm.$store.dispatch('setCurrentPage', 1);
        }
        vm.$store.dispatch('setSelected');

        const query = buildQuery(vm.$store.state);
        vm.$router.push({ query });
      }, 100),
    },
  });

  app.$mount();
  document.body.appendChild(app.$el);
};
