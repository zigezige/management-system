<template>
  <div ref="echarts"></div>
</template>

<script>
// 引入echarts
import * as echarts from 'echarts';
export default {
  // 接收组件外部传来的属性
  props: {
    // echarts类型
    isAxisChart: {
      type: Boolean,
      default: true
    },
    // echarts表格数据
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        }
      }
    }
  },
  computed: {
    // 判断传入的属性类型
    options() {
      return this.isAxisChart ? this.axisOption : this.pieOption
    }
  },
  data() {
    return {
      axisOption: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [],
      },
      pieOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
      // echarts是否被渲染的标识
      isRender: null
    }
  },
  methods: {
    initChart() {
      this.initChartData()
      if (this.isRender) {
        this.isRender.setOption(this.options)
      } else {
        this.isRender = echarts.init(this.$refs.echarts)
        this.isRender.setOption(this.options)
      }
    },
    initChartData() {
      // 判断如果传入的是折线图或者是柱状图
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
      } else {
        // 传入的是饼图
        this.pieOption.series = this.chartData.series
      }
    }
  },
  watch: {
    // 监听图标初始化状态
    chartData: {
      handler: function () {
        this.initChart()
      },
      // immediate: true,
      deep: true
    }
  }
}
</script>

<style>
</style>
