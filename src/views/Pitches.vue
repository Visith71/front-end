<template>
  <div class="pitches-main">
    <div class="new-pitch-section">
      <div class="title-section">
        <div class="page-name pitches-page-name">
          <img class="pitches-page-name-icon" src="../assets/icons/pitches-icon.png" />
          <p>Pitches</p>
        </div>
        <div class="pitches-views">
          <button class="list-button"
          @click="(showCardView = true) && (showListView = false)">
            📮 Card Views
          </button>

          <button class="list-button" 
          @click="(showListView = true) && (showCardView = false)">
            🧮 List Views
          </button>

          <button class="addNewPitchButton" v-show="!changeScreen" @click="openAddPitch">
              Add Pitch
              <img id="plus-icon" src="../assets/icons/plus-icon.png" />
          </button>
        </div>
      </div>
      <div class="card-section animate__animated animate__fadeInUp">
        <div class="cards-layout">
          <br>
          <!-- <NewPitchGrid :pitches="pitches" /> -->
          <div v-if="showCardView">
            <div class="pitch-data-table-header">
              <div :class="!isAdmin ? 'visibility-hidden':'table-header-left'">
                <ClubAutoComplete 
                  :getAllSportClubs="getAllSportClubs"
                  @emitSelectedClub="getSelectedClub"
                  :selected="selectedClub"
                  @clearAutoComplete="clearAutoComplete"
                />
                <h1 v-if="selectedClub && selectedClub.name">'s pitches</h1>
                <h1 v-else>pitches from all clubs</h1>
              </div>
              <div class="table-pagination card-table-pagination">
                <div class="page-size">
                  <select v-model="itemSize" class="item-size-select">
                    <option v-for="opt in itemSizeList" :key="opt" :value="opt">
                      {{ opt }}
                    </option>
                  </select>
                  <p class="item-per-page"> | Showing {{ getFirstItemNum }} to {{getLastItemNum}} of <i>{{pitches.total}} items</i></p>
                </div>
                <v-pagination 
                  v-model="pageNum"
                  :pages="getTotalPage"
                  :range-size="1"
                  active-color="f2f2f2"
                />
              </div>
            </div>
            <PitchData 
              :pitches="pitches" 
              @dispatchPitchesByPag="dispatchPitchesByPag" 
              @openPitch="openPitch"
              @openEditPitch="openEditPitch"
              @openDubPitch="openDubPitch"
            />
          </div>
      
          <div v-if="showListView">
            <PitchListView 
              :pitches="pitches" 
              @dispatchPitchesByPag="dispatchPitchesByPag"
              :getAllSportClubs="getAllSportClubs"
              @getSelectedClub="getSelectedClub"
              :selectedClub="selectedClub"
              @clearAutoComplete="clearAutoComplete"
              @openPitch="openPitch"
              @openEditPitch="openEditPitch"
              @openDubPitch="openDubPitch"
            />
            <div class="table-pagination">
              <div class="page-size">
                <select v-model="itemSize" class="item-size-select">
                  <option v-for="opt in itemSizeList" :key="opt" :value="opt">
                    {{ opt }}
                  </option>
                </select>
                <p class="item-per-page"> | Showing {{ getFirstItemNum }} to {{getLastItemNum}} of <i>{{pitches.total}} items</i></p>
              </div>
              <v-pagination 
                v-model="pageNum"
                :pages="getTotalPage"
                :range-size="1"
                active-color="f2f2f2"
              />
            </div>
          </div>

          <div v-if="pitches.items && pitches.items.length <= 0" class="no-data-div animate__animated animate__jello">
            <h2>No pitches created yet...🙏🙌🤗</h2>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ModalView 
    v-if="openedAddPitch" 
    @closeModal="openedAddPitch = null" 
    mode="pitch-modal wide-modal-card">
    <AddPitch 
      @changeAddPitch="changeAddPitch"
      @closeAddPitchModal="openedAddPitch = null" 
    />
  </ModalView>

  <ModalView 
    v-if="openedPitch"
    @closeModal="openedPitch = null" 
    mode="pitch-modal wide-modal-card"> 
    <PitchDataView 
      :pitch="openedPitch"
      @changePitch="openedPitch = null"
    />
  </ModalView>

  <ModalView 
    v-if="openedEditPitch"
    @closeModal="openedEditPitch = null" 
    mode="pitch-modal wide-modal-card"> 
    <EditPitch 
      :pitch="openedEditPitch"
      @changePitch="openedEditPitch = null"
    />
  </ModalView>

  <ModalView 
    v-if="openedDubPitch"
    @closeModal="openedDubPitch = null" 
    mode="pitch-modal wide-modal-card"> 
    <DubPitch 
      :pitch="openedDubPitch"
      @changePitch="openedDubPitch = null"
    />
  </ModalView>
</template>

<script>
import PitchData from '../components/pitches/PitchData.vue'
import ModalView from '../components/main-component/ModalView.vue'
import AddPitch from '../components/pitches/AddPitch.vue'
import PitchListView from '../components/pitches/PitchListView.vue'
import VPagination from '@hennge/vue3-pagination';
import "@hennge/vue3-pagination/dist/vue3-pagination.css"
import { ref } from 'vue'
import { getAllClubs } from '../composable/mixins/getAllClub'
import PitchDataView from '../components/pitches/PitchDataView.vue'
import EditPitch from '../components/pitches/EditPitch.vue'
import DubPitch from '../components/pitches/DubPitch.vue' 

export default {
  mixins: [getAllClubs],
  components: {
    PitchData,
    AddPitch,
    ModalView,
    PitchListView,
    VPagination,
    PitchDataView,
    EditPitch,
    DubPitch
  },
  setup() {
    const showCardView = ref(true)
    const showListView = ref(false)

    return { 
      openedAddPitch: ref(null), 
      showCardView, 
      showListView,
      openedPitch: ref(null),
      openedEditPitch: ref(null),
      openedDubPitch: ref(null)
    };
  },
  data() {
    return {
      changeScreen: false,
      pageNum: 1,
      pageSize: 3,
      itemSize: null,
      itemSizeList: [5, 10, 20, 30, 40, 50],
      pickedItemSize: null,
      selectedClub: null,
      pitchesSort: null
    };
  },
  watch: {
    pageNum() {
      let params = null
      if (!this.pitchesSort) {
        params = {
          page: this.pageNum,
          itemsPerPage: this.itemSize
        }
      } else {
        params = {
          page: this.pageNum,
          itemsPerPage: this.itemSize,
          sortBy: this.pitchesSort.sortBy,
          sortDesc: this.pitchesSort.sortDesc
        }
      }
      localStorage.setItem('pitchesPagInfo', JSON.stringify(params))
      if (!this.selectedClub) {
        this.$store.dispatch('pitches/getPitches', params)
      } else {
        this.$store.dispatch('pitches/getPitchesByClubId', {
          ...params,
          id: this.selectedClub.id
        })
      }
    },
    itemSize() {
      let params = null
      if (!this.pitchesSort) {
        params = {
          page: this.pageNum,
          itemsPerPage: this.itemSize
        }
      } else {
        params = {
          page: this.pageNum,
          itemsPerPage: this.itemSize,
          sortBy: this.pitchesSort.sortBy,
          sortDesc: this.pitchesSort.sortDesc
        }
      }
      localStorage.setItem('pitchesPagInfo', JSON.stringify(params))
      if (!this.selectedClub) {
        this.$store.dispatch('pitches/getPitches', params)
      } else {
        this.$store.dispatch('pitches/getPitchesByClubId', {
          ...params,
          id: this.selectedClub.id
        })
      }
    },
    selectedClub(curValue) {
      if (curValue && curValue.id) {
        const pagInfo = JSON.parse(localStorage.getItem('pitchesPagInfo'))
        try {
          this.$store.dispatch('pitches/getPitchesByClubId', {  
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
    openPitch(pitch) {
      this.openedPitch = pitch
    },
    openEditPitch(pitch) {
      this.openedEditPitch = pitch
    },
    openDubPitch(pitch) {
      this.openedDubPitch = pitch
    },
    dispatchPitchesByPag(params) {
      this.pitchesSort = params
      if (!this.selectedClub) {
        this.$store.dispatch('pitches/getPitches', {
          itemsPerPage: this.itemSize,
          page: this.pageNum,
          sortDesc: params.sortDesc,
          sortBy: params.sortBy
        })
      } else {
        this.$store.dispatch('pitches/getPitchesByClubId', {
          itemsPerPage: this.itemSize,
          page: this.pageNum,
          sortDesc: params.sortDesc,
          sortBy: params.sortBy,
          id: this.selectedClub.id
        })
      }
    },
    clearAutoComplete() {
      const pagInfo = JSON.parse(localStorage.getItem('pitchesPagInfo'))
      this.$store.dispatch('pitches/getPitches', pagInfo)
      this.selectedClub = null
    },
    handleView() {
      this.changeScreen = window.innerWidth <= 1024;
    },
    openAddPitch() {
      this.openedAddPitch = true
    },
    changeAddPitch({closeModal}) {
      if(closeModal) {
        this.openedAddPitch = null
      }
    }
  },
  computed: {
    pitches() {
      return this.$store.getters['pitches/pitches']
    },
    getTotalPage() {
      return Math.ceil(this.pitches.total / this.itemSize)
    },
    getFirstItemNum() {
      return (this.itemSize * this.pageNum) - (this.itemSize) + 1
    },
    getLastItemNum() {
      const lastItemNum = (this.itemSize * this.pageNum)
      return lastItemNum >= this.pitches.total ? this.pitches.total : lastItemNum  
    }
  },
  created() {
    const pitchesPagInfo = JSON.parse(localStorage.getItem('pitchesPagInfo'))
    if (pitchesPagInfo) {
      this.itemSize = pitchesPagInfo.itemsPerPage;
      this.pickedItemSize = pitchesPagInfo.itemsPerPage;
    } else {
      this.itemSize = 10;
      this.pickedItemSize = 10
    }

    let params = {
      itemsPerPage: this.itemSize,
      page: this.pageNum
    }
    localStorage.setItem('pitchesPagInfo', JSON.stringify(params))

    this.$store.dispatch('pitches/getPitches', params)

    this.handleView();
    window.addEventListener("resize", this.handleView);
  }
};
</script>

<style>
.pitches-main {
  height: 100vh;
}
.card-section {
  height: 100vh;
}
.pitches-views > button{
  border-radius: 30px;
}
.pitch-data-table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 2em;
}
.table-header-left {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
}
.table-header-left h1 {
  margin-left: .5em;
  font-size: 1.5em;
}
.visibility-hidden {
  visibility: hidden;
  height: 0;
}
.card-table-pagination {
  height: 100%;
  width: 30%;
  margin-bottom: 0;
  padding-bottom: 0;
}
.table-pagination {
  width: 100%;
  margin-top: .5em;
}
.pitches-views {
  width: auto;
  right: 0;
  position: absolute;
}
.pitches-page-name {
  display: flex;
  align-items: center;
}
.pitches-page-name p {
  margin-left: 1vw;
  font-size: 2.5em;
  font-weight: 900;
}
.pitches-page-name .pitches-page-name-icon {
  height: 2.5em;
  height: auto;
}


@media only screen and (max-width: 1024px) {
  .appNav {
    display: none;
  }
  .list-button {
    display: none;
  }

  .pitches-main {
    margin-left: 5.5vw;
    margin-top: -4vh;
  }

  .page-name h1 {
    font-size: 3vh;
  }

  .page-name img {
    height: 5vh;
  }

  .card-section {
    display: grid;
    grid-template-columns: minmax(auto, 500px);
  }
}

@media only screen and (max-width: 768px) {
  .pitches-main {
    margin-left: 10vw;
  }

  .pitches-views {
    margin-top: 20px;
    margin-left: auto;
    align-items: flex-start;
    justify-content: flex-start;
    justify-items: flex-start;
  }

  .title-section {
    display: inline-block;
  }

  .page-name img {
    height: 3.5vh;
  }
}
</style>