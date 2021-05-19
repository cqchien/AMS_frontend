export default [
  {
    path: '/user',
    component: '../layouts/AdminLayout',
    routes: [
      {
        name: 'User Sign In',
        path: '/user/login',
        component: './SignIn',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/management/class',
      },
      {
        path: '/management',
        name: 'Management',
        component: '../layouts/ManagementLayout',
        authority: ['admin', 'teacher', 'trainingroom'],
        routes: [
          {
            path: '/management/class',
            name: 'Class',
            iconPath: '/calendar.svg',
            component: './Welcome',
          },
          {
            path: '/management/teacher',
            name: 'Teacher',
            iconPath: '/rocket.svg',
            component: './Welcome',
          },
          {
            path: '/management/account',
            name: 'Account',
            iconPath: '/fast.svg',
            component: './Welcome',
          },
        ],
      },
      // {
      //   path: '/',
      //   component: '../layouts/SecurityLayout',
      //   routes: [
      //     {
      //       path: '/',
      //       component: '../layouts/BasicLayout',
      //       authority: ['admin', 'user'],
      //       routes: [
      //         {
      //           path: '/',
      //           redirect: '/welcome',
      //         },
      //         {
      //           path: '/welcome',
      //           name: 'welcome',
      //           icon: 'smile',
      //           component: './Welcome',
      //         },
      //         {
      //           path: '/admin',
      //           name: 'admin',
      //           icon: 'crown',
      //           component: './Admin',
      //           authority: ['admin'],
      //           routes: [
      //             {
      //               path: '/admin/sub-page',
      //               name: 'sub-page',
      //               icon: 'smile',
      //               component: './Welcome',
      //               authority: ['admin'],
      //             },
      //           ],
      //         },
      //         {
      //           name: 'list.table-list',
      //           icon: 'table',
      //           path: '/list',
      //           component: './TableList',
      //         },
      //         {
      //           component: './404',
      //         },
      //       ],
      //     },
      //     {
      //       component: './404',
      //     },
      //   ],
      // },
    ],
  },
  {
    component: './404',
  },
];
