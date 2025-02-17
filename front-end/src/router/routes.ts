import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'login',
        component: () => import('pages/home/auth/LoginPage.vue')
      },
      {
        path: 'register',
        component: () => import('pages/home/auth/RegisterPage.vue')
      }
    ],
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'finance/expenses',
        component: () => import('pages/dashboard/finance/Expenses.vue')
      },
      {
        path: 'tasks/list',
        component: () => import('pages/dashboard/tasks/TaskLists.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];


export default routes;
