<template>
  <div class="team-container">
    <el-row :gutter="20">
      <el-col :span="6" v-for="member in teamMembers" :key="member.id">
        <div class="team-card">
          <div class="member-avatar">
            <img :src="member.avatar" :alt="member.name">
          </div>
          <h3>{{ member.name }}</h3>
          <p class="position">{{ member.position }}</p>
          <p class="description">{{ member.description }}</p>
          <div class="skills">
            <el-tag
              v-for="(skill, index) in member.skills"
              :key="index"
              size="mini"
              type="success"
              effect="plain"
            >
              {{ skill }}
            </el-tag>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Team',
  data() {
    return {
      teamMembers: []
    }
  },
  methods: {
    getTeamMembers() {
      // 调用mock接口获取团队成员信息
      this.$axios.get('/api/team/members').then(res => {
        if (res.data.code === 0) {
          this.teamMembers = res.data.data
        }
      })
    }
  },
  mounted() {
    this.getTeamMembers()
  }
}
</script>

<style scoped lang="less">
.team-container {
  .team-card {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    text-align: center;
    margin-bottom: 20px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);

    .member-avatar {
      width: 120px;
      height: 120px;
      margin: 0 auto 20px;
      
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    h3 {
      margin: 0 0 10px;
      font-size: 18px;
    }

    .position {
      color: #409EFF;
      margin-bottom: 10px;
    }

    .description {
      color: #666;
      line-height: 1.5;
    }

    .skills {
      margin-top: 15px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      
      .el-tag {
        margin: 0 4px;
      }
    }
  }
}
</style> 