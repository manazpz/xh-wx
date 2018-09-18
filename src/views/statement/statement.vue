<template>
  <div class="statement" ref="statement">
  </div>
</template>

<script type="text/ecmascript-6">

  import { queryBanners } from 'api/home'
  import { queryStatement } from 'api/statement'
  import VHeader from 'components/v-header/v-header'
  import Sidebar from 'components/sidebar/sidebar'

  export default {
    data() {
      return {
        banners: [],
        statements: []
      }
    },
    created() {
      this.getBanners()
      this.getStatement()
    },
    methods: {
      show() {
        this.$refs.sidebar.open()
      },
      getBanners() {
        queryBanners('HB').then(response => {
          if (response.code === 200) {
            this.banners = response.data.items
          }
        }).catch(() => {
        })
      },
      getStatement() {
        queryStatement('HT').then(response => {
          if (response.code === 200) {
            this.statements = response.data.items
          }
        }).catch(() => {
        })
      }
    },
    //注册组件
    components: {
      VHeader,
      Sidebar
    }
  }
</script>

