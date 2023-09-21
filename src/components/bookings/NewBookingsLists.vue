<template>
  <div class="bookings-lists" v-if="bookings.items">
    <div v-for="booking in bookings.items" :key="booking.id">
    <SingleNewBookingsList :booking="booking" />
    </div>
  </div>
  <div class="bookings-lists no-today-bookings" v-else>
    <img src="../../assets/images/urban-line-510.svg" alt="pitchbooker_no_today_bookings" class="animate__animated animate__fadeInUp">
    <h1 class="animate__animated animate__fadeInUp">No bookings data for today yet...😥🙏</h1>
  </div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated } from 'vue'
import SingleNewBookingsList from './SingleNewBookingsList.vue' 
import { format } from 'date-fns'

 export default {
  props: ['bookings'],
  components: {
   SingleNewBookingsList
  },
  setup() {
    return { format }
  },
  computed: {
    filterTodayBookingPaid() {
      return this.bookings.items.filter((booking) => {
        return booking.payment_status !== 'Unpaid'
      })
    },
    filterTodayBooking() {
      return this.filterTodayBookingPaid.filter((booking) => {
        let todayDate = format(new Date(), 'dd')
        let getBookingDay = format(new Date(booking.play_date), 'dd')
        
        return todayDate === getBookingDay
      })
    }
  }
 }
</script>

<style scoped>
.bookings-lists {
  display: grid;
  width: auto;
  grid-template-rows: repeat(auto-fit, minmax(auto 1fr));
  row-gap: 2em;
  height: auto;
  justify-items: center;
}
</style>