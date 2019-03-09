<div class="app">
    <div class="sidebar">
        <div class="filter-selected">
            <filter-selected @updateRouter="updateRouter"></filter-selected>
        </div>
        <div class="filter-list">
            <div class="filter-item" v-for="filter in filters" :key="filter.name">
                <filter-text
                    v-if="filter.type === 'text'" 
                    @updateRouter="updateRouter"
                    :option="filter"></filter-text>

                <filter-slider 
                    v-if="filter.type === 'slider'" 
                    @updateRouter="updateRouter"
                    :option="filter"></filter-slider>

                <filter-date 
                    v-if="filter.type === 'date'" 
                    @updateRouter="updateRouter"
                    :option="filter"></filter-date>

                <filter-radio 
                    v-if="filter.type === 'radio'" 
                    @updateRouter="updateRouter"
                    :option="filter"></filter-radio>

                <filter-checkbox 
                    v-if="filter.type === 'checkbox'" 
                    @updateRouter="updateRouter"
                    :option="filter"></filter-checkbox>

                <filter-select 
                    v-if="filter.type === 'select'" 
                    @updateRouter="updateRouter"
                    :option="filter"></filter-select>

                <filter-multiselect 
                    v-if="filter.type === 'multiselect'" 
                    @updateRouter="updateRouter"
                    :option="filter"></filter-multiselect>
            </div>
        </div>
    </div>
    <div class="main">
        <item-sorting @updateRouter="updateRouter"></item-sorting>
        <item-pagination @updateRouter="updateRouter"></item-pagination>
        <item-list></item-list>
    </div>
</div>