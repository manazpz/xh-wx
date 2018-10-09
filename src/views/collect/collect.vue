<template>
  <div class="collect" ref="collect">
    <v-header title="收藏"></v-header>
    <div v-if="collects.length >0">
      <div class="equipment-list">
        <div class="detailed-list old-machine-list" >
          <div class="model-list-box">
            <div class="model-big-box" v-for="(item,index) in collects">
              <div class="model-box" >
                <div class="left-b-box">
                  <i class="sign-i" :ref="'i'+index" @click="check($event,item.collectId)"></i>
                  <div @click="jumpDetail(item.id)" style="height: 5.5rem;">
                    <div class="pic-left">
                      <img :src="item.imgs.length>0?item.imgs[0].url:''" >
                    </div>
                    <div class="inf-right">
                      <h4>{{item.name}}</h4>
                      <p @click="oldSpec(item)">
                        <span>{{item.bllParameterStr}}</span>
                      </p>
                      <div class="inf-r-price">
                        <strong><b>￥</b><em>{{item.bllPrice}}</em></strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-appraisal1">
        <div>
          <i class="sign-i" @click="allCheck($event)"></i>
          <p>全选</p>
        </div>
        <mt-button plain class="del" type="danger" @click="del">删除</mt-button>
      </div>
    </div>
    <div v-else>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { collectList,deleteCollect } from 'api/collect'
  import Popup from 'components/popup/popup'
  import { Toast } from 'mint-ui'
  import { MessageBox } from 'mint-ui';

  export default {
    data() {
      return {
        openId: '123456',
        collects: [],
        checks: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        collectList({openId:this.openId}).then(response => {
          if (response.code === 200) {
            this.collects = response.data.items
          }
        }).catch(() => {
        })
      },
      check(evn,id) {
        if(this.checks.indexOf(id) > -1) {
          this.checks.splice(this.checks.indexOf(id),1)
          evn.toElement.className = "sign-i"
        }else {
            this.checks.push(id)
            evn.toElement.className = "sign-on"
        }
      },
      allCheck(evn) {
        if (evn.toElement.className === 'sign-i') {
          this.checks = []
          evn.toElement.className = "sign-on"
          this.collects.forEach((obj,index) => {
            this.checks.push(obj.collectId)
            this.$refs['i'+index][0].className = "sign-on"
          })
        }else {
          evn.toElement.className = "sign-i"
          this.collects.forEach((obj,index) => {
            this.$refs['i'+index][0].className = "sign-i"
          })
          this.checks = []
        }
      },
      jumpDetail(id) {
        this.$router.push({path: '/goods/detail', query: {id:id}})
      },
      del() {
        if(this.checks.length > 0) {
          MessageBox.confirm('是否取消收藏?').then(action => {
            deleteCollect({ids:this.checks}).then(response => {
              if (response.code === 200) {
                Toast('操作成功！')
                this.getList()
              }
            }).catch(() => {
            })
          });
        }


      }
    },
    //注册组件
    components: {
      VHeader,
      Popup
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "collect.styl";
</style>
