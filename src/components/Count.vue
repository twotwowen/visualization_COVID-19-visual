<template>
  <div class="com-container">
    <div class="com-chart" ref="count_ref">
      
    </div>
    <div class="total">
      <div class="currentConfirmedCount">
        <div>
          <span>较上日</span>
          <span>+{{domesticStatistics.currentConfirmedIncr}}</span>
        </div>
        <div class="num">{{domesticStatistics.currentConfirmedCount}}</div>
        <div>现有确诊</div>
      </div>

      <div class="confirmedCount">
        <div>
        <span>较上日</span>
        <span>+{{domesticStatistics.confirmedIncr}}</span>
        </div>
        <div class="num">{{domesticStatistics.confirmedCount}}</div>
        <div>累计确诊</div>
      </div>

      <div class="seriousCount">
        <div>
        <span>较上日</span>
        <span>+33</span>
        </div>
        <div class="num">{{domesticStatistics.seriousCount}}</div>
        <div>无症状感染者</div>
      </div>

      <div class="suspectedCount">
        <div>
        <span>较上日</span>
        <span>+{{domesticStatistics.suspectedIncr}}</span>
        </div>
        <div class="num">{{domesticStatistics.suspectedCount}}</div>
        <div>境外输入</div>
      </div>

      <div class="curedCount">
        <div>
        <span>较上日</span>
        <span>+{{domesticStatistics.curedIncr}}</span>
        </div>
        <div class="num">{{domesticStatistics.curedCount}}</div>
        <div>累计治愈</div>
      </div>

      <div class="deadCount">
        <div>
        <span>较上日</span>
        <span>+{{domesticStatistics.deadIncr}}</span>
        </div>
        <div class="num">{{domesticStatistics.deadCount}}</div>
        <div>累计死亡</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartsInstance: null,
      allData: null,//从服务器获取出来的所有数据
      globalStatistics: {}, //全球
      domesticStatistics: {}, // 国内
      internationalStatistics: {}, // 国际
      modifyTime: ''
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
      this.chartsInstance = this.$echarts.init(this.$refs.count_ref)
      const initOption = {
        backgroundColor: 'rgba(16,38,120,0.4)',
        title: {
          text: '国内疫情数据',
          top: 20,
          left: 20,
          
        }
      }
      this.chartsInstance.setOption(initOption)
    },
    async getData() {
      //获取数据，对allData进行赋值
      const {data: ret} = await this.$axios.get('http://111.231.75.86:8000/api/statistics/latest/')
      this.domesticStatistics = ret.domesticStatistics
      this.globalStatistics = ret.globalStatistics
      this.internationalStatistics = ret.internationalStatistics
      this.modifyTime = ret.modifyTime
      console.log(this.domesticStatistics);
      this.updateChart()
    },
    updateChart() {
      //处理数据
      const dataOption = {
        title: {
          subtext: '统计截止至 '+ this.modifyTime
        }
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
.total {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  // background-color: #fff;
  
  background-color: #0F375F;
  border-radius: 10px;
  width: 460px;
  height: 202px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  overflow: hidden;
  border: 1px solid #0F375F;
}
.total>div {
  height: 100px;
  width: 150px;
  background-color: #100C2A;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.total>div .num {
  font-size: 30px;
}
.total>div div:first-child {
  font-size: 12px;
}
.total>div div:first-child span:first-child {
  color: #808ac5;
}
.total>div div:first-child span:last-child {
  color: #ced1df;
}
.total>div div:last-child {
  font-size: 22px;
}
</style>