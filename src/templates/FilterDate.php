<div class="filter-item-inner">
    <h4>{{option.displayName}}</h4>
    <el-date-picker
        @change="onChange"
        v-model="start"
        type="date"
        placeholder="Start Date"
        value-format="yyyy-MM-dd"
        :editable="false">
    </el-date-picker>

    <el-date-picker
        @change="onChange"
        v-model="end"
        type="date"
        placeholder="End Date"
        value-format="yyyy-MM-dd"
        :editable="false">
    </el-date-picker>
</div>