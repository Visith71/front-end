<template>
  <ConfirmDialog></ConfirmDialog>
  <div v-if="sportClubs.items">
    <div class="table-header sport-club-table-header">
      <div>
        <input type="text" class="table-search" placeholder="🔎 Club's ID, Name, Owner, Address..." v-model="search">

        <input type="date" class="table-search" placeholder="📆 Filter Pitch by Created Date..." v-model="searchDate">
      </div>
      <h1>{{ sportClubs.total }} Sport Clubs 🏁</h1>
    </div>
    <div class="table">
      <table>
        <tr>
          <th v-for="title in tableTitle" :key="title">
            <div class="table-title">
              {{ title }}
              <img class='disactive-ascen' @click="handleClubsSort(title, $event)" src="../../assets/icons/up-arrow.png" alt="descendant-white" ref="icon">
            </div>
          </th>
          <th colspan="2">Actions</th>
        </tr>
        <tr v-for="club in filteredSportClubs" :key="club.id" :club="club">
          <td>
            <p>{{ club.id }}</p>
          </td>
          <td>
            <h2><strong>{{ club.name }}</strong></h2>
          </td>
          <td>
            <p v-if="club.user !== null">{{ club.user.first_name }} {{ club.user.last_name }}</p>
            <p v-else>• NaN •</p>
          </td>
          <td>
            <p>{{ club.pitch_details.length }} pitches</p>
          </td>
          <td>
            <p>{{ JSON.parse(club.locationUrl).formatted_address }}</p>
          </td>
          <td>
            <div class="action map-url">
              <button v-if="JSON.parse(club.locationUrl).url">
                <a :href="JSON.parse(club.locationUrl).url" target="_blank">🌏</a>
              </button>
              <button v-else class="disabled-map-url">
                🌏
              </button>
            </div>
          </td>
          <td>
            <div class="action edit">
              <button @click="openEditSportClub(club)">🔨</button>
            </div>
          </td>
          <td>
            <div class="action delete">
              <button @click="deleteSportClub(club)">❌</button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { ref } from 'vue'
import axios from 'axios'
import ConfirmDialog from 'primevue/confirmdialog';

export default {
  props: ['sportClubs'],
  components: {
    ConfirmDialog
  },
  data() {
    return {
      search: '',
      filter: '',
      searchDate: '',
      getClubsPagInfo: null,
      isSortedDsec: false,
      idTitleRef: null,
      cnTitleRef: null,
      obTitleRef: null,
      opTitleRef: null,
      addTitleRef: null,
      muTitleRef: null
    }
  },
  setup () {
    const tableTitle = ref([
      'ID',
      "Club's Name",
      'Owned By',
      'Owned Pitches',
      'Address',
      'Map URL'
    ])
    return { format, tableTitle }
  },
  methods: {
    handleTitleRef(curRef) {
      let allTitleRef = [
        this.idTitleRef,
        this.cnTitleRef,
        this.obTitleRef,
        this.opTitleRef,
        this.addTitleRef,
        this.muTitleRef
      ]
      for (let i = 0; i < allTitleRef.length; i++) {
        if (allTitleRef[i] !== curRef) {
          allTitleRef[i] != null ? allTitleRef[i].classList.remove('is-dsec') : null
        }
      }
    },
    handleClubsSort(title, e) {
      let getTableTitle = ''
      if (title == 'ID') {
        getTableTitle = 'id'
        this.idTitleRef = e.target
        this.handleTitleRef(this.idTitleRef)
      } if (title == "Club's Name") {
        getTableTitle = 'name'
        this.cnTitleRef = e.target
        this.handleTitleRef(this.cnTitleRef)
      } if (title == 'Owned By') {
        getTableTitle = 'userId'
        this.obTitleRef = e.target
        this.handleTitleRef(this.obTitleRef)
      } if (title == 'Address' || title == 'Owned Pitches' || title == 'Map URL') {
        e.target.classList.add('no-display-title')
        return
      }

      if (this.isSortedDsec == false) {
        e.target.classList.add('is-dsec')
        this.$emit('dispatchClubsByPag', {
          sortBy: [`${getTableTitle}`],
          sortDesc: [true]
        })
        this.isSortedDsec = true
      } else {
        e.target.classList.remove('is-dsec')
        this.$emit('dispatchClubsByPag', {
          sortBy: [`${getTableTitle}`],
          sortDesc: [false]
        })
        this.isSortedDsec = false
      }
    },
    openEditSportClub(club) {
      this.$emit('openEditSportClub', club)
    },
    async deleteSportClub(club) {
      this.$confirm.require({
        message: `Are you sure want to delete ${club.name}?`,
        header: 'Sport Club Delete Confirmation ⭕❗❕',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          axios.delete(`sport-clubs/${club.id}`, {
            headers: {
              'x-access-token': `${localStorage.getItem('accessToken')}`
            }
          })
          .then(() => {
            this.toast(club.name + ' has been deleted!', 3000, 'successed')
            this.$confirm.close()
            this.$store.dispatch('sportClubs/getAllSportClubs', JSON.parse(localStorage.getItem('clubsPagInfo')))
            this.$store.dispatch('users/getClubOwners')
          })
          .catch(err => {
              if(err.response) {
              this.toast(err.response.data.message, 3000, 'error')
            } else {
              console.log('No response!')
            }
          })
        },
        reject: () => {
          this.$confirm.close();
        }
      })
    }
  },
  computed: {
    filteredSportClubs() {
      return this.sportClubs.items.filter((club) => {
        // let dateFormat = format(new Date(club.createdAt), 'yyyy-MM-dd');

        // if(this.searchDate.length) {
        //   return dateFormat.includes(this.searchDate.toLowerCase().trim())
        // }
        if(this.search.length) {
          const user = club.user
          return club.id.toString().includes(this.search.trim()) || club.name.toLowerCase().includes(this.search.toLowerCase().trim()) || club.user.first_name.toLowerCase().includes(this.search.toLowerCase().trim())|| club.user.last_name.includes(this.search.trim()) || JSON.parse(club.locationUrl).formatted_address.toLowerCase().includes(this.search.toLowerCase().trim())
        }
        return club
      })
    }
  }
}
</script>

<style scoped>
.disabled-map-url {
  opacity: .5;
  pointer-events: none;
}
.no-display-title {
  display: none;
}
</style>