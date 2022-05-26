// 封装表单组件
<template>
  <el-form ref="form" :inline="inline" :model="localForm" label-width="100px">
    <el-form-item v-for="item in localFormLabel" :key="item.label" :label="item.label">
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="localForm[item.model]"
      ></el-input>
      <el-switch
        v-model="localForm[item.model]"
        v-if="item.type === 'switch'"
        active-color="#13ce66"
        inactive-color="#ff4949"
      ></el-switch>
      <el-date-picker
        v-model="localForm[item.model]"
        v-if="item.type === 'date'"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <el-select v-if="item.type === 'select'" v-model="localForm[item.model]" placeholder="请选择">
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'FormComponent',
  // 接收父组件传递过来的数据
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean
  },
  data() {
    return {
      // 子组件储存父组件传递的数据
      localFormLabel: this.formLabel,
      localForm: this.form,
      localInline: this.inline
    }
  }
}
</script>

<style>
</style>
