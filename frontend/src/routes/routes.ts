import { lazy } from 'react'

export const routeConfig = [
  {
    id: 'LoginPage',
    path: '/login',
    component: lazy(() => import('@pages/login/LoginPage')),
    isProtected: false,
  },
  {
    id: 'HomePage',
    path: '/',
    component: lazy(() => import('@pages/home/HomePage')),
    isProtected: true,
  },
  {
    id: 'User_create',
    path: '/user/create',
    component: lazy(() => import('@pages/user/Create')),
    isProtected: true,
  },
  {
    id: 'User_list',
    path: '/user/list',
    component: lazy(() => import('@pages/user/List')),
    isProtected: true,
  },
  {
    id: 'ship_create',
    path: '/ship/create',
    component: lazy(() => import('@pages/home/HomePage')),
    isProtected: true,
  },
  {
    id: 'ship_list',
    path: '/ship/list',
    component: lazy(() => import('@pages/home/HomePage')),
    isProtected: true,
  },
  {
    id: 'ship_router_create',
    path: '/ship-router/create',
    component: lazy(() => import('@pages/home/HomePage')),
    isProtected: true,
  },
  {
    id: 'ship_router_list',
    path: '/ship-router/list',
    component: lazy(() => import('@pages/home/HomePage')),
    isProtected: true,
  },
  {
    id: 'ship_schedule_create',
    path: '/ship-schedule/create',
    component: lazy(() => import('@pages/home/HomePage')),
    isProtected: true,
  },
]
