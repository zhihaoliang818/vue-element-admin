<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单编号" prop="orderNumber" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orderNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户姓名" prop="customerName" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.customerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="省份" prop="province" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.province }}</span>
        </template>
      </el-table-column>
      <el-table-column label="市" prop="city" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="gender" width="80px" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.gender === '男' ? 'primary' : 'danger'">{{ row.gender }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="服务名称" prop="serviceName" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.serviceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" prop="amount" width="120px" align="center">
        <template slot-scope="{row}">
          <span>¥{{ row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" prop="orderTime" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.orderTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="游客人数" prop="visitorCount" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.visitorCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="游客姓名" prop="visitorNames" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.visitorNames.join(', ') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" prop="paymentTime" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.paymentTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核人" prop="auditor" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.auditor }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核时间" prop="auditTime" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.auditTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" prop="modifyTime" width="160px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.modifyTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="客户姓名" prop="customerName">
          <el-input v-model="temp.customerName" />
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-select v-model="temp.province" filterable placeholder="请选择省份" @change="temp.city = ''">
            <el-option
              v-for="province in provinceOptions"
              :key="province"
              :label="province"
              :value="province"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-select v-model="temp.city" filterable :disabled="!temp.province" placeholder="请选择城市">
            <el-option
              v-for="city in cityOptions[temp.province] || []"
              :key="city"
              :label="city"
              :value="city"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="temp.gender" class="filter-item">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="服务项目" prop="serviceName">
          <el-input v-model="temp.serviceName" />
        </el-form-item>
        <el-form-item label="金额" prop="amount">
          <el-input v-model.number="temp.amount" type="number" />
        </el-form-item>
        <el-form-item label="下单时间" prop="orderTime">
          <el-date-picker
            v-model="temp.orderTime"
            type="datetime"
            placeholder="选择下单时间"
            value-format="timestamp"
          />
        </el-form-item>
        <el-form-item label="支付时间" prop="paymentTime">
          <el-date-picker
            v-model="temp.paymentTime"
            type="datetime"
            placeholder="选择支付时间"
            value-format="timestamp"
          />
        </el-form-item>
        <el-form-item label="游客信息">
          <el-input-number
            v-model="temp.visitorCount"
            :min="1"
            :max="10"
            label="游客人数"
          />
          <el-select
            v-model="temp.visitorNames"
            multiple
            filterable
            allow-create
            placeholder="请输入游客姓名"
            style="margin-left: 10px; width: 300px;"
          >
            <el-option
              v-for="name in temp.visitorNames"
              :key="name"
              :label="name"
              :value="name"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/domestic'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }

// const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name
//   return acc
// }, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      provinceOptions: ['北京市', '上海市', '江苏省', '浙江省', '广东省'],
      cityOptions: {
        '北京市': ['东城区', '西城区', '朝阳区', '海淀区'],
        '上海市': ['黄浦区', '徐汇区', '长宁区', '静安区'],
        '江苏省': ['南京市', '苏州市', '无锡市', '常州市'],
        '浙江省': ['杭州市', '宁波市', '温州市', '绍兴市'],
        '广东省': ['广州市', '深圳市', '珠海市', '东莞市']
      },
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        customerName: [{ required: true, message: '请输入客户姓名', trigger: 'blur' }],
        serviceName: [{ required: true, message: '请选择服务项目', trigger: 'change' }],
        amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
        orderTime: [{ type: 'date', required: true, message: '请选择下单时间', trigger: 'change' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: '订单删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
