<template>
  <div class="statement" ref="statement">
    <v-header :title="title"></v-header>
    <div style="margin-top: 40px;padding: 10px" v-html="content">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import VHeader from 'components/v-header/v-header'

  export default {
    data() {
      return {
        title: this.$route.query.title?this.$route.query.title:'隐私政策',
        content: this.$route.query.content?this.$route.query.content:''
      }
    },
    created() {
    },
    methods: {

    },
    //注册组件
    components: {
      VHeader
    }
  }
</script>

