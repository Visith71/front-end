<template>
  <div class="bookings-cards" v-if="bookings.items">
    <div v-for="booking in bookings.items" :key="booking.id">
      <SingleNewBookings :booking="booking" />
    </div>
  </div>
  <div class="bookings-cards no-today-bookings" v-else>
    <img src="../../assets/images/urban-line-510.svg" alt="pitchbooker_no_today_bookings" class="animate__animated animate__fadeInUp">
    <h1 class="animate__animated animate__fadeInUp">No bookings data for today yet...😥🙏</h1>
  </div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated } from "vue";
import SingleNewBookings from "./SingleNewBookings.vue";
import { format } from 'date-fns'

export default {
  props: ["bookings"],
  components: {
    SingleNewBookings,
  },
  data() {
    return {
    }
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
    },
    getSportClub() {
      return this.$store.getters.getSportClub;
    },
  }
};
</script>

<style>
.bookings-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 2em;
  width: 80%;
  margin: 0 auto;
}
.no-today-bookings {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 0;
}
.no-today-bookings img {
  width: 30em;
  margin: 0;
}
.no-today-bookings h1 {
  text-transform: capitalize;
}
@media screen and (max-width: 1024px) {
  .bookings-cards {
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(28vw, 1fr));
  }
}
</style>