<template>
  <div class="quote" ref="quote">
    <v-header title="清单"></v-header>
    <div class="equipment-list">
      <h3>旧机清单</h3>
      <div class="detailed-list old-machine-list" state="old">
        <div class="model-list-box">
          <div v-for="item in oldGoods">
            <mt-cell-swipe :right="[
            {content: '删除',
            style: { background: '#27c080', color: '#fff', lineHeight: '115px' },
            handler: () => deleteGoods(item)}]">
              <div class="model-box" >
                  <div class="left-b-box">
                      <i class="sign-i" @click="oldCheck(item,$event,item.bllId)"></i>
                      <div class="pic-left">
                          <img :src="item.imgs.length>0?item.imgs[0].url:''" >
                      </div>
                      <div class="inf-right">
                          <h4>{{item.goodsName}} <span v-if="item.del === 'N' || item.logIstcs === '02'">已失效</span></h4>
                          <p @click="oldSpec(item)">
                             <span>{{item.bllParameterStr}}</span>
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
              </div>
            </mt-cell-swipe>
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
              <div v-for="item in newGoods">
                <mt-cell-swipe :right="[
                {content: '删除',
                style: { background: '#27c080', color: '#fff', lineHeight: '115px' },
                handler: () => deleteGoods(item)}]">
                    <div class="model-box">
                        <div class="left-b-box">
                            <i class="sign-i" @click="oldCheck(item,$event,item.bllId)"></i>
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
                    </div>
                </mt-cell-swipe>
                </div>
            </div>
        <div class="add-btn">
          <router-link :to="{path:'/screening',query:{model:'01'}}">+ 再添加
          </router-link>
        </div>
      </div>
    </div>
    <div class="footer-appraisal1" @click="confirm">
      <span>合计：<strong><b>￥</b> <em class="aggregate-amount">0</em></strong></span>
      <p>提交</p>
    </div>
    <div class="popup-choice-wrap" title="是否删除弹窗">
      <div class="choice-box">
        <p>确定要将商品移除吗？</p>
        <div>
          <a class="cancel-btn" href="javascript:;" title="取消">取消</a>
          <a class="confirm-btn" href="javascript:;" title="确定">确定</a>
        </div>
      </div>
    </div>
    <mt-popup
      style="width: 100%;height: 50%;"
      v-model="popupVisibleOld"
      ref="oldPop"
      popup-transition="popup-fade"
      position="bottom">
      <div class="appraisal-main">
        <div class="r-title">
          <a class="revise-cancel-btn" href="javascript:;" @click="closePop" title="取消">取消</a>
          <h1>设备评估详情</h1>
          <a class="revise-confirm-btn" href="javascript:;" @click="surePop" title="确定">确定</a>
        </div>
        <ul class="appraisal-ul" style="overflow:scroll;" >
          <li class="li">
            <div>
              <span class="phonesname">{{phonename}}</span>
            </div>
          </li>
          <li class="li" v-for="(item,index) in updateOldGoods.goodsParameter">
            <div @click="showFlag(index)">
              <span class="problem-xh">{{item.name}}<i></i></span>
              <strong><a>{{text[index]}}</a></strong>
              <!--<strong><a v-if="updateOldGoods.bllParameter[index]" v-for="p in updateOldGoods.bllParameter[index].spec">{{updateOldGoods.bllParameter[index].spec.length==1?p.spec_value_name:p.spec_value_name+','}}</a></strong>-->
            </div>
            <ul :class="{'show': index === flag }">
              <li :class="{'select': items.select }" v-for="(items,index1) in item.parameter" @click="selectClass(item,items,$event,index)">{{items.spec_value_name}}</li>
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
  import { queryReplacementCar, updateReplacementCar, deleteReplacementCar } from 'api/goods'
  import Popup from 'components/popup/popup'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        updateNewGoods: {imgs:[],specParameter:[{spec:[]}]},
        openId: '123456',
        oldGoods: [],
        flag: -1,
        newGoods: [],
        oldChecks: [],
        checks: [],
        checksCheck: '',
        checksData: [],
        bllId: '',
        updateOldGoods: '',
        popupVisibleOld: false,
        popupVisibleNew: false,
        phonename: '',
        showPopup: true,
        text:[],
        temp: {
          id: '',
          price: 0,
          banPrice: 0,
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
              value.bllParameterStr = value.bllParameterStr
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
      deleteGoods(item) {
        this.bllId = item.bllId
        $('.popup-choice-wrap').fadeIn();
        $('.popup-choice-wrap .cancel-btn').click(function() {
          $('.popup-choice-wrap').fadeOut();
          $('.model-box').removeClass('m-swipeleft');
        });
        var tar = this
        $('.popup-choice-wrap .confirm-btn').click(function() {
          deleteReplacementCar({id:tar.bllId}).then(response => {
            if (response.code === 200) {
              $('.popup-choice-wrap').fadeOut();
              Toast({
                message: '删除成功！',
                position: 'bottom',
                duration: 5000
              });
              tar.getList()
            }
          }).catch(() => {
          })
        });
      },
      confirm(){
        if (this.oldChecks.length > 0) {
          this.$router.push({path: '/order/sure', query: {ids:this.oldChecks.join(',')}})
          this.oldChecks = []
        }else {
          Toast({
            message: '请选择商品！',
            position: 'bottom',
            duration: 5000
          });
        }

      },
      oldSpec(item) {
        this.phonename = item.goodsName
        this.updateOldGoods = item
        this.temp.id = item.bllId
        this.temp.banPrice = item.banPrice
        this.temp.model = '02'
        this.temp.parameter = []
        this.text = []
       JSON.parse(item.bllParameter).forEach((val,index) =>{
          this.temp.parameter.push(JSON.stringify(val))
          var txt = ''
          val.spec.forEach(val1 => {
            if(txt == ''){
              txt += val1.spec_value_name
            }else{
              txt += ';' + val1.spec_value_name
            }
          })
          this.text.push(txt)
          this.updateOldGoods.goodsParameter[index].parameter.forEach(val2 => {
            var zzz = false
            val.spec.forEach(val3 => {
              if(val3.spec_sort === val2.spec_sort){
                zzz = true
              }
            })
            val2.select = zzz
          })
        })
        this.popupVisibleOld = true
      },
      newSpec(item) {
        this.updateNewGoods.specParameter = item.goodsParameter
        this.updateNewGoods.imgs = item.imgs
        this.$refs.popup.open()
        this.temp.model = '01'
        this.$refs.popup.chick(item.bllParameter)
      },
      closePop() {
        this.popupVisibleOld = false
      },
      surePop() {
        this.temp.parameter = JSON.parse('['+this.temp.parameter+']')
        updateReplacementCar(this.temp).then(response => {
          if (response.code === 200) {
            this.popupVisibleOld = false
            this.getList()
          }
        }).catch(() => {
        })
      },
      showFlag(index){
        this.flag = index
      },
      oldCheck(item,evn,val) {
        if(this.oldChecks.indexOf(val) > -1) {
          this.oldChecks.splice(this.oldChecks.indexOf(val),1)
          evn.toElement.className = "sign-i"
          if ($('.aggregate-amount').html() !== '0') {
            if(item.model === '02'){
              $('.aggregate-amount').html( parseFloat( this.temp.price)- parseFloat(item.bllPrice) );
              this.temp.price = $('.aggregate-amount').html()
            }else{
              $('.aggregate-amount').html( parseFloat(item.bllPrice) + parseFloat( this.temp.price) );
              this.temp.price = $('.aggregate-amount').html()
            }
          } else {
            if(item.model === '01'){
              $('.aggregate-amount').html(- item.bllPrice);
              this.temp.price = $('.aggregate-amount').html()
            }else{
              $('.aggregate-amount').html(item.bllPrice);
              this.temp.price = $('.aggregate-amount').html()
            }
          }
        }else {
          this.oldChecks.push(val)
          evn.toElement.className = "sign-on"
          this.temp.price = $('.aggregate-amount').html()
          if ($('.aggregate-amount').html() !== '0') {
            if(item.model === '02'){
              $('.aggregate-amount').html( parseFloat( this.temp.price)- parseFloat(item.bllPrice) );
              this.temp.price = $('.aggregate-amount').html()
            }else{
              $('.aggregate-amount').html( parseFloat( this.temp.price) - parseFloat(item.bllPrice)   );
              this.temp.price = $('.aggregate-amount').html()
            }
          } else {
            if(item.model === '01'){
              $('.aggregate-amount').html(- item.bllPrice);
              this.temp.price = $('.aggregate-amount').html()
            }else{
              $('.aggregate-amount').html(item.bllPrice);
              this.temp.price = $('.aggregate-amount').html()
            }
          }
        }
      },
      updatePop(value) {
        this.checks = value.checks
        this.checksCheck = ''
        for(var i=0; i<this.checks.length; i++){
          this.checksCheck += this.checks[i]
        }
        let tar  = this
        this.newGoods.forEach((value, index) => {
          value.goodsParameter.forEach((value1, index1) => {
            var specs = ''
            value1.spec.forEach((value2, index2) => {
               specs += value2.spec_sort
            })
            if(tar.checksCheck  === specs){
              tar.temp.parameter = []
              tar.temp.price = value1.price
              tar.temp.parameter.push(value1)
            }
          })
        })
        tar.temp.id = tar.newGoods[0].bllId
        updateReplacementCar(tar.temp).then(response => {
          if (response.code === 200) {
            this.$refs.popup.close()
            this.getList()
          }
        }).catch(() => {
        })
      },
      selectClass(item,val,ent,index) {
        //判断多选
        if (item.obligate != '02') {
          //已选择切换
          if(ent.toElement.className != 'select') {
            var li = ent.path[1].getElementsByTagName('li')
            for(var i=0;i<li.length;i++) {
              if(ent.path[1].getElementsByTagName('li')[i].className == 'select')
                ent.path[1].getElementsByTagName('li')[i].classList.remove("select")
            }
            ent.toElement.classList.add("select")
            this.text[index] = val.spec_value_name
            this.flag = -1
          }
        }else {
          if(ent.toElement.className == 'select'){
            ent.toElement.classList.remove("select")
            if(this.text[index].split(';').length == 1) {
              this.text[index] = this.text[index].replace(val.spec_value_name, '')
            }else {
              if (this.text[index].indexOf(val.spec_value_name) == 0){
                this.text[index] = this.text[index].replace(val.spec_value_name+';', '')
              }else if (this.text[index].indexOf(val.spec_value_name) > 0){
                this.text[index] = this.text[index].replace(';'+val.spec_value_name, '')
              }
            }
          }else {
            ent.toElement.classList.add("select")
            if(this.text[index].length == 0) {
              this.text[index] += val.spec_value_name
            }else {
              this.text[index] += ';' + val.spec_value_name
            }
          }
          ent.path[2].childNodes[0].childNodes[2].innerText = this.text[index]
        }
        if(this.temp.parameter.length == 0){
          this.temp.parameter.push('{"id": "'+item.id+'","obligate": "'+item.obligate+'","spec": ['+JSON.stringify(val)+']}')
        }else{
          if (item.obligate === '02') {
            var xxx = -1
            this.temp.parameter.forEach((value,index) => {
              if(value.indexOf(item.id) > -1) {
                xxx = index
                return
              }
            })
            if(xxx != -1) {
              var i = -1
              var json = JSON.parse(this.temp.parameter[xxx])
              json.spec.forEach((val2,index2) => {
                if (val.spec_sort === val2.spec_sort) {
                  i = index2
                }
              })
              if(i == -1) {
                json.spec.push(val)
              }else {
                json.spec.splice(i,1)
              }
              this.temp.parameter[xxx] = JSON.stringify(json)
            }else {
              this.temp.parameter.push('{"id": "'+item.id+'","obligate": "'+item.obligate+'","spec": ['+JSON.stringify(val)+']}')
            }
          }else {
            if (this.temp.parameter.length > 0) {
              this.temp.parameter.forEach((val1,index1) => {
                var xxx = JSON.parse(val1)
                if(item.id === xxx.id) {
                  this.temp.parameter[index1] = '{"id": "'+item.id+'","obligate": "'+item.obligate+'","spec": ['+JSON.stringify(val)+']}'
                }
              })
            }else {
              this.temp.parameter.push('{"id": "'+item.id+'","obligate": "'+item.obligate+'","spec": ['+JSON.stringify(val)+']}')
            }
          }
        }
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
