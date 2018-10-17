<template>
  <div class="orderSure" ref="orderSure">
    <v-header title="回收方式"></v-header>
    <div class="recovery-box">
      <ul>
        <li v-for="(item,index) in list">
          <dl>
            <dt>
              <i @click="chicks(item,index,$event)" :ref="'i'+item.id"></i>
              <span>{{item.types}}</span>
            </dt>
            <dd>
              <i @click="chickPrete(item,index,$event)" :ref="'ii'+item.id"></i>
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
        openId: '',
        listQuery: {
          openId: ''
        },
        temp: {
          openId: '',
          prete: ''
        },
      }
    },
    created() {
      this.openId = window.localStorage.getItem("openId")
      this.getList()
    },
    methods: {
      getList() {
        this.listQuery.openId = listQuery
        recoveryList(this.listQuery).then(response => {
          if (response.code === 200) {
            this.list = response.data.items
            this.check = response.data.check
            if ( response.data.check.length > 0 ){
              this.temp.prete = this.check[0].recoveryId
            }
            this.$nextTick(function () {
              if(this.check.length>0) {
                this.list.forEach(obj=>{
                    if(obj.id === this.check[0].recoveryId) {
                      this.$refs['i'+obj.id][0].classList.add("dt-hook")
                      this.$refs['ii'+obj.id][0].classList.add("dd-hook")
                    }
                })
              }else {
                if(this.list.length > 0) {
                    this.$refs['i'+this.list[0].id][0].classList.add("dt-hook")
                    this.$refs['ii'+this.list[0].id][0].classList.add("dd-hook")
                }
              }
            })
          }
        }).catch(() => {
        })
      },
      chicks(item,index,ent){
        $('.recovery-box li dt i').removeClass('dt-hook');
        $('.recovery-box li dd i').removeClass('dd-hook');
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
        this.temp.openId = this.openId
        insertRecoveryUser(this.temp).then(response => {
          if (response.code === 200) {
            Toast({
              message: '提交成功！',
              position: 'bottom',
              duration: 5000
            });
            setTimeout(() => {
              this.$router.back(-1)
            }, 1000)

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
