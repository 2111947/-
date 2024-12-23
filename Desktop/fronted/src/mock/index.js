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
Mock.mock('/api/news/list', 'get', {
  code: 0,
  message: '获取成功',
  'data|8': [{
    'id|+1': 1,
    title: '@ctitle(10, 20)',
    description: '@cparagraph(2)',
    'image|1': [
      'https://picsum.photos/200/150?random=1',
      'https://picsum.photos/200/150?random=2',
      'https://picsum.photos/200/150?random=3',
      'https://picsum.photos/200/150?random=4'
    ],
    time: '@date("yyyy-MM-dd")',
    'likes|0-200': 0,
    isLiked: false,
    'author': '@cname',
    'category|1': ['科技', '娱乐', '体育', '财经', '教育'],
    'tags|1-3': ['@ctitle(2,4)']
  }]
})

// 团队成员接口
Mock.mock('/api/team/members', 'get', {
  code: 0,
  message: '获取成功',
  data: [
    {
      id: 1,
      name: '张三',
      position: '技术总监',
      description: '拥有10年以上互联网开发经验，精通前端技术栈，曾主导多个大型项目的架构设计与开发。',
      avatar: 'https://picsum.photos/200/200?random=1',
      'skills|4': ['@ctitle(2,4)']
    },
    {
      id: 2,
      name: '李四',
      position: '产品经理',
      description: '有着丰富的产品设计经验，善于把握用户需求，推动过多个成功产品的落地。',
      avatar: 'https://picsum.photos/200/200?random=2',
      'skills|4': ['@ctitle(2,4)']
    },
    {
      id: 3,
      name: '王五',
      position: 'UI设计师',
      description: '专注于用户体验设计，擅长将复杂的问题简单化，打造美观实用的界面。',
      avatar: 'https://picsum.photos/200/200?random=3',
      'skills|4': ['@ctitle(2,4)']
    },
    {
      id: 4,
      name: '赵六',
      position: '前端工程师',
      description: '精通Vue、React等前端框架，对性能优化和工程化有深入研究。',
      avatar: 'https://picsum.photos/200/200?random=4',
      'skills|4': ['@ctitle(2,4)']
    },
    
  ]
})

// 新闻点赞接口
Mock.mock(/\/api\/news\/like\/\d+/, 'post', {
  code: 0,
  message: '操作成功',
  data: {
    'likes|+1': 1
  }
})

export default Mock 