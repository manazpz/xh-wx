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
    components: {
    }
  }
</script>

<style>

</style>
