<div class="filter-item-inner">
  <h4>Refine by</h4>
  <a href="javascript:;" @click="clearAll">Clear All</a>
  <div class="selected-list">
    <div 
      class="selected-item" 
      v-for="item in items"
      @click="remove([item])">
      <span>{{item.displayName}}</span>:
      <strong>{{item.displayValue}}</strong>
      <span class="selected-remove">x</span>
    </div>
  </div>
</div>