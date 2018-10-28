<template>
  <div class="getCoupon" ref="getCoupon">
    <div class="header" ref="header">
      <v-header title="优惠券"></v-header>
    </div>
    <div class="preference-box">
      <h2 class="title-h2-des">
        <span>不使用优惠券</span>
        <b @click="noUser($event)"></b>
      </h2>
      <ul>
        <li v-for="item in list" class="coiling-01">
          <dl @click="click(item)">
            <dt>
              <strong><i>￥</i>{{item.price}}</strong>
              <span>{{item.typeName}}</span>
            </dt>
            <dd>
              <h4>{{item.title}}</h4>
              <strong>{{item.content}}</strong>
              <span>{{item.beginTime}} - {{item.endTime}}</span>
            </dd>
          </dl>
        </li>
      </ul>
      <div class="nothing">
        <p>——————————   没有更多了~   ——————————</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryCouponUser } from 'api/coupon'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        openId: '',
        couponType: '',
        list: null,
        ids: ''
      }
    },
    created() {
      this.openId = window.localStorage.getItem("openId")
      this.couponType = this.$route.query.item
      this.ids = this.$route.query.ids
      this.getList();
    },
    methods: {
      getList() {
        queryCouponUser({openId:this.openId,type:this.couponType}).then(response => {
          if (response.code === 200) {
            if(response.data.items != undefined){
              this.list = response.data.items
            }
          }
        }).catch(() => {
        })
      },
      noUser(ent) {
        if(ent.toElement.className == 'b-hook'){
          ent.toElement.classList.remove("b-hook")
        }else{
          ent.toElement.classList.add("b-hook")
        }
      },
      click(item){
        this.$router.push({path: '/order/sure', query: {ids:this.ids,price:item.price,type:this.couponType}})
      }
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "getCoupon.styl";
</style>
