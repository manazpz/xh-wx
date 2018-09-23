<template>
  <div class="quote" ref="quote">
    <v-header title="清单"></v-header>
    <div class="equipment-list">
      <h3>旧机清单</h3>
      <div class="detailed-list old-machine-list" state="old">
        <div class="model-list-box">
          <div class="model-big-box model-big-0" dataNum="0" v-for="item in oldGoods">
                  <div class="model-box clearfix" >
                      <div class="left-b-box clearfix">
                          <i class="sign-i"></i>
                          <div class="pic-left">
                              <img :src="item.imgs.length>0?item.imgs[0].url:''" >
                          </div>
                          <div class="inf-right">
                              <h4>{{item.goodsName}} <span v-if="item.del === 'N' || item.logIstcs === '02'">已失效</span></h4>
                              <p class="p-inf">
                                <a href="javascript:;" target="_top" @click="oldSpec(item)">
                                      <span class="pXh">{{item.bllParameterStr}}</span>
                                  </a>
                              </p>
                              <div class="increase-change">
                                  <span class="reduce">-</span><i class="number">1</i><span class="add">+</span>
                              </div>
                              <div class="inf-r-price">
                                  <span>预计一周后再降￥30</span>
                                <router-link :to="{path:'/quote/detail',query:{id:item.bllId,openId:'123456'}}">
                                  <strong><b>￥</b><em>{{item.bllPrice}}</em></strong>
                                </router-link>
                              </div>
                          </div>
                      </div>
                      <div class="rigth-delete">删除</div>
                  </div>
              </div>
        </div>
        <div class="add-btn">
          <router-link :to="{path:'/screening',query:{model:'02'}}">+ 再添加
          </router-link>
        </div>
      </div>
      <h3>新机清单</h3>
      <div class="detailed-list new-machine-list" state="new">
        <div class="model-list-box">
              <div class="model-big-box model-big-1" dataNum="1" v-for="item in newGoods">
                    <div class="model-box clearfix">
                        <div class="left-b-box clearfix">
                            <i class="sign-i"></i>
                            <div class="pic-left">
                                <img :src="item.imgs.length>0?item.imgs[0].url:''">
                            </div>
                            <div class="inf-right">
                                <h4>{{item.goodsName}}<span v-if="item.del === 'N' || item.logIstcs === '02'">已失效</span></h4>
                                <p class="p-inf">
                                    <a href="javascript:;" target="_top" @click="newSpec(item)">
                                        <span class="pXh">{{item.bllParameterStr}}</span>
                                    </a>
                                </p>
                                <div class="increase-change">
                                    <span class="reduce">-</span><i class="number">1</i><span class="add">+</span>
                                </div>
                                <div class="inf-r-price">
                                    <span>预计一周后再降￥30</span>
                                  <router-link :to="{path:'/quote/detail',query:{id:item.bllId,openId:'123456'}}">
                                    <strong><b>￥</b><em>{{item.bllPrice}}</em></strong>
                                  </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="rigth-delete">删除</div>
                    </div>
                </div>
            </div>
        <div class="add-btn">
          <router-link :to="{path:'/screening',query:{model:'01'}}">+ 再添加
          </router-link>
        </div>
      </div>
    </div>
    <div class="footer-appraisal">
      <span>合计：<strong><b>￥</b> <em class="aggregate-amount">0</em></strong></span>
      <router-link :to="{path:'/order/sure',query:{ids:'b30b712c5d634a289d55b5cbc0146b14'}}">提交</router-link>
    </div><div class="popup-choice-wrap" title="是否删除弹窗">

  </div>
    <mt-popup
      style="width: 100%;height: 50%"
      v-model="popupVisibleOld"
      popup-transition="popup-fade"
      position="bottom">
      <div class="appraisal-main">
        <div class="r-title">
          <a class="revise-cancel-btn" href="javascript:;" @click="closePop" title="取消">取消</a>
          <h1>设备评估详情</h1>
          <a class="revise-confirm-btn" href="javascript:;" @click="surePop" title="确定">确定</a>
        </div>
        <ul class="appraisal-ul">
          <li class="li">
            <div>
              <span class="phonesname">{{phonename}}</span>
            </div>
          </li>
          <li class="li" v-for="(item,index) in updateOldGoods.goodsParameter">
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
    </mt-popup>
    <popup v-model="updateNewGoods" :popupVisible="showPopup" ref="popup" @submit-update="updatePop"></popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryReplacementCar, updateReplacementCar } from 'api/goods'
  import Popup from 'components/popup/popup'

  export default {
    data() {
      return {
        updateNewGoods: {imgs:[],specParameter:[{spec:[]}]},
        openId: '123456',
        oldGoods: [],
        flag: 0,
        newGoods: [],
        checks: [],
        checksCheck: '',
        checksData: [],
        updateOldGoods: '',
        popupVisibleOld: false,
        popupVisibleNew: false,
        phonename: '',
        showPopup: true,
        temp: {
          id: '',
          price: '',
          tips: '',
          model: '02',
          parameter: []
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        // 左滑动显示删除按钮
        $('.model-list-box').on("swipeleft",'.model-box',function(){
          $(this).addClass('m-swipeleft');
        });
        // 右滑动遮盖删除按钮
        $('.model-list-box').on("swiperight",'.model-box',function(){
          $(this).removeClass('m-swipeleft');
        });
        queryReplacementCar(this.openId).then(response => {
          if (response.code === 200) {
            let cur = this
            response.data.oldGoods.forEach((value, index) => {
              value.bllParameterStr = value.bllParameterStr.replace(/\s+|&nbsp;/ig, ';')
            })
            response.data.newGoods.forEach((value, index) => {
              value.bllParameter[0].spec.forEach((value1, index1) => {
                if(value.bllParameterStr == ''){
                  value.bllParameterStr += value1.spec_value_name
                }else{
                  value.bllParameterStr += ';' + value1.spec_value_name
                }
              })
            })
            this.newGoods = response.data.newGoods
            this.oldGoods = response.data.oldGoods
          }
        }).catch(() => {
        })
      },
      add(val) {
        if(val === '01'){
          this.$router.push({path: 'screening', query: {model:'01'}})
        }else{
          this.$router.push({path: 'screening', query: {model:'02'}})
        }
      },
      confirm(){
        this.$router.push({path: 'orderSure', query: {ids:'b30b712c5d634a289d55b5cbc0146b14'}})
      },
      oldSpec(item) {
        this.phonename = item.goodsName
        this.updateOldGoods = item
        this.popupVisibleOld = true
      },
      newSpec(item) {
        this.updateNewGoods.specParameter = item.goodsParameter
        this.updateNewGoods.imgs = item.imgs
        this.$refs.popup.open()
        this.$refs.popup.chick(item.bllParameter)
      },
      closePop() {
        this.popupVisibleOld = false
      },
      surePop() {
        this.popupVisibleOld = false
      },
      updatePop(value) {
        this.checks = value.checks
        for(var i=0; i<this.checks.length; i++){
          this.checksCheck += this.checks[i]
        }
        this.checks.toString()
        let tar  = this
        this.newGoods.forEach((value, index) => {
          value.goodsParameter.forEach((value1, index1) => {
            var specs = ''
            value1.spec.forEach((value2, index2) => {
               specs += value2.spec_sort
            })
            if(tar.checksCheck  === specs){
              tar.temp.parameter.push(value1)
            }
          })
        })
        tar.temp.id = tar.newGoods[0].bllId
        tar.temp.price = tar.newGoods[0].bllPrice
        updateReplacementCar(tar.temp).then(response => {
          if (response.code === 200) {
            tar.temp.parameter = []
            this.$refs.popup.close()
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
        // if(this.temp.parameter.length == 0){
        //   this.temp.parameter += '{"id": "'+item.id+'","parameter": [{"name": "'+val.spec_value_name+'","value":"'+val.spec_sort+'"}]}';
        // }else{
        //   this.temp.parameter += ',{"id": "'+item.id+'","parameter": [{"name": "'+val.spec_value_name+'","value":"'+val.spec_sort+'"}]}';
        // }
        // this.temp.price += parseInt(val.correntPrice)
      },
      confirm() {
        let cur = this
        this.temp.id = this.newGoods[0].bllId
        this.temp.price = this.newGoods[0].bllPrice
        this.temp.parameter = JSON.parse('['+this.temp.parameter+']')
        updateReplacementCar(this.temp).then(response => {
          if (response.code === 200) {
            setTimeout(function() {
              this.temp.parameter = []
              this.popupVisibleOld = false
            },1000);
          }
        }).catch(() => {
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
  @import "quote.styl";
</style>
