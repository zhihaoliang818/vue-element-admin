<template>
  <div class="log-table-container">
    <table class="log-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>账号</th>
          <th>操作人</th>
          <th>具体操作</th>
          <th>操作时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in logs" :key="log.id">
          <td>{{ log.id }}</td>
          <td>{{ log.account }}</td>
          <td>{{ log.operator }}</td>
          <td>{{ log.action }}</td>
          <td>{{ log.time }}</td>
          <td>
            <button class="delete-btn" @click="deleteLog(log.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分页组件 -->
    <div class="pagination-container">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="logs.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogTable',
  data() {
    return {
      logs: [
        { id: 1, account: 'admin', operator: 'admin', action: '登录', time: '2024-02-11 12:02:10' },
        { id: 2, account: 'xiaomi', operator: '王小米', action: '登录', time: '2024-02-09 12:01:31' },
        { id: 3, account: 'xiaomi', operator: '王小米', action: '登录', time: '2024-02-08 19:25:34' },
        { id: 4, account: 'liudashuai', operator: '刘大帅', action: '登录', time: '2024-02-08 19:20:30' },
        { id: 5, account: 'liudashuai', operator: '刘大帅', action: '登录', time: '2024-02-07 18:50:30' },
        { id: 6, account: 'wangting', operator: '王婷', action: '登录', time: '2024-02-06 19:31:06' },
        { id: 7, account: 'wangting', operator: '王婷', action: '登录', time: '2024-02-05 12:38:16' },
        { id: 8, account: 'zhaolong', operator: '赵龙', action: '登录', time: '2024-02-03 19:30:56' }
      ],
      currentPage: 1, // 当前页码
      pageSize: 5 // 每页显示条数
    }
  },
  computed: {
    // 计算分页后的数据
    paginatedLogs() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.logs.slice(start, end)
    }
  },
  methods: {
    deleteLog(id) {
      this.$confirm('确定要删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 这里添加实际的删除逻辑
        this.logs = this.logs.filter(log => log.id !== id)
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
.log-table-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.log-table {
  width: 100%;
  border-collapse: collapse;
}

.log-table th, .log-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  text-align: center;
}

.log-table td {
  background-color: white;
}

.log-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

</style>
