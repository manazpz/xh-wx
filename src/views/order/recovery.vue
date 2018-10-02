<template>
  <div class="orderSure" ref="orderSure">
    <v-header title="回收方式"></v-header>
    <div class="recovery-box">
      <ul>
        <li v-for="(item,index) in list">
          <dl>
            <dt>
              <i @click="chicks(item,index,$event)"></i>
              <span>{{item.types}}</span>
            </dt>
            <dd>
              <i @click="chickPrete(item,index,$event)"></i>
              <span>设为默认上门方式</span>
            </dd>
          </dl>
        </li>
      </ul>
      <div class="confirm-box">
        <a href="javascript:;" @click="confirm" title="确认">确认</a>
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import { recoveryList, insertRecoveryUser } from 'api/goods'
  import VHeader from 'components/v-header/v-header'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        list: [],
        check: [],
        listQuery: {
          openId: '123456'
        },
        temp: {
          openId: '123456',
          prete: ''
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        recoveryList(this.listQuery).then(response => {
          if (response.code === 200) {
            this.list = response.data.items
            this.check = response.data.check
            // if(response.data.check !== undefined ){
            //
            // }
          }
        }).catch(() => {
        })
      },
      chicks(item,index,ent){
        $('.recovery-box li dt i').removeClass('dt-hook');
        if(ent.path[1].getElementsByTagName('i')[0].className == 'dt-hook'){
          ent.path[1].getElementsByTagName('i')[0].classList.remove("dt-hook")
        }else{
          ent.toElement.classList.add("dt-hook")
        }
      },
      chickPrete(item,index,ent){
        $('.recovery-box li dd i').removeClass('dd-hook');
        if(ent.path[1].getElementsByTagName('i')[0].className == 'dd-hook'){
          ent.path[1].getElementsByTagName('i')[0].classList.remove("dd-hook")
        }else{
          ent.toElement.classList.add("dd-hook")
          this.temp.prete = item.id
        }
      },
      confirm(){
        insertRecoveryUser(this.temp).then(response => {
          if (response.code === 200) {
            Toast({
              message: '提交成功！',
              position: 'bottom',
              duration: 5000
            });
            this.$router.back(-1)
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
  @import "recovery.styl";
</style>
