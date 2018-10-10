<template>
  <div class="addressEdit" ref="addressEdit">
    <v-header title="编辑地址"></v-header>
    <div class="address-form">
      <ul>
        <li class="clearfix">
          <span>收货人</span>
          <label for="">
            <!--<input v-model="name" type="text" name="" value="" placeholder="请输入姓名" >-->
            <mt-field label="" required="true" placeholder="请输入姓名" v-model="name"></mt-field>
          </label>
        </li>
        <li class="clearfix">
          <span>联系电话</span>
          <label for="">
            <!--<input v-model="phone" type="text" name="" value="" placeholder="请输入电话号码" maxlength="11">-->
            <mt-field label="" required="true" placeholder="请输入电话号码" type="tel" v-model="phone"></mt-field>
          </label>
        </li>
        <li class="clearfix">
          <span>所在地区</span>
          <div class="select">
            <mt-field label="" placeholder="" :disableClear="true" :readonly="true" v-model="areaString" @click.native="handlerArea"></mt-field>
            <!--<mt-cell title="" :value="areaString" @click.native="handlerArea"></mt-cell>-->
            <mt-popup v-model="areaVisible" class="area-class" position="bottom">
              <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
            </mt-popup>
          </div>
        </li>
        <!--<li class="clearfix">-->
        <!--<span>所在街道</span>-->
        <!--<div class="select">-->
          <!--<mt-cell title="" :value="streetString" is-link @click.native="handlerStreet"></mt-cell>-->
          <!--<mt-popup v-model="streetVisible" class="area-class" position="bottom">-->
            <!--<mt-picker :slots="slotstree" @change="onStreeChange"></mt-picker>-->
          <!--</mt-popup>-->
        <!--</div>-->
        <!--</li>-->
        <li class="clearfix">
          <span>详细地址</span>
          <!--<textarea rows="3" cols="20" placeholder="请输入详细地址信息，如道路、门牌号小区、楼栋号、单元室等"></textarea>-->
          <mt-field label="" placeholder="请输入详细地址信息，如道路、门牌号小区、楼栋号、单元室等" type="textarea" rows="2" cols="20" v-model="streetString"></mt-field>
        </li>
        <li class="clearfix">
          <span class="span-length">设置为默认收货地址</span>
          <i v-if="take == 'Y'" class="i-on" @click="chicks($event)"></i>
          <i v-else @click="chicks($event)"></i>
        </li>
        <li class="clearfix">
          <span class="span-length">设置为默认上门地址</span>
          <i v-if="visit == 'Y'" class="i-on" @click="chickVisit($event)"></i>
          <i v-else @click="chickVisit($event)"></i>
        </li>
      </ul>
    </div>
    <div class="storage-btn">
      <a href="javascript:;" @click="submit" title="保存">保存</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import data from '../../../static/json/address.json'
  import VHeader from 'components/v-header/v-header'
  import { insertAddress, updateAddress } from 'api/order'
  import { Toast } from 'mint-ui'

  var index = 0
  var index2 = 0
  var index3 = 0
  // 初始化省
  let province = Object.keys(data)
  // 初始化市
  let _y = Object.values(data)
  let _m = _y.map(res => {
    return Object.keys(res)
  })
  let city = _m[index]
  // 初始化区
  let _c = Object.values(data)
  _c = _c.map(res => {
    return Object.values(res)
  })
  let __d = Object.values(_c[index])
  let area = Object.keys(__d[index])
  // 初始化街
  let __a = Object.values(__d[0])
  let street = __a[0]

  export default {
    data() {
      return {
        name: '',
        phone: '',
        visit: 'N',
        take: 'N',
        areaVisible: false,
        streetVisible: false,
        areaString: '请选择',
        streetString: '',
        item: '',
        temp: {
          id: '',
          no: '',
          openId: '123456',
          name: '',
          phone: '',
          areaString: '',
          streetString: '',
          isVisit: 'N',
          isTake: 'N'
        },
        slots: [{
          flex: 1,
          values: province,
          className: 'slot1',
          textAlign: 'left'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: city,
          className: 'slot3',
          textAlign: 'left'
        }, {
          divider: true,
          content: '-',
          className: 'slot4'
        }, {
          flex: 1,
          values: area,
          className: 'slot5',
          textAlign: 'left'
        }],
        slotstree: [{
          flex: 1,
          values: street,
          className: 'slot1',
          textAlign: 'center'
        }],
        rule: {
          name: [{ required: true, message: '姓名不能为空', trigger: 'change' }],
          phone: [{ required: true, message: '电话号码不能为空', trigger: 'change' }]
        }
      }
    },
    created() {
      this.item = this.$route.query.item
      if(this.item !== undefined){
        this.name = this.item.name
        this.phone = this.item.phone
        this.areaString = this.item.areaString
        this.streetString = this.item.streetString
        this.visit = this.item.isVisit
        this.take = this.item.isTake
        this.temp.isTake = this.item.isTake
        this.temp.isVisit = this.item.isVisit
      }
    },
    methods: {
      handlerArea() {
        this.areaVisible = true
      },
      handlerStreet() {
        if (this.slotstree[0].values.length === 0) {
          this.streetString = '无可选街道'
          return
        }
        this.streetVisible = true
      },
      onValuesChange(picker, values) {
        if(!this.areaVisible) return
        index = province.indexOf(values[0])
        index2 = _m[index].indexOf(values[1])
        if (index >= 0) {
          picker.setSlotValues(1, _m[index])
        }
        if (index >= 0 && index2 >= 0) {
          let __d = Object.values(_c[index])
          let area = Object.keys(__d[index2])
          index3 = area.indexOf(values[2])
          picker.setSlotValues(2, area)
          this.areaString = values.join(',')
          if (index3 >= 0) {
            let __a = Object.values(__d[index2])
            let street = __a[index3]
            this.slotstree[0].values = street
          } else {
            this.$set(this.slotstree[0].values, [])
            // this.streetString = '无可选街道'
          }
        }
      },
      onStreeChange(picker, values) {
        this.streetString = values.join(',')
      },
      chicks(ent){
        if(ent.path[0].className == 'i-on'){
          ent.path[0].classList.remove("i-on")
          this.temp.isTake = 'N'
        }else{
          ent.toElement.classList.add("i-on")
          this.temp.isTake = 'Y'
        }
      },
      chickVisit(ent) {
        if(ent.path[0].className == 'i-on'){
          ent.path[0].classList.remove("i-on")
          this.temp.isVisit = 'N'
        }else{
          ent.toElement.classList.add("i-on")
          this.temp.isVisit = 'Y'
        }
      },
      submit() {
        this.temp.name = this.name
        this.temp.phone = this.phone
        this.temp.areaString = this.areaString
        this.temp.streetString = this.streetString
        var tar = this
        if(this.item !== undefined){
          this.temp.id = this.item.id
          this.temp.no = this.item.no
          debugger
          updateAddress(this.temp).then(response => {
            if (response.code === 200) {
              Toast({
                message: '更新成功！',
                position: 'bottom',
                duration: 5000
              });
              setTimeout(function (){
                tar.$router.back(-1)
              }, 1000);

            }
          }).catch(() => {
          })
        }else{
          insertAddress(this.temp).then(response => {
            if (response.code === 200) {
              Toast({
                message: '添加成功！',
                position: 'bottom',
                duration: 5000
              });
              setTimeout(function (){
                tar.$router.back(-1)
              }, 1000);

            }
          }).catch(() => {
          })
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
  @import "addressEdit.styl";
</style>
