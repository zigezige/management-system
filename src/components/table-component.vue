<template>
  <div class="table-component">
    <el-table :data="tableData" height="90%" stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left:10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="180" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      :current-page="config.page"
      layout="prev,pager,next"
      :total="config.total"
      @current-change="handleCurrentChange"
      :page-size="20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'TableComponent',
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object
  },
  data() {
    return {

    }
  },
  methods: {
    // 点击分页器页数的回调
    handleCurrentChange(page) {
      this.$emit('changePage', page)
    },
    // 点击编辑按钮的回调
    handleEdit(row) {
      this.$emit('edit', row)
    },
    // 点击删除按钮的回调
    handleDel(row) {
      this.$emit('delete', row)
    }
  }
}
</script>

<style lang="less" scoped>
.table-component {
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
