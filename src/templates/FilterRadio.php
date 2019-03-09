<div class="filter-item-inner">
    <h4>{{option.displayName}}</h4>
    <div class="radio-item" 
        v-for="(item, index) in option.data"
        :key="item.value">
        <el-radio 
            v-model="value" 
            :label="item.value">
            {{item.displayValue}}
            <span v-if="index">({{counters[item.value]}})</span>
        </el-radio>
    </div>
    
</div>