<template>
  <div class="screen-container">
    <img src="../../public/static/img/bg.jpg" alt="">
    <!-- 底层背景动画-开始 -->
		<div id="animations">
			<div class="animation animation1">
				<div class="animate1"></div>
				<div class="animate2"></div>
				<div class="animate3"></div>
			</div>
			<div class="animation animation2">
				<div class="animate1"></div>
				<div class="animate2"></div>
				<div class="animate3"></div>
			</div>
			<div class="animation animation3 fanzhuan">
				<div class="animate1"></div>
				<div class="animate2"></div>
				<div class="animate3"></div>
			</div>
			<div class="animation animation4">
				<div class="animate1"></div>
				<div class="animate2"></div>
				<div class="animate3"></div>
			</div>
			<div class="animation animation5 fanzhuan">
				<div class="animate1"></div>
				<div class="animate2"></div>
				<div class="animate3"></div>
			</div>
			<div class="animation animation6">
				<div class="animate1"></div>
				<div class="animate2"></div>
				<div class="animate3"></div>
			</div>
			<div class="animation animation7 fanzhuan">
				<div class="animate1"></div>
				<div class="animate2"></div>
				<div class="animate3"></div>
			</div>
			<div class="animation animation8">
				<div class="animate1"></div>
				<div class="animate2"></div>
				<div class="animate3"></div>
			</div>
			<div class="animation animation9 fanzhuan">
				<div class="animate1"></div>
				<div class="animate2"></div>
				<div class="animate3"></div>
			</div>
			<div class="animation animation10">
				<div class="animate1"></div>
				<div class="animate2"></div>
				<div class="animate3"></div>
			</div>
		</div>
		<!-- 底层背景动画-开始 -->

    <header class="screen-header">
      <span class="title">新冠疫情实时监控平台</span>
      <div class="title-right">
        <span class="datetime">{{nowtime}}</span>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top">
          <img src="../../public/static/img/1.png" alt="" style="position: absolute; top: -14px; left: 0; width: 100px; height: 13px;">
          <img src="../../public/static/img/2.png" alt="" style="position: absolute; bottom: -4px; right: -4px;width: 28px; height: 28px;">
          <Trend></Trend>
          <div class="tit">
            <img src="../../public/static/img/childtitle.png" alt="">
          <span>近期本土病例有所增加省份现有确诊病例</span>
          </div>
        </div>
        <div id="left-bottom">
          <img src="../../public/static/img/1.png" alt="" style="position: absolute; top: -14px; left: 0; width: 100px; height: 13px;">
          <img src="../../public/static/img/2.png" alt="" style="position: absolute; bottom: -4px; right: -4px;width: 28px; height: 28px;">
          <china-day></china-day>
          <div class="tit">
            <img src="../../public/static/img/childtitle.png" alt="">
          <span>近期国内疫情趋势</span>
          </div>
        </div>
      </section>
      <section class="screen-middle">
        
        <div id="middle-top">
          <img src="../../public/static/img/1.png" alt="" style="position: absolute; top: -14px; left: 0; width: 100px; height: 13px;">
          <img src="../../public/static/img/2.png" alt="" style="position: absolute; bottom: -4px; right: -4px;width: 28px; height: 28px;">
          <Count></Count>
           <div class="tit">
            <img src="../../public/static/img/childtitle.png" alt="">
          <span>国内疫情</span>
          </div>
        </div>
        <div id="middle-bottom">
          <img src="../../public/static/img/1.png" alt="" style="position: absolute; top: -14px; left: 0; width: 100px; height: 13px;">
          <img src="../../public/static/img/2.png" alt="" style="position: absolute; bottom: -4px; right: -4px;width: 28px; height: 28px;">
          <Map ref="map"></Map>
          <img src="../../public/static/img/a.png" alt="" style="width: 100%;height: 50%;bottom: 0;position: absolute;">
          <div class="tit">
            <img src="../../public/static/img/childtitle.png" alt="">
          <span>全国确诊人数分布</span>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top">
          <img src="../../public/static/img/1.png" alt="" style="position: absolute; top: -14px; left: 0; width: 100px; height: 13px;">
          <img src="../../public/static/img/2.png" alt="" style="position: absolute; bottom: -4px; right: -4px;width: 28px; height: 28px;">
          <div class="tit">
            <img src="../../public/static/img/childtitle.png" alt="">
          <span>国际疫情总览</span>
          </div>
          <div class="line">
            <img src="../../public/static/img/line.png" alt="">
          
          </div>
          <foreign-list></foreign-list>
        </div>
      </section>
    </div>
    <section class="screen-bottom">
        <div>
          <img src="../../public/static/img/1.png" alt="" style="position: absolute; top: -14px; left: 0; width: 100px; height: 13px;">
          <img src="../../public/static/img/2.png" alt="" style="position: absolute; bottom: -4px; right: -4px;width: 28px; height: 28px;">
          <vaccine-top></vaccine-top>
          <div class="tit">
            <img src="../../public/static/img/childtitle.png" alt="" style="width: 200px">
          <span>各个国家疫苗接种总数量</span>
          </div>
        </div>
        <div>
          <img src="../../public/static/img/1.png" alt="" style="position: absolute; top: -14px; left: 0; width: 100px; height: 13px;">
          <img src="../../public/static/img/2.png" alt="" style="position: absolute; bottom: -4px; right: -4px;width: 28px; height: 28px;">
          <vaccine-trend></vaccine-trend>
           <div class="tit">
            <img src="../../public/static/img/childtitle.png" alt="" style="width: 160px">
          <span>全球疫苗接种趋势</span>
          </div>
        </div>
        <div>
          <img src="../../public/static/img/1.png" alt="" style="position: absolute; top: -14px; left: 0; width: 100px; height: 13px;">
          <img src="../../public/static/img/2.png" alt="" style="position: absolute; bottom: -4px; right: -4px;width: 28px; height: 28px;">
          <rate></rate>
           <div class="tit">
            <img src="../../public/static/img/childtitle.png" alt="" style="width: 300px">
          <span>全球/国内/国际疫情--治愈率，死亡率</span>
          </div>
        </div>
        <div>
          <img src="../../public/static/img/1.png" alt="" style="position: absolute; top: -14px; left: 0; width: 100px; height: 13px;">
          <img src="../../public/static/img/2.png" alt="" style="position: absolute; bottom: -4px; right: -4px;width: 28px; height: 28px;">
          <regional-risk></regional-risk>
           <div class="tit">
            <img src="../../public/static/img/childtitle.png" alt="" style="width: 160px">
          <span>全国中高风险地区</span>
          </div>
        </div>
    </section>
  </div>
</template>

<script>
import Map from '@/components/Map.vue'
import ForeignList from '../components/ForeignList.vue'
import ChinaDay from '../components/ChinaDay.vue'
import Count from '../components/Count.vue'
import Rate from '../components/Rate.vue'
import Trend from '../components/Trend.vue'
import VaccineTop from '../components/VaccineTop.vue'
import VaccineTrend from '../components/VaccineTrend.vue'
import RegionalRisk from '../components/RegionalRisk.vue'
export default {
  created () {
    this.time()
    this.settime()
  },
  destroyed () {
   
  },
  data () {
    return {
      nowtime: ''
    }
  },
  methods: {
    time() {
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth()+1;//得到月份
      var date = now.getDate();//得到日期
      var hour= now.getHours();//得到小时数
      var minute= now.getMinutes();//得到分钟数
      var second= now.getSeconds();//得到秒数
      console.log(year+'-'+month+'-'+date+ ' '+ hour+':'+minute+':'+second);
      this.nowtime = year+'-'+month+'-'+date+ ' '+ hour+':'+minute+':'+second
    },
    settime() {
      setInterval(() => {
        this.time()
      },1000)
    }
  },
  components: {
    Map,
    ForeignList,
    ChinaDay,
    Count,
    Rate,
    Trend,
    VaccineTop,
    VaccineTrend,
    RegionalRisk
  }

}
</script>
<style lang="less" scoped>

/*背景动画-开始*/
#animations{ position: absolute; width: 100%; height: 100%; overflow: hidden; }
.animation{ position: absolute; }
.animation1{left:1%; top:1%; transform:scale(1); }
.animation2{left: 0.5%; bottom:13%; transform:scale(0.5); }
.animation3{left: 20%; top:60%; transform:scale(1); }
.animation4{left: 30%; top:15%; transform:scale(.9); }
.animation5{left: 45%; top:2%; transform:scale(0.3); }
.animation6{left: 60%; top:-2%; transform:scale(.8); }
.animation7{left: 70%; top:40%; transform:scale(1); }
.animation8{right: 12%; top:8%; transform:scale(1.1); }
.animation9{left: 90%; bottom:12%; transform:scale(1); }
.animation10{left: 50%; top:80%; transform:scale(1.5); }
.animation10 div{ animation-direction:reverse; }
.animation div{ position: absolute; top: 0;left: 0;width:300px; height:300px;  border-radius:50%; animation:move linear infinite;opacity: .3;filter:alpha(opacity=30);}
.animation .animate1{ background:url("../../public/static/img/b1.png") no-repeat; background-size: 100%; animation-duration:30s;}
.animation .animate2{ background:url("../../public/static/img/b2.png") no-repeat; background-size: 100%;  animation-duration:20s; animation-direction:reverse;}
.animation .animate3{ background:url("../../public/static/img/b3.png") no-repeat; background-size: 100%;  animation-duration:15s; }
.fanzhuan .animate1{ animation-direction:reverse; animation-duration:25s;}
.fanzhuan .animate2{ animation-direction:normal; animation-duration:15s;}
.fanzhuan .animate3{ animation-direction:reverse; animation-duration:10s;}
@keyframes move{
	0%{transform:rotate(0deg)}
	100%{transform:rotate(360deg)}	
} 
/*背景动画-开始*/

// 全屏样式的定义
.fullscreen {
  position: fixed!important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 100;
}

section>div {
  border: 1px solid #0895D3;
}
.screen-container {
  width: 100%;
  height: 100%;
  // padding: 0 20px;
  // background-color: #11296D;
  color: #fff;
  box-sizing: border-box;
  position: relative;
  // background: url('../../public/static/img/bg.jpg');
  // background-size: 100%;
  // background-repeat: no-repeat;
  // z-index: -2;
  img {
    width: 100%;
    height: 100%;
    z-index: -2;
    position: absolute;
  }
}
.screen-header {
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
      img {
        width: 100%;
      }
    }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 19px;
    transform: translate(-50%, -50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position:absolute;
    right: 50px;
    top: 62%;
    transform: translateY(-80%);
  }

  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);
    img {
      height: 35px;
      width: 128px;
    }
  }
}
.screen-body {
  width: 100%;
  height: 60%;
  display: flex;
  margin-top: 10px;
  padding: 0 20px 0 28px;
  box-sizing: border-box;
  .screen-left {
    height: 100%;
    width: 27.6%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    #left-top {
      height: 56%;
      position: relative;
      .tit {
        position: absolute;
        top: 2px;
        left: 2px;
        img {
          width: 330px;
          height: 30px;
        }
        span {
          color: #8AC5FF!important;
          margin-left: 14px;
          margin-top: 3px;
          display: block;
          font-weight: 600;
        }
      }
    }
    #left-bottom {
      height: 39%;
      position: relative;
      .tit {
        position: absolute;
        top: 2px;
        left: 2px;
        img {
          width: 150px;
          height: 30px;
        }
        span {
          color: #8AC5FF!important;
          margin-left: 14px;
          margin-top: 3px;
          display: block;
          font-weight: 600;
        }
      }
    }
  }
  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    #middle-top {
      width: 100%;
      height: 32%;
      position: relative;
      .tit {
        position: absolute;
        top: 2px;
        left: 2px;
        img {
          width: 85px;
          height: 30px;
        }
        span {
          color: #8AC5FF!important;
          margin-left: 14px;
          margin-top: 3px;
          display: block;
          font-weight: 600;
        }
      }
    }
    #middle-bottom {
      width: 100%;
      height: 62%;
      position: relative;
      .tit {
        position: absolute;
        top: 2px;
        left: 2px;
        img {
          width: 160px;
          height: 30px;
        }
        span {
          color: #8AC5FF!important;
          margin-left: 14px;
          margin-top: 3px;
          display: block;
          font-weight: 600;
        }
      }
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    #right-top {
      height: 100%;
      position: relative;
      .tit {
        position: absolute;
        top: 2px;
        left: 2px;
        img {
          width: 130px;
          height: 30px;
        }
        span {
          color: #8AC5FF!important;
          margin-left: 14px;
          margin-top: 3px;
          display: block;
          font-weight: 600;
        }
      }
      .line {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 15px;
      }
    }
  }
  
}
.screen-bottom {
  height: 25%;
  width: 100%;
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 28px;
  box-sizing: border-box;
  >div {
    width: 24%;
    position: relative;
    .tit {
        position: absolute;
        top: 2px;
        left: 2px;
        img {
          width: 130px;
          height: 30px;
        }
        span {
          color: #8AC5FF!important;
          margin-left: 14px;
          margin-top: 3px;
          display: block;
          font-weight: 600;
        }
      }
  }
  }
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
