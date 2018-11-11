<template>
  <div class="statement" ref="statement">
    <v-header :title="title"></v-header>
    <div style="margin-top: 40px;padding: 10px" v-html="content">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import VHeader from 'components/v-header/v-header'
  import { queryStatement } from 'api/statement'

  export default {
    data() {
      return {
        title: this.$route.query.title?this.$route.query.title:'服务条款',
        id: this.$route.query.id?this.$route.query.id:'',
        type: this.$route.query.type?this.$route.query.type:'',
        content: undefined
      }
    },
    created() {
      this.getStatement()
    },
    methods: {
      getStatement() {
        var query = {}
        if(this.id != ''){
          query = {id:this.id}
        }
        if(this.type != ''){
          query = {type:this.type}
        }
        queryStatement(query).then(response => {
          if (response.code === 200) {
            this.content = response.data.items[0].content
          }
        }).catch(() => {
        })
      },

    },
    //注册组件
    components: {
      VHeader
    }
  }
</script>

