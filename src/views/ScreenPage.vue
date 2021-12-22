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
        <span class="datetime">2021-12-06 19:30:34</span>
      </div>
    </header>
    <div class="screen-body">
      <section class="screen-left">
        <div id="left-top">
          <Trend></Trend>
        </div>
        <div id="left-bottom">
          <china-day></china-day>
        </div>
      </section>
      <section class="screen-middle">
        <div id="middle-top">
          <!-- 商家分布图表 -->
          <Map ref="map"></Map>
          <img src="../../public/static/img/a.png" alt="" style="width: 100%;height: 45%;bottom: 0;position: absolute;">
        </div>
        <div id="middle-bottom">
          <!-- 地区销量排行图表 -->
          <!-- <Rank ref="rank"></Rank> -->
          <!-- <foreign-list></foreign-list> -->
          <Count></Count>
        </div>
      </section>
      <section class="screen-right">
        <div id="right-top">
          <Rate></Rate>
        </div>
        <div id="right-bottom">
          <Rate></Rate>
        </div>
      </section>
    </div>
    <section class="screen-bottom">
        <div>
          <vaccine-top></vaccine-top>
        </div>
        <div>
          <vaccine-trend></vaccine-trend>
        </div>
        <div>
          <regional-risk></regional-risk>
        </div>
        <div>
          <foreign-list></foreign-list>
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
    
  },
  destroyed () {
   
  },
  data () {
    return {
    }
  },
  methods: {
 
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
  border: 1px solid red;
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
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position:absolute;
    right: 0px;
    top: 50%;
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
  .screen-left {
    height: 100%;
    width: 27.6%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    #left-top {
      height: 56%;
      position: relative;
    }
    #left-bottom {
      height: 39%;
      position: relative;
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
      height: 62%;
      position: relative;
    }
    #middle-bottom {
      width: 100%;
      height: 32%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    #right-top {
      height: 54%;
      position: relative;
    }
    #right-bottom {
      height: 40%;
      position: relative;
    }
  }
  
}
.screen-bottom {
  height: 25%;
  width: 100%;
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  >div {
    width: 24%;
  }
  }
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}
</style>
