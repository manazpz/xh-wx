<template>
  <div class="goodsDetail" ref="goodsDetail">
    <v-header title="商品详情"></v-header>
    <mt-swipe :stopPropagation="true" :prevent="true" :auto="5000" class="banner" style="height: 250px;margin-top: 40px;">
      <mt-swipe-item v-for="item in detail.imgs">
        <img :src="item.url" style="height: 100%;width: 100%">
      </mt-swipe-item>
    </mt-swipe>
    <div class="merchandise-des">
      <h3><span>Apple iPhone X 苹果</span></h3>
      <p class="p-1"><i>￥</i><span>6598-8828</span></p>
      <p class="p-2"><span>最低换购价 ￥6500</span><i></i></p>
    </div>

    <!-->
    <div class="parameter-list">
      <ul class="clearfix">
        <li>
          <span>规格</span>
          <div>
            <dl>
              <dt>屏幕尺寸</dt>
              <dd>5.8英寸</dd>
            </dl>
            <dl>
              <dt>机身内存</dt>
              <dd>64GB</dd>
            </dl>
            <dl>
              <dt>后置摄像头</dt>
              <dd>1200像素</dd>
            </dl>
            <dl>
              <dt>运行内存</dt>
              <dd>6G</dd>
            </dl>
          </div>
        </li>
        <li>
          <span>选择</span>
          <div>
            <a class="parameter-more" href="javascipt:;">
              <p>机身颜色，套餐类型，存储容量，版本类型</p><i></i>
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

    <div class="footer-shopping-cart">
      <i class="left-icon"></i>
      <mt-button class="center-shopping">加入收藏</mt-button>
      <mt-button class="right-shopping" href="../1-0/index-price.html">立即购买</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { queryGoodsDetail } from 'api/goods'
  import VHeader from 'components/v-header/v-header'

  export default {
    data() {
      return {
        detail: {imgs:[]}
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
  @import "goodsDetail.styl";
</style>
