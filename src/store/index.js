import { createStore } from 'vuex'
import pitchesModule from './modules/pitches.js'
import transactionsModule from './modules/transactions.js'
import usersModule from './modules/users.js'
import bookingsModule from './modules/bookings.js'
import authModule from './modules/auth.js'
import sportClubsModule from './modules/sportClubs.js'
import timeAdjModule from './modules/timeAdj.js'

const store = createStore({
  modules: {
    pitches: pitchesModule,
    transactions: transactionsModule,
    bookings: bookingsModule,
    users: usersModule,
    auth: authModule,
    sportClubs: sportClubsModule,
    timeAdj: timeAdjModule
  }
});

export default store;