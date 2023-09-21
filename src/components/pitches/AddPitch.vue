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
     <button @click="handleAddPitch">➕ Add New Pitch 🦮</button>
   </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import store from '../../store/index';

export default {
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
      }
    }
  },
  setup(props, { emit }) {
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
    const number = ref(null)
    const size = ref(null)
    const desc = ref(null)

    const router = useRouter()

    const axiosConfig = {
      headers: {
        'x-access-token': `${localStorage.getItem('accessToken')}`
      }
    }

    const handleAddPitch = async () => {
      if(!pitchNumber.value) {
        number.value.focus()
        return
      }
      if(!pitchSize.value) {
        size.value.focus()
        return
      }
      if(!pitchCondition.value) {
        desc.value.focus()
        return
      }
      await axios.post('pitch-details/', {
        name: pitchNumber.value,
        description: pitchCondition.value,
        size: pitchSize.value,
        pitch_prices: [
          {
            timePartId: 1,
            price: weekdayMorning05.value
          },
          {
            timePartId: 2,
            price: weekdayMorning01.value,
          },
          {
            timePartId: 3,
            price: weekdayMorning02.value,
          },
          {
            timePartId: 4,
            price: weekdayMorning03.value,
          },
          {
            timePartId: 5,
            price: weekdayMorning04.value,
          },
          {
            timePartId: 6,
            price: weekdayAfternoon01.value,
          },
          {
            timePartId: 7,
            price: weekdayAfternoon02.value,
          },
          {
            timePartId: 8,
            price: weekdayAfternoon03.value,
          },
          {
            timePartId: 9,
            price: weekdayAfternoon04.value,
          },
          {
            timePartId: 10,
            price: weekdayEvening01.value,
          },
          {
            timePartId: 11,
            price: weekdayEvening02.value,
          },
          {
            timePartId: 12,
            price: weekdayNight01.value,
          },
          {
            timePartId: 13,
            price: weekdayNight02.value,
          },
          {
            timePartId: 14,
            price: weekdayNight03.value,
          },
          {
            timePartId: 15,
            price: weekdayNight04.value,
          },
          {
            timePartId: 16,
            price: weekdayNight05.value,
          },
          {
            timePartId: 17,
            price: weekdayMorning05.value
          },
          {
            timePartId: 18,
            price: weekdayMorning01.value,
          },
          {
            timePartId: 19,
            price: weekdayMorning02.value,
          },
          {
            timePartId: 20,
            price: weekdayMorning03.value,
          },
          {
            timePartId: 21,
            price: weekdayMorning04.value,
          },
          {
            timePartId: 22,
            price: weekdayAfternoon01.value,
          },
          {
            timePartId: 23,
            price: weekdayAfternoon02.value,
          },
          {
            timePartId: 24,
            price: weekdayAfternoon03.value,
          },
          {
            timePartId: 25,
            price: weekdayAfternoon04.value,
          },
          {
            timePartId: 26,
            price: weekdayEvening01.value,
          },
          {
            timePartId: 27,
            price: weekdayEvening02.value,
          },
          {
            timePartId: 28,
            price: weekdayNight01.value,
          },
          {
            timePartId: 29,
            price: weekdayNight02.value,
          },
          {
            timePartId: 30,
            price: weekdayNight03.value,
          },
          {
            timePartId: 31,
            price: weekdayNight04.value,
          },
          {
            timePartId: 32,
            price: weekdayNight05.value,
          },

          {
            timePartId: 33,
            price: saturdayMorning05.value,
          },
          {
            timePartId: 34,
            price: saturdayMorning01.value,
          },
          {
            timePartId: 35,
            price: saturdayMorning02.value,
          },
          {
            timePartId: 36,
            price: saturdayMorning03.value,
          },
          {
            timePartId: 37,
            price: saturdayMorning04.value,
          },
          {
            timePartId: 38,
            price: saturdayAfternoon01.value,
          },
          {
            timePartId: 39,
            price: saturdayAfternoon02.value,
          },
          {
            timePartId: 40,
            price: saturdayAfternoon03.value,
          },
          {
            timePartId: 41,
            price: saturdayAfternoon04.value,
          },
          {
            timePartId: 42,
            price: saturdayEvening01.value,
          },
          {
            timePartId: 43,
            price: saturdayEvening02.value,
          },
          {
            timePartId: 44,
            price: saturdayNight01.value,
          },
          {
            timePartId: 45,
            price: saturdayNight02.value,
          },
          {
            timePartId: 46,
            price: saturdayNight03.value,
          },
          {
            timePartId: 47,
            price: saturdayNight04.value,
          },
          {
            timePartId: 48,
            price: saturdayNight05.value,
          },
          {
            timePartId: 49,
            price: saturdayMorning05.value,
          },
          {
            timePartId: 50,
            price: saturdayMorning01.value,
          },
          {
            timePartId: 51,
            price: saturdayMorning02.value,
          },
          {
            timePartId: 52,
            price: saturdayMorning03.value,
          },
          {
            timePartId: 53,
            price: saturdayMorning04.value,
          },
          {
            timePartId: 54,
            price: saturdayAfternoon01.value,
          },
          {
            timePartId: 55,
            price: saturdayAfternoon02.value,
          },
          {
            timePartId: 56,
            price: saturdayAfternoon03.value,
          },
          {
            timePartId: 57,
            price: saturdayAfternoon04.value,
          },
          {
            timePartId: 58,
            price: saturdayEvening01.value,
          },
          {
            timePartId: 59,
            price: saturdayEvening02.value,
          },
          {
            timePartId: 60,
            price: saturdayNight01.value,
          },
          {
            timePartId: 61,
            price: saturdayNight02.value,
          },
          {
            timePartId: 62,
            price: saturdayNight03.value,
          },
          {
            timePartId: 63,
            price: saturdayNight04.value,
          },
          {
            timePartId: 64,
            price: saturdayNight05.value,
          },

          {
            timePartId: 65,
            price: sundayMorning05.value,
          },
          {
            timePartId: 66,
            price: sundayMorning01.value,
          },
          {
            timePartId: 67,
            price: sundayMorning02.value,
          },
          {
            timePartId: 68,
            price: sundayMorning03.value,
          },
          {
            timePartId: 69,
            price: sundayMorning04.value,
          },
          {
            timePartId: 70,
            price: sundayAfternoon01.value,
          },
          {
            timePartId: 71,
            price: sundayAfternoon02.value,
          },
          {
            timePartId: 72,
            price: sundayAfternoon03.value,
          },
          {
            timePartId: 73,
            price: sundayAfternoon04.value,
          },
          {
            timePartId: 74,
            price: sundayEvening01.value,
          },
          {
            timePartId: 75,
            price: sundayEvening02.value,
          },
          {
            timePartId: 76,
            price: sundayNight01.value,
          },
          {
            timePartId: 77,
            price: sundayNight02.value,
          },
          {
            timePartId: 78,
            price: sundayNight03.value,
          },
          {
            timePartId: 79,
            price: sundayNight04.value,
          },
          {
            timePartId: 80,
            price: sundayNight05.value,
          },
          {
            timePartId: 81,
            price: sundayMorning05.value,
          },
          {
            timePartId: 82,
            price: sundayMorning01.value,
          },
          {
            timePartId: 83,
            price: sundayMorning02.value,
          },
          {
            timePartId: 84,
            price: sundayMorning03.value,
          },
          {
            timePartId: 85,
            price: sundayMorning04.value,
          },
          {
            timePartId: 86,
            price: sundayAfternoon01.value,
          },
          {
            timePartId: 87,
            price: sundayAfternoon02.value,
          },
          {
            timePartId: 88,
            price: sundayAfternoon03.value,
          },
          {
            timePartId: 89,
            price: sundayAfternoon04.value,
          },
          {
            timePartId: 90,
            price: sundayEvening01.value,
          },
          {
            timePartId: 91,
            price: sundayEvening02.value,
          },
          {
            timePartId: 92,
            price: sundayNight01.value,
          },
          {
            timePartId: 93,
            price: sundayNight02.value,
          },
          {
            timePartId: 94,
            price: sundayNight03.value,
          },
          {
            timePartId: 95,
            price: sundayNight04.value,
          },
          {
            timePartId: 96,
            price: sundayNight05.value,
          },
        ]
        // view: false
      }, axiosConfig).then(() => {
        emit('closeAddPitchModal')
        store.dispatch('pitches/getPitches', JSON.parse(localStorage.getItem('pitchesPagInfo')))
      }).catch(err => {
        if (err.response) {
          console.log(err.response.data.message)
        } else {
        }
      })
    }

    return {
      number,
      size,
      desc,
      handleAddPitch,
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
}
</script>

<style>
.add-pitch-title {
  display: flex;
  justify-content: flex-start;
}
.add-pitch-title > input {
  width: 10%;
  box-shadow: none;
  font-size: 1.3em;
  font-weight: 600;
  border-radius: 5px;
  padding: .5em;
  height: 2em;
  margin-left: .5em;
  border: 2px solid var(--black);
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
}
.add-pitch-title > input:focus,
.add-pitch-size > textarea:focus, 
.add-pitch-condition > textarea:focus,
.weekday-morning-price > input:focus {
  box-shadow: -5px 5px 0px rgba(0,0,0,0.1);
}
.add-pitch-size > textarea, .add-pitch-condition > textarea {
  width: 80%;
  min-height: 5em;
  padding: 1em;
  border-radius: 5px;
  border: 2px solid black;
  margin-top: 1em;
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
}
.add-price > input {
  width: 2em;
  height: 2em;
  box-shadow: none;
  padding: 0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  text-align: center;
  font-weight: 600;
}
.add-price > input:not(:last-child) {
  margin-bottom: .5em;
}
.add-timein *:not(:last-child),
.add-timeout *:not(:last-child) {
  margin-bottom: .5em;
}
.button-add {
  text-align: center;
}
.button-add > button {
  border-radius: 30px;
}
</style>