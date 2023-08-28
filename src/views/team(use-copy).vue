<template>
  <div>
    <el-container>
      <el-container>
        <el-aside width="201px">
          <teamaside/>
        </el-aside>
        <el-main>
          <div>
            <div>
        <el-form :inlie="true" class="form">
            <el-form-item>
                <el-button type="primary" icon="el-icon-user-solid" @click="open">邀请新成员</el-button>
                </el-form-item>
                <el-form-item>
                <el-input  placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
        </el-form>
    </div>
    <div>
    <el-table
      :data="tableData"
      height="1000"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
</div>
          </div>
      </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
  .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
</style>

<script>
import teamaside from '../components/teamaside.vue'
export default {
  data() {
    return {}
  },
  components: {
    teamaside
  },
  methods: {
  }
}
</script>
