<template>
  <div>
    <div class="container">
      <div class="input">
        <input type="text" placeholder="请输入倒计时的秒数" ref="input">
        <!-- <div class="btn" @click="handleBtn">确定</div> -->
        <el-button type="primary" @click="handleBtn">确定</el-button>
      </div>
      <div>倒计时时长为{{num}}秒</div>
      <div class="count">
        {{time}}
      </div>
      <el-progress type="circle" :percentage="parseInt(prc)"></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: '00天00时00分00秒',
      timeId: null, //定时器id
      inputCount: null,
      prc: 0, //百分比,
      num: 0
    }
  },
  destoryed() {
    clearInterval(this.timeId)
  },
  methods: {
    handleBtn () {
      this.inputCount = this.$refs.input.value
      this.num = parseInt(this.$refs.input.value)
      if(isNaN(this.inputCount.trim())) {
        alert('请输入有效数字')
        this.$refs.input.value = ''
        this.num = 0
      }else {
        this.$refs.input.value = ''
        this.countDown()
        if(this.timeId) {
          clearInterval(this.timeId)
        }
        this.setTime()
      }
    },
    countDown() {
      let d = parseInt(this.inputCount / (24 * 60 * 60))
      d = d < 10 ? "0" + d : d
      let h = parseInt(this.inputCount / (60 * 60) % 24);
      h = h < 10 ? "0" + h : h
      let m = parseInt(this.inputCount / 60 % 60);
      m = m < 10 ? "0" + m : m
      let s = parseInt(this.inputCount % 60);
      s = s < 10 ? "0" + s : s
      this.time = d + '天' + h + '时' + m + '分' + s + '秒'
      this.prc = ((this.num -  this.inputCount) / this.num * 100).toFixed(0)
    },
    setTime() {
      this.timeId =  setInterval(() => {
        if(this.inputCount == 0) {
          clearInterval(this.timeId)
          this.open()
        }else {
          this.inputCount -= 1
          this.countDown()
        }
      },1000)
    },
    //消息弹窗
    open() {
      this.$alert('倒计时结束', '', {
        confirmButtonText: '确定',
        // callback: action => {
        //   this.$message({
        //     type: 'info',
        //     message: `action: ${ action }`
        //   });
        // }
      });
    }
  }
}
</script>

<style lang="less" scoped>
input {
  outline: none;
  border: 0;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  margin-top: 70px;
}
.input {
  display: flex;
  flex: 1;
  border: 1px solid rgb(9, 127, 223);
  align-items: center;
  margin-bottom: 20px;
  input {
    height: 30px;
  }
  .btn {
    width: 80px;
    height: 40px;
    background-color: rgb(9, 127, 223);
    color: #fff;
    text-align: center;
    font-size: 18px;
    line-height: 40px;
    cursor: pointer;
  }
}
.count {
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>