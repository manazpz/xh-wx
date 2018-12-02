<template>
  <div class="machine" ref="machine">
    <v-header title="验机报告"></v-header>
    <div class="machine-all">
      <div v-if="isData">
        <div class="machine-main">
          <div v-for="(item1,index1) in data" class="machine-tab-box machine-show" v-if="item1.oldOrder.item.length > 0 && item1.oldOrder.item[0].id != null">
            <div class="calculation-main">
              <div class="c-des-list">
                <ul v-for="(item2,index2) in item1.oldOrder.item">
                  <li @touchstart="gtouchstart(item2)" @touchmove="gtouchmove()" @touchend="gtouchend(item2)">
                    <div class="li-left-img">
                      <img :src="item2.imgs[0].url">
                    </div>
                    <div class="li-right-inf">
                      <div style="margin-bottom: 10px">
                        <span>{{item2.goodsName}}</span>
                        <div style="float: right">
                          <mt-badge v-if="item2.checkStatus === '02'" type="success">已验机</mt-badge>
                          <mt-badge v-else type="error">未验机</mt-badge>
                        </div>
                      </div>
                      <h5>{{item2.parameterStr}}</h5>
                      <h6>估价：<span>￥{{item2.guJia}}</span></h6>
                    </div>
                  </li>
                  <div class="line"></div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 100%;" v-else>
        <div class="machine-null">
          <img src="/static/image/shopping_trolley.png">
          <p>无验机订单！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryOrderList } from 'api/order'
  import { updateYanJi } from 'api/yanji'
  import { Toast } from 'mint-ui'
  import { MessageBox } from 'mint-ui';

  export default {
    data() {
      return {
        data: [],
        timeOutEvent:0,
        isData: false,
        query: {
          openId: '',
          orderStatusT: '!= "02"',
          checkDel: 'N'
        }
      }
    },
    created() {
      this.query.openId = window.localStorage.getItem("openId")
      this.getList();
    },
    methods: {
      getList() {
        queryOrderList(this.query).then(response => {
          if (response.code === 200) {
            this.data = response.data.items;
            this.isData = false
            this.data.forEach(obj=>{
              if(obj.oldOrder.item.length>0) {
                this.isData = true
                return
              }
            })
          }
        }).catch(() => {
        })
      },
      report(item) {
        if(item.checkStatus === '02') {
          this.$router.push({path: 'machineDetail', query: {id:item.oldcheck}})
        }else {
          Toast({
            message: '未验机，无验机报告',
            position: 'bottom',
            duration: 5000
          });
        }
      },
      longPress(item) {
        this.timeOutEvent = 0;
        if(item.checkStatus === '02') {
          MessageBox.confirm('是否删除'+item.goodsName+'验机报告?').then(action => {
            updateYanJi({id:item.oldcheck,del:'Y'}).then(response => {
              if (response.code === 200) {
                Toast('操作成功！')
                this.getList()
              }
            }).catch(() => {
            })
          }).catch(() => {
          });
        }else {
          Toast({
            message: '订单未结束，无法删除',
            position: 'bottom',
            duration: 5000
          });
        }
      },
      gtouchstart(item) {
        this.timeOutEvent = setTimeout(()=>{
          this.longPress(item)
        },500);
        return false;
      },
      gtouchend(item) {
        clearTimeout(this.timeOutEvent);
        if(this.timeOutEvent!=0){
          this.report(item)
        }
        return false
      },
      gtouchmove() {
        clearTimeout(this.timeOutEvent);//清除定时器
        this.timeOutEvent = 0;
      }
    },
    //注册组件
    components: {
      VHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "machineReport.styl";
</style>
