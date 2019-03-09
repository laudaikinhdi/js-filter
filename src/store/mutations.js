import findIndex from 'lodash/findIndex';
import cloneDeep from 'lodash/cloneDeep';
import Vue from 'vue';

export default {
  INIT(state, {
    filters, items, format, sorting,
  }) {
    Vue.set(state, 'filters', filters);
    Vue.set(state, 'items', items);
    Vue.set(state, 'format', format);
    Vue.set(state, 'sorting', sorting);
  },

  SELECT({ preselect }, { name, value }) {
    Vue.set(preselect, name, value);
  },

  DESELECT({ preselect }, { name }) {
    Vue.delete(preselect, name);
  },

  SET_PRESELECT(state, payload) {
    Vue.set(state, 'preselect', cloneDeep(payload));
  },

  SET_SELECTED(state, payload) {
    if (payload) {
      Vue.set(state, 'selected', cloneDeep(payload));
    } else {
      const { preselect } = state;
      Vue.set(state, 'selected', cloneDeep(preselect));
    }
  },

  DESELECT_ON_MULTIPLE({ preselect }, { name, value }) {
    const existed = preselect[name];
    if (!existed) {
      return;
    }

    const idx = findIndex(existed, item => item === value);
    if (idx > -1) {
      Vue.delete(existed, idx);
    }

    if (existed.length === 0) {
      Vue.delete(preselect, name);
    }
  },

  SET_CURRENT_PAGE({ page }, current) {
    Vue.set(page, 'current', current);
  },

  SET_PAGE_SIZE({ page }, size) {
    Vue.set(page, 'size', size);
  },

  CHANGE_SORTING_DIRECTION({ sorting }, dir) {
    Vue.set(sorting, 'direction', dir);
  },

  CHANGE_SORING_BY({ sorting }, value) {
    Vue.set(sorting, 'by', value);
  },
};
