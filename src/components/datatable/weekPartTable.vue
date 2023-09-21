<template>
  <ConfirmDialog></ConfirmDialog>
  <div>
    <div class="table-header user-table-header">
      <div>
        <input type="text" class="table-search" placeholder="🔎 ID, Username, Email, P/N, City, Membership..." v-model="search">

        <input type="date" class="table-search" placeholder="📆 Filter Pitch by Created Date..." v-model="searchDate">
      </div>
      <h1>{{ weekPart.total }} rows 📆</h1>
    </div>
    <div class="table">
      <table>
        <tr>
          <th v-for="title in tableTitle" :key="title">
            <div class="table-title">
              {{ title }}
              <img class='disactive-ascen' @click="handleWeekPartSort(title, $event)" src="../../assets/icons/up-arrow.png" alt="descendant-white" ref="icon">
            </div>
          </th>
          <th colspan="2">Actions</th>
        </tr>
        <tr v-for="item in filteredWeekPart" :key="item.id" :item="item">
          <td>
            <p>{{ item.id }}</p>
          </td>
          <td>
            <h2><strong>{{ item.name }}</strong></h2>
          </td>
          <td>
            <p>{{ format(new Date(item.createdAt), 'MMM do yyyy') }}</p>
          </td>
          <td>
            <p>{{ format(new Date(item.updatedAt), 'MMM do yyyy') }}</p>
          </td>
          <td>
            <div class="action edit">
              <button @click="openEditModal(item)">🔨</button>
            </div>
          </td>
          <td>
            <div class="action delete">
              <button @click="deleteWeekPart(item)">❌</button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { format } from 'date-fns'
import ConfirmDialog from 'primevue/confirmdialog';

export default {
  props: ['weekPart'],
  components: {
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
      utTitleRef: null,
      ctTitleRef: null
    }
  },
  setup () {
    const tableTitle = ref([
      'Week-Part ID',
      'Week-Part Name',
      'Created At',
      'Updated At'
    ])
    return { format, tableTitle }
  },
  methods: {
    handleTitleRef(curRef) {
      let allTitleRef = [
        this.idTitleRef,
        this.nameTitleRef,
        this.ctTitleRef,
        this.utTitleRef
      ]
      for (let i = 0; i < allTitleRef.length; i++) {
        if (allTitleRef[i] !== curRef) {
          allTitleRef[i] != null ? allTitleRef[i].classList.remove('is-dsec') : null
        }
      }
    },
    handleDayPartSort(title, e) {
      let getTableTitle = ''
      if (title === 'Week-Part ID') {
        getTableTitle = 'id'
        this.idTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title === 'Week-Part Name') {
        getTableTitle = 'name'
        this.nameTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title === 'Updated At') {
        getTableTitle = 'updatedAt'
        this.utTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title === 'Created At') {
        getTableTitle = 'createdAt'
        this.ctTitleRef = e.target
        this.handleTitleRef(e.target)
      }

      if (this.isSortedDsec == false) {
        e.target.classList.add('is-dsec')
        this.$emit('dispatchWeekPartByPag', {
          sortBy: [`${getTableTitle}`],
          sortDesc: [true]
        })
        this.isSortedDsec = true
      } else {
        e.target.classList.remove('is-dsec')
        this.$emit('dispatchWeekPartByPag', {
          sortBy: [`${getTableTitle}`],
          sortDesc: [false]
        })
        this.isSortedDsec = false
      }
    },
    openEditModal(item) {
      this.$emit('openEditModal', item)
    },
    async deleteWeekPart(item) {
      this.$confirm.require({
        message: `Are you sure want to delete Week-Part ${item.id}?`,
        header: 'Transaction Delete Confirmation ⭕❗❕',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          axios.delete(`week-parts/${item.id}`, {
            headers: {
              'x-access-token': `${localStorage.getItem('accessToken')}`
            }
          })
          .then(() => {
            this.toast(item.id + ' has been deleted!', 3000, 'successed')
            this.$confirm.close()
            this.$store.dispatch('timeAdj/getWeekPart', JSON.parse(localStorage.getItem('weekPartPagInfo')))
          }).catch(err => {
            this.toast('Week part with id: ' + item.id + ' Could not delete!', 3000, 'error')
          })
        },
        reject: () => {
          this.$confirm.close();
        }
      })
    }
  },
  computed: {
    filteredWeekPart() {
      return this.weekPart.items.filter((wp) => {
        let dateFormat = format(new Date(wp.createdAt), 'yyyy-MM-dd');

        if(this.searchDate.length) {
          return dateFormat.includes(this.searchDate.toLowerCase().trim())
        }
        if(this.search.length) {
          return wp.id.toString().includes(this.search.trim()) || wp.name.toLowerCase().includes(this.search.toLowerCase().trim())
        }
        return wp
      })
    },
  },
  mounted() {
  }
}
</script>

<style>
</style>