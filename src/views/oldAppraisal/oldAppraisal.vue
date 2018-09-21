<template>
  <div class="oldAppraisal" ref="oldAppraisal">
    <v-header title="旧机估计"></v-header>

      <div class="top-return">
        <a href="javascript:history.back(-1)" title="返回上一页"></a>
      </div>

      <div class="progress-bar">
        <span class="line schedule-0"></span>
      </div>
      <div class="appraisal-main" v-model="phonename">
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
              <li v-for="items in item.parameter">{{items.spec_value_name}}</li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="offer-btn-box">
        <a class="" href="javascript:;" title="查看报价">查看报价</a>
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
  import { getGoodsAppList } from 'api/goods'
  export default {
    data() {
      return {
        temp: {
          id: undefined,
          name: ''
        },
        flag: 0,
        appraisalList: [],
        phonename:''
      }
    },
    created() {
      this.getList()
      this.phonename = this.$route.query.item.name
    },
    methods: {
      getList() {
        getGoodsAppList(this.$route.query.item.id).then(response => {
          if (response.code === 200) {
            this.appraisalList = response.data.items
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
  @import "oldAppraisal.styl";
</style>
