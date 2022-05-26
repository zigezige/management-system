<template>
  <div class="manage">
    <!-- 遮罩层对话框 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="dialogVisible"
      width="width"
    >
      <FormComponent :formLabel="operateFormLabel" :form="operateForm" :inline="true" ref="form"></FormComponent>
      <div slot="footer" class="diolog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 头部区域 -->
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <FormComponent :formLabel="searchFormLabel" :form="searchForm" :inline="true" ref="form">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </FormComponent>
    </div>
    <!-- 中间table区域 -->
    <TableComponent
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @delete="deleteUser"
      @edit="editUser"
      @changePage="getList()"
    ></TableComponent>
  </div>
</template>

<script>
import { getUser } from '@/api/index.js'
import TableComponent from '@/components/table-component.vue'
import FormComponent from '@/components/form-component.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'user',
  components: {
    FormComponent,
    TableComponent
  },
  data() {
    return {
      // 判断diolog标题的标识
      operateType: 'add',
      // 判断diolog是否显示的标识
      dialogVisible: false,
      // 对话框传入表单组件的数据
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      // 表单组件和父组件中对话框双向绑定的数据
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      // 头部搜索框传入表单组件的数据
      searchFormLabel: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ],
      // 表单组件和父组件中头部搜索框双向绑定的数据
      searchForm: {
        keyword: ''
      },
      // 传入table组件的数据
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        }
      ],
      config: {
        page: 1,
        total: 30
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 点击对话框确认按钮的回调
    async confirm() {
      if (this.operateType === 'edit') {
        let result = await this.$http.post('/user/edit', this.operateForm)
        console.log(result);
        // 隐藏对话框
        this.dialogVisible = false
        this.getList()
      } else {
        let result = await this.$http.post('/user/add', this.operateForm)
        console.log(result);
        // 隐藏对话框
        this.dialogVisible = false
        this.getList()
      }

    },
    // 点击新增按钮的回调
    addUser() {
      // 显示对话框
      this.dialogVisible = true
      // 给子组件传递标题标识
      this.operateType = 'add'
      // 双向绑定数据
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      }
    },
    //点击头部搜索按钮的回调
    searchUser() { },
    // 子组件传递过来的事件
    deleteUser(row) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: 'warning'
      }).then(() => {
        const id = row.id
        this.$http.post("/user/del", {
          params: { id }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.getList()
        })
      })
    },
    editUser(row) {
      this.operateType = 'edit'
      this.dialogVisible = true
      this.operateForm = JSON.parse(JSON.stringify(row))
    },
    async getList(name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      let result = await getUser({ page: this.config.page, name })
      this.tableData = result.data.list.map(item => {
        item.sexLabel = item.sex === 0 ? '女' : '男'
        return item
      })
      this.config.total = result.count
      this.config.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;
}
</style>
