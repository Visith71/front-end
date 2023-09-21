<template>
  <ConfirmDialog></ConfirmDialog>
  <div>
    <div class="table-header pitches-list-table-header">
      <div class="pitches-list-table-header-left">
        <ClubAutoComplete 
          :getAllSportClubs="getAllSportClubs"
          @emitSelectedClub="getSelectedClub"
          :selected="selectedClub"
          @clearAutoComplete="clearAutoComplete"
          v-if="isAdmin"
        />
        <input type="text" class="table-search" placeholder="⚽ Filter Pitch by: Pitch Number, Pitch Size, Pitch Condition..." v-model="search">

        <input type="date" class="table-search" placeholder="📆 Filter Pitch by Created Date..." v-model="searchDate">
      </div>

      <h1 v-if="selectedClub && selectedClub.name">{{pitches.total}} {{ selectedClub.name }}'s Pitches ⛳</h1>
      <h1 v-else>{{ pitches.total }} Pitches ⛳</h1>
    </div>
    <div class="table">
      <table>
        <tr>
          <th v-for="title in tableTitle" :key="title">
            <div class="table-title">
              {{ title }}
              <img class='disactive-ascen' @click="handlePitchesSort(title, $event)" src="../../assets/icons/up-arrow.png" alt="descendant-white" ref="icon">
            </div>
          </th>
          <th colspan="3">Actions</th>
        </tr>
        <tr v-for="pitch in filteredPitches" :key="pitch.id" :pitch="pitch">
          <td @click="openPitch(pitch)">
            <p>{{ pitch.id }}</p>
          </td>
          <td @click="openPitch(pitch)">
            <h2>{{ pitch.name }}</h2>
          </td>
          <td @click="openPitch(pitch)">
            <p>{{ pitch.size }}</p>
          </td>
          <td @click="openPitch(pitch)">
            <p>{{ pitch.sport_club.name }}</p>
          </td>
          <td @click="openPitch(pitch)">
            <p>{{ format(new Date(), 'yyyy-LL-dd') }}</p>
          </td>
          <td>
            <div class="action dup">
              <button @click="openDubPitch(pitch)">⚡</button>
            </div>
          </td>
          <td>
            <div class="action edit">
              <button @click="openEditPitch(pitch)">🔨</button>
            </div>
          </td>
          <td>
            <div class="action delete">
              <button @click="deletePitch(pitch)">❌</button>
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
import ModalView from '../main-component/ModalView.vue'
import axios from 'axios'
import ConfirmDialog from 'primevue/confirmdialog';

export default {  
  props: ['pitches', 'getAllSportClubs', 'selectedClub'],
  components: {
    ModalView,
    ConfirmDialog
  },
  setup () {
    const tableTitle = ref([
      'ID',
      'Pitch Number',
      'Pitch Size',
      'Created By',
      'Created At'
    ])
    return { format, tableTitle}
  },
  data() {
    return {
      search: '',
      filter: '',
      searchDate: '',
      getPitchesPagInfo: null,
      isSortedDsec: false,
      idTitleRef: null,
      pnTitleRef: null,
      psTitleRef: null,
      cbTitleRef: null,
      caTitleRef: null
    }
  },
  methods: {
    handleTitleRef(curRef) {
      let allTitleRef = [
        this.idTitleRef,
        this.pnTitleRef,
        this.psTitleRef,
        this.cbTitleRef,
        this.caTitleRef
      ]
      for (let i = 0; i < allTitleRef.length; i++) {
        if (allTitleRef[i] !== curRef) {
          allTitleRef[i] != null ? allTitleRef[i].classList.remove('is-dsec') : null
        }
      }
    },
    handlePitchesSort(title, e) {
      let getTableTitle = ''
      if (title == 'ID') {
        getTableTitle = 'id'
        this.idTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title == 'Pitch Number') {
        getTableTitle = 'name'
        this.pnTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title == 'Pitch Size') {
        getTableTitle = 'size'
        this.psTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title == 'Created By') {
        getTableTitle = 'sportClubId'
        this.cbTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title == 'Created At') {
        getTableTitle = 'createdAt'
        this.caTitleRef = e.target
        this.handleTitleRef(e.target)
      }

      if (this.isSortedDsec == false) {
        e.target.classList.add('is-dsec')
        this.$emit('dispatchPitchesByPag', {
          sortBy: [`${getTableTitle}`],
          sortDesc: [true]
        })
        this.isSortedDsec = true
      } else {
        e.target.classList.remove('is-dsec')
        this.$emit('dispatchPitchesByPag', {
          sortBy: [`${getTableTitle}`],
          sortDesc: [false]
        })
        this.isSortedDsec = false
      }
    },
    openPitch(pitch) {
      this.$emit('openPitch', pitch)
    },
    openEditPitch(pitch) {
      this.$emit('openEditPitch', pitch)
    },
    openDubPitch(pitch) {
      this.$emit('openDubPitch', pitch)
    },
    getSelectedClub(curValue) {
      this.$emit('getSelectedClub', curValue)
    },
    clearAutoComplete() {
      this.$emit('clearAutoComplete')
    },
    async deletePitch(pitch) {
      this.$confirm.require({
        message: `Are you sure want to delete pitch ${pitch.pitchNumber}?`,
        header: 'Pitch Delete Confirmation ⭕❗❕',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          axios.delete(`pitch-details/${pitch.id}`, {
            headers: {
              'x-access-token': `${localStorage.getItem('accessToken')}`
            }
          })
          .then(() => {
            this.toast('Pitch ' + pitch.name + ' has been deleted!', 3000, 'error')
            this.$confirm.close()
            this.$store.dispatch('pitches/getPitches', JSON.parse(localStorage.getItem('pitchesPagInfo')))
          }).catch(err => {
            if(err.response) {
              this.toast(err.response.data.message, 3000, 'error')
            } else {
              this.toast('Error: No Response!', 3000, 'error')
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
    isAdmin() {
      return localStorage.getItem('roles') === 'ROLE_ADMIN' ? true : false
    },
    filteredPitches() {
      return this.pitches.items.filter((pitch) => {
        let dateFormat = format(new Date(), 'yyyy-LL-dd');

        if(this.searchDate.length) {
          return dateFormat.includes(this.searchDate.toLowerCase().trim())
        }
        if(this.search.length) {
          return pitch.name.includes(this.search.trim()) || pitch.size.toLowerCase().includes(this.search.toLowerCase().trim()) || pitch.description.toLowerCase().includes(this.search.toLowerCase().trim()) || pitch.sport_club.name.toLowerCase().includes(this.search.toLowerCase().trim())
        }
        return pitch
      })
    }
  }
}
</script>

<style scoped>
.pitches-list-table-header-left {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.pitches-list-table-header-left input {
  width: 30%;
}
.pitches-list-table-header-left input:nth-child(2) {
  margin-left: 1em;
}
.table-header h1 {
  font-size: 1.5em;
}
</style>