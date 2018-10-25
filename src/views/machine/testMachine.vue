<template>
  <div class="testMachine" ref="testMachine">
    <v-header title="验机报告"></v-header>
    <mt-range
      v-model="rangeValue"
      :min="0"
      :max="maxp-1"
      :disabled="true"
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
        <li class="li" v-for="(item,index) in appraisalList"  :key='item.id'>
          <div @click="showFlag(index)">
            <!--<i v-if="!(item.tipsType === '01')" @click="chickProblem(item)"></i>-->
            <span class="problem-xh">{{item.name}}
              <b class="state-01" v-if="yj[index] == '一致'">{{yj[index]}}</b>
              <b class="state-02" v-if="yj[index] == '不一致'">{{yj[index]}}</b>
            </span>
            <strong><a v-for="p in text[index]">{{p}}</a></strong>
          </div>
          <ul :class="{'show': index === flag }">
            <li v-for="(items,index1) in item.parameter" class=""  @click="selectClass(item,items,index,$event)" :data="index">{{items.spec_value_name}}</li>
          </ul>
        </li>
        <div class="yjBtn">
          <span>结论：<a v-if="btnFlag">{{jyPrice}}{{ygStr}}</a></span>
          <mt-button type="danger" size="small" plain @click="onYanJi">查看验机结果</mt-button>
        </div>
        <div class="upload">
          <!--<a href="javascript:;" class="a-upload">-->
            <!--<input type="file" name="file" id="file" multiple @change="uploadFile">上传文件-->
          <!--</a>-->
          <mt-button type="default" plain @click="openUploadPop">上传文件</mt-button>
          <ul>
            <li v-for="(itemsf,indexf) in files" class="fileClass" >{{itemsf.name}}<a @click="delFiles(itemsf,indexf)">x</a></li>
          </ul>
        </div>
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

    <mt-popup v-model="popupVisible" class="zPopup">
      <mt-cell>
        <mt-radio
          title="附件归属"
          v-model="popupTemp.guishu"
          :options="checksData">
        </mt-radio>
      </mt-cell>
      <mt-cell class ="ms">
        <p>附件描述</p>
      </mt-cell>
      <mt-cell>
        <textarea rows="3" cols="35" v-model="popupTemp.msg">
        </textarea>
      </mt-cell>
      <mt-cell class ="ms">
        <a href="javascript:;" class="a-upload">
          <input type="file" ref="files" multiple @change="uploadFile">选择文件
        </a>
        <a>文件数：{{popFiles.length}}</a>
      </mt-cell>
      <mt-cell>
        <mt-button type="primary" plain @click="sure">确定</mt-button>
      </mt-cell>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { yanji,pushYanJi } from 'api/yanji'
  import { uploadFiles,deleteResources } from 'api/resource'
  import { calculatingPrice } from '../../utils/common'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        temp: {
          id:this.$route.query.id,
          no: this.$route.query.no,
          parameter: []
        },
        openId: '',
        flag: 0,
        btnFlag:false,
        appraisalList: [],
        bllParameter: '',
        ygPrice: 0,
        ygStr: '',
        jyPrice: 0,
        text: [],
        yj: [],
        files:[],
        popFiles:[],
        phonename:this.$route.query.name,
        banPrice:this.$route.query.banPrice,
        rangeValue: 0,
        maxp:0,
        popupVisible:false,
        checksData: [],
        popupTemp:{
          guishu: '',
          msg: ''
        }
      }
    },
    created() {
      this.openId = window.localStorage.getItem("openId")
      this.getList()
    },
    methods: {
      getList() {
        yanji(this.temp).then(response => {
          if (response.code === 200) {
            this.appraisalList = response.data.items
            this.bllParameter = response.data.bllParameter
            this.maxp = response.data.items.length
            this.maxp = response.data.items.length
            this.appraisalList.forEach(obj => {
              this.checksData.push({value:obj.id,label:obj.name})
            })
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
          this.temp.parameter.push('{"id": "'+item.id+'","obligate": "'+item.obligate+'","name": "'+item.name+'","spec": ['+JSON.stringify(val)+']}')
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
              this.temp.parameter.push('{"id": "'+item.id+'","obligate": "'+item.obligate+'","name": "'+item.name+'","spec": ['+JSON.stringify(val)+']}')
            }
          }else {
            //单选添加
            if(this.temp.parameter[index]){
              this.temp.parameter[index] = '{"id": "'+item.id+'","obligate": "'+item.obligate+'","name": "'+item.name+'","spec": ['+JSON.stringify(val)+']}'
            }else {
              this.temp.parameter.push('{"id": "'+item.id+'","obligate": "'+item.obligate+'","name": "'+item.name+'","spec": ['+JSON.stringify(val)+']}')
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
        if(this.rangeValue == this.maxp) {
          $('.offer-btn-box a').addClass('open');
        }
      },
      onYanJi() {
        if(this.rangeValue == this.maxp) {
          this.yj = []
          var ff = true
          this.btnFlag = true
          var yg = this.bllParameter?JSON.parse(this.bllParameter):[]
          var jy = this.temp.parameter?JSON.parse('['+this.temp.parameter+']'):[]
          if(this.bllParameter) {
            this.ygPrice = calculatingPrice(yg,this.banPrice)
          }
          if(this.temp.parameter) {
            this.jyPrice = calculatingPrice(jy,this.banPrice)
          }
          for(var i = 0; i < yg.length; i++) {
            var flag = true
            var specs = yg[i].spec;
            if(jy[i].spec.length == specs.length) {
              for(var j = 0; j < specs.length; j++) {
                var t1 = specs[j].spec_sort;
                if (jy[i].spec[j] == undefined) {
                  flag = false
                  break
                }else {
                  var t2 = jy[i].spec[j].spec_sort;
                  if(t1 != t2) {
                    flag = false
                    break
                  }
                }
              }
            }else {
              flag = false
            }
            if(flag) {
              this.yj.push("一致")
            }else {
              this.yj.push("不一致")
              ff = false
            }
          }
          if(ff){
            this.ygStr = '(一致)'
          }else {
            this.ygStr = '(不一致,预估' + this.ygPrice + ')'
          }
          this.flag = -1
        }
      },
      confirm() {
        var res = {
          openid: this.openId,
          no:this.temp.no,
          orderNumber:this.temp.id,
          parameter: JSON.stringify(this.temp.parameter),
          bllPrice: this.jyPrice
        }
        pushYanJi(res).then(response => {
          if (response.code === 200) {
            Toast({
              message: "上传成功",
              iconClass: 'mintui mintui-success'
            });
            // window.location.href = window.location.href.split('/#/')[0]
          }
        }).catch(() => {
        })
      },
      openUploadPop() {
        if(this.temp.parameter.length > 0) {
          this.popupTemp = {
            guishu: '',
            msg: ''
          }
          this.popupVisible = true
        }else {
          Toast({
            message: '请先验机！',
            duration: 3000
          });
        }

      },
      uploadFile(doc){
        // this.popFiles = []
        for(var i=0;i<doc.currentTarget.files.length;i++) {
          this.popFiles.push(doc.currentTarget.files[i]);
        }
      },
      sure() {
        uploadFiles({fileList:this.popFiles,path:'yanji'}).then(response => {
          if(response.code == '200') {
            var xxx
            if(this.temp.parameter[0].id){
              xxx = this.temp.parameter
            }else {
              xxx = JSON.parse('['+this.temp.parameter+']')
            }

            xxx.forEach(obj => {
              if(obj.id == this.popupTemp.guishu) {
                obj.imgs = response.data.files
                obj.msg = this.popupTemp.msg
              }
            })
            for(var i=0;i< response.data.files.length;i++) {
              this.files.push(response.data.files[i])
            }
            this.temp.parameter = xxx
            this.popupVisible = false
            this.$refs.files.value = ''
            this.popFiles = []
          }

        }).catch(() => {

        })
      },
      delFiles(obj,index) {
        deleteResources({path:'yanji',id:obj.id,extend:obj.extend}).then(response => {
          if(response.code == '200') {
            Toast({
              message: '删除成功！',
              duration: 3000
            });
            this.files.splice(index,1)
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

<style lang="stylus" rel="stylesheet/stylus">
  @import "testMachine.styl";
</style>
