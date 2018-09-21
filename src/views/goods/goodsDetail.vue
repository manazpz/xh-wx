<template>
  <div class="goodsDetail" ref="goodsDetail">
    <v-header title="商品详情"></v-header>
    <mt-swipe :stopPropagation="true" :prevent="true" :auto="5000" class="banner" style="height: 250px;margin-top: 40px;">
      <mt-swipe-item v-for="item in detail.imgs">
        <img :src="item.url" style="height: 100%;width: 100%">
      </mt-swipe-item>
    </mt-swipe>
    <div class="merchandise-des">
      <h3><span>{{detail.name}}</span></h3>
      <p class="p-1"><i>￥</i><span>{{price==0?minPrice+'-'+maxPrice:price}}</span></p>
      <p class="p-2"><span>最低换购价 ￥{{minPrice}}</span><i></i></p>
    </div>

    <!-->
    <div class="parameter-list">
      <ul class="clearfix">
        <li>
          <span>规格</span>
          <div>
            <dl v-if="detail.specParameter.length > 0" v-for="item in detail.specParameter[0].spec">
              <dt>{{item.name}}</dt>
              <dd>{{item.spec_value_name}}</dd>
            </dl>
          </div>
        </li>
        <li>
          <span>选择</span>
          <div>
            <a class="parameter-more" href="javascipt:;" @click="openPopup">
              <p>{{specText}}</p><i></i>
            </a>
          </div>
        </li>
        <li>
          <span>服务:</span>
          <div>
            <p>15天退货·运险费</p>
          </div>
        </li>
        <li>
          <span>促销</span>
          <div>
            <p><b>活动</b>立即购买可获得200元优惠券</p>
          </div>
        </li>
      </ul>
    </div>
    <!-->
    <popup v-model="detail" :popupVisible="showPopup" ref="popup" @submit-update="updatePop"></popup>
    <div class="footer-shopping-cart">
      <i class="left-icon"></i>
      <mt-button class="center-shopping">加入收藏</mt-button>
      <mt-button class="right-shopping">立即购买</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { queryGoodsDetail } from 'api/goods'
  import VHeader from 'components/v-header/v-header'
  import Popup from 'components/popup/popup'

  export default {
    data() {
      return {
        detail: {imgs:[],specParameter:[{spec:[]}]},
        price: 0,
        maxPrice: 0,
        minPrice: 0,
        specText: '机身颜色，套餐类型，存储容量，版本类型',
        showPopup: true
      }
    },
    created() {
      this.getDetail()
    },
    methods: {
      getDetail() {
        queryGoodsDetail(this.$route.query.id).then(response => {
          if (response.code === 200) {
            this.detail = response.data.items[0]
            this.detail.specParameter.sort(function(a,b){return a.price-b.price})
            this.minPrice = this.detail.specParameter[0].price
            this.maxPrice = this.detail.specParameter[this.detail.specParameter.length-1].price
          }
        }).catch(() => {
        })
      },
      openPopup() {
        this.$refs.popup.open()
      },
      updatePop(value) {
        this.price = value.price
        this.specText = value.specText
      }
    },
    //注册组件
    components: {
      VHeader,
      Popup
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "goodsDetail.styl";
</style>
