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
    <div class="pl-list">
      <ul class="clearfix">
        <li class="pl-li">
          <span>评价</span>
          <div>
            <p v-if="avar == ''"><em>好评率：暂无评价</em></p>
            <p v-else><em>好评率：{{avar}}%</em></p>
          </div>
        </li>
        <li class="pl-li" v-for="item in commentShort">
          <span class="span-pl">评论：{{item.content}}</span>
          <div class="name-pl">
            <p><em>{{item.nick_name}}</em></p>
          </div>
          <span class="span-pl">回复：{{item.replaycontent}}</span>
          <div class="name-pl">
            <p><em>{{item.revierer_nick_name}}</em></p>
          </div>
        </li>
      </ul>
      <div class="pl-btn">
        <a @click="showAll" href="javascript:;">全部评论</a>
      </div>
    </div>
    <!-->
    <popup v-model="detail" :popupVisible="showPopup" ref="popup" @submit-update="updatePop"></popup>
    <div class="footer-shopping-cart">
      <router-link :to="{path:'/collect'}">
        <i class="left-icon"></i>
      </router-link>
      <mt-button class="center-shopping" @click="addCollect">加入收藏</mt-button>
      <mt-button class="right-shopping">立即购买</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { queryGoodsDetail, queryGoodsComment } from 'api/goods'
  import { insertCollect } from 'api/collect'
  import VHeader from 'components/v-header/v-header'
  import { Toast } from 'mint-ui'
  import Popup from 'components/popup/popup'

  export default {
    data() {
      return {
        openId: '',
        detail: {imgs:[],specParameter:[{spec:[]}]},
        price: 0,
        maxPrice: 0,
        minPrice: 0,
        specText: '机身颜色，套餐类型，存储容量，版本类型',
        showPopup: true,
        comment: [],
        replays: [],
        commentShort: [],
        list: [],
        count: 0,
        num: 0,
        avar: ''
      }
    },
    created() {
      this.openId = window.localStorage.getItem("openId")
      this.getDetail()
      this.getComment()
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
      getComment(){
        var tar =this
        queryGoodsComment({goodsId:this.$route.query.id}).then(response => {
          if (response.code === 200) {
            response.data.items .forEach((value,index) => {
              if(value.ref_no == null || value.ref_no == ''){
                this.count += parseInt(value.star)
                this.num ++;
                this.comment.push(value)
              }else{
                this.replays.push(value)
              }
            })

            if(response.data.items.length > 0){
              this.commentShort.push(this.comment[0])
              this.avar = this.count/this.num/5*100
              this.avar.toFixed(2)
            }
            this.comment.forEach((value1,index1) => {
              this.replays.forEach((value2,index2) => {
                  if(value2.orderId === value1.orderId){
                    value1['replaycontent'] = value2.content;
                    value1['revierer_nick_name'] = value2.revierer_nick_name;
                  }
              })
            })
          }
        }).catch(() => {
        })
      },
      showAll(){
        this.commentShort = this.comment
      },
      openPopup() {
        this.$refs.popup.open()
      },
      updatePop(value) {
        this.price = value.price
        this.specText = value.specText
      },
      addCollect() {
        insertCollect({openId:this.openId,basicId:this.detail.id}).then(response => {
          Toast({
            message: response.message,
            iconClass: 'mintui mintui-success'
          });
        }).catch((response) => {
          Toast(response.message);
        })
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
