<div class="filter-item-inner">
    <h4>{{option.displayName}}</h4>
    <div class="checkbox-item" 
        v-for="item in option.data"
        :key="item.value">
        <el-checkbox 
            v-model="value" 
            :label="item.value">
            {{item.displayValue}}
            <span>({{counters[item.value]}})</span>
        </el-checkbox>
    </div>
</div>