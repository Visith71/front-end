<template>
  <div class="main-notification">
    <div class="noti-title">
      <h2>🔔 Notifications</h2>
    </div>
    <table class="noti-table">
    <tr v-for="booking in bookings" :key="booking.id"
    :class="[booking.read ? 'read':'unread']">
      <td @click="openBooking(booking)">
        <div>
          <p>New from:</p>
          <h3>{{ booking.user.first_name }} {{ booking.user.last_name }}</h3>
        </div>
      </td>
      <td @click="openBooking(booking)">
        <div class="time">
          <p>Time in:</p>
          <h3>{{ booking.time_in.substring(0, 5) }} {{ parseInt(booking.time_in.substring(0, 2)) > 11 ? 'PM':'AM' }}</h3>
        </div>
      </td>
      <td @click="openBooking(booking)">
        <div class="time">
          <p>Time out:</p>
          <h3>{{ booking.time_out.substring(0, 5) }} {{ parseInt(booking.time_out.substring(0, 2)) > 11 ? 'PM':'AM' }}</h3>
        </div>
      </td>
      <td @click="openBooking(booking)">
        <p>{{ parseInt(booking.time_out.substring(0, 2)) - parseInt(booking.time_in.substring(0, 2)) }}h</p>
      </td>
    </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import { format } from 'date-fns'

export default {
  props: ['bookings'],
  setup() {
    return {
      format
    }
  },
  data() {
    return {
    }
  },
  methods: {
    async updateBooking(booking) {
    const axiosConfig = {
      headers: {
        'x-access-token': localStorage.getItem('accessToken')
      }
    }
      await axios.put('booking-details/' + booking.id, booking, axiosConfig)
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.noti-title {
  padding: 1em 1em;
}
.main-notification {
  background: #fff;
  width: auto;
  border-radius: 20px;
  z-index: 100;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding-bottom: 2em;

}
td {
  border: none;
  padding: .5em .8em;
}
tr h3 {
  font-weight: 500;
  font-size: 1em;
}
tr p {
  font-size: .8em;
}
tr:hover {
  border-bottom: 1px solid var(--black);
}
tr:nth-child(odd) {
  background: #fff;
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.paginator {
  width: 80%;
  font-size: 1em;
}
table tr.unread {
  border-left: 3px solid var(--black);
  background: #fbfbfb;
}
.read {
  border-bottom: .5px solid rgba(0, 0, 0, 0.1);
}
.unread h3,
.unread p {
  font-weight: 700;
}
</style>