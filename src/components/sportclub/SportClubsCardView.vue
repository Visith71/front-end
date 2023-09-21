<template>
  <div
    class="sport-club-cards" v-if="sportClubs && sportClubs.items"
  >
    <div @click="openEditSportClub(club)" class="sport-club-card" v-for="club in sportClubs.items" :key="club.id">
      <div class="sport-club-img">
        <img :src="club.clubProfile" v-if="club.clubProfile">
        <p>ID: <span>{{ club.id }}</span></p>
      </div>
      <h1>{{ club.name }}</h1>
      <p>{{ club.description }}</p>
      <div class="sport-club-detail">
        <div class="sport-club-detail01">
          <p>🧘‍♀️ Created By: <br><span v-if="club.user !== null">{{ club.user.first_name }}  {{ club.user.last_name }}</span><span v-else>• NaN •</span></p>
          <p>🏁 Owned Pitch: <br><span>{{ club.pitch_details.length }}</span></p>
        </div>
        <p>🌏 Club Address: <br><span>{{JSON.parse(club.locationUrl).name}}, {{ JSON.parse(club.locationUrl).formatted_address }}</span></p>
        <button v-if="JSON.parse(club.locationUrl).url">
          <a :href="JSON.parse(club.locationUrl).url" target="_blank">
            Find on google map
          </a>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sportClubs'],
  computed: {
    clubOwner() {
      return this.sportClubs.items[0]
    }
  },
  methods: {
    openEditSportClub(club) {
      this.$emit('openEditSportClub', club)
    },
  }
}
</script>

<style scoped>
.sport-club-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 3em;
  padding: 0 2em;
  padding-bottom: 2em;
}
.sport-club-card {
  margin: 0;
  padding: 2em;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  border-radius: 20px;
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.sport-club-card:hover {
  transform: scale(1.05);
}
.sport-club-card img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
}
.sport-club-card h1 {
  margin: 0;
  padding: 0;
  font-size: 1.5em;
  line-height: 1.2em;
  margin-top: .2em;
}
.sport-club-img {
  display: flex;
  font-size: 1.5em;
  align-items: flex-start;
  justify-content: space-between;
}
.sport-club-img span {
  font-size: 1.4em;
  font-weight: 600;
}
.sport-club-card p {
  font-size: 1em;
  /* font-weight: 600; */
  text-transform: capitalize;
}
.sport-club-detail {
  margin-top: 1em;
  text-align: center;
}
.sport-club-detail p {
  text-align: center;
  font-size: 1em;
  margin-top: .2em;
}
.sport-club-detail p span {
  font-size: 1.2em;
  font-weight: 600;
}
.sport-club-detail01 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: .5em;
}
.sport-club-detail button {
  margin-top: 1em;
}
.sport-club-detail button a {
  text-decoration: none;
  color: var(--black);
  text-transform: uppercase;
}
</style>