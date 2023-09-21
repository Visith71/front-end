import axios from 'axios'
import { format } from 'date-fns'

export default {
  namespaced: true,
  state() {
    return {
    bookings: [],
    calendarBookings: [],
    bookingsByClubId: [],
    notificationBookings: []
    }
  },
  actions: {
  async getBookings(context, params) {
    const axiosConfig = {
      params: params
    }

    await axios.get('booking-details/', axiosConfig)
    .then(res => {
      context.commit('SET_BOOKINGS', res.data)
    })
    .catch(err => {
      if (err.response) {
        const error = new Error(err.response.data.message)
        throw error;
      } else {
        throw new Error('Error: No Response!')
      }
    })
  },
  async getBookingsNotification(context, params) {
    const axiosConfig = {
      params: params
    }

    await axios.get('booking-details/', axiosConfig)
    .then(res => {
      context.commit('SET_BOOKINGS_NOTIFICATION', res.data)
    })
    .catch(err => {
      if (err.response) {
        const error = new Error(err.response.data.message)
        throw error;
      } else {
        throw new Error('Error: No Response!')
      }
    })
  },
  async getBookingsByClubId(context, params) {
    const pagInfo = {
      itemsPerPage: params.itemsPerPage,
      page: params.page
    }
    await axios.get(`booking-details/${params.id}`, {
      params: pagInfo
    })
    .then(res => {
      console.log(res.data)
      context.commit('SET_BOOKINGS', res.data)
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response.data.message)
        const error = new Error(err.response.data.message)
        throw error;
      } else {
        throw new Error('Error: No Response!')
      }
    })
  }
  },
  mutations: {
    SET_BOOKINGS(state, bookings) {
      state.bookings = bookings
    },
    SET_BOOKINGS_NOTIFICATION(state, notificationBookings) {
      state.notificationBookings = notificationBookings
    },
    bookingsByClubId(state, bookingsByClubId) {
      state.bookingsByClubId = bookingsByClubId
    },
    calendarBookings(state, bookings) {
      state.calendarBookings = bookings
    }
  },
  getters: {
    bookings(state) {
      return state.bookings;
    },
    notificationBookings(state) {
      return state.notificationBookings
    },
    calendarBookings(state) {
      return state.calendarBookings.map(booking => {
        return {
          id: booking.id,
          title: 'PN: ' + booking.pitch_detail.name,
          start: format(new Date(booking.play_date), 'yyyy-MM-dd') + 'T' + booking.time_in,
          end: format(new Date(booking.play_date), 'yyyy-MM-dd') + 'T' + booking.time_out,
          extendedProps: {
            pitchName: booking.pitch_detail.name,
            playDate: booking.play_date,
            timeIn: booking.time_in,
            timeOut: booking.time_out,
            totalHours: booking.total_hours,
            matchFinding: booking.match_finding,
            matchFindingStatus: booking.match_finding_status,
            paymentAmount: booking.payment_amount,
            paymentStatus: booking.payment_status,
            pitchDetail: booking.pitch_detail,
            user: booking.user
          }
        }
      })
    },
    getBookingsByClubId(state) {
      return state.bookingsByClubId
    }
  }
}