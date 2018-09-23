<template>
  <div class="oldAppraisal" ref="oldAppraisal">
    <v-header title="旧机估计"></v-header>
    <mt-range
      v-model="rangeValue"
      :min="0"
      :max="maxp-1"
      :bar-height="10">
    </mt-range>
    <span>{{rangeValue+'/'+maxp}}</span>

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
              <li v-for="(items,index) in item.parameter"   @click="selectClass(item,items,index)" :data="index">{{items.spec_value_name}}</li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="offer-btn-box">
        <a class="" href="javascript:;" @click="confirm()" title="查看报价">查看报价</a>
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
        phonename:'',
        rangeValue: 0,
        maxp:0
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
            this.maxp = response.data.items.length
          }
        }).catch(() => {
        })
      },
      selectClass(item,val,index) {
        var statisticsPrice = '';
        var total = $('.appraisal-ul').attr('price');
        $('.appraisal-ul').on('click','.li li',function() {
          var _this = $(this);
          var inf   = _this.html();
          var schedule = _this.parent('ul').find('li').attr('data');
          if(_this.parent('ul').siblings('div').find('span')[0].innerText != '相关实情描述'){
            _this.addClass('select').siblings().removeClass('select');
            _this.parent('ul').siblings('div').find('strong').html(inf);
          }else{
            if (_this.hasClass('select')) {
              _this.removeClass('select');
            } else {
              _this.addClass('select');
              _this.parent('ul').siblings('div').find('strong').html(inf);
            }
          }
          $('.progress-bar .line').addClass('schedule-'+schedule+'');
          setTimeout(function() {
            if(_this.parent('ul').siblings('div').find('span')[0].innerText != '相关实情描述'){
              _this.parent('ul').removeClass('show').parent('.li').next().find('ul').addClass('show');
            }
          },1000);
          if (schedule >= 50) {
            $('.offer-btn-box a').addClass('open');
          };
          if (_this.hasClass('select')) {
            statisticsPrice = Number(_this.find('li').next().context.nextSibling.innerText);
            $('.appraisal-ul').attr('price', Number(statisticsPrice) + Number($('.appraisal-ul').attr('price')));
          } else {
            statisticsPrice = Number(_this.find('li').next().context.nextSibling.innerText);
            $('.appraisal-ul').attr('price', Number(-statisticsPrice) + Number($('.appraisal-ul').attr('price')));
          }
        });

        if(this.temp.parameter.length == 0){
          this.temp.parameter += '{"id": "'+item.id+'","parameter": [{"name": "'+val.spec_value_name+'","value":"'+val.spec_sort+'"}]}';
        }else{
          this.temp.parameter += ',{"id": "'+item.id+'","parameter": [{"name": "'+val.spec_value_name+'","value":"'+val.spec_sort+'"}]}';
        }
        this.temp.price += parseInt(val.correntPrice)
        if(this.rangeValue < this.maxp)
          this.rangeValue++
      },
      confirm() {
        let cur = this
        this.temp.goodsId = this.$route.query.id
        this.temp.price += parseInt(this.$route.query.price)
        this.temp.parameter = JSON.parse('['+this.temp.parameter+']')
        insertReplacementCar(this.temp).then(response => {
          if (response.code === 200) {
            cur.$router.push('quote')
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
