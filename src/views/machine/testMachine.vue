<template>
  <div class="testMachine" ref="testMachine">
    <v-header title="验机报告"></v-header>
    <mt-range
      v-model="rangeValue"
      :min="0"
      :max="maxp-1"
      :bar-height="15">
      <div slot="end">{{rangeValue+'/'+maxp}}</div>
    </mt-range>

    <div class="appraisal-main1">
      <ul class="appraisal-ul">
        <li class="li">
          <div>
            <span class="phonesname">{{phonename}}</span>
          </div>
        </li>
        <li class="li" v-for="(item,index) in appraisalList"   :key='item.id'>
          <div @click="showFlag(index)">
            <!--<i v-if="!(item.tipsType === '01')" @click="chickProblem(item)"></i>-->
            <span class="problem-xh">{{item.name}}</span>
            <strong><a v-for="p in text[index]">{{p}}</a></strong>
          </div>
          <ul :class="{'show': index === flag }">
            <li v-for="(items,index) in item.parameter" class=""  @click="selectClass(item,items,$event)" :data="index">{{items.spec_value_name}}</li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="offer-btn-box1">
      <a class="" href="javascript:;" @click="confirm()" title="提交报告">提交报告</a>
    </div>

    <div class="appraisal-process-problem-wrap1" title="问号弹窗">
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
  import { yanji } from 'api/yanji'
  export default {
    data() {
      return {
        temp: {
          id:this.$route.query.id,
          no: this.$route.query.no,
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
      this.getList()
    },
    methods: {
      getList() {
        yanji(this.temp).then(response => {
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
      selectClass(item,val,ent) {
        //判断是否多选
        if (item.obligate != '02') {
          //当前进度
          if (this.flag < this.appraisalList.length-1)
            this.flag++
          //获取控件
          var li = ent.path[1].getElementsByTagName('li')
          //清空选择项
          for(var i=0;i<li.length;i++) {
            if(ent.path[1].getElementsByTagName('li')[i].className == 'select')
              ent.path[1].getElementsByTagName('li')[i].classList.remove("select")
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
            this.temp.parameter.push('{"id": "'+item.id+'","obligate": "'+item.obligate+'","spec": ['+JSON.stringify(val)+']}')
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
        if(this.rangeValue == this.maxp) {
          $('.offer-btn-box a').addClass('open');
        }
      },
      confirm() {
        // let cur = this
        // this.temp.parameter = JSON.parse('['+this.temp.parameter+']')
        // insertReplacementCar(this.temp).then(response => {
        //   if (response.code === 200) {
        //     cur.$router.push('quote')
        //     this.flag = 0
        //   }
        // }).catch(() => {
        // })
      },
      chickProblem(val){
        $('.appraisal-process-problem-wrap1').fadeIn();
        $('.problem-box').addClass('p-top-ani').find('h1').html(val.name).siblings('p').html(val.tipsText);
        $('.appraisal-process-problem-wrap1').on('click','.problem-close',function () {
          $('.appraisal-process-problem-wrap1').fadeOut();
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
  @import "testMachine.styl";
</style>
