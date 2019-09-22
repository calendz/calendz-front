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
const Dashboard = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Dashboard.vue')
const Calendar = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Calendar.vue')
const Homeworks = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Homeworks.vue')
const Profile = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Profile.vue')
const Settings = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Settings.vue')

const DashboardAdmin = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Admin/DashboardAdmin.vue')
const Statistics = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Admin/Statistics.vue')
const UserManagement = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Admin/UserManagement.vue')

const Notifications = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Hidden/Notifications.vue')

// ============================================
// == Routes
// ============================================

// Dashboard
const dashboardPages = {
  path: '/',
  component: DashboardLayout,
  redirect: '/dashboard',
  name: 'Dashboard Layout',
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        title: 'Dashboard - Calendz'
      }
    },
    {
      path: 'calendar',
      name: 'Emploi du temps',
      component: Calendar,
      meta: {
        title: 'Emploi du temps - Calendz'
      }
    },
    {
      path: 'homeworks',
      name: 'Devoirs',
      component: Homeworks,
      meta: {
        title: 'Devoirs - Calendz'
      }
    },
    {
      path: 'profile',
      name: 'Mon profil',
      component: Profile,
      meta: {
        title: 'Profil - Calendz'
      }
    },
    {
      path: 'settings',
      name: 'Paramètres',
      component: Settings,
      meta: {
        title: 'Paramètres - Calendz'
      }
    },
    // =================================
    // == administration tab
    // =================================
    {
      path: 'dashboard-admin',
      name: 'Dashboard admin',
      component: DashboardAdmin,
      meta: {
        title: 'Dashboard admin - Calendz'
      }
    },
    {
      path: 'stats',
      name: 'Statistiques',
      component: Statistics,
      meta: {
        title: 'Statistiques - Calendz',
        adminOnly: true
      }
    },
    {
      path: 'user-management',
      name: 'Gestion des utilisateurs',
      component: UserManagement,
      meta: {
        title: 'Utilisateurs - Calendz',
        adminOnly: true
      }
    },
    // =================================
    // == hidden pages
    // =================================
    {
      path: 'notifications',
      name: 'Notifications',
      component: Notifications,
      meta: {
        title: 'Notifications - Calendz'
      }
    }
  ]
}

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
        title: 'Accueil - Calendz'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'Connexion - Calendz',
        redirectToDashboardIfConnected: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: 'Inscription - Calendz',
        redirectToDashboardIfConnected: true
      }
    },
    {
      path: '/email-confirmation/:token',
      name: 'Verification email',
      component: EmailConfirmation,
      meta: {
        title: 'Confirmation adresse mail - Calendz',
        redirectToDashboardIfConnected: true
      }
    },
    {
      path: '/password-reset',
      name: 'PasswordReset',
      component: PasswordReset,
      meta: {
        title: 'Mot de passe oublié - Calendz',
        redirectToDashboardIfConnected: true
      }
    },
    {
      path: '/password-reset/:token',
      name: 'PasswordResetChangePassword',
      component: PasswordResetChangePassword,
      meta: {
        title: 'Mot de passe oublié - Calendz',
        redirectToDashboardIfConnected: true
      }
    },
    // if no route matched -> 404 page
    { path: '*', component: NotFound }
  ]
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
