<template>
  <div class="home">
    <div ref="main" id="main"></div>
  </div>
</template>

<script>
// @ is an alias to /src// 按需引入 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'home',
  mounted () {
    this.initCharts()
  },
  methods: {
    initCharts () {
      // const el = this.$refs.main
      // console.log(el.$el)
      this.chart = echarts.init(document.getElementById('main'))
      this.setOptions()
    },

    setOptions () {
      this.chart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          barWidth: '40%',
          data: [5, 20, 36, 10, 10, 20],
          label: {
            normal: {
              show: true,
              position: 'top', // 柱状图顶部显示数据
              color: '#027fcf'
            }
          },
          itemStyle: {
            emphasis: { // 提示框的倒角
              barBorderRadius: 30
            },
            normal: {
              // 柱形图圆角，初始化效果
              barBorderRadius: [15, 15, 15, 15],
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1, [
                  { offset: 0, color: '#58b9ed' },
                  { offset: 0.5, color: '#203dda' },
                  { offset: 1, color: '#3e28d7' }

                ]
              )
            }
          }
        }]
      })
    } }
}
</script>
<style>
  #main {
    width: 500px;
    height: 600px;
  }
</style>
