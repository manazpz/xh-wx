<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    provide() {
      return {
        reload: this.reload
      }
    },
    methods: {
    },
    watch: {
      $route(to, from) {
        alert(to.name)
        // if(to.name )
      }
    },
    components: {
    }
  }
</script>

<style>

</style>
