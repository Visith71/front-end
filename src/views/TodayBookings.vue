<template v-if="user">
  <div class="main new-booking-main">
    <div class="main-title title-section">
      <div class="title">
        <img src="../assets/icons/todaybooking-icon.png" />
        <h1>Today Bookings</h1>
      </div>
      <div class="add-new-button add-booking-button">
        <button @click="(showCardView = true) && (showListView = false) || (showAddBookings = false)">Card views 📮👊</button>
        <button @click="(showListView = true) && (showCardView = false) || (showAddBookings = false)">List views 🧱🤘</button>
        <button @click="(showAddBookings = true) && (showCardView = false) || (showListView = false)">New Booking 👊➕</button>
      </div>
    </div>
    <div class="cards-section animate__animated animate__bounceInUp">
      <div v-if="showCardView" class="cards-layout cards-bookings-layout  animate__animated animate__fadeInUp">
        <div class="bookings-card-header">
          <div :class="!isAdmin ? 'visibility-hidden':'table-header-left'">
            <ClubAutoComplete 
              :getAllSportClubs="getAllSportClubs"
              @emitSelectedClub="getSelectedClub"
              :selected="selectedClub"
              @clearAutoComplete="clearAutoComplete"
            />
            <h1 v-if="selectedClub && selectedClub.name">'s today bookings</h1>
            <h1 v-else>bookings from all clubs</h1>
          </div>
          <div class="table-pagination card-table-pagination bookings-card-pagination">
            <div class="page-size">
              <select v-model="itemSize" class="item-size-select">
                <option v-for="opt in itemSizeList" :key="opt" :value="opt">
                  {{ opt }}
                </option>
              </select>
              <p class="item-per-page"> | Showing {{ getFirstItemNum }} to {{getLastItemNum}} of <i>{{bookings.total}} items</i></p>
            </div>
            <v-pagination 
              v-model="pageNum"
              :pages="getTotalPage"
              :range-size="1"
              active-color="f2f2f2"
            />
          </div>
        </div>
        <NewBookingsCards 
          :bookings="bookings"
          v-if="bookings.items && bookings.items.length > 0" 
        />
      </div>
      <div v-if="showListView" class="cards-layout cards-bookings-layout animate__animated animate__fadeInUp">
        <div class="bookings-card-header">
          <div :class="!isAdmin ? 'visibility-hidden':'table-header-left'">
            <ClubAutoComplete 
              :getAllSportClubs="getAllSportClubs"
              @emitSelectedClub="getSelectedClub"
              :selected="selectedClub"
              @clearAutoComplete="clearAutoComplete"
            />
            <h1 v-if="selectedClub && selectedClub.name">'s today bookings</h1>
            <h1 v-else>bookings from all clubs</h1>
          </div>
          <div class="table-pagination card-table-pagination bookings-card-pagination">
            <div class="page-size">
              <select v-model="itemSize" class="item-size-select">
                <option v-for="opt in itemSizeList" :key="opt" :value="opt">
                  {{ opt }}
                </option>
              </select>
              <p class="item-per-page"> | Showing {{ getFirstItemNum }} to {{getLastItemNum}} of <i>{{bookings.total}} items</i></p>
            </div>
            <v-pagination 
              v-model="pageNum"
              :pages="getTotalPage"
              :range-size="1"
              active-color="f2f2f2"
            />
          </div>
        </div>
        <NewBookingsLists 
          :bookings="bookings"
          v-if="bookings.items && bookings.items.length > 0"
        />
      </div>

      <div v-if="bookings.items && bookings.items.length <= 0" class="no-data-div animate__animated animate__jello">
        <h2>No bookings have made yet...🙏🙌🤗</h2>
      </div>

      <div v-if="showAddBookings" 
      class="cards-layout add-bookings-layout animate__animated animate__fadeInUp">
        <AddBookings />
      </div>
    </div>
  </div>
</template>


<script>
import NewBookingsCards from "../components/bookings/NewBookingsCards";
import NewBookingsLists from "../components/bookings/NewBookingsLists";
import AddBookings from '../components/bookings/AddBookings.vue'
import { ref } from 'vue'
import VPagination from '@hennge/vue3-pagination';
import "@hennge/vue3-pagination/dist/vue3-pagination.css"
import { getAllClubs } from '../composable/mixins/getAllClub' 

export default {
  mixins: [getAllClubs],
  components: {
    NewBookingsCards,
    NewBookingsLists,
    AddBookings,
    VPagination
  },
  setup() {
    const showCardView = ref(true)
    const showListView = ref(false)
    const showAddBookings = ref(false)

    return { showCardView, showListView, showAddBookings };
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 3,
      itemSize: null,
      itemSizeList: [5, 10, 20, 30, 40, 50],
      pickedItemSize: null,
      selectedClub: null
    }
  },
  watch: {
    pageNum() {
      let params = {
        page: this.pageNum,
        itemsPerPage: this.itemSize
      }
      localStorage.setItem('bookingsPagInfo', JSON.stringify(params))
      if (!this.selectedClub) {
        this.$store.dispatch('bookings/getBookings', params)
      } else {
        this.$store.dispatch('bookings/getBookingsByClubId', {
          ...params,
          id: this.selectedClub.id
        })
      }
    },
    itemSize() {
      let params = {
        page: this.pageNum,
        itemsPerPage: this.itemSize
      }
      localStorage.setItem('bookingsPagInfo', JSON.stringify(params))
      if (!this.selectedClub) {
        this.$store.dispatch('bookings/getBookings', params)
      } else {
        this.$store.dispatch('bookings/getBookingsByClubId', {
          ...params,
          id: this.selectedClub.id
        })
      }
    },
    selectedClub(curValue) {
      if (curValue && curValue.id) {
        const pagInfo = JSON.parse(localStorage.getItem('bookingsPagInfo'))
        try {
          this.$store.dispatch('bookings/getBookingsByClubId', {  
            itemsPerPage: pagInfo.itemsPerPage,
            page: pagInfo.page,
            id: curValue.id
          })
        } catch(err) {
          console.log(err)
        }
      }
    }
  },
  methods: {
    // dispatchBookingsByPag(params) {
    //   this.$store.dispatch('bookings/getBookings', {
    //     itemsPerPage: this.itemSize,
    //     page: this.pageNum,
    //     sortDesc: params.sortDesc,
    //     sortBy: params.sortBy
    //   })
    // },
    clearAutoComplete() {
      const pagInfo = JSON.parse(localStorage.getItem('bookingsPagInfo'))
      console.log(pagInfo)
      this.$store.dispatch('bookings/getBookings', pagInfo)
      this.selectedClub = null
    },
  },
  computed: {
    bookings() {
      return this.$store.getters['bookings/bookings']
    },
    getTotalPage() {
      return Math.ceil(this.bookings.total / this.itemSize)
    },
    getFirstItemNum() {
      return (this.itemSize * this.pageNum) - (this.itemSize) + 1
    },
    getLastItemNum() {
      const lastItemNum = (this.itemSize * this.pageNum)
      return lastItemNum >= this.bookings.total ? this.bookings.total : lastItemNum  
    }
  },
  created() {
    const bookingsPagInfo = JSON.parse(localStorage.getItem('bookingsPagInfo'))
    if (bookingsPagInfo) {
      this.itemSize = bookingsPagInfo.itemsPerPage;
      this.pickedItemSize = bookingsPagInfo.itemsPerPage;
    } else {
      this.itemSize = 10;
      this.pickedItemSize = 10
    }

    let params = {
      itemsPerPage: this.itemSize,
      page: this.pageNum
    }
    localStorage.setItem('bookingsPagInfo', JSON.stringify(params))

    this.$store.dispatch('bookings/getBookings', params)
  },
};
</script>
<style scoped>
.animate__animated.animate__bounceInUp {
  --animated-duration: 1.5s;
}
.add-bookings-layout {
  width: 100%;
  margin: 0 auto;
}
.cards-section {
  margin-top: 3em;
}
.cards-bookings-layout {
  padding-bottom: 5em;
}
a {
  text-decoration: none;
}
.bookings-card-pagination {
  width: 100%;
  padding: 0;
  margin: 0;
}
.bookings-card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 2em;
}


/* responsive-mobile */
@media only screen and (min-device-width : 200px) and (max-device-width : 480px) {
  .new-booking-section {
    /* margin-left: -50px; */
  }
}

/* responsive-tablet */
@media only screen and (min-device-width : 700px) and (max-device-width : 1024px) {
  .custom-views button {
    visibility: hidden;
    font-size: 1vw;
    text-align: center;
    display: inline;
  }
  .in-game-section {
    display: none;
  }
  .new-booking-section {
    /* transform: translateX(5vw); */
    margin-top: 0.5vh;
  }
  .title-section {
    height: 5vh;
  }

  .cards-section {
    grid-template-columns: minmax(auto, 500px);
    margin-top: auto;
    margin-left: 50%;
  }
}
</style>