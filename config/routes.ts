export default [

  {
    path: '/',
    component: '../layouts/AdminLayout',
    routes: [
      {
        name: 'Log In',
        path: '/login',
        component: './SignIn',
      },
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'teacher'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
        ]
        // path: '/',
        // component: '../layouts/BasicLayout',
        // routes: [
        //   {
        //     name: 'Class Management',
        //     path: '/class-management',
        //     component: './ClassManagement',
        //     iconPath: '/fast.svg',
        //   }
        // ]
      }
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
