<template>
  <div class="index-container">
    <!-- 导航栏 -->
    <div class="nav-header">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
        <el-menu-item index="news">新闻资讯</el-menu-item>
        <el-menu-item index="team">团队展示</el-menu-item>
      </el-menu>
    </div>
    
    <!-- 内容区域 -->
    <div class="content">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import News from './News.vue'
import Team from './Team.vue'

export default {
  name: 'Index',
  components: {
    News,
    Team
  },
  data() {
    return {
      activeIndex: 'news',
      currentComponent: 'News'
    }
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key
      this.currentComponent = key === 'news' ? 'News' : 'Team'
    }
  }
}
</script>

<style scoped lang="less">
.index-container {
  .nav-header {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .content {
    width: 80%;
    margin: 20px auto;
    min-height: calc(100vh - 120px);
  }
}
</style>
