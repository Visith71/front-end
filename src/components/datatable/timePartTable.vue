<template>
  <ConfirmDialog></ConfirmDialog>
  <div>
    <div class="table-header user-table-header">
      <div>
        <input type="text" class="table-search" placeholder="🔎 ID, Username, Email, P/N, City, Membership..." v-model="search">

        <input type="date" class="table-search" placeholder="📆 Filter Pitch by Created Date..." v-model="searchDate">
      </div>
      <h1>{{ timePart.total }} rows 📆</h1>
    </div>
    <div class="table">
      <table>
        <tr>
          <th v-for="title in tableTitle" :key="title">
            <div class="table-title">
              {{ title }}
              <img class='disactive-ascen' @click="handleTimePartSort(title, $event)" src="../../assets/icons/up-arrow.png" alt="descendant-white" ref="icon" v-if="!['Day-Part', 'Week-Part ID', 'Week-Part',].includes(title)">
            </div>
          </th>
          <th colspan="2">Actions</th>
        </tr>
        <tr v-for="item in filteredTimePart" :key="item.id" :item="item">
          <td>
            <p>{{ item.id }}</p>
          </td>
          <td>
            <h2><strong>{{ item.start_time }}</strong></h2>
          </td>
          <td>
            <h2><strong>{{ item.end_time }}</strong></h2>
          </td>
          <td>
            <p v-if="item.day_part && item.day_part.name"><b>{{ item.day_part.name }}</b></p>
          </td>
          <td>
            <p><b>{{ item.day_part.week_part.name }}</b></p>
          </td>
          <td>
            <p>{{ format(new Date(item.createdAt), 'MMM do yyyy') }}</p>
          </td>
          <td>
            <div class="action edit">
              <button @click="openEditModal(item)">🔨</button>
            </div>
          </td>
          <td>
            <div class="action delete">
              <button @click="deleteTimePart(item)">❌</button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ModalView from '../main-component/ModalView.vue'
import axios from 'axios'
import { format } from 'date-fns'
import ConfirmDialog from 'primevue/confirmdialog';

export default {
  props: ['timePart'],
  components: {
    ModalView,
    ConfirmDialog
  },
  data() {
    return {
      search: '',
      currentPage: 1,
      filter: '',
      searchDate: '',
      getUserPagInfo: null,
      isSortedDsec: false,
      idTitleRef: null,
      startTimeTitleRef: null,
      endTimeTitleRef: null,
      daypartIdTitleRef: null,
      dayPartNameTitleRef: null,
      ctTitleRef: null
    }
  },
  setup () {
    const tableTitle = ref([
      'ID',
      'Start-Time',
      'End-Time',
      'Day-Part',
      'Week-Part',
      'Created At'
    ])
    return { format, tableTitle }
  },
  methods: {
    handleTitleRef(curRef) {
      let allTitleRef = [
        this.idTitleRef,
        this.startTimeTitleRef,
        this.endTimeTitleRef,
        this.daypartIdTitleRef,
        this.dayPartNameTitleRef,
        this.ctTitleRef
      ]
      for (let i = 0; i < allTitleRef.length; i++) {
        if (allTitleRef[i] !== curRef) {
          allTitleRef[i] != null ? allTitleRef[i].classList.remove('is-dsec') : null
        }
      }
    },
    handleTimePartSort(title, e) {
      let getTableTitle = ''
      if (title === 'ID') {
        getTableTitle = 'id'
        this.idTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title === 'Start-Time') {
        getTableTitle = 'start_time'
        this.startTimeTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title === 'End-Time') {
        getTableTitle = 'end_time'
        this.emailTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title === 'Day-Part ID') {
        getTableTitle = 'dayPartId'
        this.daypartIdTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title === 'Created At') {
        getTableTitle = 'createdAt'
        this.ctTitleRef = e.target
        this.handleTitleRef(e.target)
      }

      if (this.isSortedDsec == false) {
        e.target.classList.add('is-dsec')
        this.$emit('dispatchTimePartByPag', {
          sortBy: [`${getTableTitle}`],
          sortDesc: [true]
        })
        this.isSortedDsec = true
      } else {
        e.target.classList.remove('is-dsec')
        this.$emit('dispatchTimePartByPag', {
          sortBy: [`${getTableTitle}`],
          sortDesc: [false]
        })
        this.isSortedDsec = false
      }
    },
    openEditModal(item) {
      this.$emit('openEditModal', item)
    },
    async deleteTimePart(item) {
      this.$confirm.require({
        message: `Are you sure want to delete TimePart ${item.id}?`,
        header: 'Transaction Delete Confirmation ⭕❗❕',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          axios.delete(`time-parts/${item.id}`, {
            headers: {
              'x-access-token': `${localStorage.getItem('accessToken')}`
            }
          })
          .then(() => {
            this.toast(item.id + ' has been deleted!', 3000, 'successed')
            this.$confirm.close()
            this.$store.dispatch('timeAdj/getTimePart', JSON.parse(localStorage.getItem('timePartPagInfo')))
          }).catch(err => {
            this.toast('Time part with id: ' + item.id + ' Could not delete!', 3000, 'error')
          })
        },
        reject: () => {
          this.$confirm.close();
        }
      })
    }
  },
  computed: {
    filteredTimePart() {
      return this.timePart.items.filter((tp) => {
        let dateFormat = format(new Date(tp.createdAt), 'yyyy-MM-dd');

        if(this.searchDate.length) {
          return dateFormat.includes(this.searchDate.toLowerCase().trim())
        }
        if(this.search.length) {
          return tp.id.toString().includes(this.search.trim()) || tp.start_time.toString().includes(this.search.trim()) || tp.end_time.toString().includes(this.search.trim()) || tp.dayPartId.toString().includes(this.search.trim()) || tp.day_part.name.toLowerCase().includes(this.search.toLowerCase().trim()) || tp.day_part.weekPartId.toString().includes(this.search.trim()) || tp.day_part.week_part.name.toLowerCase().includes(this.search.toLowerCase().trim())
        }
        return tp
      })
    },
  },
  mounted() {
  }
}
</script>

<style>
</style>