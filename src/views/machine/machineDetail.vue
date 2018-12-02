<template>
  <div class="machineDetail" ref="machineDetail">
    <v-header title="报告详情"></v-header>
    <div class="div1">
      <div class="div2" v-for="item in data">
        <span>{{item.name}}</span>
        <mt-swipe v-if="!!item.imgs" class="swipe" :stopPropagation="true" :auto="5000" style="height: 200px;">
          <mt-swipe-item v-for="item1 in item.imgs">
            <img :src="item1.url" style="height: 100%;width: 100%;">
          </mt-swipe-item>
        </mt-swipe>
        <div class="div3">
          <span><a v-for="item2 in item.spec">{{item2.spec_value_name}} </a></span>
        </div>
        <div class="div4">
          <span>{{item.msg}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { amslerList } from 'api/yanji'

  export default {
    data() {
      return {
        data: [{imgs:[]}]
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        amslerList({ id: this.$route.query.id}).then(response => {
          if (response.code === 200) {
            this.data = JSON.parse(response.data.items[0].parameter)
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
  @import "machineDetail.styl";
</style>
