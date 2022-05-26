<template>
  <el-row :gutter="20" class="home">
    <el-col :span="8" style="margin-top:20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="avatar" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            上次登录时间：
            <span>2022-4-23</span>
          </p>
          <p>
            上次登录地点：
            <span>泰州</span>
          </p>
        </div>
      </el-card>
      <!--  -->
      <el-card style="margin-top: 20px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column header-align="center" align="center" prop="name" label="课程"></el-table-column>
          <el-table-column header-align="center" align="center" prop="todayBuy" label="今日购买"></el-table-column>
          <el-table-column header-align="center" align="center" prop="monthBuy" label="本月购买"></el-table-column>
          <el-table-column header-align="center" align="center" prop="totalBuy" label="总购买"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top:20px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{display:'flex',padding:0}"
        >
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:280px">
        <Echarts style="height:280px" :chartData="echartData.line"></Echarts>
        <!-- <div style="height:280px" ref="echarts"></div> -->
      </el-card>
      <div class="graph">
        <el-card style="height:260px">
          <Echarts style="height:240px" :chartData="echartData.bar"></Echarts>
          <!-- <div style="height:240px" ref="userEcharts"></div> -->
        </el-card>
        <el-card style="height:260px">
          <Echarts style="height:240px" :isAxisChart="false" :chartData="echartData.pie"></Echarts>
          <!-- <div style="height:240px" ref="pieEcharts"></div> -->
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// 引入echarts
// import * as echarts from 'echarts';
// 引入接口api
import { getData } from '@/api/index'
// 引入封装的echart组件
import Echarts from '@/components/echarts-component.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'home',
  components: {
    Echarts
  },
  mounted() {
    this.getData()
  },
  data() {
    return {
      // 头像
      avatar: require('@/assets/images/avatar.png'),
      // 左侧头部表单数据
      tableData: [],
      // 右侧头部数据
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      // 初始化echart数据格式
      echartData: {
        line: {
          xData: [],
          series: []
        },
        bar: {
          xData: [],
          series: []
        },
        pie: {
          series: []
        }
      }
    }
  },
  methods: {
    // 获取页面数据
    async getData() {
      let result = await getData()
      let { code, data } = result.data
      if (code == 200) {
        this.tableData = data.tableData
        const order = data.orderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })
        //#region 
        // 折线图
        // const option = {
        //   xAxis: {
        //     data: xData
        //   },
        //   yAxis: {},
        //   // 提示框
        //   tooltip: {
        //     show: true,
        //   },
        //   legend: {
        //     data: keyArray
        //   },
        //   series
        // }
        // 初始化echarts实例
        // const myCharts = echarts.init(this.$refs.echarts)
        // myCharts.setOption(option)
        // #endregion
        this.echartData.line.xData = xData
        this.echartData.line.series = series
        // #region
        // // 用户柱状图
        // const userOption = {
        //   legend: {
        //     // 图例文字颜色
        //     textStyle: {
        //       color: "#333",
        //     },
        //   },
        //   grid: {
        //     left: "20%",
        //   },
        //   // 提示框
        //   tooltip: {
        //     trigger: "axis",
        //   },
        //   xAxis: {
        //     type: "category", // 类目轴
        //     data: data.userData.map(item => item.date),
        //     axisLine: {
        //       lineStyle: {
        //         color: "#17b3a3",
        //       },
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       color: "#333",
        //     },
        //   },
        //   yAxis: [
        //     {
        //       type: "value",
        //       axisLine: {
        //         lineStyle: {
        //           color: "#17b3a3",
        //         },
        //         series: [
        //           {
        //             name: '新增用户',
        //             data: data.userData.map(item => item.new),
        //             type: 'bar'
        //           },
        //           {
        //             name: '活跃用户',
        //             data: data.userData.map(item => item.active),
        //             type: 'bar'
        //           }
        //         ],
        //       },
        //     },
        //   ],
        //   color: ["#2ec7c9", "#b6a2de"],
        // }
        // 初始化echarts实例
        // const myCharts1 = echarts.init(this.$refs.userEcharts)
        // myCharts1.setOption(userOption)
        // #endregion

        this.echartData.bar.xData = xData
        this.echartData.bar.series = [
          {
            name: '新增用户',
            data: data.userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: data.userData.map(item => item.active),
            type: 'bar'
          }
        ],
          // #region
          // 饼图
          //   const video = {
          //   tooltip: {
          //     trigger: "item",
          //   },
          //   color: [
          //     "#0f78f4",
          //     "#dd536b",
          //     "#9462e5",
          //     "#a6a6a6",
          //     "#e1bb22",
          //     "#39c362",
          //     "#3ed1cf",
          //   ],
          //   series: [
          //     {
          //       data: data.videoData,
          //       type: 'pie'
          //     }
          //   ]
          // }
          // 初始化echarts实例
          // const myCharts2 = echarts.init(this.$refs.pieEcharts)
          // myCharts2.setOption(video)
          // #endregion

          this.echartData.pie.series = [
            {
              data: data.videoData,
              type: 'pie'
            }
          ]
      }
    }
  }
}
</script>

<style scoped>
</style>
