<div class="filter-item-inner">
    <h4>{{option.displayName}}</h4>
    <el-select 
        clearable
        multiple
        v-model="value" 
        :placeholder="option.displayValue"
        >
        <el-option
            v-for="item in option.data"
            :key="item.value"
            :label="item.displayValue + ' (' + counters[item.value] + ')'"
            :value="item.value">
        </el-option>
    </el-select>
</div>