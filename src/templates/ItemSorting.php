<div class="item-sorting">
  <el-select v-model="value">
      <el-option
          v-for="(value, key) in options"
          :key="key"
          :label="value"
          :value="key">
      </el-option>
  </el-select>
  <button class="btn" @click="changeDirection">
    <i :class="direction === 'asc' ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
  </button>
</div>