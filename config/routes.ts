export default [
  {
    path: '/login',
    layout: false,
    component: './login',
  },
  { path: '/home', name: '首页', icon: 'home', component: './home' },
  {
    path: '/work',
    name: '工作',
    icon: 'laptop',
    component: './work',
    access: 'canWork',
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
    path: '/tools',
    name: '工具',
    icon: 'code',
    component: './tools',
    routes: [
      {
        path: '/tools',
        redirect: '/tools/tinyimg',
      },
      {
        path: '/tools/tinyimg',
        name: '压缩图片',
        icon: 'fileZip',
        component: './tools/tinyimg',
      },
      {
        path: '/tools/endecode',
        name: '信息编码',
        icon: 'translation',
        component: './tools/endecode',
      },
      {
        path: '/tools/json',
        name: '格式JSON',
        icon: 'formatPainter',
        component: './tools/json',
      },
      {
        path: '/tools/countdowns',
        name: '倒计时',
        icon: 'fieldTime',
        component: './tools/countdowns',
      },
      {
        path: '/tools/purine',
        name: '嘌呤查询',
        icon: 'search',
        component: './tools/purine',
      },
      {
        path: '/tools/speedtest',
        name: '网络测速',
        icon: 'send',
        component: './tools/speedtest',
      },
      // {
      //   path: '/tools/ys',
      //   name: 'YS',
      //   component: './tools/ys',
      // },
    ],
  },
  { path: '/settings', name: '设置', icon: 'setting', component: './settings' },
  {
    path: '/private',
    name: '图片',
    icon: 'fileImage',
    component: './private',
    access: 'canPrivate',
  },
  { path: '/', redirect: '/home' },
  { component: './404' },
];
