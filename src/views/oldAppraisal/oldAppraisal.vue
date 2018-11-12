<template>
  <div class="oldAppraisal" ref="oldAppraisal">
    <v-header title="旧机估计"></v-header>
    <mt-range
      v-model="rangeValue"
      :min="0"
      :max="maxp-1"
      :disabled="true"
      :bar-height="15">
      <div slot="end">{{rangeValue+'/'+maxp}}</div>
    </mt-range>

      <div class="appraisal-main">
        <ul class="appraisal-ul">
          <li class="li">
            <div>
              <span class="phonesname">{{phonename}}</span>
            </div>
          </li>
          <li class="li" v-for="(item,index) in appraisalList"   :key='item.id'>
            <div @click="showFlag(index)">
              <span class="problem-xh">{{item.name}}<i v-if="!(item.tipsType === '01')" @click="chickProblem(item)"></i></span>
              <strong><a v-for="p in text[index]">{{p}}</a></strong>
            </div>
            <ul :class="{'show': index === flag }">
              <li v-for="(items,index1) in item.parameter" class=""  @click="selectClass(item,items,index,$event)" :data="index">{{items.spec_value_name}}</li>
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
          openId: '',
          goodsId:this.$route.query.id,
          banPrice: this.$route.query.price,
          model: '02',
          parameter: []
        },
        flag: 0,
        appraisalList: [],
        text: [],
        phonename:this.$route.query.name,
        rangeValue: 0,
        maxp:0
      }
    },
    created() {
      this.temp.openId = window.localStorage.getItem("openId")
      this.getList()
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
      showFlag(index){
        this.flag = index
      },
      selectClass(item,val,index,ent) {
        if(index > this.text.length) {
          return
        }
        //判断是否多选
        if (item.obligate != '02') {
          //当前进度
          if (this.flag < this.appraisalList.length-1)
            this.flag++
          //获取控件
          var li = ent.target.parentNode.children
          //清空选择项
          for(var i=0;i<li.length;i++) {
            if(ent.target.parentNode.children[i].className == 'select')
              ent.target.parentNode.children[i].classList.remove("select")
          }
          //添加当前选择项
          ent.toElement.classList.add("select")
        }else {
          if (this.flag < this.appraisalList.length-1)
            this.flag++
          //调整选择项
          if(ent.toElement.className == 'select'){
            ent.toElement.classList.remove("select")
          }else {
            ent.toElement.classList.add("select")
          }
        }
        //选择数据存储
        if(this.temp.parameter.length == 0){
          this.temp.parameter.push('{"id": "'+item.id+'","obligate": "'+item.obligate+'","spec": ['+JSON.stringify(val)+']}')
        }else{
          //判断是否多选
          if (item.obligate === '02') {
            //定义已有数据下标
            var xxx = -1
            this.temp.parameter.forEach((value,index) => {
              if(value.indexOf(item.id) > -1) {
                xxx = index
                return
              }
            })
            //判断选择项的选中与不选中
            if(xxx != -1) {
              //删除已选中的数据
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
              //添加已选择的数据
              this.temp.parameter.push('{"id": "'+item.id+'","obligate": "'+item.obligate+'","spec": ['+JSON.stringify(val)+']}')
            }
          }else {
            //单选添加
            if(this.temp.parameter[index]){
              this.temp.parameter[index] = '{"id": "'+item.id+'","obligate": "'+item.obligate+'","spec": ['+JSON.stringify(val)+']}'
            }else {
              this.temp.parameter.push('{"id": "'+item.id+'","obligate": "'+item.obligate+'","spec": ['+JSON.stringify(val)+']}')
            }
          }
        }
        //回显
        this.text = []
        this.temp.parameter.forEach(val => {
          var txt = ''
          JSON.parse(val).spec.forEach(val1 => {
            if(txt == ''){
              txt += val1.spec_value_name
            }else{
              txt += ';' + val1.spec_value_name
            }
          })
          this.text.push(txt)
        })
        if(this.rangeValue < this.maxp) {
          //进度条，可用flag
          this.rangeValue++
        }
        if(this.rangeValue >= 5) {
          $('.offer-btn-box a').addClass('open');
        }
      },
      confirm() {
        let cur = this
        this.temp.parameter = JSON.parse('['+this.temp.parameter+']')
        insertReplacementCar(this.temp).then(response => {
          if (response.code === 200) {
            cur.$router.push('quote')
            this.flag = 0
          }
        }).catch(() => {
        })
      },
      chickProblem(val){
        $('.appraisal-process-problem-wrap').fadeIn();
        $('.problem-box').addClass('p-top-ani').find('h1').html(val.name).siblings('p').html(val.tipsText);
        $('.appraisal-process-problem-wrap').on('click','.problem-close',function () {
          $('.appraisal-process-problem-wrap').fadeOut();
          $('.problem-box').removeClass('p-top-ani');
        });
      }
    },
    //注册组件
    components: {
      VHeader
    }

  }

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "oldAppraisal.styl";
</style>
