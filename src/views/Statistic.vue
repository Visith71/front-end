<template>
  <div class="main statistic-main">
    <div class="main-title title-section">
      <div class="title statistic-title">
        <div class="statistic-title-left">
          <img src="../assets/icons/Vector-Statistic.svg">
          <h1>Dashboard</h1>
        </div>
        <div :class="!isAdmin ? 'visibility-hidden':'statistic-title-right'">
          <h1 v-if="selectedClub && selectedClub.name">{{ selectedClub.name }}</h1>
          <ClubAutoComplete 
            :getAllSportClubs="getAllSportClubs"
            @emitSelectedClub="getSelectedClub"
            :selected="selectedClub"
            @clearAutoComplete="clearAutoComplete"
          />
        </div>
      </div>
    </div>
      <div class="card-section aniamte__animated animate__fadeInUp" v-if="!isAdmin || (selectedClub && selectedClub.id && isAdmin)">
      <div class="summary-section" v-if="getSummaryStatistic && getSummaryStatistic[0]">
        <div class="total total-user">
          <div class="img">
            <img src="../assets/icons/profile-icon.svg" />
          </div>
          <div>
            <h2>{{getSummaryStatistic[0].all_users}}</h2>
            <p>users of all time</p>
          </div>
        </div>
        <div class="total total-booking">
          <div class="img">
            <img src="../assets/icons/booking-icon.svg" />
          </div>
          <div>
            <h2>{{getSummaryStatistic[0].all_bookings}}</h2>
            <p>bookings since 2020</p>
          </div>
        </div>
        <div class="total total-transaction">
          <div class="img">
            <img src="../assets/icons/transaction-icon.svg" />
          </div>
          <div>
            <h2>$ {{getSummaryStatistic[0].all_income.toFixed(2)}}</h2>
            <p>incomes of all time</p>
          </div>
        </div>
        <div class="total hours-booking">
          <div class="img">
            <img src="../assets/icons/clock-icon.svg" />
          </div>
          <div>
            <h2>{{getSummaryStatistic[0].all_booking_hours}}</h2>
            <p>hours of booking</p>
          </div>
        </div>
      </div>
      <div class="bar-chart animate__animated animate__fadeInUp">
        <div class="incomes">
          <DayPartsStatistic 
            :selectedClub="selectedClub"
          />
        </div>
        <div class="pitches">
          <div class="frequently_booked" v-if="getTopThreePitches && getTopThreePitches.length > 2">
            <div class="header">
              <h1>✨🏆🎉 Pitches Ranking</h1>
            </div>
            <div class="one-to-three">
              <div class="rank-card two" v-if="getTopThreePitches[1]">
                <h1 class="animate__animated animate__swing animate__delay-3s">
                  🥈
                </h1>
                <div class="rank-num rank-two">
                  <h2 class="animate__animated animate__tada animate__delay-3s">
                    Pitch {{ getTopThreePitches[1].name }}
                  </h2>
                </div>
                <div class="rank-details two-details">
                  <div class="tot-bookings">
                    <p>Bookings</p>
                    <h3>{{ getTopThreePitches[1].total_bookings }}</h3>
                  </div>
                  <div class="tot-hours">
                    <p>Hours</p>
                    <h3>{{ getTopThreePitches[1].total_hours }}</h3>
                  </div>
                  <div class="tot-incomes">
                    <p>Incomes</p>
                    <h3>$ {{ getTopThreePitches[1].total_incomes }}</h3>
                  </div>
                </div>
              </div>
              <div class="rank-card one" v-if="getTopThreePitches[0]">
                <h1 class="animate__animated animate__swing animate__delay-2s">
                  🥇
                </h1>
                <div class="rank-num rank-one">
                  <h2 class="animate__animated animate__tada animate__delay-2s">
                    Pitch {{ getTopThreePitches[0].name }}
                  </h2>
                </div>
                <div class="rank-details one-details">
                  <div class="tot-bookings">
                    <p>Bookings</p>
                    <h3>{{ getTopThreePitches[0].total_bookings }}</h3>
                  </div>
                  <div class="tot-hours">
                    <p>Hours</p>
                    <h3>{{ getTopThreePitches[0].total_hours }}</h3>
                  </div>
                  <div class="tot-incomes">
                    <p>Incomes</p>
                    <h3>$ {{ getTopThreePitches[0].total_incomes }}</h3>
                  </div>
                </div>
              </div>
              <div class="rank-card three">
                <h1 class="animate__animated animate__swing animate__delay-4s">
                  🥉
                </h1>
                <div class="rank-num rank-three" v-if="getTopThreePitches[2]">
                  <h2 class="animate__animated animate__tada animate__delay-4s">
                    Pitch {{ getTopThreePitches[2].name }}
                  </h2>
                </div>
                <div class="rank-details three-details">
                  <div class="tot-bookings">
                    <p>Bookings</p>
                    <h3>{{ getTopThreePitches[2].total_bookings }}</h3>
                  </div>
                  <div class="tot-hours">
                    <p>Hours</p>
                    <h3>{{ getTopThreePitches[2].total_hours }}</h3>
                  </div>
                  <div class="tot-incomes">
                    <p>Incomes</p>
                    <h3>$ {{ getTopThreePitches[2].total_incomes }}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="cont-rank-list animate__animated animate__fadeInUp" v-if="expandRanking">
              <!-- display list ranking -->
              <div class="pitch-ranking-list" v-for="(pitch, index) in getNextRankPitches" :key="index">
                <div class="pitch-ranking-list-num">
                  <h1>#{{index + 4}}</h1>
                </div>
                <div class="pitch-ranking-list-details">
                  <div>
                    <p>Bookings</p>
                    <h3>{{pitch.total_bookings}}</h3>
                  </div>
                  <div>
                    <p>Hours</p>
                    <h3>{{pitch.total_hours}}</h3>
                  </div>
                  <div>
                    <p>Incomes</p>
                    <h3 v-if="pitch.total_incomes">$ {{pitch.total_incomes.toFixed(2)}}</h3>
                  </div>
                </div>
                <div class="pitch-ranking-list-name">
                  <h1>Pitch {{pitch.name}}</h1>
                </div>
              </div>
            </div>
            <div class="expand-ranking-btn">
              <button @click="expandRanking = !expandRanking">
                <span v-if="!expandRanking">Expand all pitches</span>
                <span v-if="expandRanking">Hide Expand Pitches</span>
              </button>
            </div>
          </div>
          <div class="busy-hour" :class="getTopThreePitches && getTopThreePitches.length > 2 ? 'busy-hour':'no-pitches-ranking busy-hour'">
            <div class="busy-hour-chart">
              <PopularTimeChart
                :selectedClub="selectedClub"
              />
            </div>
            <!-- <button @click="changeChartData">Last Week</button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="card-section aniamte__animated animate__fadeInUp no-stat-data" v-else>
      <img src="../assets/images/urban-line-coffee-break.svg" alt="urban-line-coffee-break">
      <h1>Please Select A Club To Get The Data 😃👏</h1>
    </div>
  </div>
</template>

<script>
import DayPartsStatistic from '../components/charts/DayPartsStatistic.vue'
import PopularTimeChart from '../components/charts/PopularTimeChart.vue'
import ClubAutoComplete from '../components/main-component/clubAutoComplete.vue'
import { getAllClubs } from '../composable/mixins/getAllClub'

export default {
  mixins: [getAllClubs],
  components: {
    DayPartsStatistic,
    PopularTimeChart ,
    ClubAutoComplete 
  },
  data() {
    return {
      selectedClub: null,
      expandRanking: false
    };
  },
  watch: {
    selectedClub(curValue) {
      this.$store.dispatch('sportClubs/getSummaryStatistic', curValue.id)
      this.$store.dispatch('sportClubs/getPitchesRanking', curValue.id)
    }
  },
  computed: {
    pitches() {
      return this.$store.getters['pitches/pitches']
    },
    getSummaryStatistic() {
      return this.$store.getters['sportClubs/summaryStatisticById']
    },
    getPitchesRanking() {
      return this.$store.getters['sportClubs/pitchesRanking']
    },
    getTopThreePitches() {
      if (this.getPitchesRanking && this.getPitchesRanking.length > 2) {
        return this.getPitchesRanking.slice(0, 3)
      }
    },
    getNextRankPitches() {
      if (this.getPitchesRanking && this.getPitchesRanking.length) {
        return this.getPitchesRanking.slice(3, this.getPitchesRanking.length)
      }
    }
  },
  created() {
    if (this.isAdmin) {
      this.$store.dispatch('sportClubs/getSummaryStatistic', 37)
      this.$store.dispatch('sportClubs/getPitchesRanking', 37)
      return
    }
    this.$store.dispatch('sportClubs/getSummaryStatistic')
    this.$store.dispatch('sportClubs/getPitchesRanking')
  },
};
</script>

<style scoped>
.main-title {
  margin: 0 auto;
  margin-top: 1em;
  padding: 0 5em;
}
.statistic-title,
.statistic-title-left,
.statistic-title-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.statistic-title-left {
  justify-content: flex-start;
}
.statistic-title-right {
  justify-content: flex-end;
}
.statistic-title-right h1 {
  font-size: 1.5em;
  font-weight: 600;
  margin-right: .5em;
}
.header {
  display: flex;
  align-items: flex-end;
  margin-top: 5vh;
}
.jackpot {
  height: 10vh;
  margin-right: 1vw;
}
.incomes_chart {
  display: flex;
  justify-items: center;
  width: 100%;
}
.weekly {
  width: 65%;
  padding: 3vh 0;
  position: absolute;
}
.bar {
  width: 100%;
  margin: 0 auto;
}
.summary-section img {
  height: 5vh;
  width: auto;
  margin-right: 12px;
}
.summary-section {
  width: 95%;
  margin: 5vh auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 2vw;
  align-items: center;
  justify-content: space-between;
}
.total {
  background: #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.4em;
  border-radius: 10px;
}
.total h2 {
  font-weight: 600;
}
.statistic-main {
  padding: 30px;
}
.title-section {
  display: flex;
  align-items: center;
  width: auto;
  justify-content: space-between;
}
.page-name {
  display: flex;
  align-items: center;
}
.page-name h1 {
  margin-left: 1vw;
}
.this-week-title p,
.this-month-title p {
  margin-left: 0.5rem;
  font-size: 1.5em;
}
.this-week-title h2,
.this-month-title h2 {
  font-weight: 600;
  font-size: 1.6em;
}
.this-month-title,
.this-week-title {
  margin-top: 5vh;
  padding: 20px;
  width: auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.this-week-title {
  margin-top: 8vh;
}
.one-to-three {
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  justify-content: center;
  margin: 10vh 0vh;
}
.one {
  z-index: 1000;
  margin-bottom: 3vh;
  margin-right: 1.5vw;
  transform: scale(1.2);
}
.two {
  transform: scale(1.05);
  margin-bottom: 1vh;
  margin-right: 2vw;
}
.rank-card {
  width: 26%;
  background: #fff;
  padding: 20px 0px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}
.rank-card h1 {
  font-size: 3rem;
}
.rank-two {
  background: #fcfcfc;
}
.rank-one {
  background: #fcfcfc;
  border-top: 5px solid #47466d;
  border-bottom: 5px solid #47466d;
  color: #000;
  font-size: 1.5rem;
}
.rank-three {
  background: #fcfcfc;
}
.rank-num {
  width: 100%;
  padding: 0.8rem 0rem;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  margin: 1rem 0rem;
}
.rank-details {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.cont-rank-list {
  padding-bottom: 2em;
  width: 70%;
  margin: 0 auto;
}
.expand-ranking-btn {
  text-align: center;
  padding-bottom: 3em;
}
.pitch-ranking-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 2em;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.pitch-ranking-list:not(:last-child) {
  margin-bottom: 1em;
} 
.pitch-ranking-list-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%;
}
.pitch-ranking-list-details div {
  text-align: center;
}
.busy-hour {
  padding-bottom: 4em;
}
.busy-hour-chart {
  width: 100%;
  margin: 0 auto;
  margin-top: auto;
}
.no-stat-data {
  text-align: center;
  margin-top: 2em;
}
.no-stat-data img {
  width: 30em;
}
.no-pitches-ranking {
  margin-top: 3em;
}
</style>