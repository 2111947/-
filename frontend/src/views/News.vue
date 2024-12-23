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
          </div>
          <p class="news-desc">{{ item.Content }}</p>
          <div class="news-meta">
            <div class="meta-left">
              <span class="author">作者：{{ item.author }}</span>
              <span class="time">发布时间：{{ item.PublicationDate }}</span>
            </div>
            <div class="like-btn" @click="handleLike(item)">
              <i :class="['el-icon-star-off', {'liked': item.isLiked}]"></i>
              <span>{{ item.likes }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="comments-section">
        <div class="comment-input">
          <el-input
            v-model="item.commentContent"
            type="textarea"
            :rows="2"
            placeholder="写下你的评论..."
          ></el-input>
          <el-button 
            type="primary" 
            size="small" 
            @click="submitComment(item)"
            :disabled="!item.commentContent"
          >发表评论</el-button>
        </div>
        
        <div class="comments-list">
          <div class="comment-item" v-for="comment in item.comments" :key="comment.id">
            <div class="comment-avatar">
              <img :src="comment.avatar" :alt="comment.username">
            </div>
            <div class="comment-content">
              <div class="comment-header">
                <span class="username">{{ comment.username }}</span>
                <span class="time">{{ comment.createTime }}</span>
              </div>
              <p class="comment-text">{{ comment.content }}</p>
              <div class="comment-actions">
                <span class="like" @click="likeComment(comment)">
                  <i :class="['el-icon-star-off', {'liked': comment.isLiked}]"></i>
                  {{ comment.likes }}
                </span>
              </div>
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
        this.$axios.post(`/api/addarticlelikes/${news.id}`).then(res => {
          if (res.data.code === 0) {
            this.$message.success('点赞成功')
          }
        })
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
    },
    async getComments(newsId) {
      try {
        const res = await this.$axios.get(`/api/getarticlecomment/${newsId}`)
        if (res.data.code === 0) {
          return res.data.data
        }
        return []
      } catch (error) {
        this.$message.error('获取评论失败')
        return []
      }
    },
    async submitComment(news) {
      if (!news.commentContent.trim()) {
        return
      }
      
      try {
        const res = await this.$axios.post('/api/addarticlecomment', {
          articleID: news.id,
          content: news.commentContent,
          username: localStorage.getItem('username')
        })
        
        if (res.data.code === 0) {
          this.$message.success('评论成功')
          // 将新评论添加到列表
          news.comments.unshift(res.data.data)
          // 清空输入框
          news.commentContent = ''
        } else {
          this.$message.error(res.data.message)
        }
      } catch (error) {
        this.$message.error('评论失败')
      }
    },
    likeComment(comment) {
      if (!comment.isLiked) {
        comment.likes++
        comment.isLiked = true
        this.$message.success('点赞成功')
      } else {
        comment.likes--
        comment.isLiked = false
        this.$message.info('取消点赞')
      }
    },
    async getNewsList() {
      try {
        const res = await this.$axios.get('/api/getarticle')
        if (res.data.code === 0) {
          // 为每条新闻添加评论相关的属性
          this.newsList = await Promise.all(res.data.data.map(async news => ({
            ...news,
            commentContent: '',  // 评论输入框的内容
            comments: await this.getComments(news.id)  // 获取评论列表
          })))
        }
      } catch (error) {
        this.$message.error('获取新闻列表失败')
      }
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

  .comments-section {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;

    .comment-input {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      
      .el-button {
        align-self: flex-start;
      }
    }

    .comments-list {
      .comment-item {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;

        .comment-avatar {
          width: 40px;
          height: 40px;
          
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
          }
        }

        .comment-content {
          flex: 1;

          .comment-header {
            margin-bottom: 5px;
            
            .username {
              font-weight: bold;
              margin-right: 10px;
            }
            
            .time {
              color: #999;
              font-size: 12px;
            }
          }

          .comment-text {
            margin: 0;
            line-height: 1.5;
            color: #333;
          }

          .comment-actions {
            margin-top: 8px;
            
            .like {
              cursor: pointer;
              color: #999;
              font-size: 12px;
              
              i {
                margin-right: 3px;
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
}
</style> 