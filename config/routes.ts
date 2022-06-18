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
        icon: 'printer',
        component: './work/print',
      },
      {
        path: '/work/compare',
        name: '对比',
        icon: 'interaction',
        component: './work/compare',
        routes: [
          {
            path: '/work/compare',
            redirect: '/work/compare/order',
          },
          {
            path: '/work/compare/order',
            component: './work/compare/order',
          },
          {
            path: '/work/compare/address',
            component: './work/compare/address',
          },
          {
            component: './404',
          },
        ],
      },
      {
        path: '/work/duty',
        name: '值班',
        icon: 'desktop',
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
        icon: 'fileZip',
        component: './other/tinyimg',
      },
      {
        path: '/other/endecode',
        name: '信息编码',
        icon: 'translation',
        component: './other/endecode',
      },
      {
        path: '/other/json',
        name: '格式JSON',
        icon: 'formatPainter',
        component: './other/json',
      },
      {
        path: '/other/countdowns',
        name: '倒计时',
        icon: 'fieldTime',
        component: './other/countdowns',
      },
      {
        path: '/other/purine',
        name: '嘌呤查询',
        icon: 'search',
        component: './other/purine',
      },
      {
        path: '/other/speedtest',
        name: '网络测速',
        icon: 'send',
        component: './other/speedtest',
      },
      // {
      //   path: '/other/ys',
      //   name: 'YS',
      //   component: './other/ys',
      // },
    ],
  },
  { path: '/settings', name: '设置', icon: 'setting', component: './settings' },
  { path: '/', redirect: '/home' },
  { component: './404' },
];
