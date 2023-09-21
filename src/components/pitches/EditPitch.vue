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
       <input type="text"
          v-model="weekdayMorning05" 
          @change="changedInput(currentPitchWeekdayPrice[0],currentPitchWeekdayPrice[16], weekdayMorning05, $event)">
       <input type="text"
          v-model="weekdayMorning01"
          @change="changedInput(currentPitchWeekdayPrice[1],currentPitchWeekdayPrice[17], weekdayMorning01, $event)">
       <input type="text"
          v-model="weekdayMorning02" 
          @change="changedInput(currentPitchWeekdayPrice[2],currentPitchWeekdayPrice[18], weekdayMorning02, $event)">
       <input type="text"
          v-model="weekdayMorning03" 
          @change="changedInput(currentPitchWeekdayPrice[3],currentPitchWeekdayPrice[19], weekdayMorning03, $event)">
       <input type="text"
          v-model="weekdayMorning04" 
          @change="changedInput(currentPitchWeekdayPrice[4],currentPitchWeekdayPrice[20], weekdayMorning04, $event)">
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
       <input type="text" 
          v-model="weekdayAfternoon01" 
          @change="changedInput(currentPitchWeekdayPrice[5],currentPitchWeekdayPrice[21], weekdayAfternoon01, $event)">
       <input type="text" 
          v-model="weekdayAfternoon02"
          @change="changedInput(currentPitchWeekdayPrice[6],currentPitchWeekdayPrice[22], weekdayAfternoon02, $event)">
       <input type="text" 
          v-model="weekdayAfternoon03"
          @change="changedInput(currentPitchWeekdayPrice[7],currentPitchWeekdayPrice[23], weekdayAfternoon03, $event)">
       <input type="text" v-model="weekdayAfternoon04"
          @change="changedInput(currentPitchWeekdayPrice[7],currentPitchWeekdayPrice[24], weekdayAfternoon04, $event)">
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
       <input type="text" 
          v-model="weekdayEvening01"
          @change="changedInput(currentPitchWeekdayPrice[9],currentPitchWeekdayPrice[25], weekdayEvening01, $event)">
       <input type="text" 
          v-model="weekdayEvening02"
          @change="changedInput(currentPitchWeekdayPrice[10],currentPitchWeekdayPrice[26], weekdayEvening02, $event)">
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
       <input type="text" 
          v-model="weekdayNight01"
          @change="changedInput(currentPitchWeekdayPrice[11],currentPitchWeekdayPrice[27], weekdayNight01, $event)">
       <input type="text" 
          v-model="weekdayNight02"
          @change="changedInput(currentPitchWeekdayPrice[12],currentPitchWeekdayPrice[28], weekdayNight02, $event)">
       <input type="text" 
          v-model="weekdayNight03"
          @change="changedInput(currentPitchWeekdayPrice[13],currentPitchWeekdayPrice[29], weekdayNight03, $event)">
       <input type="text" 
          v-model="weekdayNight04"
          @change="changedInput(currentPitchWeekdayPrice[14],currentPitchWeekdayPrice[30], weekdayNight04, $event)">
       <input type="text" 
          v-model="weekdayNight05"
          @change="changedInput(currentPitchWeekdayPrice[15],currentPitchWeekdayPrice[31], weekdayNight05, $event)">
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
       <input type="text" 
          v-model="saturdayMorning05"
          @change="changedInput(currentPitchSaturdayPrice[0],currentPitchSaturdayPrice[16], saturdayMorning05, $event)">
       <input type="text" 
          v-model="saturdayMorning01"
          @change="changedInput(currentPitchSaturdayPrice[1],currentPitchSaturdayPrice[17], saturdayMorning01, $event)">
       <input type="text" 
          v-model="saturdayMorning02"
          @change="changedInput(currentPitchSaturdayPrice[2],currentPitchSaturdayPrice[18], saturdayMorning02, $event)">
       <input type="text" 
          v-model="saturdayMorning03"
          @change="changedInput(currentPitchSaturdayPrice[3],currentPitchSaturdayPrice[19], saturdayMorning03, $event)">
       <input type="text" 
          v-model="saturdayMorning04"
          @change="changedInput(currentPitchSaturdayPrice[4],currentPitchSaturdayPrice[20], saturdayMorning04, $event)">
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
       <input type="text" 
          v-model="saturdayAfternoon01"
          @change="changedInput(currentPitchSaturdayPrice[5],currentPitchSaturdayPrice[21], saturdayAfternoon01, $event)">
       <input type="text" 
          v-model="saturdayAfternoon02"
          @change="changedInput(currentPitchSaturdayPrice[6],currentPitchSaturdayPrice[22], saturdayAfternoon02, $event)">
       <input type="text" 
          v-model="saturdayAfternoon03"
          @change="changedInput(currentPitchSaturdayPrice[7],currentPitchSaturdayPrice[23], saturdayAfternoon03, $event)">
       <input type="text" 
          v-model="saturdayAfternoon04"
          @change="changedInput(currentPitchSaturdayPrice[8],currentPitchSaturdayPrice[24], saturdayAfternoon04, $event)">
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
       <input type="text" 
          v-model="saturdayEvening01"
          @change="changedInput(currentPitchSaturdayPrice[9],currentPitchSaturdayPrice[25], saturdayEvening01, $event)">
       <input type="text" 
          v-model="saturdayEvening02"
          @change="changedInput(currentPitchSaturdayPrice[10],currentPitchSaturdayPrice[26], saturdayEvening02, $event)">
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
       <input type="text" 
          v-model="saturdayNight01"
          @change="changedInput(currentPitchSaturdayPrice[11],currentPitchSaturdayPrice[27], saturdayNight01, $event)">
       <input type="text" 
          v-model="saturdayNight02"
          @change="changedInput(currentPitchSaturdayPrice[12],currentPitchSaturdayPrice[28], saturdayNight02, $event)">
       <input type="text" 
          v-model="saturdayNight03"
          @change="changedInput(currentPitchSaturdayPrice[13],currentPitchSaturdayPrice[29], saturdayNight03, $event)">
       <input type="text" 
          v-model="saturdayNight04"
          @change="changedInput(currentPitchSaturdayPrice[14],currentPitchSaturdayPrice[30], saturdayNight04, $event)">
       <input type="text" 
          v-model="saturdayNight05"
          @change="changedInput(currentPitchSaturdayPrice[15],currentPitchSaturdayPrice[31], saturdayNight05, $event)">
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
       <input type="text" 
          v-model="sundayMorning05"
          @change="changedInput(currentPitchSundayPrice[0],currentPitchSundayPrice[16], sundayMorning05, $event)">
       <input type="text" 
          v-model="sundayMorning01"
          @change="changedInput(currentPitchSundayPrice[1],currentPitchSundayPrice[17], sundayMorning01, $event)">
       <input type="text" 
          v-model="sundayMorning02"
          @change="changedInput(currentPitchSundayPrice[2],currentPitchSundayPrice[18], sundayMorning02, $event)">
       <input type="text" 
          v-model="sundayMorning03"
          @change="changedInput(currentPitchSundayPrice[3],currentPitchSundayPrice[19], sundayMorning03, $event)">
       <input type="text" 
          v-model="sundayMorning04"
          @change="changedInput(currentPitchSundayPrice[4],currentPitchSundayPrice[20], sundayMorning04, $event)">
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
       <input type="text" 
          v-model="sundayAfternoon01"
          @change="changedInput(currentPitchSundayPrice[5],currentPitchSundayPrice[21], sundayAfternoon01, $event)">
       <input type="text" 
          v-model="sundayAfternoon02"
          @change="changedInput(currentPitchSundayPrice[6],currentPitchSundayPrice[22], sundayAfternoon02, $event)">
       <input type="text" 
          v-model="sundayAfternoon03"
          @change="changedInput(currentPitchSundayPrice[7],currentPitchSundayPrice[23], sundayAfternoon03, $event)">
       <input type="text" 
          v-model="sundayAfternoon04"
          @change="changedInput(currentPitchSundayPrice[8],currentPitchSundayPrice[24], sundayAfternoon04, $event)">
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
       <input type="text" 
          v-model="sundayEvening01"
          @change="changedInput(currentPitchSundayPrice[9],currentPitchSundayPrice[25], sundayEvening01, $event)">
       <input type="text" 
          v-model="sundayEvening02"
          @change="changedInput(currentPitchSundayPrice[10],currentPitchSundayPrice[26], sundayEvening02, $event)">
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
       <input type="text" 
          v-model="sundayNight01"
          @change="changedInput(currentPitchSundayPrice[11],currentPitchSundayPrice[27], sundayNight01, $event)">
       <input type="text" 
          v-model="sundayNight02"
          @change="changedInput(currentPitchSundayPrice[12],currentPitchSundayPrice[28], sundayNight02, $event)">
       <input type="text" 
          v-model="sundayNight03"
          @change="changedInput(currentPitchSundayPrice[13],currentPitchSundayPrice[29], sundayNight03, $event)">
       <input type="text" 
          v-model="sundayNight04"
          @change="changedInput(currentPitchSundayPrice[14],currentPitchSundayPrice[30], sundayNight04, $event)">
       <input type="text" 
          v-model="sundayNight05"
          @change="changedInput(currentPitchSundayPrice[15],currentPitchSundayPrice[31], sundayNight05, $event)">
      </div>
      </div>
     </div>
    </div>
   </div>
   <div class="button-add">
     <button @click="handleEditPitch">🔨 Update Pitch ⚽</button>
   </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default {
  props: ['pitch'],
  setup() {
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
      currentPitchData: null,
      uri: 'pitch-details/',
      newPrice: []
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
      this.pitchNumber = res.data.name,
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
      async handleEditPitch() {
      if(!this.pitchNumber) {
         this.toast("Pitch Number Can't Be Empty!", 3000, 'error')
         this.$refs.number.focus()
         return
      }
      if(!this.pitchCondition) {
         this.toast("Pitch Condition Can't Be Empty!", 3000, 'error')
         this.$refs.desc.focus()
         return
      }
      if(!this.pitchSize) {
         this.toast("Pitch Size Can't Be Empty!", 3000, 'error')
         this.$refs.size.focus()
         return
      }
      await axios.put(this.uri + this.pitch.id, {
         name: this.pitchNumber,
         description: this.pitchCondition,
         size: this.pitchSize,
         pitch_prices: this.newPrice
      }, {
         headers: {
            'x-access-token': `${localStorage.getItem('accessToken')}`
         }
      }).then(() => {
         this.toast('Pitch ' + this.pitchNumber + ' Edit Successed!', 3000, 'successed')
            this.$emit('closeEditModal')
            this.$store.dispatch('pitches/getPitches', JSON.parse(localStorage.getItem('pitchesPagInfo')))
         }).catch(err => {
            if (err.response) {
               this.toast(err.response.data.message, 3000, 'error')
            } else {
               this.toast('Error: No Response!', 3000, 'error')
            }
         }
      )
      },
      changedInput(data, middleData, newPrice, e) {
         const priceChanged = []

         priceChanged.push(
         {
            id: data.id,
            price: newPrice
         },
         {
            id: middleData.id,
            price: newPrice
         }
      )
      this.newPrice.push(...priceChanged)
      e.target.classList.add('is-changed')
      console.log('changed', this.newPrice, e.target)
      }
   }
}
</script>

<style scoped>
.is-changed {
   border: 2px solid var(--blue);
   color: var(--blue);
}
</style>