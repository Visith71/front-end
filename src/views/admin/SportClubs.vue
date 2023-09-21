<template>
  <div class="main sport-clubs-main">
    <div class="main-title title-section">
      <div class="title">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="64" height="64"
        viewBox="0 0 50 50"
        style=" fill:var(--black);">
        <path d="M 0 10 L 0 40 L 5 40 L 5 15 L 45 15 L 45 40 L 50 40 L 50 10 Z M 9.59375 17 L 7 19.59375 L 7 22.40625 L 10.09375 25.5 L 7 28.59375 L 7 31.40625 L 10.09375 34.5 L 7 37.59375 L 7 40 C 7.257813 40 7.523438 39.914063 7.71875 39.71875 L 11.5 35.90625 L 15.28125 39.71875 C 15.476563 39.914063 15.742188 40 16 40 C 16.257813 40 16.523438 39.914063 16.71875 39.71875 L 20.5 35.90625 L 24.28125 39.71875 C 24.476563 39.914063 24.742188 40 25 40 C 25.257813 40 25.523438 39.914063 25.71875 39.71875 L 29.5 35.90625 L 33.28125 39.71875 C 33.476563 39.914063 33.742188 40 34 40 C 34.257813 40 34.523438 39.914063 34.71875 39.71875 L 38.5 35.90625 L 42.28125 39.71875 C 42.476563 39.914063 42.742188 40 43 40 L 43 37.59375 L 39.90625 34.5 L 43 31.40625 L 43 28.59375 L 39.90625 25.5 L 43 22.40625 L 43 19.59375 L 40.40625 17 L 36.59375 17 L 34 19.59375 L 31.40625 17 L 27.59375 17 L 25 19.59375 L 22.40625 17 L 18.59375 17 L 16 19.59375 L 13.40625 17 Z M 11.5 17.90625 L 14.59375 21 L 11.5 24.09375 L 8.40625 21 Z M 20.5 17.90625 L 23.59375 21 L 20.5 24.09375 L 17.40625 21 Z M 29.5 17.90625 L 32.59375 21 L 29.5 24.09375 L 26.40625 21 Z M 38.5 17.90625 L 41.59375 21 L 38.5 24.09375 L 35.40625 21 Z M 16 22.40625 L 19.09375 25.5 L 16 28.59375 L 12.90625 25.5 Z M 25 22.40625 L 28.09375 25.5 L 25 28.59375 L 21.90625 25.5 Z M 34 22.40625 L 37.09375 25.5 L 34 28.59375 L 30.90625 25.5 Z M 11.5 26.90625 L 14.59375 30 L 11.5 33.09375 L 8.40625 30 Z M 20.5 26.90625 L 23.59375 30 L 20.5 33.09375 L 17.40625 30 Z M 29.5 26.90625 L 32.59375 30 L 29.5 33.09375 L 26.40625 30 Z M 38.5 26.90625 L 41.59375 30 L 38.5 33.09375 L 35.40625 30 Z M 16 31.40625 L 19.09375 34.5 L 16 37.59375 L 12.90625 34.5 Z M 25 31.40625 L 28.09375 34.5 L 25 37.59375 L 21.90625 34.5 Z M 34 31.40625 L 37.09375 34.5 L 34 37.59375 L 30.90625 34.5 Z"></path>
        </svg>
        <h1>Sport Clubs</h1>
      </div>
      <div class="add-new-button add-user-button">
        <button @click="(showCardView = true) && (showListView = false)">Card view 🎴</button>
        <button @click="(showListView = true) && (showCardView = false)">List view 🧾</button>
        <button @click="openAddSportClub">New Sport Club ➕</button>
      </div>
    </div>
    <div class="card-section animate__animated animate__fadeInUp sport-club-card-section">
      <div
        v-if="showCardView"
        class="animate__animated animate__fadeInUp"
      >
        <div class="table-pagination card-table-pagination">
          <div class="page-size">
            <select v-model="itemSize" class="item-size-select">
              <option v-for="opt in itemSizeList" :key="opt" :value="opt">
                {{ opt }}
              </option>
            </select>
            <p class="item-per-page"> | Showing {{ getFirstItemNum }} to {{getLastItemNum}} of <i>{{getAllSportClubsTotal}} items</i></p>
          </div>
          <v-pagination 
            v-model="pageNum"
            :pages="getTotalPage"
            :range-size="1"
            active-color="f2f2f2"
          />
        </div>
        <SportClubsCardView 
          :sportClubs="getAllSportClubs"
          @openEditSportClub="openEditSportClub" 
          @dispatchClubsByPag="dispatchClubsByPag" 
        />
      </div>
      <div
        v-if="showListView"
        class="animate__animated animate__fadeInUp"
      >
        <SportClubListView 
          :sportClubs="getAllSportClubs"
          @openEditSportClub="openEditSportClub" 
          @dispatchClubsByPag="dispatchClubsByPag" 
        />
        <div class="table-pagination">
          <div class="page-size">
            <select v-model="itemSize" class="item-size-select">
              <option v-for="opt in itemSizeList" :key="opt" :value="opt">
                {{ opt }}
              </option>
            </select>
            <p class="item-per-page"> | Showing {{ getFirstItemNum }} to {{getLastItemNum}} of <i>{{getAllSportClubsTotal}} items</i></p>
          </div>
          <v-pagination 
            v-model="pageNum"
            :pages="getTotalPage"
            :range-size="1"
            active-color="f2f2f2"
          />
        </div>
      </div>
    </div>
  </div>
  <ModalView v-if="openedEditSportClub" @closeModal="openedEditSportClub = null"
  mode="wide-height sport-club-modal-card">
    <EditSportClub :club="openedEditSportClub" @changeEditSportClub="changeEditSportClub"
    @closeEditSportClub="openedEditSportClub = null" />
  </ModalView>

  <ModalView v-if="openedAddSportClub" @closeModal="openedAddSportClub = null"
  mode="wide-height">
    <AddSportClub :allClubOwners="getAllClubOwners" @closeModal="openedAddSportClub = null" />
  </ModalView>
</template>

<script>
import SportClubsCardView from '../../components/sportclub/SportClubsCardView.vue'
import SportClubListView from '../../components/sportclub/SportClubsListView.vue'
import AddSportClub from '../../components/sportclub/AddSportClub.vue'
import ModalView from '../../components/main-component/ModalView.vue'
import { ref } from 'vue'
import EditSportClub from '../../components/sportclub/EditSportClubs.vue'
import VPagination from '@hennge/vue3-pagination';
import "@hennge/vue3-pagination/dist/vue3-pagination.css"

export default {
  components: {
    SportClubsCardView,
    SportClubListView,
    EditSportClub,
    ModalView,
    VPagination,
    AddSportClub
  },
  setup() {
    const showCardView = ref(true)
    const showListView = ref(false)

    return { 
      showCardView, 
      showListView,
      openedEditSportClub: ref(null),
      openedAddSportClub: ref(null)
    };
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 3,
      itemSize: null,
      itemSizeList: [5, 10, 20, 30, 40, 50],
      pickedItemSize: null
    }
  },
  watch: {
    pageNum() {
      let params = {
        page: this.pageNum,
        itemsPerPage: this.itemSize
      }
      localStorage.setItem('clubsPagInfo', JSON.stringify(params))
      this.$store.dispatch('sportClubs/getAllSportClubs', params)
    },
    itemSize() {
      let params = {
        page: this.pageNum,
        itemsPerPage: this.itemSize
      }
      localStorage.setItem('clubsPagInfo', JSON.stringify(params))
      this.$store.dispatch('sportClubs/getAllSportClubs', params)
    }
  },
  methods: {
    dispatchClubsByPag(params) {
      this.$store.dispatch('sportClubs/getAllSportClubs', {
        itemsPerPage: this.itemSize,
        page: this.pageNum,
        sortDesc: params.sortDesc,
        sortBy: params.sortBy
      })
    },
    openEditSportClub(club) {
      this.openedEditSportClub = club;
    },
    changeEditSportClub({closeModal}) {
      let club = this.openedEditSportClub
      if(closeModal) {
        this.openedEditSportClub = null
      }
    },
    openAddSportClub() {
      this.openedAddSportClub = true;
    },

  },
  computed: {
    getAllSportClubs() {
      return this.$store.getters['sportClubs/getAllSportClubs']
    },
    getTotalPage() {
      return this.getAllSportClubs && this.getAllSportClubs.total ? Math.ceil(this.getAllSportClubs.total / this.itemSize) : null
    },
    getAllSportClubsTotal() {
      return this.getAllSportClubs && this.getAllSportClubs.total ? this.getAllSportClubs.total : null
    },
    getFirstItemNum() {
      return (this.itemSize * this.pageNum) - (this.itemSize) + 1
    },
    getLastItemNum() {
      const lastItemNum = (this.itemSize * this.pageNum)
      return this.getAllSportClubs && this.getAllSportClubs.total && lastItemNum >= this.getAllSportClubs.total ? this.getAllSportClubs.total : lastItemNum  
    },
    getAllClubOwners() {
      return this.$store.getters['users/allClubOwners']
    }
  },
  created() {
    const clubsPagInfo = JSON.parse(localStorage.getItem('clubPagInfo'))
    if (clubsPagInfo) {
      this.itemSize = clubsPagInfo.itemsPerPage,
      this.pickedItemSize = clubsPagInfo.itemsPerPage
    } else {
      this.itemSize = 10;
      this.pickedItemSize = 10;
    }

    let params = {
      itemsPerPage: this.itemSize,
      page: this.pageNum
    }
    localStorage.setItem('clubsPagInfo', JSON.stringify(params))

    this.$store.dispatch('sportClubs/getAllSportClubs', params)
    
    this.$store.dispatch('users/getClubOwners')
  },
}
</script>

<style scoped>
.sport-club-card-section {
  height: auto;
}
.title svg {
  margin-right: 1em;
}
.card-section {
  padding: 2em;
  width: 90%;
  margin: 0 auto;
}
</style>