<template>
  <div class="com-container">
    <!-- 中国某省日统计 -->
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      chartsInstance: null,
      allData: [],//从服务器获取出来的所有数据
      yDataArr:[], //折线图竖轴数据
      AutoProvinces: [] //自动捕捉有新增病例的省份
    }
  },
  mounted() {
    this.initChart()
    this.AutoRequestData()
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
      this.chartsInstance = this.$echarts.init(this.$refs.trend_ref)
      const initOption = {
        backgroundColor: 'rgba(16,38,120,0.4)',
        // title: {
        //   text: '近期本土病例有所增加省份现有确诊病例',
        //   left: 20,
        //   top: 20
        // },
        xAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        legend: {
          textStyle: {
            color: '#FFF'
          },
          top: '15%'
        },
        dataZoom : [
          {
            show: false,
            start: 75,
            end: 100,
            textStyle: {
              color: '#fff'
            }
          },
          {
            type: 'inside'
          }
        ],
        grid: {
          top: '25%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true  //距离包含坐标轴上面的文字
        },
      }
      this.chartsInstance.setOption(initOption)
    },
    async getData(value,i) {
      //获取数据，对allData进行赋值
      const {data: ret} = await this.$axios.get(`http://111.231.75.86:8000/api/provinces/CHN/${value}/daily/`)
      // console.log(ret);
      //使用sort对json数据进行排序，使用slice截取数组
      this.allData.push(ret.sort(this.compare('dateId')).slice(0,50).reverse())
      // console.log(this.allData);
      this.getYData(i)
      
    },
    //现有确诊人数发生变化自动发送请求
    async AutoRequestData() {
      const {data: ret} = await this.$axios.get('https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=statisGradeCityDetail')

      ret.data.statisGradeCityDetail.forEach(item => {
        if(item.confirmAdd !== 0) {
          if(this.AutoProvinces.indexOf(item.province) === -1) {
            this.AutoProvinces.push(item.province)
          }else {
            return
          }
        }
      })
      console.log(this.AutoProvinces);

      for(let i = 0;i < this.AutoProvinces.length;i++) {
        this.getData(this.AutoProvinces[i],i)
        console.log(this.AutoProvinces[i],i);
      }
    },
    //获取y轴多条轴数据
    getYData(index) {
      this.yDataArr.push(this.allData[index].map(item => {
        return item.currentConfirmedCount
      }))
      // console.log(this.yDataArr);
      this.updateChart()
    },
    updateChart() {
      //处理数据
      const xDataArr = this.allData[0].map((item) => {
        return item.dateId
      })
      const seriesArr = this.AutoProvinces.map((item,index) => {
        return {
          name: item,
          type: 'line',
          data: this.yDataArr[index],
          areaStyle: {},
          emphasis: {
            focus: 'series',
            blurScope: 'coordinateSystem'
          },
          stack: 'trend'
        }
      })
      const dataOption = {
        xAxis: {
          data: xDataArr
        },
        tooltip: {
          trigger: 'axis',
          // formatter: '{a}现有确诊：{c}'
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: this.AutoProvinces,
        },
        series: seriesArr
        // series: [
        //   {
        //     name: '内蒙古',
        //     type: 'line',
        //     // step: true,
        //     // smooth: false,
        //     data: this.yDataArr[0],
           
        //     areaStyle: {},
        //     emphasis: {
        //       focus: 'series',
        //       blurScope: 'coordinateSystem'
        //     },
        //     stack: 'trend'
        //   },
        //   {
        //     name: '黑龙江',
        //     type: 'line',
        //     // step: true,
        //     // smooth: false,
        //     data: this.yDataArr[1],
            
        //     areaStyle: {},
        //     emphasis: {
        //       focus: 'series',
        //       blurScope: 'coordinateSystem'
        //     },
        //     stack: 'trend'
        //   },
        //   {
        //     name: '云南',
        //     type: 'line',
        //     // step: true,
        //     // smooth: false,
        //     data: this.yDataArr[2],
            
        //     areaStyle: {},
        //     emphasis: {
        //       focus: 'series',
        //       blurScope: 'coordinateSystem'
        //     },
        //     stack: 'trend'
        //   },
        //   {
        //     name: '河北',
        //     type: 'line',
        //     // step: true,
        //     // smooth: false,
        //     data: this.yDataArr[3],
            
        //     areaStyle: {},
        //     emphasis: {
        //       focus: 'series',
        //       blurScope: 'coordinateSystem'
        //     },
        //     stack: 'trend'
        //   },
        // ]
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