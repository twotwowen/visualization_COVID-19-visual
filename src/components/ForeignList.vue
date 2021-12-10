<template>
  <div class="com-container">
    <div class="com-chart" ref="foreignList_ref"></div>
    <span class="iconfont icon-zanting" v-if="isPlay" @click="stopHandle"></span>
    <span class="iconfont icon-bofang" v-else @click="startHandle"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartsInstance: null,
      allData: null,//从服务器获取出来的所有数据
      timeId: null,//定时器id
      startValue: 0,
      endValue: 4,
      isPlay: true
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
    clearInterval(this.timeId)
  },
  methods: {
    stopHandle() {
      this.isPlay = !this.isPlay
      clearInterval(this.timeId)
    },
    startHandle() {
      this.isPlay = !this.isPlay
      this.startInterval()
    },
    initChart() {
      this.chartsInstance = this.$echarts.init(this.$refs.foreignList_ref,'dark')
      const initOption = {
        title: {
          text: '海外各国疫情数据统计',
          subtext: '数据来自腾讯新闻',
          left: 20,
          top: 20
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true  //距离包含坐标轴上面的文字
        },
        xAxis: {
          type: 'category'
         
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          data: ['新增确诊','累计确诊','治愈病例','死亡病例'],
          selected: {
            '新增确诊': false,
            '死亡病例': false
          },
          top: '8%'
        },
        calculable: true,
        tooltip: {
          trigger: 'axis'
        }
      }
      this.chartsInstance.setOption(initOption)
       //鼠标移动到图表上定时器停止
      // this.chartsInstance.on('mouseover',() => {
      //   this.stopHandle()
      // })
      // this.chartsInstance.on('mouseout',() => {
      //   this.startHandle()
      // })
    },
    async getData() {
      this.chartsInstance.showLoading()
      //获取数据，对allData进行赋值
      await this.$axios.get('https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoCountryConfirmAdd,WomWorld,WomAboard')
      .then((response) => {
        // console.log(response);
        this.chartsInstance.hideLoading()
        this.allData = response.data.data.WomAboard
        this.updateChart()
        //获取数据后开启定时器
        this.startInterval()
      }).catch(() => {
        console.log('获取数据失败');
      })
      // console.log(ret.data.WomAboard);
     
    },
    updateChart() {
      //处理数据
      //x轴海外国家的名称
      const xDataArr = this.allData.map(item => {
        return item.name
      })
      const yConfirm = this.allData.map(item => {
        return item.confirm
      })
      const yConfirmAdd = this.allData.map(item => {
        return item.confirmAdd
      })
      const yDead = this.allData.map(item => {
        return item.dead
      })
      const yHeal = this.allData.map(item => {
        return item.heal
      })
      const dataOption = {
        xAxis: {
          data: xDataArr
        },
        series: [
          {
            name: '累计确诊',
            type: 'bar',
            data: yConfirm,
            itemStyle: {
              color: '#003366'
            }
          },
          {
            name: '新增确诊',
            type: 'bar',
            data: yConfirmAdd,
            itemStyle: {
              color: '#006699'
            }
          },
          {
            name: '治愈病例',
            type: 'bar',
            data: yHeal,
            itemStyle: {
              color: '#6699CC'
            }
          },
          {
            name: '死亡病例',
            type: 'bar',
            data: yDead,
            itemStyle: {
              color: '#666666'
            }
          },
        ],
        dataZoom: [
          {
          show: false,
          start: this.startValue,
          end: this.endValue
          },
          {
          type: 'inside',
          start: this.startValue,
          end: this.endValue
          }
          // {
          //   show: true,
          //   yAxisIndex: 0,
          //   filterMode: 'empty',
          //   width: 30,
          //   height: '80%',
          //   showDataShadow: false,
          //   left: '93%'
          // }
        ]
      }
      this.chartsInstance.setOption(dataOption)
    },
    screenAdapter() {
      const adapterOption = {}
      this.chartsInstance.setOption(adapterOption)
      this.chartsInstance.resize()
    },
    //定时器
    startInterval() {
      if(this.timeId) {
        clearInterval(this.timeId)
      }
      this.timeId = setInterval(() => {
        this.startValue++
        this.endValue++
        if(this.endValue >= 100) {
          this.startValue = 0
          this.endValue = 4
        }
        this.updateChart()
      },3000)
    }

  }
}
</script>

<style lang="less" scoped>
.com-container {
  position: relative;
}
.iconfont {
  position: absolute;
  color: #fff;
  top: 8%;
  right: 13%;
  font-size: 30px;
}
</style>