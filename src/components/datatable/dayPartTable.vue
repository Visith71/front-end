<template>
  <ConfirmDialog></ConfirmDialog>
  <div>
    <div class="table-header user-table-header">
      <div>
        <input type="text" class="table-search" placeholder="🔎 ID, Username, Email, P/N, City, Membership..." v-model="search">

        <input type="date" class="table-search" placeholder="📆 Filter Pitch by Created Date..." v-model="searchDate">
      </div>
      <h1>{{ dayPart.total }} rows 📆</h1>
    </div>
    <div class="table">
      <table>
        <tr>
          <th v-for="title in tableTitle" :key="title">
            <div class="table-title">
              {{ title }}
              <img class='disactive-ascen' @click="handleDayPartSort(title, $event)" src="../../assets/icons/up-arrow.png" alt="descendant-white" ref="icon" v-if="!['Week-Part Name'].includes(title)">
            </div>
          </th>
          <th colspan="2">Actions</th>
        </tr>
        <tr v-for="item in filteredDayPart" :key="item.id" :item="item">
          <td>
            <p>{{ item.id }}</p>
          </td>
          <td>
            <h2><strong>{{ item.name }}</strong></h2>
          </td>

          <td>
            <p><strong>{{ item.week_part.name }}</strong></p>
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
              <button @click="deleteDayPart(item)">❌</button>
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
  props: ['dayPart'],
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
      nameTitleRef: null,
      weekPartIdTitleRef: null,
      weekPartNameTitleRef: null,
      ctTitleRef: null
    }
  },
  setup () {
    const tableTitle = ref([
      'ID',
      'Day-Part Name',
      'Week-Part Name',
      'Created At'
    ])
    return { format, tableTitle }
  },
  methods: {
    handleTitleRef(curRef) {
      let allTitleRef = [
        this.idTitleRef,
        this.nameTitleRef,
        this.weekPartIdTitleRef,
        this.weekPartNameTitleRef,
        this.ctTitleRef
      ]
      for (let i = 0; i < allTitleRef.length; i++) {
        if (allTitleRef[i] !== curRef) {
          allTitleRef[i] != null ? allTitleRef[i].classList.remove('is-dsec') : null
        }
      }
    },
    handleDayPartSort(title, e) {
      let getTableTitle = ''
      if (title === 'ID') {
        getTableTitle = 'id'
        this.idTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title === 'Day-Part Name') {
        getTableTitle = 'name'
        this.nameTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title === 'Week-Part ID') {
        getTableTitle = 'weekPartId'
        this.weekPartIdTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title === 'Created At') {
        getTableTitle = 'createdAt'
        this.ctTitleRef = e.target
        this.handleTitleRef(e.target)
      }

      if (this.isSortedDsec == false) {
        e.target.classList.add('is-dsec')
        this.$emit('dispatchDayPartByPag', {
          sortBy: [`${getTableTitle}`],
          sortDesc: [true]
        })
        this.isSortedDsec = true
      } else {
        e.target.classList.remove('is-dsec')
        this.$emit('dispatchDayPartByPag', {
          sortBy: [`${getTableTitle}`],
          sortDesc: [false]
        })
        this.isSortedDsec = false
      }
    },
    openEditModal(item) {
      this.$emit('openEditModal', item)
    },
    async deleteDayPart(item) {
      this.$confirm.require({
        message: `Are you sure want to delete Day-Part ${item.id}?`,
        header: 'Transaction Delete Confirmation ⭕❗❕',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          axios.delete(`day-parts/${item.id}`, {
            headers: {
              'x-access-token': `${localStorage.getItem('accessToken')}`
            }
          })
          .then(() => {
            this.toast(item.id + ' has been deleted!', 3000, 'successed')
            this.$confirm.close()
            this.$store.dispatch('timeAdj/getDayPart', JSON.parse(localStorage.getItem('dayPartPagInfo')))
          }).catch(err => {
            this.toast('Day part with id: ' + item.id + ' Could not delete!', 3000, 'error')
          })
        },
        reject: () => {
          this.$confirm.close();
        }
      })
    }
  },
  computed: {
    filteredDayPart() {
      return this.dayPart.items.filter((dp) => {
        let dateFormat = format(new Date(dp.createdAt), 'yyyy-MM-dd');

        if(this.searchDate.length) {
          return dateFormat.includes(this.searchDate.toLowerCase().trim())
        }
        if(this.search.length) {
          return dp.id.toString().includes(this.search.trim()) || dp.name.toLowerCase().includes(this.search.toLowerCase().trim()) || dp.weekPartId.toString().includes(this.search.trim())
        }
        return dp
      })
    },
  },
  mounted() {
  }
}
</script>

<style>
</style>