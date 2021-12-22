<template>
  <div class="com-container">
    <!-- 治愈率 死亡率 全球 国内 国际 得分环 仪表盘 -->
    <div class="com-chart" ref="rate_ref"></div>
    <div class="subTitle">
      <div>国内</div>
      <div>全球</div>
      <div>国际</div>
    </div>
  </div>
</template>

<script>
// import * as echarts from 'echarts'
export default {
  data() {
    return {
      chartsInstance: null,
      allData: null,//从服务器获取出来的所有数据
      global: [], //全球比率
      domestic: [], //国内比率
      international: [] //国际比率
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
      this.chartsInstance = this.$echarts.init(this.$refs.rate_ref)
      const seriesInit = 
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false
          },
          radius: '40%',
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#464646'
            }
          },
          axisLine: {
            lineStyle: {
              width: 20
            }
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            distance: 50
          },
          title: {
            fontSize: 13
          },
          detail: {
            width: 45,
            height: 12,
            fontSize: 12,
            color: 'inherit',
            // borderColor: 'inherit',
            // borderRadius: 20,
            // borderWidth: 1,
            formatter: '{value}%'
          },
          
        }

      const initOption = {
        backgroundColor: 'rgba(16,38,120,0.4)',
        // title: {
        //   text: '全球/国内/国际新冠疫情---治愈率，死亡率',
        //   top: 20,
        //   left: 20
        // },
        series: [
          seriesInit,
          seriesInit,
          seriesInit
        ]
      }
      this.chartsInstance.setOption(initOption)
    },
    async getData() {
      //获取数据，对allData进行赋值
      const {data: ret} = await this.$axios.get('http://111.231.75.86:8000/api/statistics/latest/')
      // this.allData = ret
      //国内
      this.domestic.healRate =((ret.domesticStatistics.curedCount / ret.domesticStatistics.confirmedCount) * 100).toFixed(2)
      this.domestic.deadRate = ((ret.domesticStatistics.deadCount / ret.domesticStatistics.confirmedCount) * 100).toFixed(2)
      // console.log(this.domestic);
      //全球
      this.global.healRate =((ret.globalStatistics.curedCount / ret.globalStatistics.confirmedCount) * 100).toFixed(2)
      this.global.deadRate = ((ret.globalStatistics.deadCount / ret.globalStatistics.confirmedCount) * 100).toFixed(2)
      // console.log(this.global);
      //国际
      this.international.healRate =((ret.internationalStatistics.curedCount / ret.internationalStatistics.confirmedCount) * 100).toFixed(2)
      this.international.deadRate = ((ret.internationalStatistics.deadCount / ret.internationalStatistics.confirmedCount) * 100).toFixed(2)
      // console.log(this.international);
      this.updateChart()
    },
    updateChart() {
      const gaugeData1 = [
        {
          value: this.domestic.healRate,
          name: 'HealRate',
          title: {
            offsetCenter: ['0%', '-210%'],
            color: '#fff'
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '-180%']
          }
        },
        {
          value: this.domestic.deadRate,
          name: 'DeadRate',
          title: {
            offsetCenter: ['0%', '-150%'],
            color: '#fff'
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '-120%']
          }
        }
      ]
      const gaugeData2 = [
        {
          value: this.global.healRate,
          name: 'HealRate',
          title: {
            offsetCenter: ['0%', '-210%'],
            color: '#fff'
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '-180%']
          }
        },
        {
          value: this.global.deadRate,
          name: 'DeadRate',
          title: {
            offsetCenter: ['0%', '-150%'],
            color: '#fff'
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '-120%']
          }
        }
      ]
      const gaugeData3 = [
        {
          value: this.international.healRate,
          name: 'HealRate',
          title: {
            offsetCenter: ['0%', '-210%'],
            color: '#fff'
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '-180%']
          }
        },
        {
          value: this.international.deadRate,
          name: 'DeadRate',
          title: {
            offsetCenter: ['0%', '-150%'],
            color: '#fff'
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '-120%']
          }
        }
      ]

      let dataOption = {
        series: [
          {
            // name: 'domestic',
            data: gaugeData1,
            center: ['20%','65%']
          },
          {
            // name: 'global',
            data: gaugeData2,
            center: ['50%','65%']
          },
          {
            // name: 'international',
            data: gaugeData3,
            center: ['80%','65%']
          }
        ],
        // legend: {}
        
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
.com-container {
  position: relative;
}
.subTitle{
  position: absolute;
  display: flex;
  bottom: 5px;
  width: 100%;
  color: #fff;
  justify-content: space-around;
  font-size: 17px;
  font-weight: bolder;
}
.subTitle>div {
  text-align: center;
}
.subTitle>div:first-child {
  margin-left: 30px;
}
.subTitle>div:last-child {
  margin-right: 30px;
}
</style>