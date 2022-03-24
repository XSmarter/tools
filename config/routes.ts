export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { path: '/user', routes: [{ name: '登录', path: '/user/login', component: './user/Login' }] },
      { component: './404' },
    ],
  },
  { path: '/home', name: '首页', icon: 'home', component: './home' },
  {
    path: '/work',
    name: '工作',
    icon: 'laptop',
    component: './work',
    routes: [
      {
        path: '/work',
        redirect: '/work/print',
      },
      {
        path: '/work/print',
        name: '打印',
        component: './work/print',
      },
      {
        path: '/work/compare',
        name: '对比',
        component: './work/compare',
      },
      {
        path: '/work/duty',
        name: '值班',
        component: './work/duty',
      },
    ],
  },
  {
    path: '/other',
    name: '其他',
    icon: 'code',
    component: './other',
    routes: [
      {
        path: '/other',
        redirect: '/other/tinyimg',
      },
      {
        path: '/other/tinyimg',
        name: '压缩图片',
        component: './other/tinyimg',
      },
      {
        path: '/other/endecode',
        name: '信息编码',
        component: './other/endecode',
      },
      {
        path: '/other/json',
        name: '格式JSON',
        component: './other/json',
      },
      {
        path: '/other/countdown',
        name: '倒计时',
        component: './other/countdown',
      },
      {
        path: '/other/purine',
        name: '嘌呤查询',
        component: './other/purine',
      },
    ],
  },
  { path: '/', redirect: '/home' },
  { component: './404' },
];
