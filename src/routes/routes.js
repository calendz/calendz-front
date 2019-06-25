// ============================================
// == Layouts
// ============================================

import AuthLayout from '@/views/Layouts/AuthLayout.vue'
import DashboardLayout from '@/views/Layouts/DashboardLayout.vue'

// ============================================
// == Pages
// ============================================

// Error pages
import NotFound from '@/views/Pages/Errors/NotFound.vue'

// Authentication
const Home = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Home.vue')
const Login = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Login.vue')
const Register = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Register.vue')

// Dashboard
const Dashboard = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Dashboard.vue')

// ============================================
// == Routes
// ============================================

// Authentication
const authPages = {
  path: '/',
  component: AuthLayout,
  name: 'Authentication',
  children: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        noBodyBackground: true,
        title: 'Accueil - calendz'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Connexion - calendz'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: 'Inscription - calendz'
      }
    },
    // if no route matched -> 404 page
    { path: '*', component: NotFound }
  ]
}

const dashboardPages = {
  path: '/dashboard',
  name: 'Dashboard',
  component: DashboardLayout,
  meta: {
    title: 'Dashboard - calendz',
    requiresAuth: true
  },
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
}

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'Home'
  },
  dashboardPages,
  authPages
]

export default routes
