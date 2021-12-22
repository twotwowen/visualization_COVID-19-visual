<template>
  <div class="com-container">
    <!-- 本土新增病例趋势  本土现有确诊病例趋势 -->
    <div class="com-chart" ref="chinaday_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartsInstance: null,
      allData: null,//从服务器获取出来的所有数据
      chinaDayAddList: [],
      chinaDayList: []
    }
  },
  mounted() {
    this.initChart()
    this.getData()
    window.addEventListener('resize',this.screenAdapter)
    //第一次加载的时候主动的触发
    this.screenAdapter()
  },
  destoryed() {
    window.removeEventListener('resize',this.screenAdapter)
  },
  methods: {
    //对json字段进行排序处理
    compare(prop) {
      return (a,b) => {
        let value1 = a[prop]
        let value2 = b[prop]
        return value2 - value1
      }
    },
    initChart() {
      this.chartsInstance = this.$echarts.init(this.$refs.chinaday_ref)
      const initOption = {
        backgroundColor: 'rgba(16,38,120,0.4)',
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        yAxis: {
          type: 'value',
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          }
        },
        dataZoom : [
          {
            show: true,
            start: 75,
            end: 100,
            textStyle: {
              color: '#fff'
            }
          },
          {
            type: 'inside'
          }
        ]
        
      }
      this.chartsInstance.setOption(initOption)
    },
    async getData() {
      //获取数据，对allData进行赋值
      const {data: ret} = await this.$axios.get('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList')
      this.chinaDayAddList = ret.data.chinaDayAddList
      this.chinaDayList = ret.data.chinaDayList
      // console.log(this.allData);
      // console.log(this.chinaDayAddList);
      this.updateChart()
    },
    updateChart() {
      //处理数据
      const xData = this.chinaDayAddList.map(item => {
        return item.date
      })
      //本土新增病例
      const barData = this.chinaDayAddList.map(item => {
        return item.localConfirmadd
      })
      //无症状感染者
      const lineNoInfectData = this.chinaDayList.map(item => {
        return item.noInfect
      })
      //本土现有确诊
      const lineData = this.chinaDayList.map(item => {
        return item.localConfirm
      })
      const dataOption = {
        xAxis:{
          data: xData
        },
        legend: {
          data: ['本土新增病例','无症状感染者','本土现有确诊病例'],
          icon: 'diamond',
          top: '10%'
        },
        series: [
          {
            name: '本土现有确诊病例',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 12,
            data: lineData,
            // stack: 'total'
          },
          {
            name: '无症状感染者',
            type: 'line',
            smooth: true,
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 12,
            data: lineNoInfectData,
          },
          {
            name: '本土新增病例',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              borderRadius: 5,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#14c8d4' },
                { offset: 1, color: '#43eec6' }
              ])
            },
            data: barData,
            // stack: 'total'
          },
          {
            name: '本土现有确诊病例',
            type: 'bar',
            barGap: '-100%',
            barWidth: 10,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(20,200,212,0.5)' },
                { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
                { offset: 1, color: 'rgba(20,200,212,0)' }
              ])
            },
            z: -12,
            data: lineData,
            // stack: 'total'
          },
        ]
      }
      this.chartsInstance.setOption(dataOption)
    },
    screenAdapter() {
      const adapterOption = {}
      this.chartsInstance.setOption(adapterOption)
      this.chartsInstance.resize()
    }

  }
}
</script>

<style lang="less" scoped>

</style>