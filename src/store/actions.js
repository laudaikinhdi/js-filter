export default {
  init(context, config) {
    context.commit('INIT', config);
  },

  select(context, payload) {
    context.commit('SELECT', payload);
  },

  deselect(context, payload) {
    context.commit('DESELECT', payload);
  },

  setPreselect(context, payload) {
    context.commit('SET_PRESELECT', payload);
  },

  setSelected(context, payload) {
    context.commit('SET_SELECTED', payload);
  },

  deselectOnMultiple(context, payload) {
    context.commit('DESELECT_ON_MULTIPLE', payload);
  },

  removeSelected(context, payload) {
    context.commit('REMOVE_SELECTED', payload);
  },

  setCurrentPage(context, page) {
    context.commit('SET_CURRENT_PAGE', page);
  },

  setPageSize(context, size) {
    context.commit('SET_PAGE_SIZE', size);
  },

  changeSortingDirection(context, dir) {
    context.commit('CHANGE_SORTING_DIRECTION', dir);
  },

  changeSortingBy(context, value) {
    context.commit('CHANGE_SORING_BY', value);
  },
};
