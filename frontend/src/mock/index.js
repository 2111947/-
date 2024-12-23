import Mock from 'mockjs'

// 模拟登录接口
Mock.mock('/api/login', 'post', (options) => {
  const { username, password } = JSON.parse(options.body)
  if (username === 'admin' && password === '123456') {
    return {
      code: 0,
      message: '登录成功',
      token: 'mock-token-' + Date.now()
    }
  }
  return {
    code: 1,
    message: '用户名或密码错误'
  }
})

// 模拟注册接口
Mock.mock('/api/register', 'post', (options) => {
  const { username, password } = JSON.parse(options.body)
  if (username && password) {
    return {
      code: 0,
      message: '注册成功'
    }
  }
  return {
    code: 1,
    message: '注册失败'
  }
})

// 新闻列表接口
Mock.mock('/api/getarticle', 'get', {
  code: 0,
  message: '获取成功',
  'data|8': [{
    'id|+1': 1,
    title: '@ctitle(10, 20)',
    Content: '@cparagraph(2)',
    'image|1': [
      'https://picsum.photos/200/150?random=1',
      'https://picsum.photos/200/150?random=2',
      'https://picsum.photos/200/150?random=3',
      'https://picsum.photos/200/150?random=4'
    ],
    PublicationDate: '@date("yyyy-MM-dd")',
    'likes|0-200': 0,
    isLiked: false,
    'author': '@cname',
  }]
})

// 团队成员接口
Mock.mock('/api/getpersonalinfo', 'get', {
  code: 0,
  message: '获取成功',
  data: [
    {
      id: 1,
      name: '张三',
      info: '技术总监',
      description: '拥有10年以上互联网开发经验，精通前端技术栈，曾主导多个大型项目的架构设计与开发。',
      avatarUrl: 'https://picsum.photos/200/200?random=1',
      'skills|4': ['@ctitle(2,4)']
    },
    {
      id: 2,
      name: '李四',
      info: '产品经理',
      description: '有着丰富的产品设计经验，善于把握用户需求，推动过多个成功产品的落地。',
      avatarUrl: 'https://picsum.photos/200/200?random=2',
      'skills|4': ['@ctitle(2,4)']
    },
    {
      id: 3,
      name: '王五',
      info: 'UI设计师',
      description: '专注于用户体验设计，擅长将复杂的问题简单化，打造美观实用的界面。',
      avatarUrl: 'https://picsum.photos/200/200?random=3',
      'skills|4': ['@ctitle(2,4)']
    },
    {
      id: 4,
      name: '赵六',
      info: '前端工程师',
      description: '精通Vue、React等前端框架，对性能优化和工程化有深入研究。',
      avatarUrl: 'https://picsum.photos/200/200?random=4',
      'skills|4': ['@ctitle(2,4)']
    },
    
  ]
})

// 新闻点赞接口
Mock.mock(/\/api\/addarticlelikes\/\d+/, 'post', {
  code: 0,
  message: '操作成功',
  data: {
    'likes|+1': 1
  }
})

// 获取评论列表接口
Mock.mock(/\/api\/getarticlecomment\/\d+/, 'get', {
  code: 0,
  message: '获取成功',
  'data|3-10': [{
    'id|+1': 1,
    'userId|+1': 1,
    'username': '@cname',
    'avatar': '@image(100x100)',
    'content': '@cparagraph(1, 3)',
    'createTime': '@datetime("yyyy-MM-dd HH:mm:ss")',
    'likes|0-100': 0
  }]
})

// 添加评论接口
Mock.mock('/api/addarticlecomment', 'post', (options) => {
  const { articleID, content,username } = JSON.parse(options.body)
  if (articleID && content) {
    return {
      code: 0,
      message: '评论成功',
      data: {
        id: '@id',
        userId: '@id',
        username: '@cname',
        avatar: '@image(100x100)',
        content: content,
        createTime: '@now("yyyy-MM-dd HH:mm:ss")',
        likes: 0
      }
    }
  }
  return {
    code: 1,
    message: '评论失败'
  }
})

export default Mock 