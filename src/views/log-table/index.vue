<template>
  <div class="app-container">
    <el-card>
      <!-- 日志表格内容 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="account" label="账号" width="120" align="center" />
        <el-table-column prop="operator" label="操作人" width="120" align="center" />
        <el-table-column prop="targetSort" label="目标排序" width="120" align="center" />
        <el-table-column prop="backendTime" label="后台时间" width="180" align="center" />
        <el-table-column label="操作" width="120" align="center">
          <template #default="scope">
            <el-button type="text" size="small" @click="handleDelete(scope.row)">[删除]</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        // 示例数据
        {
          id: 1,
          account: 'admin',
          operator: 'admin',
          targetSort: '登录',
          backendTime: '2025-01-11 12:02:10'
        },
        {
          id: 2,
          account: 'xieqiqin',
          operator: '工作区',
          targetSort: '登录',
          backendTime: '2025-01-09 12:03:31'
        },
        {
          id: 3,
          account: 'xieqiqin',
          operator: '工作区',
          targetSort: '登录',
          backendTime: '2025-01-08 16:23:34'
        },
        {
          id: 4,
          account: 'lumei',
          operator: '权限',
          targetSort: '登录',
          backendTime: '2025-01-08 16:29:30'
        },
        {
          id: 5,
          account: 'lumei',
          operator: '权限',
          targetSort: '登录',
          backendTime: '2025-01-07 18:29:30'
        },
        {
          id: 6,
          account: 'xiafeng',
          operator: '工期数',
          targetSort: '登录',
          backendTime: '2025-01-08 19:13:06'
        },
        {
          id: 7,
          account: 'xiafeng',
          operator: '工期数',
          targetSort: '登录',
          backendTime: '2025-01-09 12:30:16'
        },
        {
          id: 8,
          account: 'zhuoxue',
          operator: '权限',
          targetSort: '登录',
          backendTime: '2025-01-03 19:30:58'
        }
      ]
    }
  },
  methods: {
    handleDelete(row) {
      this.$confirm('确定要删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 这里添加实际的删除逻辑
        this.tableData = this.tableData.filter(item => item.id !== row.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
}
</style>
