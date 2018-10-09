<template>
  <div class="manaAddress" ref="manaAddress">
    <v-header title="管理收货地址"></v-header>
    <div class="management-address">
      <ul>
        <li v-for="(item,index) in list" class="li-des-1" dataNum="1">
          <div class="div-des" title="已经收货地址时">
            <p>
              <span>{{item.name}}</span>
              <strong>{{item.phone}}</strong>
            </p>
            <p>
              <span>{{item.areaString}}{{item.streetString}}</span>
            </p>
          </div>
          <div class="default-set-box">
            <i @click="chicks($event)"></i>
            <p>设为默认收货地址</p>
            <div class="set">
              <span><a href="javascript:;" @click="editAdress(item,index)">编辑</a></span>
              <strong class="set-delete" @click="delAdress(item,index)">删除</strong>
            </div>
          </div>
          <div class="default-set-box">
            <i @click="chickVisit($event)"></i>
            <p>设为默认上门地址</p>
          </div>
        </li>
      </ul>
      <div class="add-new-address">
        <!--<a href="javascript:;" title="添加新地址">添加新地址</a>-->
        <router-link  :to="{path:'/addressEdit',query:{}}">添加新地址
        </router-link>
      </div>
    </div>
    <div class="delete-wrap">
      <div class="delete-box">

      </div>
    </div>
    <div class="popup-choice-wrap" title="是否删除弹窗">
      <div class="choice-box">
        <p>确定要删除此收货地址吗？</p>
        <div>
          <a class="cancel-btn ui-link" href="javascript:;" title="取消">取消</a>
          <a class="confirm-btn ui-link" href="javascript:;" title="确定" datanum="">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryAddress, deleteAddress } from 'api/order'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        list: null
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        queryAddress({openId:'123456'}).then(response => {
          if (response.code === 200) {
            this.list = response.data.items
          }
        }).catch(() => {
        })
      },
      editAdress(item,index) {
        this.$router.push({path:'/addressEdit',query:{item:item}})
      },
      delAdress(item,index) {
        $('.popup-choice-wrap').fadeIn();
        $('.popup-choice-wrap .cancel-btn').click(function() {
          $('.popup-choice-wrap').fadeOut();
        });
        var tar = this
        $('.popup-choice-wrap .confirm-btn').click(function() {
          deleteAddress({id:item.id,no:item.no}).then(response => {
            if (response.code === 200) {
              $('.popup-choice-wrap').fadeOut();
              Toast({
                message: '删除成功！',
                position: 'bottom',
                duration: 5000
              });
              setTimeout(function (){
                tar.getList()
              }, 1000);
            }
          }).catch(() => {
          })
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
  @import "manaAddress.styl";
</style>
