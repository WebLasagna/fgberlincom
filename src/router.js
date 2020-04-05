import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import store from './store'
import i18n from './i18n'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)

if(store.state.user) var studentClass = store.state.user.class

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/espace-eleves',
      alias: ['/students-area', '/schuelerbereich'],
      name: 'studentsArea',
      component: () =>
        import(/* webpackChunkName: "studentsarea" */ './views/StudentsArea/Home'),
      meta: {
        status: 'verified'
      }
    },
    {
      path: '/espace-eleves/connexion',
      alias: ['/students-area/login', '/schuelerbereich/anmeldung'],
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "login" */ './views/StudentsArea/Login'),
      meta: {
        status: 'guest'
      }
    },
    {
      path: '/espace-eleves/inscription',
      alias: ['/students-area/register', '/schuelerbereich/registrierung'],
      name: 'register',
      component: () =>
        import(/* webpackChunkName: "login" */ './views/StudentsArea/Register'),
      meta: {
        status: 'guest'
      }
    },
    {
      path: '/espace-eleves/inscription/:referralCode',
      alias: ['/students-area/register/:referralCode', '/schuelerbereich/registrierung/:referralCode', '/l/:referralCode', '/❤️/:referralCode'],
      name: 'referralPage',
      component: () =>
        import(/* webpackChunkName: "login" */ './views/StudentsArea/Register'),
      meta: {
        status: 'guest'
      }
    },
    {
      path: '/espace-eleves/app',
      alias: ['/students-area/app', '/schuelerbereich/app'],
      name: 'appPage',
      component: () =>
        import(/* webpackChunkName: "login" */ './views/StudentsArea/AppPage'),
      meta: {
        device: 'mobile'
      }
    },
    {
      path: '/espace-eleves/verification-du-compte',
      alias: ['/students-area/account-validation', '/schuelerbereich/konto-ueberpruefung'],
      name: 'accountValidation',
      component: () =>
        import(/* webpackChunkName: "login" */ './views/StudentsArea/AccountValidation'),
      meta: {
        status: 'pending'
      }
    },
    {
      path: '/espace-eleves/compte-banni',
      alias: ['/students-area/account-banned', '/schuelerbereich/bannierte-konto'],
      name: 'accountBanned',
      component: () =>
        import(/* webpackChunkName: "login" */ './views/StudentsArea/AccountBanned'),
      meta: {
        status: 'banned'
      }
    },
    {
      path: '/espace-eleves/aujourdhui/:periodId',
      alias: ['/students-area/today/:periodId', '/schuelerbereich/heute/:periodId'],
      name: 'today',
      component: () =>
        import(/* webpackChunkName: "studentsarea" */ './views/StudentsArea/Today')
    },
    {
      path: '/espace-eleves/tout',
      alias: ['/students-area/all', '/schuelerbereich/alles'],
      name: 'all',
      component: () =>
        import(/* webpackChunkName: "studentsarea" */ './views/StudentsArea/All'),
      meta: {
        status: 'verified'
      }
    },
    {
      path: '/espace-eleves/ajouter/:type',
      alias: ['/students-area/add/:type', '/schuelerbereich/hinzufuegen/:type'],
      name: 'add',
      component: () =>
        import(/* webpackChunkName: "admin" */ './views/StudentsArea/Add'),
      meta: {
        status: 'verified'
      }
    },
    {
      path: '/espace-eleves/actualites',
      alias: ['/students-area/news', '/schuelerbereich/neuigkeiten'],
      name: 'classNews',
      component: () =>
        import(/* webpackChunkName: "studentsarea" */ './views/StudentsArea/News'),
      meta: {
        perm: studentClass
      }
    },
    {
      path: '/espace-eleves/emploi-du-temps',
      alias: ['/students-area/timetable', '/schuelerbereich/stundenplan'],
      name: 'timetable',
      component: () =>
        import(/* webpackChunkName: "studentsarea" */ './views/StudentsArea/Timetable'),
      meta: {
        perm: studentClass
      }
    },
    {
      path: '/espace-eleves/ma-classe',
      alias: ['/students-area/my-class', '/schuelerbereich/meine-klasse'],
      name: 'myClass',
      component: () =>
        import(/* webpackChunkName: "studentsarea" */ './views/StudentsArea/MyClass'),
      meta: {
        perm: studentClass,
        type: 'write'
      }
    },
    {
      path: '/espace-eleves/mon-compte',
      alias: ['/students-area/my-account', '/schuelerbereich/mein-konto'],
      name: 'myAccount',
      component: () =>
        import(/* webpackChunkName: "studentsarea" */ './views/StudentsArea/MyAccount'),
      meta: {
        status: 'verified'
      }
    },
    {
      path: '/espace-eleves/admin',
      alias: ['/students-area/admin', '/schuelerbereich/admin'],
      name: 'admin',
      component: () =>
        import(/* webpackChunkName: "admin" */ './views/StudentsArea/Admin'),
      meta: {
        requiresAuth: true,
        perm: studentClass,
        type: 'write'
      }
    },
    {
      path: '/espace-eleves/gestion-du-site',
      alias: ['/students-area/website-management', '/schuelerbereich/verwaltung-der-webseite'],
      name: 'websiteManagement',
      component: () =>
        import(/* webpackChunkName: "webmng" */ './views/StudentsArea/WebsiteManagement/Home'),
      meta: {
        requiresAuth: true,
        perm: 1,
        type: 'write'
      }
    },
    {
      path: '/espace-eleves/:type/compte/:studentId',
      alias: ['/students-area/:type/account/:studentId', '/schuelerbereich/:type/konto/:studentId'],
      name: 'studentPage',
      component: () =>
        import(/* webpackChunkName: "admin" */ './views/StudentsArea/StudentPage'),
        meta: {
          requiresAuth: true,
          perm: studentClass,
          type: 'write'
        }
    },
    {
      path: '/espace-eleves/gestion-du-site/groupe/:groupId',
      alias: ['/students-area/website-management/group/:groupId', '/schuelerbereich/verwaltung-der-webseite/gruppe'],
      name: 'groupPage',
      component: () =>
        import(/* webpackChunkName: "webmng" */ './views/StudentsArea/WebsiteManagement/GroupPage'),
      meta: {
        requiresAuth: true,
        perm: 1,
        type: 'write'
      }
    },
    {
      path: '/espace-eleves/gestion-du-site/parrainage/:referralLinkId',
      alias: ['/students-area/website-management/referral/:referralLinkId', '/schuelerbereich/verwaltung-der-webseite/patenschaft/:referralLinkId'],
      name: 'referralLinkPage',
      component: () =>
        import(/* webpackChunkName: "webmng" */ './views/StudentsArea/WebsiteManagement/ReferralLinkPage'),
      meta: {
        requiresAuth: true,
        perm: 1,
        type: 'write'
      }
    },
    {
      path: '/espace-eleves/gestion-du-site/formulaire/:formId',
      alias: ['/students-area/website-management/form/:formId', '/schuelerbereich/verwaltung-der-webseite/formular/:formId'],
      name: 'formPage',
      component: () =>
        import(/* webpackChunkName: "webmng" */ './views/StudentsArea/WebsiteManagement/FormPage'),
      meta: {
        requiresAuth: true,
        perm: 1,
        type: 'write'
      }
    },
    {
      path: '/projet',
      alias: ['/project', '/projekt'],
      name: 'project',
      component: () =>
        import(/* webpackChunkName: "project" */ './views/Project'),
      children: [
        {
          path: ':id',
          name: 'projectHiring',
          component: () =>
            import(/* webpackChunkName: "project" */ './views/Project')
        }
      ]
    },
    {
      path: '/actualites',
      alias: ['/news', '/neuigkeiten'],
      name: 'news',
      component: () =>
        import(/* webpackChunkName: "news" */ './views/News/Home')
    },
    {
      path: '/actualites/:newsPath',
      alias: ['/news/:newsPath', '/neuigkeiten/:newsPath'],
      name: 'newsPage',
      component: () =>
        import(/* webpackChunkName: "news" */ './views/News/NewsPage')
    },
    {
      path: '/conditions',
      name: 'conditions',
      alias: '/agb',
      component: () =>
        import(/* webpackChunkName: "legal" */ './views/Legal/Conditions')
    },
    {
      path: '/confidentialite',
      alias: ['/privacy', '/datenschutz'],
      name: 'privacy',
      component: () =>
        import(/* webpackChunkName: "legal" */ './views/Legal/Privacy')
    },
    {
      path: '*',
      name: 'error404',
      component: () => import('./views/Error404')
    }
  ]
})

function hasPerm(type, perm) {
  if(perm === 'class') perm = store.state.account.user.groups[0]
  if(type === 'read') var permissions = store.state.account.user.permissions.read
  else if(type === 'write') var permissions = store.state.account.user.permissions.write
  if(permissions.includes(perm) || permissions.find(currentPerm => currentPerm.id === perm)) {
    return true
  }
  else {
    return false
  }
}

function hasStatus(status) {
  if(!store.state.account.user) {
    if(status === 'guest') {
      return true
    }
    else return false
  }
  if(store.state.account.user.status === status) return true
  else return false
}

router.beforeEach((to, from, next) => {
  if(to.name === 'home' || to.name === 'privacy') return next()
  if(!store.state.open) next({ path: '/' })
  i18n.locale = store.state.locale
  document.title = i18n.t('pageTitles.' + to.name)
  const status = to.meta.status
  const device = to.meta.device
  const perm = to.meta.perm
  const type = to.meta.type
  if(status) {
    if(hasStatus(status)) {
      next()
    }
    else if(hasStatus('verified')) {
      next({ path: '/' + i18n.t('links.sa.main') })
    }
    else if(hasStatus('pending')) {
      next({ path: '/' + i18n.t('links.sa.accountValidation') })
    }
    else if(hasStatus('banned')) {
      next({ path: '/' + i18n.t('links.sa.accountBanned') })
    }
    else {
      next({ path: '/' + i18n.t('links.sa.login') })
    }
  }
  else if(device) {
    if(device === 'mobile') {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        next()
      } else {
        next(from)
      }
    }
  }
  else if(perm && type) {
    if(!store.state.ssid) {
      next({ path: '/' + i18n.t('links.sa.login') })
    }
    else if(hasPerm(type, perm)) {
      next()
    }
    else {
      next({ path: '/' + i18n.t('links.sa.main') })
    }
  }
  else next()
})

export default router;