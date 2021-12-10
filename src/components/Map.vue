<template>
  <div class="com-container" @dblclick="revertMap">
    <div class="com-chart" ref="map_ref">
    </div>
    <div class="options">
      <span :class="currentId === 0 ? 'active' : ''" @click="totalHandle">累计确诊</span>
      <span :class="currentId === 1 ? 'active' : ''" @click="currentHandle">现有确诊</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {getProvinceMapInfo} from '../utils/map_utils'

export default {
  data() {
    return {
      chartsInstance: null,
      allData: null,//从服务器获取出来的所有数据
      currentId: 0,
      max: 5000,//视图里面的最大值
      range: [1000,5000],
      mapData: {}, //获取省份的矢量数据进行缓存
      provinceData: [], //各个省份的疫情数据
      mapType: 'china' //地图类型
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
    totalHandle() {
      this.currentId = 0
      this.max = 5000
      this.range = [1000,5000]
      if(this.mapType === 'china') {
        this.updateChart()
      }else {
        this.provinceMap()
      }
      
    },
    currentHandle() {
      this.currentId = 1
      this.max = 1000
      this.range = [1,1000]
      if(this.mapType === 'china') {
        this.updateChart()
      }else {
        this.provinceMap()
      }
    },
    async initChart() {
      this.chartsInstance = this.$echarts.init(this.$refs.map_ref,'dark')
      // const ret = await axios.get('http://localhost:8080/static/map/china.json')
      // this.$echarts.registerMap('china',ret.data)
      const ret = await axios.get('http://localhost:8080/static/map/china.json')
      this.$echarts.registerMap('china',ret.data)
      this.mapType = 'china'
      const initOption = {
        tooltip: {
          trigger: 'item',
          // formatter: '{b}<br/>累计确诊：{c}'
          formatter: (arg) => {
            
            if(this.currentId === 0 ) {
              return arg.name + '<br/>累计确诊：' + arg.value
            }else {
              return arg.name + '<br/>现有确诊：' + arg.value
            }
          }
        },
       
      }
      this.chartsInstance.setOption(initOption)
            //地图点击之后出现省份小地图
      this.chartsInstance.on('click',async arg => {
        // console.log(arg);
        //arg.name得到的是中文
        const provinceInfo = getProvinceMapInfo(arg.name)
        // console.log(provinceInfo);
        
        //请求各个省份的数据
        const ret = await axios.get('http://localhost:8080'+provinceInfo.path)
        this.mapData[provinceInfo.key] = ret.data
        this.$echarts.registerMap(provinceInfo.key,ret.data)
        this.mapType = provinceInfo.key
        let {data: pDataArr} = await this.$axios.get(`http://111.231.75.86:8000/api/cities/CHN/?provinceNames=${arg.name}`)
        this.provinceData = pDataArr
        // console.log(pDataArr);
        
        this.provinceMap()
      })
    },
    //各个省份地图数据切换
    provinceMap() {
      let dataArr = []
        if(this.currentId === 0) {
          dataArr = this.provinceData.map(item => {
          return {
            name: item.cityName+ '市',
            value: item.confirmedCount
          }
        })
        }else {
          //现有的确诊人数
          dataArr = this.provinceData.map(item => {
          return {
            name: item.cityName+ '市',
            value: item.currentConfirmedCount
          }
          })
        }
        const changeOption = {
          geo: {
            map: this.mapType,
            itemStyle: {
              borderColor: '#fff'
            }
          },
          series: [
            {
              data: dataArr
            }
          ],
          visualMap: {
            min: 0,
            max: 100,
            range: [1,100]
          }
        }
        this.chartsInstance.setOption(changeOption)
    },
    //回到中国地图
    revertMap() {
      const revertOption = {
        geo: {
          map: 'china'
        }
      }
      this.mapType = 'china'
      this.chartsInstance.setOption(revertOption)
      this.updateChart()
    },
    async getData() {
      //获取数据，对allData进行赋值
      // const {data: ret} = await this.$axios.get('data1')
      // console.log(ret);
      const {data: ret} = await this.$axios.get('http://111.231.75.86:8000/api/provinces/CHN/')
      console.log(ret);
      this.allData = ret
      this.updateChart()
    },
    updateChart() {
      //处理数据
      // const currentConfirmedCount = this.allData.map(item => {
      //   return item.currentConfirmedCount
      // })
      // const confirmedCount = this.allData.map(item => {
      //   return item.confirmedCount
      // })
      let dataArr = []
      if(this.currentId === 0) {
        dataArr = this.allData.map(item => {
        return {
          name: item.provinceName,
          value: item.confirmedCount
        }
        })
      }else {
        //现有的确诊人数
        dataArr = this.allData.map(item => {
        return {
          name: item.provinceName,
          value: item.currentConfirmedCount
        }
        })
      }
      const dataOption = {
        geo: {
          type: 'map',
          map: 'china',
          itemStyle: {
            borderColor: '#fff'
          }
        },
        series: [
          {
            type: 'map',
            geoIndex: 0,
            data: dataArr
          }
        ],
        visualMap: {
          min: 0,
          max: this.max,
          text: ['人数'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['#6699CC', '#006699','#003366' ]
          },
          textStyle: {
            color: '#fff'
          },
          range: this.range
        },
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
.com-page {
  position: relative;
}
.options {
  position: absolute;
  top: 31px;
  left: 64px;
  text-align: center;
  color: #fff;
  font-size: 20px;
}
.options span {
  display: inline-block;
  width: 100px;
  height: 32px;
  line-height: 32px;
  border: 2px solid #fff;
  border-radius: 20px;
  margin-right: 15px;
  cursor: pointer;
}
.active {
  color: #222733;
  background-color: #fff;
}
</style>