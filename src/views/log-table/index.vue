<template>
  <div class="app-container">
    <el-card>
      <!-- 日志表格内容 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="content" label="日志内容" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [] // 初始数据
    }
  }
}
</script>
