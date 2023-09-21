<template>
  <ConfirmDialog></ConfirmDialog>
  <div class="booking-list">
    <div class="left-section">
      <img src="../../assets/icons/username-icon.png" v-if="!booking.user.userProfile" />
      <img :src="booking.user.userProfile" v-else />
      <p>{{ booking.user.first_name.toUpperCase() }} {{ booking.user.last_name.toUpperCase() }}</p>
    </div>

    <div class="middle-section">
      <div class="middle timeInOut">
        <img src="../../assets/icons/time-in-out-icon.png" />
        <p>
          {{ timeIn }} - {{ timeOut }} {{ partOfDay }}
        </p>
      </div>
      <div class="middle pitchNumber">
        <img src="../../assets/icons/pitch-number-icon.png" />
        <p>Pitch {{ booking.pitch_detail.name }}</p>
      </div>
      <div class="middle totalPrice">
        <img src="../../assets/icons/payment-icon.png" />
        <p>${{ booking.payment_amount }}</p>
      </div>
      <div class="middle steak">
        <img src="../../assets/icons/steak-icon.png" />
        <div :class="booking.match_finding === true ? 'match-finding-icon blue':'match-finding-icon red'">
        </div>
      </div>
    </div>

    <div class="right-section">
      <button class="hours" v-show="!changeScreen">
        {{ bookingHours }} hours
      </button>
      <button class="hours" v-show="changeScreen">{{ bookingHours }} h</button>
      <!-- <button class="delete" @click="handleDelete(booking)">
        ❌
      </button> -->
    </div>
  </div>
</template>
<script>
import ConfirmDialog from 'primevue/confirmdialog';
import axios from 'axios'

export default {
  components: {
    ConfirmDialog
  },
  props: ["booking"],
  setup(props) {
  },
  data() {
    return {
      changeScreen: false,
    };
  },

  methods: {
    handleView() {
      this.changeScreen = window.innerWidth <= 1366;
    },
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
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
  },
};
</script>

<style scoped>
.booking-list {
  display: flex;
  align-items: center;
  width: 100%;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  justify-content: space-between;
  padding: 10px 30px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}
.booking-list:hover {
  transform: scale(1.05);
}
.left-section {
  display: flex;
  align-items: center;
  padding: .5em 1em;
  background: #fff;
  border-radius: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-right: 1em;
}
.left-section img {
  margin-right: 10px;
  height: 5vh;
  border-radius: 50%;
}
.left-section p {
  font-weight: 400;
  font-size: 20px;
}
.middle-section {
  display: flex;
  align-items: center;
  width: auto;
  justify-content: space-between;
}
.middle {
  text-align: center;
  margin: 0 1.5em;
}
.middle img {
  height: 1.2em;
}
.middle p {
  font-weight: 700;
}
.right-section {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 1em;
}
.hours {
  height: auto;
  padding: 5px 20px;
  border-radius: 30px;
  background: var(--white);
  font-weight: 600;
  font-size: 18px;
  margin-right: .5em;
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
}
.match-finding-icon {
  width: .8em;
  height: .8em;
  margin-left: .5em;
  background: var(--white);
  margin-right: .5em;
  border-radius: 50%;
  border: 1px solid var(--black);
}
.red {
  background: var(--red);
}
.blue {
  background: var(--real-blue);
}

@media screen and (max-width: 1366px) {
  .left-section img {
    height: 4vh;
  }

  .left-section p {
    font-size: 1.5vw;
  }

  .middle {
    font-size: 1vw;
  }

  .hours {
    /* background: red; */
    display: inline;
    font-size: 1.5vh;

    padding: 1vh 1.5vw;
  }

  .detail {
    font-size: 1vw;
  }
}

@media screen and (max-width: 880px) {
  .middle img {
    display: none;
  }
  .middle p {
    font-size: 1.2vh;
  }
  .middle-section {
    display: none;
    display: block;
    margin-left: 10%;
  }

  .middle-section p {
    text-align: start;
  }

  .left-section img {
    display: none;
    height: 4vh;
  }

  .left-section p {
    font-size: 1.5vh;
  }
}
</style>