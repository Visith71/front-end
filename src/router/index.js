import { createRouter, createWebHistory } from 'vue-router'
import TodayBookings from '../views/TodayBookings.vue'
import index from '../views/index.vue'
import Calendar from '../views/Calendar.vue'
import Statistic from '../views/Statistic.vue'
import Transactions from '../views/Transactions.vue'
import Pitches from '../views/Pitches.vue'
import Support from '../views/Support.vue'
import UserData from '../views/admin/UserData.vue'
import store from '../store/index.js'
import NotFound from '../views/NotFound.vue'
import CreateSportClub from '../views/sportclub/CreateSportClub.vue'
import ClubProfile from '../views/sportclub/ClubProfile.vue'
import SportClubs from '../views/admin/SportClubs.vue'
import TimePart from '../views/admin/time-adj/timePart.vue'
import DayPart from '../views/admin/time-adj/dayPart.vue'
import WeekPart from '../views/admin/time-adj/weekPart.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/todaybookings',
      name: 'TodayBookings',
      component: TodayBookings,
      meta: {
        requiresAuthAsClubOwner: true
      }
    },
    {
      path: '/sportclub',
      name: 'CreateSportClub',
      component: CreateSportClub,
      meta: {
        blockSportClub: true,
        didLoggedIn: true,
        sportClubCreated: true
      }
    },
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        didLoggedIn: true,
        didLoggedInNotOwnedSportClub: true,
        requiresAuth: true
      }
    },
    {
      path: '/sportclub/profile',
      name: 'ClubProfile',
      component: ClubProfile,
      meta: {
        requiresAuthAsClubOwner: true
      }
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar,
      meta: {
        requiresAuthAsClubOwner: true
      }
    },
    {
      path: '/statistic',
      name: 'Statistic',
      component: Statistic,
      meta: {
        requiresAuthAsClubOwner: true
      }
    },
    {
      path: '/transactions',
      name: 'Transactions',
      component: Transactions,
      meta: {
        requiresAuthAsClubOwner: true
      }
    },
    {
      path: '/pitches',
      name: 'Pitches',
      component: Pitches,
      meta: {
        requiresAuthAsClubOwner: true
      }
    },
    {
      path: '/support',
      name: 'Support',
      component: Support,
      meta: {
        requiresAuthAsClubOwner: true
      }
    },
    {
      path: '/admin/userdata',
      name: 'UserData',
      component: UserData,
      meta: {
        requiresAuthAsSuperAdmin: true
      }
    },
    {
      path: '/admin/sportclub',
      name: 'SportClubs',
      component: SportClubs,
      meta: {
        requiresAuthAsSuperAdmin: true
      }
    },
    {
      path: '/admin/timepart',
      name: 'TimePart',
      component: TimePart,
      meta: {
        requiresAuthAsSuperAdmin: true
      }
    },
    {
      path: '/admin/daypart',
      name: 'DayPart',
      component: DayPart,
      meta: {
        requiresAuthAsSuperAdmin: true
      }
    },
    {
      path: '/admin/weekpart',
      name: 'WeekPart',
      component: WeekPart,
      meta: {
        requiresAuthAsSuperAdmin: true
      }
    },
    {
      path: '/:notFound(.*)',
      name: 'NotFound',
      component: NotFound,
      meta: {
        requiresAuthAsClubOwner: true
      }
    }
  ]
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuthAsClubOwner && !store.getters.isAuthenticated) {
    next('/');
  } if (to.meta.requiresAuthAsClubOwner && store.getters.isAuthenticatedAsClubOwner) {
    next();
  } if (to.meta.blockSportClub && !store.getters.isAuthenticated) {
    next('/')
  } if (to.meta.sportClubCreated && store.getters.isAuthenticated && store.getters.isClubOwner && store.getters.registerSportClub) {
    next('/todaybookings')
  }
  if (to.meta.didLoggedIn && store.getters.isAuthenticatedAsClubOwner) {
    next('/todaybookings')
  } if (to.meta.didLoggedInNotOwnedSportClub && store.getters.isAuthenticatedAsClubOwnerNoSportClub) {
    next('/sportclub')
  }
  if (to.meta.requiresAuthAsClubOwner && store.getters.isAuthenticatedAsClubOwnerNoSportClub) {
    next('/sportclub')
  } if (to.meta.requiresAuth && store.getters.isAuthenticatedAsSuperAdmin){
    next('/todaybookings');
  } if (to.meta.requiresAuthAsSuperAdmin && !store.getters.isAuthenticatedAsSuperAdmin){
    next('/todaybookings');
  } 
  if (to.meta.requiresAuthAsSuperAdmin) {
    next()
  }
  else {
    next();
  }
})

export default router
