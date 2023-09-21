<template>
  <ConfirmDialog></ConfirmDialog>
  <div class="booking-card">
    <div class="left-section booking-card-left">
      <div class="detail user-info">
        <div class="user-img">
          <img src="../../assets/icons/username-icon.png" v-if="!booking.user.userProfile" />
          <img :src="booking.user.userProfile" v-else />
        </div>
        <div class="user-name">
          <p>{{ booking.user.first_name.toUpperCase() }} {{ booking.user.last_name.toUpperCase() }}</p>
        </div>
      </div>
      <div class="booking-info">
        <div class="booking-info-1 d-flex js-fs al-ct">
          <div class="detail timeInOut">
            <img src="../../assets/icons/time-in-out-icon.png" />
            <p>
              {{ timeIn }} - {{ timeOut }} {{ partOfDay }}
            </p>
          </div>
          <div class="detail totalPay">
            <img src="../../assets/icons/payment-icon.png" />
            <p>${{ booking.payment_amount.toFixed(2) }}</p>
          </div>
        </div>
        <div class="booking-info-1 d-flex js-fs al-ct">
          <div class="detail pitchNumber">
            <img src="../../assets/icons/pitch-number-icon.png" />
            <p>Pitch {{ booking.pitch_detail.name }}</p>
          </div>
          <div class="detail pitchNumber">
            <img src="../../assets/icons/time-in-out-icon.png" />
            <p>Duration {{ booking.total_hours }}h</p>
          </div>
        </div>
        <div class="booking-info-1 d-flex js-fs al-ct">
          <div class="detail steak">
            <img src="../../assets/icons/steak-icon.png" />
            <p>Match Finding Status: </p>
            <div :class="booking.match_finding === true ? 'match-finding-icon blue':'match-finding-icon red'">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmDialog from 'primevue/confirmdialog';
import axios from 'axios'

export default {
  props: ["booking"],
  components: {
    ConfirmDialog
  },
  setup(props) {
  },

  data() {
    return {
      changeScreen: false
    };
  },

  computed: {
    userFullName() {
      return this.booking.user.first_name + ' ' + this.booking.user.last_name
    },
    partOfDay() {
      if (parseInt(this.booking.time_out.substring(0, 2)) > 11) {
        return 'PM'
      } else {
        return 'AM'
      }
    },
    timeIn() {
      return this.booking.time_in.substring(0, 5)
    },
    timeOut() {
      return this.booking.time_out.substring(0, 5)
    },
    bookingHours() {
      return parseInt(this.booking.time_out.substring(0, 2)) - parseInt(this.booking.time_in.substring(0, 2))
    }
  },

  methods: {
    handleView() {
      this.changeScreen = window.innerWidth <= 1366;
    },
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
};
</script>

<style scoped>
.booking-card {
  background: #ffffff;
  padding: 20px 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  /* display: flex;
  align-items: center;
  justify-content: space-between; */
  transition: 0.1s ease-in-out;
}
.booking-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}
.user-name p {
  font-weight: 400;
  font-size: 3vh;
  margin-left: 12px;
}
.booking-card .detail {
  display: flex;
  align-items: center;
  width: fit-content;
}
.booking-card .detail:nth-child(odd) {
  margin-right: 2em;
}
.user-info {
  width: 100%;
}
.booking-card-left {
  width: 100%;
}
.booking-info {
  line-height: 4.5vh;
  margin-left: 12px;
}
.booking-info img {
  height: 2.5vh;
  margin-right: 12px;
}
.booking-info p {
  font-weight: 600;
}
.user-img img {
  height: 7vh;
  border-radius: 50%;
  filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.1));
}
.match-finding-icon {
  width: .8em;
  height: .8em;
  margin-left: .5em;
  background: chartreuse;
  border-radius: 50%;
  border: 1px solid var(--black);
}
.red {
  background: var(--red);
}
.blue {
  background: var(--real-blue);
}

/* responsive-mobile */
@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
}

/* responsive-tablet */
@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
}
</style>
