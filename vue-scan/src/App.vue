<template>
  <div id="app">
   <div class="icon" v-if="navHide">
     <a href="javascript:;" class="weui-btn weui-btn_primary" @click="callApp()">扫码验证</a>
   </div>
    <div class="X-nav" v-show="navShow">
      <div class="magx">
        <div class="msg"><img :src="userName.avatar" alt="">
        </div>
      </div>
      <div class="list">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>人脸图片</p>
          </div>
          <div class="weui-cell__ft"><img :src="userName.facePicture"
                                          alt="" width="60px" height="60"></div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>昵称</p>
          </div>
          <div class="weui-cell__ft">{{userName.nickname}}</div>
        </div>
        <div class="weui-cell"  @click="butApp('0')">
          <div class="weui-cell__bd">
            <p>手机号</p>
          </div>
          <div class="weui-cell__ft">{{userName.mobile}}</div>
        </div>

        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p>年龄</p>
          </div>
          <div class="weui-cell__ft">{{userName.age==="null"?'未知':userName.age+'岁'}}</div>
        </div>
        <div class="nav"><h3>{{leave}}</h3></div>
      </div>
      <div class="weui-flex buttonX" v-show="buttonShow">
        <div class="weui-flex__item"><a class="weui-btn weui-btn_warn" @click="noPass()">不通过</a>
        </div>
        <div class="weui-flex__item"></div>
        <div class="weui-flex__item"><a href="javascript:;" class="weui-btn weui-btn_primary"
                                        @click="butApp('1')">通过</a></div>
      </div>
    </div>
  </div>
</template>
<script>
  function scanQRCodeResult(qRcode) {}
  import axios from 'axios';

  export default {
    data() {
      return {
        leave: '',
        xUrl: 'http://125.69.76.147:7081/store',
        buttonShow: true,
        navShow: false,
        navHide: true,
        userName: [],
        cookieValue:'',
        cookieName:'',
        username:''
      }
    },
    methods: {
      callApp() {
        // this.axAjsx("20180529165624013262")
        hmgjBridge.scanQRCode();  // 这是app调用扫一扫的方法这里
        window['scanQRCodeResult'] = (msg) => {
          this.axAjsx(msg)
        }
      },
      axAjsx(msg) {
        axios({
          method: "get",
          url: this.xUrl + '/startdt/member?userId=' + msg,
        }).then((res) => {
          if(res.data.data.code=='0000'){
            this.navShow = true;
            this.navHide = false;
            this.userName = res.data.data.data;
            if (res.data.data.data.certify == '1') {
              this.buttonShow = false;
              this.leave = '验证已通过18岁！';
            }
          }else{
            alert('该用户不存在')
          }
        }).catch(function (eer) {
          alert('系统繁忙')
        });
      },
      butApp(obj) {
        axios({
          method: "post",
          url: this.xUrl + '/startdt/certify',
          data: {
            userId: this.userName.userId,
            certify: obj
          }
        }).then((res) => {
          if (res.data.data.code === '0000') {
            this.leave = '验证已通过18岁！';
            this.buttonShow = false;
            alert('验证已通过18岁！')
          } else {
            this.leave = '验证已通过18岁！';
            this.buttonShow = false;
          }
        }).catch(function (eer) {
          console.log(eer)
        })
      },
      noPass() {
        this.navShow = false;
        this.navHide = true;
      }
    }
  }
</script>
<style>
#app {font-family: 'Avenir', Helvetica, Arial, sans-serif;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;color: #2c3e50}
.icon{width: 100%;text-align: center;height:100%;position: absolute;overflow: hidden;padding:50px;box-sizing: border-box;}
.icon a{margin-top:60%;}
.magx{background:rgba(0,0,0,0.6);padding: 40px 0}
.msg{border-radius: 50%;overflow: hidden;width: 80px;height: 80px;margin: 0 auto;-webkit-box-shadow:1px 2px 20px #FFF;border: 3px solid #fff}
.msg img{width: 100%;height: 100%;}
.list{padding: 10px 10px}
.buttonX{position: fixed;bottom: 10px;width: 90%;padding: 0 20px}
.nav{width: 100%;padding: 10px 0}
.nav h3{text-align: center;color: #1aad19}
.X-nav{width: 100%;height: 100%;position:absolute}
</style>
