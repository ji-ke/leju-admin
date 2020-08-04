import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: 'Dashboard',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/product',
    name: 'Product',
    meta: {
      title: 'Product',
      icon: 'product'
    },
    component: Layout,
    redirect: '/product/productList',
    children: [{
        path: '/product/productList',
        name: 'ProductList',
        meta: {
          title: 'ProductList',
          icon: 'product-list'
        },
        component: () => import('@/views/product/productList')
      },
      {
        path: '/product/productAdd',
        name: 'ProductAdd',
        meta: {
          title: 'ProductAdd',
          icon: 'product-add'
        },
        component: () => import('@/views/product/productAdd')
      },
      {
        path: '/product/category',
        name: 'Categoroy',
        meta: {
          title: 'Category',
          icon: 'product-list'
        },
        component: () => import('@/views/product/category')
      },
      {
        path: '/product/brand',
        name: 'Brand',
        meta: {
          title: 'Brand',
          icon: 'product-list'
        },
        component: () => import('@/views/product/brand')
      },
      {
        path: '/product/series',
        name: 'Series',
        meta: {
          title: 'Series',
          icon: 'product-list'
        },
        component: () => import('@/views/product/series')
      },
    ]
  },
  {
    path: 'order',
    name: 'Order',
    meta: {
      title: 'Order',
      icon: 'dashboard'
    },
    component: Layout,
    redirect: '/order/order',
    // component: () => import('@/views/order'),
    children: [{
        path: '/order/order',
        name: 'Order',
        meta: {
          title: 'Order',
          icon: 'product-list'
        },
        component: () => import('@/views/order/order')
      },
    {
        path: 'detail/:orderId',
        name: 'orderDetail',
        meta: {
          title: 'Detail',
          icon: 'product-list'
        },
      component: () => import('@/views/order/order/detail'),
        hidden: true
      },
      {
        path: '/order/chargeback',
        name: 'Chargeback',
        meta: {
          title: 'Chargeback',
          icon: 'product-list'
        },
        component: () => import('@/views/order/chargeback')
      },
      {
        path: 'order/chargeback/:backId',
        name: 'BackDetail',
        meta: {
          title: 'BackDetail',
          icon: 'product-list'
        },
        component: () => import('@/views/order/chargeback/backDetail/index'),
        hidden: true
      }
    ]
  },
  {
    path: '/content',
    component: Layout,
    name: 'Content',
    meta: {
      title: 'Content',
      icon: 'dashboard'
    },
    component: () => import('@/views/content/index')
  },
  {
    path: '/client',
    component: Layout,
    name: 'Client',
    meta: {
      title: 'Client',
      icon: 'dashboard'
    },
    component: () => import('@/views/client/index')
  },
  {
    path: '/activity',
    component: Layout,
    name: 'Activity',
    meta: {
      title: 'Activity',
      icon: 'dashboard'
    },
    component: () => import('@/views/activity/index')
  },
  {
    path: '/authority',
    component: Layout,
    name: 'Authority',
    meta: {
      title: 'Authority',
      icon: 'dashboard'
    },
    component: () => import('@/views/authority/index')
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
