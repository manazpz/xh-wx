<template>
  <div class="myCoupon" ref="myCoupon">
    <v-header title="我的优惠券"></v-header>
    <div class="coupons-tab">
      <a @click="navchick($event)" class="select" href="javascript:;">未使用</a>
      <a @click="navchick($event)" href="javascript:;">已使用</a>
      <a @click="navchick($event)" href="javascript:;">已失效</a>
    </div>
    <div class="coupons-box">
      <div class="cou-main cou-main-bg show">
        <div class="redeem-code">
          <label for="">
            <input v-model="number" type="text" name="" value="">
            <i></i>
          </label>
          <a @click="redeem" class="redeem-btn" href="javascript:;">兑换</a>
        </div>
        <ul>
          <li v-for="item in nouseList" class="coiling-01">
            <dl>
              <dt>
                <strong><i>￥</i>{{item.price}}</strong>
                <span>{{item.typeName}}</span>
              </dt>
              <dd>
                <h4>{{item.title}}</h4>
                <strong>{{item.content}}</strong>
                <span>{{item.beginTime}} - {{item.endTime}}</span>
                <a href="javascript:;" @click="jump">去使用</a>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <div class="cou-main cou-main-bg use-main">
        <ul>
          <li v-for="item1 in beuseList">
            <dl>
              <dt>
                <strong><i>￥</i>{{item1.price}}</strong>
                <span>{{item1.typeName}}</span>
              </dt>
              <dd>
                <h4>{{item1.title}}</h4>
                <strong>{{item1.content}}</strong>
                <span>{{item1.beginTime}} - {{item1.endTime}}</span>
                <i></i>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <div class="cou-main cou-main-bg invalid-main">
        <ul>
          <li v-for="item2 in loseList">
            <dl>
              <dt>
                <strong><i>￥</i>{{item2.price}}</strong>
                <span>{{item2.typeName}}</span>
              </dt>
              <dd>
                <h4>{{item2.title}}</h4>
                <strong>{{item2.content}}</strong>
                <span>{{item2.beginTime}} - {{item2.endTime}}</span>
                <i></i>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>

    <div class="coupons-tips">
      <div class="tips-box">
        <h1>优惠码说明</h1>
        <div>
          <p>优惠码主要来源于线下派发的优惠券。</p>
          <p>线上领取的优惠券无须激活可直接使用。</p>
        </div>
        <a class="confirm-btn" href="javascript:;" @click="confirm">确定</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryCouponUser, getCoupon } from 'api/coupon'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        number: '',
        openId: '',
        list: null,
        nouseList: [],
        beuseList: [],
        loseList: [],
        checks: null,
        temp:{
          openId: '',
          number: ''
        }
      }
    },
    created() {
      this.openId = window.localStorage.getItem("openId")
      this.getList();
    },
    methods: {
      getList() {
        queryCouponUser({openId:this.openId}).then(response => {
          if (response.code === 200) {
            if(response.data.items != undefined){
              response.data.items .forEach((value,index) => {
                switch (value.status) {
                  case '01' :
                    this.nouseList.push(value)
                    return;
                  case '02' :
                    this.beuseList.push(value)
                    return;
                  case '03' :
                    this.loseList.push(value)
                    return;
                }
              })
            }
          }
        }).catch(() => {
        })
      },
      confirm() {
        $('.coupons-tips').fadeOut();
      },
      navchick(ent){
        var a = ent.toElement.parentNode.children
        //清空选择项
        for(var i=0;i<a.length;i++) {
          if(ent.target.parentNode.children[i].className == 'select')
            ent.target.parentNode.children[i].classList.remove("select")
        }
        //添加当前选择项
        ent.toElement.classList.add("select")
        var main =  $('.cou-main')
        for(var i=0;i<main.length;i++) {
          main[i].classList.remove("show")
        }
        switch (ent.toElement.innerHTML) {
          case '未使用' :
            main[0].classList.add('show')
            return;
          case '已使用' :
            main[1].classList.add('show')
            return;
          case '已失效' :
            main[2].classList.add('show')
            return;
        }
      },
      jump(){
        this.$router.push({path: '/home', query: {}})
      },
      redeem(){
        this.temp.openId = this.openId
        this.temp.no = this.number
        getCoupon(this.temp).then(response => {
          if (response.code === 200) {
            Toast({
              message: '兑换成功！',
              position: 'bottom',
              duration: 2000
            });
          }
          if(response.code === 502){
            Toast({
              message: '无此兑换码！',
              position: 'bottom',
              duration: 2000
            });
          }
        }).catch(() => {
        })
      }
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "myCoupon.styl";
</style>
