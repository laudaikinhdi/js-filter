<div class="pagination-container">
  <uib-pagination 
    v-model="pagination" 
    class="pagination"
    @change="onCurrentChange"
    :total-items="total"
    :items-per-page="pageSize"
    :max-size="5" 
    :boundary-links="true">
  </uib-pagination>
  <br>
  <span>Total {{total}} </span>
  <el-select 
    placeholder="Select"
    v-model="size"
    @change="onSizeChange"
    >
    <el-option
      v-for="item in pageSizes"
      :key="item"
      :label="item + '/page'"
      :value="item">
    </el-option>
  </el-select>
  
  <span>Page
    <el-input 
      style="width: 50px;"
      v-model="pageToGo"
      @change="setPage"
      ></el-input>
  </span>
  <span> / {{pagination.numPages}}</span>
</div>