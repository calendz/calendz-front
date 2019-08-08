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
const CalendarSearch = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/CalendarSearch.vue')
const Homeworks = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Homeworks.vue')
const Profile = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Profile.vue')
const Settings = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Settings.vue')
const Blog = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Blog.vue')
const Features = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/Features.vue')
const BugReport = () => import(/* webpackChunkName: "page" */ '@/views/Pages/Dashboard/BugReport.vue')

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
        title: 'Dashboard - calendz'
      }
    },
    {
      path: 'calendar',
      name: 'Emploi du temps',
      component: Calendar,
      meta: {
        title: 'Dashboard - calendz'
      }
    },
    {
      path: 'calendar/search',
      name: 'Emploi du temps - Recherche',
      component: CalendarSearch,
      meta: {
        title: 'Dashboard - calendz'
      }
    },
    {
      path: 'homeworks',
      name: 'Devoirs',
      component: Homeworks,
      meta: {
        title: 'Dashboard - calendz'
      }
    },
    {
      path: 'profile',
      name: 'Mon profil',
      component: Profile,
      meta: {
        title: 'Dashboard - calendz'
      }
    },
    {
      path: 'settings',
      name: 'Paramètres',
      component: Settings,
      meta: {
        title: 'Dashboard - calendz'
      }
    },
    {
      path: 'blog',
      name: 'Blog',
      component: Blog,
      meta: {
        title: 'Dashboard - calendz'
      }
    },
    {
      path: 'features',
      name: 'Features',
      component: Features,
      meta: {
        title: 'Dashboard - calendz'
      }
    },
    {
      path: 'bug-report',
      name: 'Signaler un bug',
      component: BugReport,
      meta: {
        title: 'Dashboard - calendz'
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

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  dashboardPages,
  authPages
]

export default routes
