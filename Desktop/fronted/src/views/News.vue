<template>
  <div class="news-container">
    <div v-for="item in newsList" :key="item.id" class="news-item">
      <div class="news-content">
        <div class="news-image">
          <img :src="item.image" :alt="item.title">
        </div>
        <div class="news-info">
          <div class="news-header">
            <h3>{{ item.title }}</h3>
            <el-tag size="small" type="success">{{ item.category }}</el-tag>
          </div>
          <p class="news-desc">{{ item.description }}</p>
          <div class="news-tags">
            <el-tag size="mini" v-for="(tag, index) in item.tags" :key="index" type="info">
              {{ tag }}
            </el-tag>
          </div>
          <div class="news-meta">
            <div class="meta-left">
              <span class="author">作者：{{ item.author }}</span>
              <span class="time">发布时间：{{ item.time }}</span>
            </div>
            <div class="like-btn" @click="handleLike(item)">
              <i :class="['el-icon-star-off', {'liked': item.isLiked}]"></i>
              <span>{{ item.likes }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      newsList: []
    }
  },
  methods: {
    handleLike(news) {
      if (!news.isLiked) {
        news.likes++
        news.isLiked = true
        this.$message.success('点赞成功')
      } else {
        news.likes--
        news.isLiked = false
        this.$message.info('取消点赞')
      }
    },
    getNewsList() {
      // 调用mock接口获取新闻列表
      this.$axios.get('/api/news/list').then(res => {
        if (res.data.code === 0) {
          this.newsList = res.data.data
        }
      })
    }
  },
  mounted() {
    this.getNewsList()
  }
}
</script>

<style scoped lang="less">
.news-container {
  .news-item {
    background: #fff;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);

    .news-content {
      display: flex;
      
      .news-image {
        width: 200px;
        height: 150px;
        margin-right: 20px;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
        }
      }

      .news-info {
        flex: 1;
        
        .news-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;

          h3 {
            margin: 0;
            margin-right: 10px;
          }
        }

        .news-tags {
          margin: 10px 0;
          
          .el-tag {
            margin-right: 8px;
          }
        }

        .news-desc {
          color: #666;
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .news-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #999;

          .meta-left {
            display: flex;
            gap: 20px;
            
            .author, .time {
              color: #666;
              font-size: 14px;
            }
          }

          .like-btn {
            cursor: pointer;
            
            i {
              margin-right: 5px;
              &.liked {
                color: #409EFF;
              }
            }
          }
        }
      }
    }
  }
}
</style> 