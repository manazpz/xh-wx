<template>
  <div class="quote" ref="quote">
    <v-header title="置换车"></v-header>
    <div class="top-return">
      <a href="javascript:history.back(-1)" title="返回上一页"></a>
    </div>
    <div class="equipment-list">
      <h3>旧机清单</h3>
      <div class="detailed-list old-machine-list" state="old">
        <div class="model-list-box">
          <div class="model-big-box model-big-0" dataNum="0" v-for="item in oldGoods">
                  <div class="model-box clearfix" >
                      <div class="left-b-box clearfix">
                          <i class="sign-i"></i>
                          <div class="pic-left">
                              <img :src="item.imgs.length>0?item.imgs[0].url:''" >
                          </div>
                          <div class="inf-right">
                              <h4>{{item.goodsName}} <span>已失效</span></h4>
                              <p class="p-inf">
                                  <a href="" target="_top">
                                      <span class="pXh">{{item.bllParameterStr}}</span>
                                  </a>
                              </p>
                              <div class="increase-change">
                                  <span class="reduce">-</span><i class="number">1</i><span class="add">+</span>
                              </div>
                              <div class="inf-r-price">
                                  <span>预计一周后再降￥30</span>
                                  <a href=""  target="_top">
                                      <strong><b>￥</b><em>{{item.bllPrice}}</em></strong>
                                  </a>
                              </div>
                          </div>
                      </div>
                      <div class="rigth-delete">删除</div>
                  </div>
              </div>
        </div>
        <div class="add-btn">
          <a href="javascript:;" title="+ 再添加">+ 再添加</a>
        </div>
      </div>
      <h3>新机清单</h3>
      <div class="detailed-list new-machine-list" state="new">
        <div class="model-list-box">
              <div class="model-big-box model-big-1" dataNum="1" v-for="item in newGoods">
                    <div class="model-box clearfix">
                        <div class="left-b-box clearfix">
                            <i class="sign-i"></i>
                            <div class="pic-left">
                                <img :src="item.imgs.length>0?item.imgs[0].url:''">
                            </div>
                            <div class="inf-right">
                                <h4>{{item.goodsName}}<span>已失效</span></h4>
                                <p class="p-inf">
                                    <a href="" target="_top">
                                        <span class="pXh">大陆全网通</span>
                                    </a>
                                </p>
                                <div class="increase-change">
                                    <span class="reduce">-</span><i class="number">1</i><span class="add">+</span>
                                </div>
                                <div class="inf-r-price">
                                    <span>预计一周后再降￥30</span>
                                    <a href=""  target="_top">
                                        <strong><b>￥</b><em>{{item.bllPrice}}</em></strong>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="rigth-delete">删除</div>
                    </div>
                </div>
            </div>
        <div class="add-btn">
          <a href="javascript:;" title="+ 再添加">+ 再添加</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryReplacementCar } from 'api/goods'
  export default {
    data() {
      return {
        openId: '123456',
        oldGoods: [],
        newGoods: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        queryReplacementCar(this.openId).then(response => {
          if (response.code === 200) {
            let cur = this

            response.data.oldGoods.forEach((value, index) => {
              value.bllParameterStr = value.bllParameterStr.replace(/\s+|&nbsp;/ig, ';')
            })
            // response.data.newGoods.forEach((value, index) => {
            //   value.bllParameter[0].spec.forEach((value1, index1) => {
            //     value.bllParameterStr += value1.spec_value_name
            //   })
            // })
            this.newGoods = response.data.newGoods
            this.oldGoods = response.data.oldGoods

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
  @import "quote.styl";
</style>
