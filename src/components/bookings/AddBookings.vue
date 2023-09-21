<template>
  <div class="add-bookings-main">
  <!-- <h1>💥 Add New Booking</h1> -->

  <form @submit.prevent="handleAvailablePitch" >
    <div class="add-bookings-section" :class="[bookingDetail ? 'disabled-section':'']">
      <div class="add-bookings-row1">
        <div class="timein">
          <label for="timein">🕐 Pick a Time In:</label>
          <v-date-picker class="time-picker" mode="time" v-model="time_in" :timezone="timezone" :minute-increment="30" />
        </div>
        <div class="time-out">
          <label for="timeout">🕢 Pick a Time Out:</label>
          <v-date-picker class="time-picker" mode="time" v-model="time_out" :timezone="timezone" :minute-increment="30" />
        </div>
        <div class="play-date">
          <label for="timein">📆 Pick a Play Date:</label>
          <v-date-picker class="time-picker" v-model="play_date" mode="date" :min-date='new Date()'>
            <template v-slot="{ inputValue, inputEvents }">
              <input
                class="focus:outline-none focus:border-blue-300"
                :value="inputValue"
                v-on="inputEvents"
              />
            </template>
          </v-date-picker>
        </div>
        <div class="match-finding">
          <label for="match-finding">🥊 Match Finding?</label>
          <div class="match-finding-button">
            <div class="p-field-radiobutton opt1" v-for="cate in matchFindingCate" :key="cate.key">
              <RadioButton :id="cate.key" name="cate" :value="cate.value" v-model="matchFindingOption" />
              <label :for="cate.key">{{ cate.name }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="add-bookings-row3">
        <button>Find Available Pitches ⚽</button>
      </div>
    </div>
  </form>
  <div v-if="availablePitches" class="available-pitches-wrapper animate__animated animate__fadeInUp animate__fast">
  <h1 class="select-pitch-title" :class="[bookingDetail ? 'disabled-section':'']">
    🤙 Please Select an Available Pitch:
  </h1>
  <section :class="[bookingDetail ? 'disabled-section':'']">
    <div class="pick-plan-radio available-pitches" v-for="availablePitch in availablePitches" :key="availablePitch.id" @click="pitchSelection(availablePitch)" :availablePitch="availablePitch">
      <input type="radio" :id="availablePitch.id" :value="availablePitch.id" v-model="checkedPitch">
      <label :for="availablePitch.id">
        <div class="pitch-detail">
          <div class="pitch-name">
            <p>{{ availablePitch.name }}</p>
          </div>
          <div class="pitch-desc">
            <div class="pitch-cond">
              <span>Description:</span>
              <p>{{ availablePitch.description }}</p>
            </div>
            <div class="pitch-size">
              <span>Size:</span>
              <p>{{ availablePitch.size }}</p>
            </div>
          </div>
        </div>
        <div class="new-booking-button">
          <button :class="[bookingDetail ? 'disabled-section':'']" @click="handleAddBookings" v-if="selectedPitchId && selectedPitchId === availablePitch.id" class="animate__animated animate__bounceIn">Add New Booking 🥳</button>
        </div>
      </label>
    </div>
  </section>
  </div>
  <div v-if="availablePitches && availablePitches.length <= 0"
    class="available-pitches-wrapper no-available-pitch animate__animated animate__fadeInUp animate__fast">
    <span style="font-size: 5em;">😥🙏</span>
    <h1>No More Available Pitches,<br> Please Pick Other Play Time or Play Date...</h1>
  </div>
  <div class="available-pitches-wrapper no-available-pitch animate__animated animate__fadeInUp animate__fast" v-if="!availablePitches">
    <img src="../../assets/images/urban-line-coffee-break.svg" alt="urban-line-coffee-break">
    <h1>Please pick all kind of information above...🤗👏</h1>
  </div>
  <!-- <div id="aba_main_modal" class="aba-modal" v-if="abaInfo" style="display: none;">
    <div class="aba-modal-content">
      <form method="POST" target="aba_webservice" :action="abaInfo.abaUrl" id="aba_merchant_request">
        <input type="text" name="hash" :value="abaInfo.hash" id="hash"/>
				<input type="text" name="tran_id" :value="abaInfo.tran_id" id="tran_id"/>
				<input type="text" name="amount" :value="abaInfo.amount" id="amount"/>
				<input type="text" name="firstname" :value="abaInfo.first_name"/>
				<input type="text" name="lastname" :value="abaInfo.last_name"/>
				<input type="text" name="phone" :value="abaInfo.phone_num"/>
				<input type="text" name="email" :value="abaInfo.email"/>
				<input type="text" name="return_url" :value="abaInfo.return_url"/>
      </form>
    </div>
  </div> -->
  </div>
  <div class="receipt-position">
  <transition
  mode="out-in"
  enter-active-class="animate__animated animate__slideInDown animate__fast"
  leave-active-class="nimate__animated animate__slideOutUp animate__fast">
  <div class="receipt-section" v-if="showReceipt">
    <div class="receipt-title">
      <div class="receipt-title-desc">
        <svg
              width="22"
              height="25"
              viewBox="0 0 22 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.2 9.12118H8.40001C7.74001 9.12118 7.20001 8.58118 7.20001 7.92118C7.20001 7.26118 7.74001 6.72118 8.40001 6.72118H13.2C13.86 6.72118 14.4 7.26118 14.4 7.92118C14.4 8.58118 13.86 9.12118 13.2 9.12118Z"
                fill="#222325"
              />
              <path
                d="M13.2 12.7212H8.40001C7.74001 12.7212 7.20001 12.1812 7.20001 11.5212C7.20001 10.8612 7.74001 10.3212 8.40001 10.3212H13.2C13.86 10.3212 14.4 10.8612 14.4 11.5212C14.4 12.1812 13.86 12.7212 13.2 12.7212Z"
                fill="#222325"
              />
              <path
                d="M19.8 2.52118L18 0.721176L16.2 2.52118L14.4 0.721176L12.6 2.52118L10.8 0.721176L9 2.52118L7.2 0.721176L5.4 2.52118L3.6 0.721176V17.5212H1.2C0.54 17.5212 0 18.0612 0 18.7212V21.1212C0 23.1132 1.608 24.7212 3.6 24.7212H18C19.992 24.7212 21.6 23.1132 21.6 21.1212V0.721176L19.8 2.52118ZM14.4 22.3212H3.6C2.94 22.3212 2.4 21.7812 2.4 21.1212V19.9212H6H10.8H14.4V22.3212ZM19.2 21.1212C19.2 21.7812 18.66 22.3212 18 22.3212C17.34 22.3212 16.8 21.7812 16.8 21.1212V18.7212C16.8 18.0612 16.26 17.5212 15.6 17.5212H13.2H10.8H6V4.32118H19.2V21.1212Z"
                fill="#222325"
              />
              <path
                d="M16.8 9.12118C17.4627 9.12118 18 8.58392 18 7.92118C18 7.25843 17.4627 6.72118 16.8 6.72118C16.1372 6.72118 15.6 7.25843 15.6 7.92118C15.6 8.58392 16.1372 9.12118 16.8 9.12118Z"
                fill="#222325"
              />
              <path
                d="M16.8 12.7212C17.4627 12.7212 18 12.1839 18 11.5212C18 10.8584 17.4627 10.3212 16.8 10.3212C16.1372 10.3212 15.6 10.8584 15.6 11.5212C15.6 12.1839 16.1372 12.7212 16.8 12.7212Z"
                fill="#222325"
              />
        </svg>
        <h1>Booking Receipt</h1>
      </div>
      <!-- <span>${{ bookingDetail.payment_amount.toFixed(2) }}</span> -->
    </div>
    <div class="receipt-info">
        <div>
          <span>⚽ Pitch Number:</span>
          <p>#{{ selectedPitchId }}</p>
        </div>
        <div>
          <span>🥊 Match Finding:</span>
          <p>{{ matchFindingOption }}</p>
        </div>
        <!-- <div>
          <span>📆 Created At:</span>
          <p>{{ format(new Date(bookingDetail.createdAt), 'dd MMMM yyyy') }}</p>
        </div> -->
        <div>
          <span>👊 Play Date:</span>
          <p>0{{ format(new Date(play_date), 'yyyy-MM-dd') }}</p>
        </div>
        <div>
          <span>🕒 Time In:</span>
          <p>{{ format(new Date(time_in), 'k:mm:ss') }}</p>
        </div>
        <div>
          <span>🕢 Time Out:</span>
          <p>{{ format(new Date(time_out), 'k:mm:ss') }}</p>
        </div>
    </div>
    <div class="checkout-section">
      <button class="cancel-checkout" @click="showReceipt = false" >Cancel ❌</button>
      <button id="checkout_button" @click="checkout" value="Checkout Now">Confirm ✔️</button>
    </div>
  </div>
  </transition>
  </div>
</template>
<script>
import { format } from 'date-fns'
import RadioButton from 'primevue/radiobutton';
import axios from 'axios';

export default {
  components: {
    // Calendar,
    RadioButton
  },
  data() {
    let time_in = new Date();
    time_in.setMinutes(0, 0, 0);

    let time_out = new Date();
    time_out.setHours( time_in.getHours() + 1 )
    time_out.setMinutes(0, 0, 0);
    return {
      time_in,
      time_out,
      play_date: new Date(),
      matchFindingOption: null,
      timezone: '',
      token: null,
      showReceipt: false,
      // abaInfo: null,
      availablePitches: null,
      checkedPitch: null,
      selectedPitchId: null,
      matchFindingCate: [
        { name: 'Yes 👌', key: 'y', value: 'true' },
        { name: 'No 🤞', key: 'n', value: 'false' }
      ]
    }
  },
  computed: {
  },
  setup() {
    return { format }
  },
  methods: {
    async checkout() {
      // AbaPayway.checkout();
      const newBookingData = {
        match_finding_status: "None",
        match_finding: this.matchFindingOption,
        time_in: format(new Date(this.time_in), 'k:mm:ss'),
        time_out: format(new Date(this.time_out), 'k:mm:ss'),
        play_date: format(new Date(this.play_date), 'yyyy-MM-dd'),
        pitchDetailId: this.selectedPitchId
      }
      await axios.post('booking-details', newBookingData)
      .then((res) => {
        this.$store.dispatch('bookings/getBookings', JSON.parse(localStorage.getItem('bookingsPagInfo')))
        this.showReceipt = false
        this.$router.go()
        // this.abaInfo = res.data.abaInfo
        // console.log(this.abaInfo)
      })
      .catch(err => {
        if (err.response) {
        this.toast(err.response.data.message, 3000, 'error')
        } else {
          this.toast('Error: No response!', 3000, 'error')
        }
      })
    },
    pitchSelection(availablePitch) {
      this.selectedPitchId = availablePitch.id
    },
    async handleAvailablePitch() {
      console.log('find available pitches')
      if (format(new Date(this.time_in), 'k:mm:ss') === format(new Date(this.time_out), 'k:mm:ss')) {
        this.toast(`TIME IN and TIME OUT can not be the same 🙏`, 5000, 'error')
        return
      } else if (format(new Date(this.time_in), 'kk') >= format(new Date(this.time_out), 'kk')) {
        this.toast(`TIME IN must be smaller than TIME OUT 🙏`, 5000, 'error')
        return
      } else if (!this.matchFindingOption) {
        this.toast(`Must choose one of Match Finding Option 🙏`, 5000, 'error')
        return
      }
      await axios.get(`booking-details/get-available-pitch/${format(new Date(this.play_date), 'yyyy-MM-dd')}/${format(new Date(this.time_in), 'k:mm:ss')}/${format(new Date(this.time_out), 'k:mm:ss')}`)
      .then((res) => {
        console.log(res.data)
        this.availablePitches = res.data
      })
    },
    async handleAddBookings() {
      this.showReceipt = true
    },
  },
  created() {
    this.token = localStorage.getItem('accessToken')
    this.matchFindingOption = this.matchFindingCate[1].value

    // var start = this.$moment('2021-12-13'),
    //     end = this.$moment('2022-01-30'),
    //     day = [1, 3];
    // var result = [];
    // var current = start.clone();
    // while(current.day(7 + day[0]).isSameOrBefore(end)) { 
    //     result.push(current.clone());
    //   }
    // var formatedResult = result.map(m => m.format('LLLL'))
    // console.log(formatedResult)
  },
}
</script>
<style>
.time-picker button {
  margin: 0;
}
.time-picker input {
  width: 100%;
  height: 2.8em;
  border-radius: 10px;
  font-size: 1.5em;
  font-family: "Titillium Web", sans-serif;
  font-weight: 600;
}
.time-picker input:hover {
  box-shadow: -5px 5px 0px rgba(0, 0, 0, 0.1);
}
.add-bookings-row1 {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 2em;
  margin: 0 auto;
}
.add-bookings-row3 {
  margin-top: 1em;
  text-align: center;
}
.add-bookings-row3 button {
  border-radius: 30px;
  margin: 0;
}
.timein,
.time-out,
.play-date,
.match-finding {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.match-finding-button {
  display: flex;
  padding-top: .5em;
  align-items: center;
  justify-content: flex-start;
}
.p-field-radiobutton {
  align-items: center;
}
.opt1 {
  margin-right: 1.5em;
}
.add-bookings-section label {
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: .5em;
}
.receipt-info {
  width: 60%;
  margin: 0 auto;
  text-align: center;
  padding: 2em 0; 
}
.checkout-section {
  text-align: center;
}
.checkout-section button:first-child {
  margin-right: 2em;
}
.available-pitches-wrapper {
  padding-bottom: 5em;
}
.add-bookings-main {
  width: 80%;
  margin: 0 auto;
  margin: 0 auto 2em auto;
}
.add-bookings-section {
  width: 100%;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 2em 2em;
}
.add-new-booking-title {
  text-align: center;
  font-size: 1.5em;
}
.time-out {
  margin-left: 0;
}

section {
  width: 90%;
  margin: 1.5em auto 0 auto;
}

.no-available-pitch {
  text-align: center;
  text-transform: capitalize;
}
.no-available-pitch img {
  width: 30em;
}

/* radio-button styles */
section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 2em;
}
.available-pitches input[type="radio"] {
	display: none;
}
.available-pitches input[type="radio"]:not(:disabled) ~ label {
	cursor: pointer;
}
.available-pitches label {
	height: 100%;
	display: block;
	background: white;
	border: 2px solid var(--black);
	border-radius: 20px;
	padding: 1em .5em;
	/* margin-bottom: 1rem; */
	text-align: center;
	/* box-shadow: 0px 3px 10px -2px rgba(161, 170, 166, 0.5); */
	position: relative;
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.available-pitches label:hover {
  transform: scale(1.05);
}
.pitch-detail {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
}
.pitch-name {
  width: 30%;
}
.pitch-name p {
  font-size: 4em;
  font-weight: 700;
  -webkit-text-stroke: var(--black);
  -webkit-text-fill-color: var(--white);
  -webkit-text-stroke-width: 1.5px;
}
.pitch-desc {
  align-items: flex-start;
  text-align: left;
  padding-left: .5em; 
  width: 70%;
}
.pitch-desc div span {
  font-size: 1em;
  font-style: italic;
}
.pitch-desc div {
  text-align: left;
  width: 100%;
}
.pitch-desc div p {
  font-size: 1.2em;
  font-weight: 600;
  /* word-wrap: break-word; */
  /* white-space: nowrap; */
  display: flex;
  flex-wrap: nowrap;
}
.available-pitches input[type="radio"]:checked + label {
	background: var(--white);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
	color: var(--black);
  border: 4px solid var(--blue);
}
.available-pitches input[type="radio"]:checked + label::after {
	border: 4px solid var(--blue);
	content: "⚽";
	font-size: 1.5em;
	position: absolute;
	top: -1.2em;
	left: 50%;
	transform: translateX(-50%);
	height: 50px;
	width: 50px;
	line-height: 45px;
	text-align: center;
	border-radius: 50%;
	background: white;
	box-shadow: 0px 2px 5px -2px rgba(0, 0, 0, 0.25);
}
.new-booking-button button {
  margin: 0;
  border: 4px solid var(--blue);
  text-transform: uppercase;
}

.receipt-section {
  background: #fff;
  color: var(--black);
  /* border: 2 px dashed var(--black); */
  border-bottom: 3px dashed var(--black);
  border-top: 3px dashed var(--black);
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.receipt-position {
  width: 40%;
  height: auto;
  position: fixed;
  transform: translate(-50%, 0%);
  top: 0;
  left: 50%;
  right: 50%;
  z-index: 1000;
}
.disabled-section {
  pointer-events: none;
  opacity: .5;
}
.receipt-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: .5em;
  border-bottom: 2px dashed var(--black);
}
.receipt-title span {
  font-size: 2.5em;
  font-weight: 900;
  -webkit-text-fill-color: var(--black);
  /* text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); */
  /* -webkit-text-stroke-color: var(--blue); */
  /* -webkit-text-stroke-width: 1px; */
}
.receipt-title-desc {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.receipt-title h1 {
  font-size: 2em;
  margin-left: .5em
}
.receipt-info {
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: .5em;
  grid-row-gap: 1.5em;
  align-items: flex-start;
  text-align: left;
}
.receipt-info div {
  /* border-bottom: 1px dashed var(--black); */
}
.receipt-info div:nth-child(2),
.receipt-info div:nth-child(5) {
  text-align: center;
  text-transform: uppercase;
}
.receipt-info div:nth-child(3),
.receipt-info div:nth-child(6) {
  text-align: right;
}
.receipt-info span {
  font-size: 1em;
  text-transform: capitalize;
}
.receipt-info p {
  font-size: 1.42em;
  font-weight: 600;
}

.aba-modal {
  background: rgba(0, 0, 0, 0.1);
  padding-top: 3em;
}

@media only screen and (max-width: 700px) {
	section {
		flex-direction: column;
	}
}
</style>