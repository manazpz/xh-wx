<template>
  <div class="visitRecovery" ref="visitRecovery">
    <v-header title="在线客服"></v-header>
  </div>
</template>
<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryUserinfos } from 'api/system'

  export default {
    data() {
      return {
        list: null,
        id: '111111',
        name: '',
        avatar: ''
      }
    },
    created() {
      this.openId = window.localStorage.getItem("openId")
      this.getList()
    },
    methods: {
      getList(){
        var tar = this
        queryUserinfos({openId:this.openId}).then(response => {
          if (response.code === 200) {
            if(response.data.items.length > 0){
              this.list = response.data.items[0]
              tar.getIminfo()
            }
          }
        }).catch(() => {
        })
      },
      getIminfo(){
        var tar = this
        this.$nextTick(function () {
          layui.use('mobile', function(){
            //建立WebSocket通讯
            var socket = new WebSocket('ws://localhost:8083?link='+this.openId);

            var mobile = layui.mobile
              ,layim = mobile.layim;
            //基础配置
            layim.config({
              brief: true,  //是否简约模式（如果true则不显示主面板）
              init: {
                //设置我的基础信息
                mine: {
                  "username": tar.list.nickName //我的昵称
                  ,"id": tar.openId //我的ID
                  ,"status": "online" //在线状态 online：在线、hide：隐身
                  ,"remark": "" //我的签名
                  ,"avatar": tar.list.headPortrait //我的头像
                }
              }
            })
            //发送消息
            layim.on('sendMessage', function(res){
              var s = JSON.stringify(res)
              socket.send(s);
            })
            //接收消息
            socket.onmessage = function (res) {
              var data = JSON.parse(res.data)
              var fromid = data.fromid.split('[')[1].split(']')[0]
              layim.getMessage({
                username: data.username, type: 'friend', avatar: data.avatar, id: fromid, content: data.content, time: data.time
              })
            };
            //创建一个会话
            layim.chat({
              id: '111111'
              ,name: '在线客服'
              ,type: 'friend' //friend、group等字符，如果是group，则创建的是群聊
              ,avatar: 'http://tp1.sinaimg.cn/1571889140/180/40030060651/1'
            });
          });
        })
      }
    },
    //注册组件
    components: {
      VHeader
    }
  }
</script>

