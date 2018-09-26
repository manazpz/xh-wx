<template>
  <div class="popup" ref="popup">
    <mt-popup
      style="width: 100%;height: 50%"
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom">
          <div class="phone-name-box">
            <dl>
              <dt><img :src="url"></dt>
              <dd>
                <strong><i>￥</i>{{price}}</strong>
                <span>{{info.name}}</span>
                <b class="close-btn" @click="close"></b>
              </dd>
            </dl>
          </div>
          <div style="overflow:scroll;height: 65%">
            <mt-radio
              :ref="'radio'+index"
              :title="item.name"
              v-model="checks[index]"
              v-for="(item,index) in checksData" style="overflow:auto;zoom:1;"
              @change="checkRadio($event,index)"
              @click.native="onRadio($event,index)"
              :options="item.spec">
            </mt-radio>
          </div>
          <mt-button class="confirm-btn" @click="sure">确定</mt-button>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    model: {
      prop: 'info',
      event: 'info'
    },
    //接收从父组件传来的标题值
    props: {
      info: ''
    },
    data() {
      return {
        curIndex: 0,
        popupVisible: false,
        url: this.info.imgs.length > 0 ? this.info.imgs[0].url:[],
        spec: this.info.specParameter.length > 0 ? this.info.specParameter[0]:{},
        checks: [],
        checksData: [],
        flag: false,
        price: 0,
        specText: ''
      }
    },
    created() {
    },
    methods: {
      sure() {
        this.$emit('submit-update', {price:this.price,specText:this.specText,checks:this.checks});
        this.close()
      },
      open() {
        this.url = this.info.imgs.length > 0 ? this.info.imgs[0].url:[],
        this.spec = this.info.specParameter.length > 0 ? this.info.specParameter[0]:{}
        this.popupVisible = true
        if(!this.flag) {
          this.flag = true
          this.price = this.spec.price
          this.formatData(this.info.specParameter)
        }
      },
      chick(val){
        let ure = this
        ure.checks = []
        JSON.parse(val)[0].spec.forEach((value, index) => {
          ure.checks.push(value.spec_sort)
        })
        this.$nextTick(function(){
          ure.checks.forEach((value, index) => {
            var cell = ure.$refs['radio'+index][0].$el.getElementsByClassName('mint-cell')
            for(var i =0; i< cell.length; i++){
              cell[i].style.background=""
            }
          })
          this.checksData.forEach((value, index) => {
            ure.checksData[index].spec.forEach((value1, index1) => {
              if(value1.value === ure.checks[index]){
                var cell = ure.$refs['radio'+index][0].$el.getElementsByClassName('mint-cell')
                cell[index1].style.background="#28c081"
              }
            })
          })

        })
      },
      close() {
        this.popupVisible = false
      },
      checkRadio: function(value,index){
        var str = ''
        this.checks[index] = value
        for (var i = 0; i < this.checks.length; i++) {
          str += this.checks[i]
        }
        for (var i = 0; i < this.info.specParameter.length; i++) {
          var spec = this.info.specParameter[i].spec
          var str1 = ''
          this.specText = ' '
          for (var j = 0; j < spec.length; j++) {
            str1 += spec[j].spec_sort
            this.specText += spec[j].spec_value_name + ' '
          }
          if(str === str1) {
            this.price = this.info.specParameter[i].price
          }
        }
      },
      onRadio(item,index) {
        if (item.path[4].className === 'mint-cell') {
          var cell = this.$refs['radio'+index][0].$el.getElementsByClassName('mint-cell')
          for (var i = 0; i < cell.length; i++) {
            cell[i].style.background = ''
          }
          item.path[4].style.background="#28c081"
        }
      },
      formatData(data) {
        var params = []
        //合并数据
        data.forEach(function (value1, index) {
          if (index === 0) {
            value1.spec.forEach(function (value2, index) {
              var map = {'id':value2.id,'name':value2.name,'px':value2.px,'spec':[{value:value2.spec_sort,label:value2.spec_value_name}]}
              params.push(map)
            })
          }else {
            value1.spec.forEach(function (value2, index) {
              params.forEach(function (value3, index) {
                if(value2.id === value3.id) {
                  var map = {value:value2.spec_sort,label:value2.spec_value_name}
                  value3.spec.push(map)
                }
              })
            })
          }
        })
        //去重
        params.forEach(function (value, index) {
          var hash = {}
          value.spec = value.spec.reduce(function(item, next) {
            hash[next.value] ? '' : (hash[next.label] ? '' : hash[next.label] = true && item.push(next))
            return item
          }, [])
        })
        this.checksData = params
        this.$nextTick(function(){
          if(this.checks.length <1) {
            this.checksData.forEach((value, index) => {
              this.checks[index] = value.spec[0].value
              var cell = this.$refs['radio'+index][0].$el.getElementsByClassName('mint-cell')
              cell[0].style.background="#28c081"
            })
          }
        })
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "popup.styl";
</style>
