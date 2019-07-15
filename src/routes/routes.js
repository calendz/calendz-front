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
const Login = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Auth/Login.vue')
const Register = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Auth/Register.vue')
const EmailConfirmation = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Auth/EmailConfirmation.vue')
const PasswordReset = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Auth/PasswordReset.vue')
const PasswordResetChangePassword = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Auth/PasswordResetChangePassword.vue')

// Dashboard
// const Dashboard = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Dashboard.vue')

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
        title: 'Accueil - calendz'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Connexion - calendz',
        redirectToDashboardIfConnected: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: 'Inscription - calendz',
        redirectToDashboardIfConnected: true
      }
    },
    {
      path: '/email-confirmation/:token',
      name: 'Verification email',
      component: EmailConfirmation,
      meta: {
        title: 'Confirmation adresse mail - calendz',
        redirectToDashboardIfConnected: true
      }
    },
    {
      path: '/password-reset',
      name: 'PasswordReset',
      component: PasswordReset,
      meta: {
        title: 'Mot de passe oublié - calendz',
        redirectToDashboardIfConnected: true
      }
    },
    {
      path: '/password-reset/:token',
      name: 'PasswordResetChangePassword',
      component: PasswordResetChangePassword,
      meta: {
        title: 'Mot de passe oublié - calendz',
        redirectToDashboardIfConnected: true
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
  }
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  dashboardPages,
  authPages
]

export default routes
