<template>
  <div class="com-container">
    <div class="com-chart" ref="vaccineTop_ref"></div>
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
      this.chartsInstance = this.$echarts.init(this.$refs.vaccineTop_ref)
      const initOption = {
        backgroundColor: 'rgba(16,38,120,0.4)',
        // title: {
        //   text: '各个国家疫苗接种总数量展现',
        //   top: 20,
        //   left: 20
        // }
       
      }
      this.chartsInstance.setOption(initOption)
    },
    async getData() {
      //获取数据，对allData进行赋值
      const {data: ret} = await this.$axios.get('https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=VaccineSituationData')
      this.allData = ret.data.VaccineSituationData.slice(0,10)
      this.updateChart()
    },
    updateChart() {
      //处理数据
      const seriesArrData = this.allData.map((item) => {
        return {
          value: item.total_vaccinations,
          name: item.country
        }
      })
      const dataOption = {
        // legend: {
        //   top: 'bottom'
        // },
       
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '疫苗接种数量',
            type: 'pie',
            radius: '70%',
            center: ['50%', '60%'],
            // roseType: 'radius',
            itemStyle: {
              borderRadius: 7
            },
            data: seriesArrData,
            label: {
              position: 'inside'
            },
            labelLine: {
              show: false
            }
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