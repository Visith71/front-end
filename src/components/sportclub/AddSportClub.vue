<template>
  <div class="add-sport-club">
    <div class="add-sport-club-header">
      <h1>Create A Sport Club</h1> 
      <h1>⚽👏</h1>
    </div>
    <div class="add-sport-club-form">
      <div class="user-selection">
        <label>Select An Owner:</label>
        <ClubAutoComplete 
          :getAllSportClubs="allClubOwners"
          @emitSelectedClub="getSelectedClub"
          :selected="selectedClub"
          @clearAutoComplete="clearAutoComplete"
          @ownedClub="ownedClub"
        />
      </div>
      <div class="sport-club-name-input">
        <label>Club's Name:</label>
        <input 
          type="text"
          v-model="clubName"
          required
          ref="clubName"
        />
      </div>
      <div class="sport-club-desc-input">
        <label>Club's Description:</label>
        <textarea 
          type="text"
          v-model="clubDesc"
          required
          ref="clubDesc"
        />
      </div>
    </div>
    <div class="add-sport-club-submit">
      <button @click="handleAddClub">
        Create Club ➕
      </button>
    </div>
  </div>
</template>

<script>
import ClubAutoComplete from '../main-component/clubAutoComplete.vue'
import { getAllClubs } from '../../composable/mixins/getAllClub'

export default {
  props: ['allClubOwners'],
  mixins: [getAllClubs],
  components: {
    ClubAutoComplete
  },
  data() {
    return {
      selectedClub: null
    }
  },
  methods: {
    ownedClub() {
      this.selectedClub = null
    },
    async handleAddClub() {
      let autoCompRef = document.querySelector('.p-autocomplete-input')
      if (!this.selectedClub) {
        autoCompRef.focus()
        this.toast(`Please Select An Owner 🙏`, 3000, 'error')
        return
      } if (!this.clubName) {
        this.$refs.clubName.focus()
        this.toast(`Please Enter A Club's Name 🙏`, 3000, 'error')
        return
      } if (!this.clubDesc) {
        this.toast(`Please Enter A Club's Description 🙏`, 3000, 'error')
        this.$refs.clubDesc.focus()
        return
      }
      if(this.clubName && this.clubDesc && this.selectedClub && this.selectedClub.id) {
        try {
          await this.$store.dispatch("sportClubs/registerSportClub", {
            name: this.clubName,
            description: this.clubDesc,
            locationUrl: {
              icon: null,
              name: null,
              address: null,
              geometry: null,
              phone_number: null,
              formatted_address: null,
              url: null,
              address_components: null
            },
            ownerId: this.selectedClub.id
          })
          this.toast(`Congratulation, Sport Club Has Been Created 👏`, 3000, 'successed')
          this.$store.dispatch('users/getClubOwners')
          this.$emit('closeModal')
        } catch(err) {
          this.toast(err, 3000, 'error')
        }
      } else {
        return
      }
    }
  }
}
</script>

<style scoped>
.add-sport-club-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.add-sport-club-form {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin: 1em 0;
}
.add-sport-club-form div {
  font-size: 1.2em;
  width: 100%;
  padding: 0;
}
.add-sport-club-form div:not(:last-child) {
  margin-right: 1em;
}
.add-sport-club-form div input {
  width: 100%;
}
.add-sport-club-form div textarea {
  resize: vertical;
  width: 100%;
  min-height: 3em;
  max-height: 7em;
  border: 2px solid var(--black);
  border-radius: 10px;
  padding: .5em;
}
.add-sport-club-submit {
  text-align: center;
}
.user-selection span {
  width: 100%;
}
</style>