<div class="filter-item-inner">
    <h4>{{option.displayName}}</h4>
    <el-select 
        clearable 
        v-model="value" 
        :placeholder="option.displayValue"
        >
        <el-option
            v-for="(item, index) in option.data"
            :key="item.value"
            :label="item.displayValue + (index ? ' ('+counters[item.value]+')' : '')"
            :value="item.value">
        </el-option>
    </el-select>
</div>