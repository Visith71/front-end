<template>
  <div class="pitch-detail-display" v-if="currentPitchData">
   <div class="pitch-detail-title">
    <h1>🏁 Pitch : #{{ pitch.name }} Details</h1>
    <div>
     <p>Created at: <strong>{{ format(new Date(), 'MMM do yyyy') }}</strong></p>
     <p>by: <strong>{{ pitch.sport_club.name }}</strong></p>
    </div>
   </div>
   <div class="pitch-detail-row01">
    <div class="pitch-size">
     <h1>⚽</h1>
     <h2> Pitch Size:</h2>
     <h3>{{ pitch.size }}</h3>
    </div>
    <div class="pitch-condition">
     <h1>🥊</h1>
     <h2>Pitch Condition:</h2>
     <h3>{{ pitch.description }}</h3>
    </div>
   </div>
   <div class="pitch-detail-row02">
    <h1>🤑</h1>
    <h2>Pitch Price:</h2>
    <div class="pitch-price">
     <div class="weekday">
      <h3>👔 Weekday:</h3>
      <div class="morning">
       <div class="timein weekday-morning-timein">
        <h3>Morning</h3>
       <p v-for="morningTimeIn in timeIn.morning" :key="morningTimeIn">{{ morningTimeIn }}</p>
      </div>
      <div class="timeout weekday-morning-timeout">
       <p v-for="morningTimeOut in timeOut.morning" :key="morningTimeOut">- {{ morningTimeOut }}</p>
      </div>
      <div class="price weekday-morning-price">
       <p v-for="price in currentPitchWeekdayPrice.slice(0,5)" :key="price.id"><strong>$ {{price.price.toFixed(2)}}</strong></p>
      </div>
      </div>
      <div class="afternoon">
       <div class="timein weekday-afternoon-timein">
        <h3>Afternoon</h3>
       <p v-for="afternoonTimeIn in timeIn.afternoon" :key="afternoonTimeIn">{{ afternoonTimeIn }}</p>
      </div>
      <div class="timeout weekday-afternoon-timeout">
        <p v-for="afternoonTimeOut in timeOut.afternoon" :key="afternoonTimeOut">- {{ afternoonTimeOut }}</p>
      </div>
      <div class="price weekday-afternoon-price">
       <p v-for="price in currentPitchWeekdayPrice.slice(5,9)" :key="price.id"><strong>$ {{price.price.toFixed(2)}}</strong></p>
      </div>
      </div>
      <div class="evening">
       <div class="timein weekday-evening-timein">
        <h3>Evening</h3>
       <p v-for="eveningTimeIn in timeIn.evening" :key="eveningTimeIn">{{ eveningTimeIn }}</p>
      </div>
      <div class="timeout weekday-evening-timeout">
       <p v-for="eveningTimeOut in timeOut.evening" :key="eveningTimeOut">- {{ eveningTimeOut }}</p>
      </div>
      <div class="price weekday-evening-price">
       <p v-for="price in currentPitchWeekdayPrice.slice(9,11)" :key="price.id"><strong>$ {{price.price.toFixed(2)}}</strong></p>
      </div>
      </div>
      <div class="night">
       <div class="timein weekday-night-timein">
        <h3>Night</h3>
       <p v-for="nightTimeIn in timeIn.night" :key="nightTimeIn">{{ nightTimeIn }}</p>
      </div>
      <div class="timeout weekday-night-timeout">
       <p v-for="nightTimeOut in timeOut.night" :key="nightTimeOut">- {{ nightTimeOut }}</p>
      </div>
      <div class="price weekday-night-price">
       <p v-for="price in currentPitchWeekdayPrice.slice(11,16)" :key="price.id"><strong>$ {{price.price.toFixed(2)}}</strong></p>
      </div>
      </div>
     </div>
     <div class="saturday">
      <h3>🧦 Saturday:</h3>
      <div class="morning">
       <div class="timein saturday-morning-timein">
        <h3>Morning</h3>
       <p v-for="morningTimeIn in timeIn.morning" :key="morningTimeIn">{{ morningTimeIn }}</p>
      </div>
      <div class="timeout saturday-morning-timeout">
       <p v-for="morningTimeOut in timeOut.morning" :key="morningTimeOut">- {{ morningTimeOut }}</p>
      </div>
      <div class="price saturday-morning-price">
       <p v-for="price in currentPitchSaturdayPrice.slice(0,5)" :key="price.id"><strong>$ {{price.price.toFixed(2)}}</strong></p>
      </div>
      </div>
      <div class="afternoon">
       <div class="timein saturday-afternoon-timein">
        <h3>Afternoon</h3>
       <p v-for="afternoonTimeIn in timeIn.afternoon" :key="afternoonTimeIn">{{ afternoonTimeIn }}</p>
      </div>
      <div class="timeout saturday-afternoon-timeout">
        <p v-for="afternoonTimeOut in timeOut.afternoon" :key="afternoonTimeOut">- {{ afternoonTimeOut }}</p>
      </div>
      <div class="price saturday-afternoon-price">
       <p v-for="price in currentPitchSaturdayPrice.slice(5,9)" :key="price.id"><strong>$ {{price.price.toFixed(2)}}</strong></p>
      </div>
      </div>
      <div class="evening">
       <div class="timein saturday-evening-timein">
        <h3>Evening</h3>
       <p v-for="eveningTimeIn in timeIn.evening" :key="eveningTimeIn">{{ eveningTimeIn }}</p>
      </div>
      <div class="timeout saturday-evening-timeout">
       <p v-for="eveningTimeOut in timeOut.evening" :key="eveningTimeOut">- {{ eveningTimeOut }}</p>
      </div>
      <div class="price saturday-evening-price">
       <p v-for="price in currentPitchSaturdayPrice.slice(9,11)" :key="price.id"><strong>$ {{price.price.toFixed(2)}}</strong></p>
      </div>
      </div>
      <div class="night">
       <div class="timein saturday-night-timein">
        <h3>Night</h3>
       <p v-for="nightTimeIn in timeIn.night" :key="nightTimeIn">{{ nightTimeIn }}</p>
      </div>
      <div class="timeout saturday-night-timeout">
       <p v-for="nightTimeOut in timeOut.night" :key="nightTimeOut">- {{ nightTimeOut }}</p>
      </div>
      <div class="price saturday-night-price">
       <p v-for="price in currentPitchSaturdayPrice.slice(11,16)" :key="price.id"><strong>$ {{price.price.toFixed(2)}}</strong></p>
      </div>
      </div>
     </div>
     <div class="sunday">
      <h3>🧧 Sunday:</h3>
      <div class="morning">
       <div class="timein sunday-morning-timein">
        <h3>Morning</h3>
       <p v-for="morningTimeIn in timeIn.morning" :key="morningTimeIn">{{ morningTimeIn }}</p>
      </div>
      <div class="timeout sunday-morning-timeout">
       <p v-for="morningTimeOut in timeOut.morning" :key="morningTimeOut">- {{ morningTimeOut }}</p>
      </div>
      <div class="price sunday-morning-price">
       <p v-for="price in currentPitchSundayPrice.slice(0,5)" :key="price.id"><strong>$ {{price.price.toFixed(2)}}</strong></p>
      </div>
      </div>
      <div class="afternoon">
       <div class="timein sunday-afternoon-timein">
        <h3>Afternoon</h3>
       <p v-for="afternoonTimeIn in timeIn.afternoon" :key="afternoonTimeIn">{{ afternoonTimeIn }}</p>
      </div>
      <div class="timeout sunday-afternoon-timeout">
        <p v-for="afternoonTimeOut in timeOut.afternoon" :key="afternoonTimeOut">- {{ afternoonTimeOut }}</p>
      </div>
      <div class="price sunday-afternoon-price">
       <p v-for="price in currentPitchSundayPrice.slice(5,9)" :key="price.id"><strong>$ {{price.price.toFixed(2)}}</strong></p>
      </div>
      </div>
      <div class="evening">
       <div class="timein sunday-evening-timein">
        <h3>Evening</h3>
       <p v-for="eveningTimeIn in timeIn.evening" :key="eveningTimeIn">{{ eveningTimeIn }}</p>
      </div>
      <div class="timeout sunday-evening-timeout">
       <p v-for="eveningTimeOut in timeOut.evening" :key="eveningTimeOut">- {{ eveningTimeOut }}</p>
      </div>
      <div class="price sunday-evening-price">
       <p v-for="price in currentPitchSundayPrice.slice(9,11)" :key="price.id"><strong>$ {{price.price.toFixed(2)}}</strong></p>
      </div>
      </div>
      <div class="night">
       <div class="timein sunday-night-timein">
        <h3>Night</h3>
       <p v-for="nightTimeIn in timeIn.night" :key="nightTimeIn">{{ nightTimeIn }}</p>
      </div>
      <div class="timeout sunday-night-timeout">
       <p v-for="nightTimeOut in timeOut.night" :key="nightTimeOut">- {{ nightTimeOut }}</p>
      </div>
      <div class="price sunday-night-price">
       <p v-for="price in currentPitchSundayPrice.slice(11,16)" :key="price.id"><strong>$ {{price.price.toFixed(2)}}</strong></p>
      </div>
      </div>
     </div>
    </div>
   </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import axios from 'axios'

export default {
  setup(props, {emit}) {
  const pitch = props.pitch;

  return { format }
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
      currentPitchData: null
    }
  },
  props: {
    pitch: {
    type: Object,
    required: true
    }
  },
  computed: {
    currentPitchWeekdayPrice() {
      const weekdayPriceArr = []

      this.currentPitchData.pitch_prices.filter((pitchPrice) => {
        if(pitchPrice.time_part.id >= 1 && pitchPrice.time_part.id <= 16) {
          weekdayPriceArr.push(pitchPrice)
          weekdayPriceArr.sort((a, b) => a.time_part.id - b.time_part.id)
        }
      })

      return weekdayPriceArr
    }, 
    currentPitchSundayPrice() {
      const sundayPriceArr = []

      this.currentPitchData.pitch_prices.filter((pitchPrice) => {
        if(pitchPrice.time_part.id >= 65 && pitchPrice.time_part.id <= 80) {
          sundayPriceArr.push(pitchPrice)
          sundayPriceArr.sort((a, b) => a.time_part.id - b.time_part.id)
        }
      })

      return sundayPriceArr
    },
    currentPitchSaturdayPrice() {
      const saturdayPriceArr = []

      this.currentPitchData.pitch_prices.filter((pitchPrice) => {
        if(pitchPrice.time_part.id >= 33 && pitchPrice.time_part.id <= 48) {
          saturdayPriceArr.push(pitchPrice)
          saturdayPriceArr.sort((a, b) => a.time_part.id - b.time_part.id)
        }
      })

      return saturdayPriceArr
    }
  },
  async mounted() {
    await axios.get(`pitch-details/details/${this.pitch.id}`, {
      headers: {
        'x-access-token': `${localStorage.getItem('accessToken')}`
      }
    })
    .then(res => {
      this.currentPitchData = res.data
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response.data.message)
      }
      else {
        console.log('No response!')
      }
    })
  }
}
</script>

<style>
.timeout, .price {
  margin-left: 1em;
}
.morning, .afternoon, .evening, .night{
  display: flex;
  align-items: flex-end;
  text-align: left;
  justify-content: space-around;
  padding: .5em 0;
}
.pitch-detail-row01 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1em 2em;
}
.pitch-size, .pitch-condition {
  text-align: center;
  width: 50%;
}
.pitch-size h3, .pitch-condition h3 {
  font-weight: 400;     
}
.pitch-detail-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pitch-detail-row02 {
  padding: 1em 1em;
  text-align: center;
}
.pitch-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  grid-column-gap: 0em;
  padding: 1em 0em;
}
</style>