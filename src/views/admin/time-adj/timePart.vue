<template>
  <div class="main sport-clubs-main">
    <div class="main-title title-section time-adj-title">
      <div class="title">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="58px" height="58px" viewBox="0 0 559.98 559.98" style="enable-background:new 0 0 559.98 559.98;"
          xml:space="preserve">
        <g>
          <g>
            <path d="M279.99,0C125.601,0,0,125.601,0,279.99c0,154.39,125.601,279.99,279.99,279.99c154.39,0,279.99-125.601,279.99-279.99
              C559.98,125.601,434.38,0,279.99,0z M279.99,498.78c-120.644,0-218.79-98.146-218.79-218.79
              c0-120.638,98.146-218.79,218.79-218.79s218.79,98.152,218.79,218.79C498.78,400.634,400.634,498.78,279.99,498.78z"/>
            <path d="M304.226,280.326V162.976c0-13.103-10.618-23.721-23.716-23.721c-13.102,0-23.721,10.618-23.721,23.721v124.928
              c0,0.373,0.092,0.723,0.11,1.096c-0.312,6.45,1.91,12.999,6.836,17.926l88.343,88.336c9.266,9.266,24.284,9.266,33.543,0
              c9.26-9.266,9.266-24.284,0-33.544L304.226,280.326z"/>
          </g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        </svg>
        <h1>Time Part</h1>
      </div>
      <div class="add-new-button add-user-button">
        <button>
          <router-link :to="{ name: 'DayPart' }">
            Day Part 🕛
          </router-link>
        </button>
        <button>
          <router-link :to="{ name: 'WeekPart' }">
            Week Part 📅
          </router-link>
        </button>
        <button @click="openAddModal">Create Time-Part ➕</button>
      </div>
    </div>
    <div class="card-section time-pard-card animate__animated animate__fadeInUp">
      <div class="cards-layout">
        <div v-if="timePart.items">
          <TimePartTable 
            :timePart="timePart" 
            @dispatchTimePartByPag="dispatchTimePartByPag"  
            @openEditModal="openEditModal"
          />
          <div class="table-pagination">
            <div class="page-size">
              <select v-model="itemSize" class="item-size-select">
                <option v-for="opt in itemSizeList" :key="opt" :value="opt">
                  {{ opt }}
                </option>
              </select>
              <p class="item-per-page"> | Showing {{ getFirstItemNum }} to {{getLastItemNum}} of <i>{{timePart.total}} items</i></p>
            </div>
            <v-pagination 
              v-model="pageNum"
              :pages="getTotalPage"
              :range-size="1"
              active-color="f2f2f2"
            />
          </div>
        </div>
        <div v-else>
          <h1>No Time Part Data Available 🌟🙌👏</h1>
        </div>
      </div>
    </div>
  </div>

  <ModalView v-if="openedEditTimePart" @closeModal="openedEditTimePart = null">
    <EditTimePart 
      @changeEditTimePart="changeEditTimePart" 
      @closeEditTimePart="closeEditTimePart" 
      :item="selectedItem"
      :groupedDayPart="groupedDayPart"
    />
  </ModalView>

  <ModalView v-if="openedAddTimePart" @closeModal="openedAddTimePart = null">
    <AddTimePart 
      @closeAddTimePart="closeAddTimePart"
      :groupedDayPart="groupedDayPart"
    />
  </ModalView>
</template>

<script>
import VPagination from '@hennge/vue3-pagination';
import "@hennge/vue3-pagination/dist/vue3-pagination.css"
import TimePartTable from '../../../components/datatable/timePartTable.vue'
import ModalView from '../../../components/main-component/ModalView.vue'
import EditTimePart from '../../../components/time-adjustment/EditTimePart.vue'
import AddTimePart from '../../../components/time-adjustment/AddTimePart.vue'
import { groupByKey } from '../../../composable/groupObject'

export default {
  components: {
    VPagination,
    TimePartTable,
    ModalView,
    EditTimePart,
    AddTimePart
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 3,
      itemSize: null,
      itemSizeList: [5, 10, 20, 30, 40, 50],
      pickedItemSize: null,
      selectedItem: null,
      openedEditTimePart: null,
      openedAddTimePart: null
    }
  },
  watch: {
    pageNum() {
      let params = {
        page: this.pageNum,
        itemsPerPage: this.itemSize,
        // sortBy: ['first_name'],
        // sortDesc: [false]
      }
      localStorage.setItem('timePartPagInfo', JSON.stringify(params))
      this.$store.dispatch('timeAdj/getTimePart', params)
    },
    itemSize(curValue) {
        let params = {
          page: this.pageNum,
          itemsPerPage: this.itemSize,
          // sortBy: ['first_name'],
          // sortDesc: [false]
        }
        localStorage.setItem('timePartPagInfo', JSON.stringify(params))
        this.$store.dispatch('timeAdj/getTimePart', params)
    }
  },
  methods: {
    dispatchTimePartByPag(params) {
      this.$store.dispatch('timeAdj/getTimePart', {
        itemsPerPage: this.itemSize,
        page: this.pageNum,
        sortDesc: params.sortDesc,
        sortBy: params.sortBy
      })
    },
    changeEditTimePart({closeModal}) {
      if(closeModal) {
        this.openedEditTimePart = null
      }
    },
    closeEditTimePart() {
      this.openedEditTimePart = null
    },
    openEditModal(item) {
      this.selectedItem = item
      this.openedEditTimePart = true
    },
    closeAddTimePart() {
      this.openedAddTimePart = null
    },
    openAddModal() {
      this.openedAddTimePart = true
    }
  },
  computed: {
    timePart() {
      return this.$store.getters['timeAdj/getTimePart']
    },
    getTotalPage() {
      return Math.ceil(this.timePart.total / this.itemSize)
    },
    getFirstItemNum() {
      return (this.itemSize * this.pageNum) - (this.itemSize) + 1
    },
    getLastItemNum() {
      const lastItemNum = (this.itemSize * this.pageNum)
      return lastItemNum >= this.timePart.total ? this.timePart.total : lastItemNum  
    },
    getAllDayPart() {
      return this.$store.getters['timeAdj/getDayPartIdName']
    },
    groupedDayPart() {
      let result = groupByKey(this.getAllDayPart, 'weekPartName')
      return result;
    }
  },
  created() {
    const timePartPagInfo = JSON.parse(localStorage.getItem('timePartPagInfo'))
    if (timePartPagInfo) {
      this.itemSize = timePartPagInfo.itemsPerPage;
      this.pickedItemSize = timePartPagInfo.itemsPerPage;
    } else {
      this.itemSize = 10;
      this.pickedItemSize = 10;
    }

    let params = {
      itemsPerPage: this.itemSize,
      page: this.pageNum,
      // sortBy: ['id'],
      // sortDesc: [false]
    }
    localStorage.setItem('timePartPagInfo', JSON.stringify(params))
    this.$store.dispatch('timeAdj/getTimePart', params)

    this.$store.dispatch('timeAdj/getDayPart', {
      itemsPerPage: -1,
      page: 1
    })
  },
}
</script>

<style>
.card-section {
  height: auto;
}
</style>