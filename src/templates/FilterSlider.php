<div class="filter-item-inner">
    <h4>{{option.displayName}}</h4>
    <span>{{value[0]}} - {{value[1]}}</span>
    <el-slider
        :min="option.data.min"
        :max="option.data.max"
        :step="option.data.step"
        :format-tooltip="formatTooltip"
        v-model="value"
        range>
    </el-slider>
</div>