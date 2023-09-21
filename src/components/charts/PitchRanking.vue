<template>
<div v-for="icon in rankingNumberIcon" :key="rankingNumberIcon.indexOf(icon)">
        {{ icon }}
</div>
  <div v-for="pitch in sortRanking" :key="pitch.pitchDetailId">
    <div class="rank-card two">
      
      <h1 class="animate__animated animate__swing animate__delay-3s">🏆</h1>
      <div class="rank-num rank-two">
        <h2 class="animate__animated animate__tada animate__delay-3s">
          {{ pitch.name }}
        </h2>
      </div>
      <div class="rank-details two-details">
        <div class="tot-bookings">
          <p>Bookings</p>
          <h3>{{ pitch.count }}</h3>
        </div>
        <div class="tot-hours">
          <p>Hours</p>
          <h3>{{ pitch.dif.hours }}</h3>
        </div>
        <div class="tot-incomes">
          <p>Incomes</p>
          <h3>${{ pitch.payment_amount }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  methods: {
    getPitchRanking() {},
  },
  props: ["pitchRankingData"],
  computed: {
    sortRanking() {
      const rankingNumberIcon = ['🥇', '🥈', '🥉'];
      for (let i = 0; i <= rankingNumberIcon.length; i++) {
        // this.pitchRankingData[i].rankingIcon = rankingNumberIcon[i]
        console.log('haha', rankingNumberIcon[i])
        console.log('hi', this.pitchRankingData)
      }
      if (this.pitchRankingData) {
        return this.pitchRankingData.sort((a, b) => {
          return b.payment_amount - a.payment_amount;
        });
      }
    },
  },
  setup() {
    
    return {
  
    };
  },
};
</script>

<style scoped>
.two {
  transform: scale(1.05);
  margin-bottom: 1vh;
  margin-right: 2vw;
}
.rank-card {
  width: 100%;
  background: #fff;
  padding: 20px 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}
.rank-card h1 {
  font-size: 3rem;
}
.rank-two {
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
</style>