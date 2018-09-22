<template>
  <div class="oldAppraisal" ref="oldAppraisal">
    <v-header title="旧机估计"></v-header>

      <div class="top-return">
        <a href="javascript:history.back(-1)" title="返回上一页"></a>
      </div>

      <div class="progress-bar">
        <span class="line schedule-0"></span>
      </div>
      <div class="appraisal-main">
        <ul class="appraisal-ul" price="0">
          <li class="li">
            <div>
              <span class="phonesname">{{phonename}}</span>
            </div>
          </li>
          <li class="li" v-for="(item,index) in appraisalList" :key='item.id'>
            <div>
              <span class="problem-xh">{{item.name}}<i></i></span>
              <strong></strong>
            </div>
            <ul :class="{'show': index === flag }">
              <li v-for="(items,index) in item.parameter" @click="selectClass(item,items,index)">{{items.spec_value_name}}</li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="offer-btn-box">
        <mt-button class="confirm-btn" @click="confirm()">查看报价</mt-button>
      </div>


    <div class="appraisal-process-problem-wrap" title="问号弹窗">
      <div class="problem-box">
        <h1></h1>
        <p></p>
      </div>
      <div class="problem-close"></div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { getGoodsAppList, insertReplacementCar } from 'api/goods'
  export default {
    data() {
      return {
        temp: {
          openId: '123456',
          goodsId: '',
          price: 0,
          model: '02',
          parameter: []
        },
        flag: 0,
        appraisalList: [],
        phonename:''
      }
    },
    created() {
      this.getList()
      this.phonename = this.$route.query.name
    },
    methods: {
      getList() {
        getGoodsAppList(this.$route.query.id).then(response => {
          if (response.code === 200) {
            this.appraisalList = response.data.items
          }
        }).catch(() => {
        })
      },
      selectClass(item,val,index) {
        if(this.temp.parameter.length == 0){
          this.temp.parameter += '{"id": "'+item.id+'","parameter": [{"name": "'+val.spec_value_name+'","value":"'+val.spec_sort+'"}]}';
        }else{
          this.temp.parameter += ',{"id": "'+item.id+'","parameter": [{"name": "'+val.spec_value_name+'","value":"'+val.spec_sort+'"}]}';
        }
        this.temp.price += parseInt(val.correntPrice)
      },
      confirm() {
        let cur = this
        this.temp.goodsId = this.$route.query.id
        this.temp.price += parseInt(this.$route.query.price)
        this.temp.parameter = JSON.parse('['+this.temp.parameter+']')
        insertReplacementCar(this.temp).then(response => {
          if (response.code === 200) {
            setTimeout(function() {
              cur.$router.push({path: 'quote'})
            },1000);
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
<scirpt>


</scirpt>

<style lang="stylus" rel="stylesheet/stylus">
  @import "oldAppraisal.styl";
</style>
