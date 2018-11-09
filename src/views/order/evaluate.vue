<template>
  <div class="evaluate" ref="evaluate">
    <v-header title="评价"></v-header>
    <div class="eca-inf-box">
      <dl>
        <dt>
          <img :src="list.item[0].imgs[0].url">
        </dt>
        <dd>
          <p>{{list.item[0].goodsName}}:{{list.item[0].parameterStr}}</p>
        </dd>
      </dl>
    </div>

    <div class="eca-main-box">
      <h3><span>商品评价</span><strong>满意请给五星哦</strong></h3>
      <div class="stars-box">
        <div class="big-div">
          <dl>
            <dt>商品符合度:</dt>
            <dd>
              <div class="test1"></div>
            </dd>
          </dl>
        </div>
        <div>
          <textarea style="width: 100%;" rows="10" cols="35" v-model="content">
          </textarea>
        </div>
      </div>
      <div class="pl-botton-a">
        <a @click="comment" href="javascript:;">发表评论</a>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { insertRate } from 'api/order'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        list: null,
        content: '',
        temp:{
          star: 0,
          goodsId:'',
          types:'01',
          openId: ''
        }
      }
    },
    created() {
      this.list = this.$route.query.item
      this.openId = window.localStorage.getItem("openId")
      this.getList()
    },
    methods: {
      getList(){
        var tar = this
        layui.use('rate', function () {
          var rate = layui.rate;
          //基础效果
          rate.render({
            elem: '.test1'
            ,choose: function(value){
              if(value > 0){
                tar.temp.star = value
              }
            }
          })
        })
      },
      comment(){
        var tar = this
        if(this.temp.star > 0){
          if(this.content !== ''){
            this.temp.goodsId = this.list.item[0].goodsId
            this.temp.orderId = this.list.item[0].id
            this.temp.openId = this.openId
            this.temp.content = this.content
            insertRate(this.temp).then(response => {
              if (response.code === 200) {
                Toast({
                  message: '评论成功！',
                  duration: 1000
                });
                setTimeout(function (){
                  tar.$router.push({path: '/orderList', query: {}})
                }, 1000);
              }
            }).catch(() => {
            })
          }else{
            Toast({
              message: '请输入评论内容！',
              duration: 1000
            });
          }
        }else{
          Toast({
            message: '请先进行评星！',
            duration: 1000
          });
        }
      }
    },
    //注册组件
    components: {
      VHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "evaluate.styl";
</style>
