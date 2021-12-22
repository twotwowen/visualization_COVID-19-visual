<template>
  <div class="com-container">
    <div class="com-chart" ref="regional_ref"></div>
    <div class="total">
      
        <div class="itemlist">
        <div class="high">
          <div class="tip">高风险地区</div>
          <div ref="highlist">
            <vue-seamless-scroll :data="highlist" class="seamless-warp" :class-option="defaultOption" ref="seamlessScrollH">
            <ul>
              <li class="item" v-for="(item,index) in highlist" :key="index">
                <span>{{item}}</span>
              </li>
            </ul>
            </vue-seamless-scroll>
            <!-- <div class="item" v-for="(item,index) in highlist" :key="index"></div> -->
          </div>
        </div>
        <div class="middle">
          <div class="tip">中风险地区</div>
          <div ref="middlelist">
            <vue-seamless-scroll :data="middlelist" class="seamless-warp" :class-option="defaultOption" ref="seamlessScrollM">
            <ul>
              <li class="item" v-for="(item,index) in middlelist" :key="index">
                <span>{{item}}</span>
              </li>
            </ul>
        
            </vue-seamless-scroll>
            <!-- <div class="item" v-for="(item,index) in highlist" :key="index"></div> -->
          </div>
        </div>
      </div>
      
      

    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  data() {
    return {
      chartsInstance: null,
      allData: null,//从服务器获取出来的所有数据
      highlist: [], //高风险地区
      middlelist: [], //中风险地区
      riskList: [1,2,3,4,5,6,7,8,9,0],
      mark: 0
    }
  },
  components: {
    vueSeamlessScroll
  },
  beforeCreate() {
    
  },
  created() {
    this.getData()
    
  },
  mounted() {
    this.initChart()
    // this.$refs.seamlessScroll.reset()
    window.addEventListener('resize',this.screenAdapter)
    //第一次加载的时候主动的触发
    this.screenAdapter()
  },
  destoryed() {
    window.removeEventListener('resize',this.screenAdapter)
  },
  computed: {
    defaultOption () {
      return {
        step: 0.7,
        limitMoveNum: 1,
        hoverStop: true,
        openWatch: true
      }
    }
  },
  methods: {
    initChart() {
      this.chartsInstance = this.$echarts.init(this.$refs.regional_ref)
      const initOption = {
        backgroundColor: 'rgba(16,38,120,0.4)',
        // title: {
        //   text: '风险地区提示',
        //   top: 20,
        //   left: 20
        // }
      }
      this.chartsInstance.setOption(initOption)
    },
    async getData() {
      //获取数据，对allData进行赋值
      // const {data: ret} = await this.$axios.get('http://127.0.0.1:8888/regionalRisk')
      await this.$axios.get('http://127.0.0.1:8888/regionalRisk')
      .then((result) => {
        if(this.mark == 12) {
          this.mark = 0
        }
              //高风险地区
        result.data.data.highlist.map(item => {
          item.communitys.map(items => {
            // return items
            // console.log(item.area_name + ' ' + items);
            this.highlist.push(item.area_name + ' ' + items)
          
          })
        })
        console.log(this.highlist);

        //中风险地区
        result.data.data.middlelist.map(item => {
          item.communitys.map(items => {
            // return items
            // console.log(item.area_name + ' ' + items);
            this.middlelist.push(item.area_name + ' ' + items)
            
          })
        })
        this.mark += 1
        this.$refs.seamlessScrollM.reset()
        this.$refs.seamlessScrollH.reset()
      })
      // console.log(ret);
 
      // this.innerDom()
      this.updateChart()
    },
    //自动添加DOM元素
    // innerDom() {
    //   let high = this.$refs.highlist
    //   this.highlist.forEach(element => {
    //     console.log(element);
    //     high.innerHTML += `<div class='item'>${element}</div>`
    //   });
      
    // },
    updateChart() {
      //处理数据
      const dataOption = {}
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
* {
  margin: 0;
  padding: 0;
}
ul,li {
  list-style: none;
}
.com-container {
  position: relative;
}

.total {
  position: absolute;
  left: 50%;
  // top: 50%;
  bottom: 0;
  transform: translate(-50%);
  // background-color: #100C2A;
  width: 280px;
  // height: 140px;
  // height: 320px;
  // height: 800px;
  padding: 10px;
  color: #fff;
  overflow: hidden;
  .seamless-warp {
    height: 45px;
    overflow: hidden;
  }
  .high, .middle {
    border-bottom: 1px solid #b4bdeb;
  }
  .tip {
    margin-top: 10px;
    margin-bottom: 5px;
    font-weight: 400;
    font-size: 15px;
  }
  .item {
    margin-bottom: 32px;
    font-size: smaller;
    box-shadow: 12px 2px 20px #0f375f;
    color: #b4bdeb;
  }
}
</style>