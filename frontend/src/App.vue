<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  min-width: 1200px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}
</style>

<script>
export default {
  name: 'App',
  data() {
    return {
      menuList: [
        { title: '主页', router: '/' },
        { title: '游戏', router: '/games' },
        { title: '评论', router: '/discuss' },
      
      ],
    };
  },
  methods: {
    contactUs() {
    }
  }
};
</script>
