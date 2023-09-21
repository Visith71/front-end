<template>
  <div class="calendar-main">
    <div class="calendar-section">
      <div class="title-section">
        <div class="page-name calendar-title">
          <div class="calendar-title-left">
            <img src="../assets/icons/calendar-icon.png" />
            <h1>Calendar</h1>
          </div>
          <div class="calendar-title-right">
            <div :class="!isAdmin ? 'visibility-hidden':'calendar-title-right-input'">
              <h1 v-if="selectedClub && selectedClub.name">{{ selectedClub.name }}</h1>
              <ClubAutoComplete 
                :getAllSportClubs="getAllSportClubs"
                @emitSelectedClub="getSelectedClub"
                :selected="selectedClub"
                @clearAutoComplete="clearAutoComplete"
              />
            </div>
            <div class="calendar-views" @click="handleNewBooking">
              <button>NEW BOOKING 🧤⚽</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-section calendar-section animate__animated animate__fadeInUp" v-if="!isAdmin || (selectedClub && selectedClub.id && isAdmin)">
        <VCalendar
          @isAddEventSelected="isAddEventSelected"
          :getAllPitchesNameArr="getAllPitchesNameArr"
          :selectedClub="selectedClub"
        />
      </div>
      <div class="card-section no-calendar-data animate__animated animate__fadeInUp" v-else>
        <img src="../assets/images/urban-line-coffee-break.svg" alt="urban-line-coffee-break">
        <h1>Please Select A Club To Get Calendar Data 😃👏</h1>
      </div>
    </div>
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__slideInRight animate__faster"
      leave-active-class="animate__animated animate__slideOutRight animate__faster"
    >
      <div class="calendar-new-booking-card" v-show="showNewBooking">
        <div class="new-booking-card-title">
          <h1>New booking</h1>
          <h1 @click="closeNewBooking" class="close-new-booking">❌</h1>
        </div>
        <div class="new-booking-card-content">
          <div class="play-date">
            <label for="playDate">📆 Pick a Play Date:</label>
            <v-date-picker
              class="time-picker"
              v-model="playDate"
              mode="date"
              :min-date="new Date()"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <input
                  class="focus:outline-none focus:border-blue-300"
                  :value="inputValue"
                  v-on="inputEvents"
                />
              </template>
            </v-date-picker>
          </div>
          <div class="timein">
            <label for="timein">🕐 Pick a Time In:</label>
            <v-date-picker
              class="time-picker"
              mode="time"
              v-model="time_in"
              :timezone="timezone"
              :minute-increment="30"
            />
          </div>
          <div class="time-out">
            <label for="timeout">🕢 Pick a Time Out:</label>
            <v-date-picker
              class="time-picker"
              mode="time"
              v-model="time_out"
              :timezone="timezone"
              :minute-increment="30"
            />
          </div>
          <div class="match-finding">
            <label for="match-finding">🥊 Match Finding?</label>
            <div class="match-finding-button">
              <div
                class="p-field-radiobutton opt1"
                v-for="option in matchFindingOptions"
                :key="option.key"
              >
                <RadioButton
                  :id="option.key"
                  name="option"
                  :value="option"
                  v-model="matchFinding"
                />
                <label :for="option.key">{{ option.name }}</label>
              </div>
            </div>
          </div>
          <div class="match-available-match-button">
            <button @click="handleAvailablePitches">
              Find Available Pitches ⚽
            </button>
          </div>
        </div>
        <div
          v-if="availablePitches != null"
          class="available-pitches-wrapper animate__animated animate__fadeInUp animate__fast"
          ref="radioDiv"
        >
          <h1
            class="select-pitch-title"
            :class="[bookingDetail ? 'disabled-section' : '']"
          >
            🤙 Select a Pitch:
          </h1>
          <section :class="[bookingDetail ? 'disabled-section' : '']">
            <div
              class="pick-plan-radio available-pitches"
              v-for="availablePitch in availablePitches"
              :key="availablePitch.id"
              @click="pitchSelection(availablePitch)"
              :availablePitch="availablePitch"
            >
              <input
                type="radio"
                :id="availablePitch.id"
                :value="availablePitch.id"
                v-model="checkedPitch"
              />
              <label :for="availablePitch.id">
                <div class="pitch-detail">
                  <div class="pitch-name">
                    <p>PN: {{ availablePitch.name }}</p>
                  </div>
                </div>
              </label>
            </div>
          </section>
          <div class="new-booking-button">
            <button
              :class="[bookingDetail ? 'disabled-section' : '']"
              @click="handleAddBookings"
              v-if="selectedPitchId"
              class="animate__animated animate__bounceIn"
            >
              Select 🚩
            </button>
          </div>
        </div>
        <div
          v-if="availablePitches && availablePitches.length <= 0"
          class="available-pitches-wrapper no-available-pitch animate__animated animate__fadeInUp animate__fast"
        >
          <span style="font-size: 5em;">😥🙏</span>
          <h1>
            No More Available Pitches,<br />
            Please Pick Other Play Time or Play Date...
          </h1>
        </div>

        <div
          class="booking-confirm-info animate__animated animate__fadeInUp animate__fast"
          v-if="bookingDetail"
        >
          <div class="booking-confirm-info-title">
            <p>⚽ Booking Info:</p>
          </div>
          <div class="booking-confirm-info-content">
            <table>
              <tr>
                <td>
                  PN:
                </td>
                <td>
                  {{ bookingDetail.pitchDetailId }}
                </td>
              </tr>
              <tr>
                <td>
                  Play Date:
                </td>
                <td>
                  {{ bookingDetail.play_date }}
                </td>
              </tr>
              <tr>
                <td>
                  Time-in:
                </td>
                <td>
                  {{ bookingDetail.time_in }}
                </td>
              </tr>
              <tr>
                <td>
                  Time-out:
                </td>
                <td>
                  {{ bookingDetail.time_out }}
                </td>
              </tr>
              <tr>
                <td>
                  Match Finding:
                </td>
                <td>
                  {{ bookingDetail.match_finding }}
                </td>
              </tr>
              <tr>
                <td>
                  Total Hours:
                </td>
                <td>
                  {{ bookingDetail.total_hours }}
                </td>
              </tr>
              <tr>
                <td>
                  Payment Amount:
                </td>
                <td>${{ bookingDetail.payment_amount.toFixed(2) }}</td>
              </tr>
            </table>

            <button @click="checkout">Checkout 🥳</button>
          </div>
        </div>

        <div id="aba_main_modal" class="aba-modal" v-if="abaInfo">
          <div class="aba-modal-content">
            <form
              method="POST"
              target="aba_webservice"
              :action="abaInfo.abaUrl"
              id="aba_merchant_request"
            >
              <input type="text" name="hash" :value="abaInfo.hash" id="hash" />
              <input
                type="text"
                name="tran_id"
                :value="abaInfo.tran_id"
                id="tran_id"
              />
              <input
                type="text"
                name="amount"
                :value="abaInfo.amount"
                id="amount"
              />
              <input type="text" name="firstname" :value="abaInfo.first_name" />
              <input type="text" name="lastname" :value="abaInfo.last_name" />
              <input type="text" name="phone" :value="abaInfo.phone_num" />
              <input type="text" name="email" :value="abaInfo.email" />
              <input
                type="text"
                name="return_url"
                :value="abaInfo.return_url"
              />
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { watch } from "vue";
import { useRouter } from "vue-router";
import VCalendar from "../components/calendar/VCalendar.vue";
import RadioButton from "primevue/radiobutton";
import { format } from "date-fns";
import axios from "axios";
import ClubAutoComplete from '../components/main-component/clubAutoComplete.vue'
import { getAllClubs } from '../composable/mixins/getAllClub'

export default {
  mixins: [getAllClubs],
  components: {
    VCalendar,
    RadioButton,
    ClubAutoComplete
  },

  setup() {
    const router = useRouter();

    return { format };
  },
  data() {
    let time_in = new Date();
    time_in.setMinutes(0, 0, 0);

    let time_out = new Date();
    time_out.setHours(time_in.getHours() + 1);
    time_out.setMinutes(0, 0, 0);
    return {
      showNewBooking: false,
      playDate: new Date(),
      time_in,
      matchFinding: null,
      time_out,
      timezone: "",
      matchFindingOptions: [
        { name: "Yes 👌", key: "Y" },
        { name: "No 🤞", key: "N" },
      ],
      availablePitches: null,
      bookingDetail: null,
      selectedPitchId: null,
      checkedPitch: null,
      abaInfo: null,
      getAllPitchesNameArr: [],
      selectedClub: null
    };
  },
  methods: {
    checkout() {
      this.bookingDetail = false;
      AbaPayway.checkout();
    },
    pitchSelection(availablePitch) {
      this.selectedPitchId = availablePitch.id;
    },
    isAddEventSelected(selectedEventTimein, selectedEventTimeout) {
      this.showNewBooking = true;
      this.playDate = selectedEventTimein;
      this.time_in = selectedEventTimein;
      this.time_out = selectedEventTimeout;
      this.intervalId = setInterval(() => {
        if (window.pageYOffset === 0) {
          clearInterval(this.intervalId);
        }
        window.scroll(0, window.pageYOffset - 50);
      }, 20);
      $("body").addClass("stop-scrolling");
    },
    handleNewBooking() {
      this.showNewBooking = true;
      $("body").addClass("stop-scrolling");
    },
    closeNewBooking() {
      this.showNewBooking = false;
      $("body").removeClass("stop-scrolling");
    },
    async handleAvailablePitches() {
      const axiosConfig = {
        headers: {
          "x-access-token": `${localStorage.getItem("accessToken")}`,
        },
      };
      if (
        format(new Date(this.time_in), "k:mm:ss") ===
        format(new Date(this.time_out), "k:mm:ss")
      ) {
        console.log("can not be same timein and timeout");
        this.toast(`TIME IN and TIME OUT can not be the same 🙏`, 3000, 'error')
        return;
      } else if (
        format(new Date(this.time_in), "k") >=
        format(new Date(this.time_out), "k")
      ) {
        this.toast(`TIME IN must be smaller than TIME OUT 🙏`, 3000, 'error')
        return;
      }
      await axios
        .get(
          `booking-details/get-available-pitch/${format(
            new Date(this.playDate),
            "yyyy-MM-dd"
          )}/${format(new Date(this.time_in), "k:mm:ss")}/${format(
            new Date(this.time_out),
            "k:mm:ss"
          )}`,
          axiosConfig
        )
        .then((res) => {
          this.availablePitches = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.message);
          } else {
            console.log("No response!");
          }
        });
    },
    async handleAddBookings() {
      const thisMatchFinding = null;
      if (this.matchFinding === "Yes 👌") {
        this.thisMatchFinding = true;
      } else {
        this.thisMatchFinding = false;
      }
      const newBookingData = {
        match_finding_status: "None",
        match_finding: this.thisMatchFinding,
        time_in: format(new Date(this.time_in), "k:mm:ss"),
        time_out: format(new Date(this.time_out), "k:mm:ss"),
        play_date: format(new Date(this.playDate), "yyyy-MM-dd"),
        pitchDetailId: this.selectedPitchId,
      };
      const axiosConfig = {
        headers: {
          "x-access-token": `${localStorage.getItem("accessToken")}`,
        },
      };
      await axios
        .post(
          "booking-details",
          newBookingData,
          axiosConfig
        )
        .then((res) => {
          console.log(res.data);
          this.$store.dispatch("bookings/getBookings");

          this.bookingDetail = res.data.bookingData;
          this.abaInfo = res.data.abaInfo;
          // console.log(this.abaInfo)
        })
        .catch((err) => {
          if (err.response) {
            this.toast(err.response.data.message, 3000, 'error')
          } else {
            console.log("No response");
          }
        });
    },
  },
  watch: {
    getPitchesNameByClubId(curValue) {
      this.getAllPitchesNameArr = curValue.map(pitch => {
          return pitch.name
      })
    },
    selectedClub(curValue) {
      try {
        this.$store.dispatch("pitches/getAllPitchesName", curValue.id);
      } catch(err) {
        console.log(err)
      }
    }
  },
  computed: {
    getPitchesNameByClubId() {
      return this.$store.getters['pitches/getPitchesNameByClubId']
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollListener);
    if (!this.isAdmin) {
      try {
        this.$store.dispatch("pitches/getAllPitchesName");
      } catch(err) {
        console.log(err)
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollListener);
  },
  created() {
    this.matchFinding = this.matchFindingOptions[1];
  },
};
</script>

<style scoped>
.aba-modal {
  display: none;
}
.animate__animated.animate__fadeInUp {
  --animated-duration: 1.5s;
}
.calendar-main {
  height: auto;
  padding-bottom: 5em;
  position: relative;
}
.title-section {
  width: 85%;
  margin: 0 auto;
}
.no-calendar-data {
  text-align: center;
}
.no-calendar-data img {
  width: 30em;
}
.calendar-title {
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
}
.calendar-title-right,
.calendar-title-right-input {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.calendar-title-right-input h1 {
  padding-right: .5em;
}
.calendar-title-left {
  display: flex;
  align-items: center;
}
.calendar-title-left > h1 {
  margin-left: 0.5em;
  font-size: 2.5em;
}
.calendar-title-left > img {
  height: 2.5em;
  height: auto;
}
.calendar-views button {
  margin: 0;
  margin-left: .5em;
}
.card-section {
  width: 85%;
  margin: 0 auto;
  padding: 0;
  margin-top: 2em;
}
.calendar-new-booking-card {
  position: fixed;
  padding: 2em;
  top: 0;
  right: 0;
  height: 100vh;
  width: 25%;
  background: var(--white);
  border-radius: 10px 0 0px 10px;
  box-shadow: -5px 4px 20px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1000;
}
.new-booking-card-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.close-new-booking {
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.close-new-booking:hover {
  transform: scale(1.1) rotateZ(270deg);
}
.new-booking-card-content {
  width: 90%;
  margin: 0 auto;
}
.new-booking-card-content div label {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.new-booking-card-content div:not(:first-child) label {
  margin-top: 1em;
}
.new-booking-card-content div:last-child label {
  margin-bottom: 0em;
}
.time-picker {
  width: 100%;
  justify-content: center;
}
.time-picker input {
  font-size: 1.2em;
  height: auto;
  width: 100%;
  text-align: center;
}
.match-finding-button {
  margin-top: 0;
  justify-content: center;
  width: 100%;
}
.match-available-match-button {
  text-align: center;
  margin-top: 1em;
}
.pitch-name {
  width: 100%;
}
.pitch-name p {
  font-size: 1.8em;
  -webkit-text-stroke-width: 1px;
}
.select-pitch-title {
  font-size: 1.2em;
}
section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 1em;
}
.available-pitches label {
  padding: 0;
  border-radius: 10px;
}
.available-pitches input[type="radio"]:checked + label::after {
  border: 2px solid var(--blue);
  display: none;
}
.available-pitches input[type="radio"]:checked + label {
  padding: 0;
  border: 3px solid var(--blue);
}
.new-booking-button {
  margin-top: 1em;
  text-align: center;
}
.available-pitches-wrapper {
  padding-bottom: 0;
  margin-bottom: 1em;
}
.new-booking-button button {
  border: 3px solid var(--blue);
}
.p-field-checkbox,
.p-field-radiobutton {
  display: block;
}
.booking-confirm-info-title p {
  font-size: 1.2em;
  font-weight: 600;
}
.booking-confirm-info-content {
  text-align: center;
}
.booking-confirm-info-content button {
  margin-top: 1em;
}
.booking-confirm-info-content table {
  margin-top: 1em;
  border-radius: 10px;
  border: 1px solid var(--real-blue);
}
.booking-confirm-info-content table tr td:nth-child(2) {
  font-weight: 600;
}
.booking-confirm-info-content table tr {
  cursor: auto;
}
.booking-confirm-info-content table tr:hover {
  border: 0;
}
</style>
