<template>
  <div class="pitch-detail-display">
   <div class="pitch-detail-title add-pitch-title">
    <h1>🏁 Pitch Number:</h1>
    <input type="text" v-model="pitchNumber" ref="number">
   </div>
   <div class="pitch-detail-row01">
    <div class="pitch-size add-pitch-size">
     <h1>⚽</h1>
     <h2> Pitch Size:</h2>
     <textarea name="pitchSize" v-model="pitchSize" ref="size"></textarea>
    </div>
    <div class="pitch-condition add-pitch-condition">
     <h1>🥊</h1>
     <h2>Pitch Condition:</h2>
     <textarea name="pitchCondition" v-model="pitchCondition" ref="desc"></textarea>

    </div>
   </div>
   <div class="pitch-detail-row02">
    <h1>🤑</h1>
    <h2>Pitch Price:</h2>
    <div class="pitch-price">
     <div class="weekday">
      <h3>👔 Weekday:</h3>
      <div class="morning">
       <div class="timein weekday-morning-timein add-timein">
        <h3>Morning</h3>
       <p v-for="morningTimeIn in timeIn.morning" :key="morningTimeIn">{{ morningTimeIn }}</p>
      </div>
      <div class="timeout weekday-morning-timeout add-timeout">
       <p v-for="morningTimeOut in timeOut.morning" :key="morningTimeOut">- {{ morningTimeOut }}</p>
      </div>
      <div class="price weekday-morning-price add-price">
       <input type="text" v-model="weekdayMorning05">
       <input type="text" v-model="weekdayMorning01">
       <input type="text" v-model="weekdayMorning02">
       <input type="text" v-model="weekdayMorning03">
       <input type="text" v-model="weekdayMorning04">
      </div>
      </div>
      <div class="afternoon">
       <div class="timein weekday-afternoon-timein add-timein">
        <h3>Afternoon</h3>
       <p v-for="afternoonTimeIn in timeIn.afternoon" :key="afternoonTimeIn">{{ afternoonTimeIn }}</p>
       </div>
       <div class="timeout weekday-afternoon-timeout add-timeout">
        <p v-for="afternoonTimeOut in timeOut.afternoon" :key="afternoonTimeOut">- {{ afternoonTimeOut }}</p>
       </div>
      <div class="price weekday-afternoon-price add-price">
       <input type="text" v-model="weekdayAfternoon01">
       <input type="text" v-model="weekdayAfternoon02">
       <input type="text" v-model="weekdayAfternoon03">
       <input type="text" v-model="weekdayAfternoon04">
      </div>
      </div>
      <div class="evening">
       <div class="timein weekday-evening-timein add-timein">
        <h3>Evening</h3>
       <p v-for="eveningTimeIn in timeIn.evening" :key="eveningTimeIn">{{ eveningTimeIn }}</p>
      </div>
      <div class="timeout weekday-evening-timeout add-timeout">
       <p v-for="eveningTimeOut in timeOut.evening" :key="eveningTimeOut">- {{ eveningTimeOut }}</p>
      </div>
      <div class="price weekday-evening-price add-price">
       <input type="text" v-model="weekdayEvening01">
       <input type="text" v-model="weekdayEvening02">
      </div>
      </div>
      <div class="night">
       <div class="timein weekday-night-timein add-timein">
        <h3>Night</h3>
       <p v-for="nightTimeIn in timeIn.night" :key="nightTimeIn">{{ nightTimeIn }}</p>
      </div>
      <div class="timeout weekday-night-timeout add-timeout">
       <p v-for="nightTimeOut in timeOut.night" :key="nightTimeOut">- {{ nightTimeOut }}</p>
      </div>
      <div class="price weekday-night-price add-price">
       <input type="text" v-model="weekdayNight01">
       <input type="text" v-model="weekdayNight02">
       <input type="text" v-model="weekdayNight03">
       <input type="text" v-model="weekdayNight04">
       <input type="text" v-model="weekdayNight05">
      </div>
      </div>
     </div>
     <div class="saturday">
      <h3>🧦 Saturday:</h3>
      <div class="morning">
       <div class="timein weekday-morning-timein add-timein">
        <h3>Morning</h3>
       <p v-for="morningTimeIn in timeIn.morning" :key="morningTimeIn">{{ morningTimeIn }}</p>
      </div>
      <div class="timeout weekday-morning-timeout add-timeout">
       <p v-for="morningTimeOut in timeOut.morning" :key="morningTimeOut">- {{ morningTimeOut }}</p>
      </div>
      <div class="price weekday-morning-price add-price">
       <input type="text" v-model="saturdayMorning05">
       <input type="text" v-model="saturdayMorning01">
       <input type="text" v-model="saturdayMorning02">
       <input type="text" v-model="saturdayMorning03">
       <input type="text" v-model="saturdayMorning04">
      </div>
      </div>
      <div class="afternoon">
       <div class="timein weekday-afternoon-timein add-timein">
        <h3>Afternoon</h3>
       <p v-for="afternoonTimeIn in timeIn.afternoon" :key="afternoonTimeIn">{{ afternoonTimeIn }}</p>
       </div>
       <div class="timeout weekday-afternoon-timeout add-timeout">
        <p v-for="afternoonTimeOut in timeOut.afternoon" :key="afternoonTimeOut">- {{ afternoonTimeOut }}</p>
       </div>
      <div class="price weekday-afternoon-price add-price">
       <input type="text" v-model="saturdayAfternoon01">
       <input type="text" v-model="saturdayAfternoon02">
       <input type="text" v-model="saturdayAfternoon03">
       <input type="text" v-model="saturdayAfternoon04">
      </div>
      </div>
      <div class="evening">
       <div class="timein weekday-evening-timein add-timein">
        <h3>Evening</h3>
       <p v-for="eveningTimeIn in timeIn.evening" :key="eveningTimeIn">{{ eveningTimeIn }}</p>
      </div>
      <div class="timeout weekday-evening-timeout add-timeout">
       <p v-for="eveningTimeOut in timeOut.evening" :key="eveningTimeOut">- {{ eveningTimeOut }}</p>
      </div>
      <div class="price weekday-evening-price add-price">
       <input type="text" v-model="saturdayEvening01">
       <input type="text" v-model="saturdayEvening02">
      </div>
      </div>
      <div class="night">
       <div class="timein weekday-night-timein add-timein">
        <h3>Night</h3>
       <p v-for="nightTimeIn in timeIn.night" :key="nightTimeIn">{{ nightTimeIn }}</p>
      </div>
      <div class="timeout weekday-night-timeout add-timeout">
       <p v-for="nightTimeOut in timeOut.night" :key="nightTimeOut">- {{ nightTimeOut }}</p>
      </div>
      <div class="price weekday-night-price add-price">
       <input type="text" v-model="saturdayNight01">
       <input type="text" v-model="saturdayNight02">
       <input type="text" v-model="saturdayNight03">
       <input type="text" v-model="saturdayNight04">
       <input type="text" v-model="saturdayNight05">
      </div>
      </div>
     </div>
     <div class="sunday">
      <h3>🧧 Sunday:</h3>
      <div class="morning">
       <div class="timein weekday-morning-timein add-timein">
        <h3>Morning</h3>
       <p v-for="morningTimeIn in timeIn.morning" :key="morningTimeIn">{{ morningTimeIn }}</p>
      </div>
      <div class="timeout weekday-morning-timeout add-timeout">
       <p v-for="morningTimeOut in timeOut.morning" :key="morningTimeOut">- {{ morningTimeOut }}</p>
      </div>
      <div class="price weekday-morning-price add-price">
       <input type="text" v-model="sundayMorning05">
       <input type="text" v-model="sundayMorning01">
       <input type="text" v-model="sundayMorning02">
       <input type="text" v-model="sundayMorning03">
       <input type="text" v-model="sundayMorning04">
      </div>
      </div>
      <div class="afternoon">
       <div class="timein weekday-afternoon-timein add-timein">
        <h3>Afternoon</h3>
       <p v-for="afternoonTimeIn in timeIn.afternoon" :key="afternoonTimeIn">{{ afternoonTimeIn }}</p>
       </div>
       <div class="timeout weekday-afternoon-timeout add-timeout">
        <p v-for="afternoonTimeOut in timeOut.afternoon" :key="afternoonTimeOut">- {{ afternoonTimeOut }}</p>
       </div>
      <div class="price weekday-afternoon-price add-price">
       <input type="text" v-model="sundayAfternoon01">
       <input type="text" v-model="sundayAfternoon02">
       <input type="text" v-model="sundayAfternoon03">
       <input type="text" v-model="sundayAfternoon04">
      </div>
      </div>
      <div class="evening">
       <div class="timein weekday-evening-timein add-timein">
        <h3>Evening</h3>
       <p v-for="eveningTimeIn in timeIn.evening" :key="eveningTimeIn">{{ eveningTimeIn }}</p>
      </div>
      <div class="timeout weekday-evening-timeout add-timeout">
       <p v-for="eveningTimeOut in timeOut.evening" :key="eveningTimeOut">- {{ eveningTimeOut }}</p>
      </div>
      <div class="price weekday-evening-price add-price">
       <input type="text" v-model="sundayEvening01">
       <input type="text" v-model="sundayEvening02">
      </div>
      </div>
      <div class="night">
       <div class="timein weekday-night-timein add-timein">
        <h3>Night</h3>
       <p v-for="nightTimeIn in timeIn.night" :key="nightTimeIn">{{ nightTimeIn }}</p>
      </div>
      <div class="timeout weekday-night-timeout add-timeout">
       <p v-for="nightTimeOut in timeOut.night" :key="nightTimeOut">- {{ nightTimeOut }}</p>
      </div>
      <div class="price weekday-night-price add-price">
       <input type="text" v-model="sundayNight01">
       <input type="text" v-model="sundayNight02">
       <input type="text" v-model="sundayNight03">
       <input type="text" v-model="sundayNight04">
       <input type="text" v-model="sundayNight05">
      </div>
      </div>
     </div>
    </div>
   </div>
   <div class="button-add">
     <button @click="handleDubPitch">⚡ Duplicate Pitch ⚽</button>
   </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  props: ['pitch'],
  setup({emit}) {
    const pitchNumber = ref('')
    const pitchSize = ref('')
    const pitchCondition = ref('')
    const weekdayMorning01 = ref('')
    const weekdayMorning02 = ref('')
    const weekdayMorning03 = ref('')
    const weekdayMorning04 = ref('')
    const weekdayMorning05 = ref('')
    const weekdayAfternoon01 = ref('')
    const weekdayAfternoon02 = ref('')
    const weekdayAfternoon03 = ref('')
    const weekdayAfternoon04 = ref('')
    const weekdayEvening01 = ref('')
    const weekdayEvening02 = ref('')
    const weekdayNight01 = ref('')
    const weekdayNight02 = ref('')
    const weekdayNight03 = ref('')
    const weekdayNight04 = ref('')
    const weekdayNight05 = ref('')
    const saturdayMorning01 = ref('')
    const saturdayMorning02 = ref('')
    const saturdayMorning03 = ref('')
    const saturdayMorning04 = ref('')
    const saturdayMorning05 = ref('')
    const saturdayAfternoon01 = ref('')
    const saturdayAfternoon02 = ref('')
    const saturdayAfternoon03 = ref('')
    const saturdayAfternoon04 = ref('')
    const saturdayEvening01 = ref('')
    const saturdayEvening02 = ref('')
    const saturdayNight01 = ref('')
    const saturdayNight02 = ref('')
    const saturdayNight03 = ref('')
    const saturdayNight04 = ref('')
    const saturdayNight05 = ref('')
    const sundayMorning01 = ref('')
    const sundayMorning02 = ref('')
    const sundayMorning03 = ref('')
    const sundayMorning04 = ref('')
    const sundayMorning05 = ref('')
    const sundayAfternoon01 = ref('')
    const sundayAfternoon02 = ref('')
    const sundayAfternoon03 = ref('')
    const sundayAfternoon04 = ref('')
    const sundayEvening01 = ref('')
    const sundayEvening02 = ref('')
    const sundayNight01 = ref('')
    const sundayNight02 = ref('')
    const sundayNight03 = ref('')
    const sundayNight04 = ref('')
    const sundayNight05 = ref('')

    const router = useRouter()

    return {
      emit,
      pitchNumber,
      pitchSize,
      pitchCondition,
      weekdayMorning01,
      weekdayMorning02,
      weekdayMorning03,
      weekdayMorning04,
      weekdayMorning05,
      weekdayAfternoon01,
      weekdayAfternoon02,
      weekdayAfternoon03,
      weekdayAfternoon04,
      weekdayEvening01,
      weekdayEvening02,
      weekdayNight01,
      weekdayNight02,
      weekdayNight03,
      weekdayNight04,
      weekdayNight05,
      saturdayMorning01,
      saturdayMorning02,
      saturdayMorning03,
      saturdayMorning04,
      saturdayMorning05,
      saturdayAfternoon01,
      saturdayAfternoon02,
      saturdayAfternoon03,
      saturdayAfternoon04,
      saturdayEvening01,
      saturdayEvening02,
      saturdayNight01,
      saturdayNight02,
      saturdayNight03,
      saturdayNight04,
      saturdayNight05,
      sundayMorning01,
      sundayMorning02,
      sundayMorning03,
      sundayMorning04,
      sundayMorning05,
      sundayAfternoon01,
      sundayAfternoon02,
      sundayAfternoon03,
      sundayAfternoon04,
      sundayEvening01,
      sundayEvening02,
      sundayNight01,
      sundayNight02,
      sundayNight03,
      sundayNight04,
      sundayNight05,
    }
  },
  data() {
    return {
      timeIn: {
        "morning": ["7:00 AM",
                    "8:00 AM",
                     "9:00 AM",
                     "10:00 AM",
                     "11:00 AM"],
        "afternoon": ["12:00 PM",
                       "13:00 PM",
                       "14:00 PM",
                       "15:00 PM"],
        "evening": ["16:00 PM",
                     "17:00 PM"],
        "night": ["18:00 PM",
                   "19:00 PM",
                   "20:00 PM",
                   "21:00 PM",
                   "22:00 PM"],
      },
      timeOut: {
        "morning": ["8:00 AM",
                    "9:00 AM",
                     "10:00 AM",
                     "11:00 AM",
                     "12:00 PM"],
        "afternoon": ["13:00 PM",
                       "14:00 PM",
                       "15:00 PM",
                       "16:00 PM"],
        "evening": ["17:00 PM",
                     "18:00 PM"],
        "night": ["19:00 PM",
                   "20:00 PM",
                   "21:00 PM",
                   "22:00 PM",
                   "23:00 PM"],
      },
      uri: 'pitch-details/',
      currentPitchData: null
    }
  },
  async mounted() {
    await axios.get(this.uri + 'details/' + this.pitch.id, {
      headers: {
        'x-access-token': `${localStorage.getItem('accessToken')}`
      }
    })
    .then(res => {
      this.currentPitchData = res.data,
      this.pitchSize = res.data.size,
      this.pitchCondition = res.data.description,  
      this.weekdayMorning05 = this.currentPitchWeekdayPrice[0].price
      this.weekdayMorning01 = this.currentPitchWeekdayPrice[1].price
      this.weekdayMorning02 = this.currentPitchWeekdayPrice[2].price
      this.weekdayMorning03 = this.currentPitchWeekdayPrice[3].price
      this.weekdayMorning04 = this.currentPitchWeekdayPrice[4].price
      this.weekdayAfternoon01 = this.currentPitchWeekdayPrice[5].price
      this.weekdayAfternoon02 = this.currentPitchWeekdayPrice[6].price
      this.weekdayAfternoon03 = this.currentPitchWeekdayPrice[7].price
      this.weekdayAfternoon04 = this.currentPitchWeekdayPrice[8].price
      this.weekdayEvening01 = this.currentPitchWeekdayPrice[9].price
      this.weekdayEvening02 = this.currentPitchWeekdayPrice[10].price
      this.weekdayNight01 = this.currentPitchWeekdayPrice[11].price
      this.weekdayNight02 = this.currentPitchWeekdayPrice[12].price
      this.weekdayNight03 = this.currentPitchWeekdayPrice[13].price
      this.weekdayNight04 = this.currentPitchWeekdayPrice[14].price
      this.weekdayNight05 = this.currentPitchWeekdayPrice[15].price
      this.saturdayMorning05 = this.currentPitchSaturdayPrice[0].price
      this.saturdayMorning01 = this.currentPitchSaturdayPrice[1].price
      this.saturdayMorning02 = this.currentPitchSaturdayPrice[2].price
      this.saturdayMorning03 = this.currentPitchSaturdayPrice[3].price
      this.saturdayMorning04 = this.currentPitchSaturdayPrice[4].price
      this.saturdayAfternoon01 = this.currentPitchSaturdayPrice[5].price
      this.saturdayAfternoon02 = this.currentPitchSaturdayPrice[6].price
      this.saturdayAfternoon03 = this.currentPitchSaturdayPrice[7].price
      this.saturdayAfternoon04 = this.currentPitchSaturdayPrice[8].price
      this.saturdayEvening01 = this.currentPitchSaturdayPrice[9].price
      this.saturdayEvening02 = this.currentPitchSaturdayPrice[10].price
      this.saturdayNight01 = this.currentPitchSaturdayPrice[11].price
      this.saturdayNight02 = this.currentPitchSaturdayPrice[12].price
      this.saturdayNight03 = this.currentPitchSaturdayPrice[13].price
      this.saturdayNight04 = this.currentPitchSaturdayPrice[14].price
      this.saturdayNight05 = this.currentPitchSaturdayPrice[15].price
      this.sundayMorning05 = this.currentPitchSundayPrice[0].price
      this.sundayMorning01 = this.currentPitchSundayPrice[1].price
      this.sundayMorning02 = this.currentPitchSundayPrice[2].price
      this.sundayMorning03 = this.currentPitchSundayPrice[3].price
      this.sundayMorning04 = this.currentPitchSundayPrice[4].price
      this.sundayAfternoon01 = this.currentPitchSundayPrice[5].price
      this.sundayAfternoon02 = this.currentPitchSundayPrice[6].price
      this.sundayAfternoon03 = this.currentPitchSundayPrice[7].price
      this.sundayAfternoon04 = this.currentPitchSundayPrice[8].price
      this.sundayEvening01 = this.currentPitchSundayPrice[9].price
      this.sundayEvening02 = this.currentPitchSundayPrice[10].price
      this.sundayNight01 = this.currentPitchSundayPrice[11].price
      this.sundayNight02 = this.currentPitchSundayPrice[12].price
      this.sundayNight03 = this.currentPitchSundayPrice[13].price
      this.sundayNight04 = this.currentPitchSundayPrice[14].price
      this.sundayNight05 = this.currentPitchSundayPrice[15].price
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response.data.message)
      }
      else {
        console.log('No response!')
      }
    })
  },
  computed: {
    currentPitchWeekdayPrice() {
      const weekdayPriceArr = []

      this.currentPitchData.pitch_prices.filter((pitchPrice) => {
        if(pitchPrice.time_part.id >= 1 && pitchPrice.time_part.id <= 32) {
          weekdayPriceArr.push(pitchPrice)
          weekdayPriceArr.sort((a, b) => a.time_part.id - b.time_part.id)
        }
      })

      return weekdayPriceArr
   },
   currentPitchSundayPrice() {
      const sundayPriceArr = []

      this.currentPitchData.pitch_prices.filter((pitchPrice) => {
        if(pitchPrice.time_part.id >= 65 && pitchPrice.time_part.id <= 96) {
          sundayPriceArr.push(pitchPrice)
          sundayPriceArr.sort((a, b) => a.time_part.id - b.time_part.id)
        }
      })

      return sundayPriceArr
    },
    currentPitchSaturdayPrice() {
      const saturdayPriceArr = []

      this.currentPitchData.pitch_prices.filter((pitchPrice) => {
        if(pitchPrice.time_part.id >= 33 && pitchPrice.time_part.id <= 64) {
          saturdayPriceArr.push(pitchPrice)
          saturdayPriceArr.sort((a, b) => a.time_part.id - b.time_part.id)
        }
      })

      return saturdayPriceArr
    }
  },
  methods: {
    async handleDubPitch() {
      if(!this.pitchNumber) {
        this.toast('New Pitch Pumber Required to Duplicate a New Pitch!', 3000, 'error')
        this.$refs.number.focus()
        return
      }
      if(!this.pitchCondition) {
        this.toast('Pitch Condition is Required!', 3000, 'error')
        this.$refs.desc.focus()
        return
      }
      if(!this.pitchSize) {
        this.toast('Pitch Size is Required!', 3000, 'error')
        this.$refs.size.focus()
        return
      }

      await axios.post(this.uri, {
        name: this.pitchNumber,
        description: this.pitchCondition,
        size: this.pitchSize,
        pitch_prices: [
          {
            timePartId: 1,
            price: this.weekdayMorning05
          },
          {
            timePartId: 2,
            price: this.weekdayMorning01,
          },
          {
            timePartId: 3,
            price: this.weekdayMorning02,
          },
          {
            timePartId: 4,
            price: this.weekdayMorning03,
          },
          {
            timePartId: 5,
            price: this.weekdayMorning04,
          },
          {
            timePartId: 6,
            price: this.weekdayAfternoon01,
          },
          {
            timePartId: 7,
            price: this.weekdayAfternoon02,
          },
          {
            timePartId: 8,
            price: this.weekdayAfternoon03,
          },
          {
            timePartId: 9,
            price: this.weekdayAfternoon04,
          },
          {
            timePartId: 10,
            price: this.weekdayEvening01,
          },
          {
            timePartId: 11,
            price: this.weekdayEvening02,
          },
          {
            timePartId: 12,
            price: this.weekdayNight01,
          },
          {
            timePartId: 13,
            price: this.weekdayNight02,
          },
          {
            timePartId: 14,
            price: this.weekdayNight03,
          },
          {
            timePartId: 15,
            price: this.weekdayNight04,
          },
          {
            timePartId: 16,
            price: this.weekdayNight05,
          },
          {
            timePartId: 17,
            price: this.weekdayMorning05
          },
          {
            timePartId: 18,
            price: this.weekdayMorning01,
          },
          {
            timePartId: 19,
            price: this.weekdayMorning02,
          },
          {
            timePartId: 20,
            price: this.weekdayMorning03,
          },
          {
            timePartId: 21,
            price: this.weekdayMorning04,
          },
          {
            timePartId: 22,
            price: this.weekdayAfternoon01,
          },
          {
            timePartId: 23,
            price: this.weekdayAfternoon02,
          },
          {
            timePartId: 24,
            price: this.weekdayAfternoon03,
          },
          {
            timePartId: 25,
            price: this.weekdayAfternoon04,
          },
          {
            timePartId: 26,
            price: this.weekdayEvening01,
          },
          {
            timePartId: 27,
            price: this.weekdayEvening02,
          },
          {
            timePartId: 28,
            price: this.weekdayNight01,
          },
          {
            timePartId: 29,
            price: this.weekdayNight02,
          },
          {
            timePartId: 30,
            price: this.weekdayNight03,
          },
          {
            timePartId: 31,
            price: this.weekdayNight04,
          },
          {
            timePartId: 32,
            price: this.weekdayNight05,
          },

          {
            timePartId: 33,
            price: this.saturdayMorning05,
          },
          {
            timePartId: 34,
            price: this.saturdayMorning01,
          },
          {
            timePartId: 35,
            price: this.saturdayMorning02,
          },
          {
            timePartId: 36,
            price: this.saturdayMorning03,
          },
          {
            timePartId: 37,
            price: this.saturdayMorning04,
          },
          {
            timePartId: 38,
            price: this.saturdayAfternoon01,
          },
          {
            timePartId: 39,
            price: this.saturdayAfternoon02,
          },
          {
            timePartId: 40,
            price: this.saturdayAfternoon03,
          },
          {
            timePartId: 41,
            price: this.saturdayAfternoon04,
          },
          {
            timePartId: 42,
            price: this.saturdayEvening01,
          },
          {
            timePartId: 43,
            price: this.saturdayEvening02,
          },
          {
            timePartId: 44,
            price: this.saturdayNight01,
          },
          {
            timePartId: 45,
            price: this.saturdayNight02,
          },
          {
            timePartId: 46,
            price: this.saturdayNight03,
          },
          {
            timePartId: 47,
            price: this.saturdayNight04,
          },
          {
            timePartId: 48,
            price: this.saturdayNight05,
          },
          {
            timePartId: 49,
            price: this.saturdayMorning05,
          },
          {
            timePartId: 50,
            price: this.saturdayMorning01,
          },
          {
            timePartId: 51,
            price: this.saturdayMorning02,
          },
          {
            timePartId: 52,
            price: this.saturdayMorning03,
          },
          {
            timePartId: 53,
            price: this.saturdayMorning04,
          },
          {
            timePartId: 54,
            price: this.saturdayAfternoon01,
          },
          {
            timePartId: 55,
            price: this.saturdayAfternoon02,
          },
          {
            timePartId: 56,
            price: this.saturdayAfternoon03,
          },
          {
            timePartId: 57,
            price: this.saturdayAfternoon04,
          },
          {
            timePartId: 58,
            price: this.saturdayEvening01,
          },
          {
            timePartId: 59,
            price: this.saturdayEvening02,
          },
          {
            timePartId: 60,
            price: this.saturdayNight01,
          },
          {
            timePartId: 61,
            price: this.saturdayNight02,
          },
          {
            timePartId: 62,
            price: this.saturdayNight03,
          },
          {
            timePartId: 63,
            price: this.saturdayNight04,
          },
          {
            timePartId: 64,
            price: this.saturdayNight05,
          },

          {
            timePartId: 65,
            price: this.sundayMorning05,
          },
          {
            timePartId: 66,
            price: this.sundayMorning01,
          },
          {
            timePartId: 67,
            price: this.sundayMorning02,
          },
          {
            timePartId: 68,
            price: this.sundayMorning03,
          },
          {
            timePartId: 69,
            price: this.sundayMorning04,
          },
          {
            timePartId: 70,
            price: this.sundayAfternoon01,
          },
          {
            timePartId: 71,
            price: this.sundayAfternoon02,
          },
          {
            timePartId: 72,
            price: this.sundayAfternoon03,
          },
          {
            timePartId: 73,
            price: this.sundayAfternoon04,
          },
          {
            timePartId: 74,
            price: this.sundayEvening01,
          },
          {
            timePartId: 75,
            price: this.sundayEvening02,
          },
          {
            timePartId: 76,
            price: this.sundayNight01,
          },
          {
            timePartId: 77,
            price: this.sundayNight02,
          },
          {
            timePartId: 78,
            price: this.sundayNight03,
          },
          {
            timePartId: 79,
            price: this.sundayNight04,
          },
          {
            timePartId: 80,
            price: this.sundayNight05,
          },
          {
            timePartId: 81,
            price: this.sundayMorning05,
          },
          {
            timePartId: 82,
            price: this.sundayMorning01,
          },
          {
            timePartId: 83,
            price: this.sundayMorning02,
          },
          {
            timePartId: 84,
            price: this.sundayMorning03,
          },
          {
            timePartId: 85,
            price: this.sundayMorning04,
          },
          {
            timePartId: 86,
            price: this.sundayAfternoon01,
          },
          {
            timePartId: 87,
            price: this.sundayAfternoon02,
          },
          {
            timePartId: 88,
            price: this.sundayAfternoon03,
          },
          {
            timePartId: 89,
            price: this.sundayAfternoon04,
          },
          {
            timePartId: 90,
            price: this.sundayEvening01,
          },
          {
            timePartId: 91,
            price: this.sundayEvening02,
          },
          {
            timePartId: 92,
            price: this.sundayNight01,
          },
          {
            timePartId: 93,
            price: this.sundayNight02,
          },
          {
            timePartId: 94,
            price: this.sundayNight03,
          },
          {
            timePartId: 95,
            price: this.sundayNight04,
          },
          {
            timePartId: 96,
            price: this.sundayNight05,
          },
        ]
      }, {
        headers: {
          'x-access-token': `${localStorage.getItem('accessToken')}`
        }
      }).then(res => {
        this.toast('Pitch ' + this.pitchNumber + ' Duplicate Successed!', 3000, 'successed')
        this.$emit('closeDupModal')
        this.$store.dispatch('pitches/getPitches', JSON.parse(localStorage.getItem('pitchesPagInfo')))
      }).catch(err => {
        if (err.response) {
          this.toast(err.response.data.message, 3000, 'error')
        } else {
          this.toast('Error: No Response!', 3000, 'error')
        }
      }
      )
    }
  }
}
</script>

<style>

</style>