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
    id: 'train_create',
    path: '/train/create',
    component: lazy(() => import('@pages/train/Create')),
    isProtected: true,
  },
  {
    id: 'train_list',
    path: '/train/list',
    component: lazy(() => import('@pages/train/List')),
    isProtected: true,
  },
  {
    id: 'station_create',
    path: '/station/create',
    component: lazy(() => import('@pages/station/Create')),
    isProtected: true,
  },
  {
    id: 'station_list',
    path: '/station/list',
    component: lazy(() => import('@pages/station/List')),
    isProtected: true,
  },
  {
    id: 'ship_schedule_create',
    path: '/ship-schedule/create',
    component: lazy(() => import('@pages/home/HomePage')),
    isProtected: true,
  },
]
