<template>
  <div class="home">
    <button @click="login">登录</button>
    <button @click="getList">获取列表数据</button>
    <div ref="main" id="main"></div>
  </div>
</template>

<script>
// @ is an alias to /src// 按需引入 引入 ECharts 主模块
import axios from 'axios'
import { mediaTypes } from './config.js'
// import echarts from 'echarts'
const echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
require('echarts/lib/component/legend')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'home',
  data () {
    return {
      mediaTypes,
      positivelist: {}, // 正面
      neutrallist: {}, // 中性
      negativelist: {},
      keyList: []
    }
  },
  created () {
    let data = JSON.parse(sessionStorage.getItem('data'))
    const {
      positivelist,
      neutrallist,
      negativelist } = data
    this.positivelist = positivelist
    this.negativelist = negativelist
    this.neutrallist = neutrallist

    let keyList = mediaTypes.map(item => item.key)
    this.keyList = keyList
  },
  mounted () {
    this.initCharts()
    let res = this.getVal(this.positivelist, this.keyList)
    console.log(res)
  },
  methods: {
    initCharts () {
      // const el = this.$refs.main
      // console.log(el.$el)
      this.chart = echarts.init(document.getElementById('main'))
      this.setOptions()
    },
    login () {
      axios.post('/api/login/login',
        {
          user_name: 'admin',
          user_pass: '123456'
        }
      )
    },

    getList () {
      axios.get('/api/index/getdataStatistics').then(response => {
        const { data } = response
        sessionStorage.setItem('data', JSON.stringify(data.data))
      })
    },
    /**
     * 获取val
     * @param {Object} obj 对象
     * @param {Array} keys
     * @return Array [11, 211, 121, ...]
     */
    getVal (obj, keys) {
      let res = []
      res = keys.map(item => obj[item])
      return res
    },

    setOptions () {
      this.chart.setOption({
        // title: {
        //   text: 'ECharts 入门示例'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        legend: {
          show: true,
          data: ['正面', '中性', '反面']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: mediaTypes.map(item => item.label)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '正面',
            type: 'bar',
            barWidth: '40%',
            data: this.getVal(this.positivelist, this.keyList),
            stack: '总量',
            label: {
              // show: true,
              // position: 'insideRight'
              // normal: {
              //   show: true,
              //   position: 'top', // 柱状图顶部显示数据
              //   color: '#027fcf'
              // }
            },
            itemStyle: {
              emphasis: { // 提示框的倒角
                barBorderRadius: 2
              },
              normal: {
              // 柱形图圆角，初始化效果
                barBorderRadius: [4, 4, 4, 4],
                color: 'yellow'
              }
            }
          },
          {
            name: '中性',
            type: 'bar',
            barWidth: '40%',
            stack: '总量',
            data: this.getVal(this.neutrallist, this.keyList),
            itemStyle: {
              emphasis: { // 提示框的倒角
                barBorderRadius: 2
              },
              normal: {
              // 柱形图圆角，初始化效果
                barBorderRadius: [4, 4, 4, 4],
                color: 'gray'
              }
            }
          },
          {
            name: '反面',
            type: 'bar',
            barWidth: '40%',
            stack: '总量',
            data: this.getVal(this.negativelist, this.keyList),
            itemStyle: {
              emphasis: { // 提示框的倒角
                barBorderRadius: 2
              },
              normal: {
              // 柱形图圆角，初始化效果
                barBorderRadius: [4, 4, 4, 4],
                color: 'red'
              }
            }
          }
        ]
      })
    } }
}
</script>
<style>
  #main {
    width: 800px;
    height: 600px;
  }
</style>
