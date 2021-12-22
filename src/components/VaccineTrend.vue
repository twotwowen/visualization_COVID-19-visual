<template>
  <div class="com-container">
    <div class="com-chart" ref="vaccineTrend_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartsInstance: null,
      allData: null,//从服务器获取出来的所有数据
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
    initChart() {
      this.chartsInstance = this.$echarts.init(this.$refs.vaccineTrend_ref)
      const initOption = {
        backgroundColor: 'rgba(16,38,120,0.4)',
         title: {
          text: '新冠疫苗接种趋势'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        },
       
      }
      this.chartsInstance.setOption(initOption)
    },
    async getData() {
      //获取数据，对allData进行赋值
      const {data: ret} = await this.$axios.get('https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=VaccineTrendData')
      this.allData = ret.data.VaccineTrendData.totalTrend
      console.log(this.allData);
      this.updateChart()
    },
    updateChart() {
      //处理数据
      const XDataArr = this.allData['中国'].map(item => {
        return item.date
      }) 
      const DataArr = [] //各个国家
      for(let name in this.allData) {
        DataArr.push(name)
      }
      
      const seriesDataArr = DataArr.map(item => {
        let yDataArr = this.allData[item].map(items => {
        return items.total_vaccinations
        })
        return {
          name: item,
          type: 'line',
          // stack: 'total',
          data: yDataArr
        }
      })
      const dataOption = {
        xAxis: {
          data: XDataArr
        },
        series: seriesDataArr,
        dataZoom: [
          {
            show: false
          },
          {
          type: 'inside',
          }
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