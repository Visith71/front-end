<template>
  <ConfirmDialog></ConfirmDialog>
  <div>
    <div class="table-header transaction-table-header">
      <div class="transaction-table-header-left">
        <ClubAutoComplete 
          :getAllSportClubs="getAllSportClubs"
          @emitSelectedClub="getSelectedClub"
          :selected="selectedClub"
          @clearAutoComplete="clearAutoComplete"
          v-if="isAdmin"
        />
        <input type="text" class="table-search" placeholder="🔎 Search by transaction id..." v-model="search">

        <input type="date" class="table-search" placeholder="📆 Filter Pitch by Created Date..." v-model="searchDate">
      </div>
      <h1 v-if="selectedClub && selectedClub.name">{{ transactions.total }} transactions made by<br>{{ selectedClub.name }} 🛒</h1>
      <h1 v-else>{{ transactions.total }} Transactions Made 🛒⚽</h1>
    </div>
    <div class="table">
      <table>
        <tr>
          <th v-for="title in tableTitle" :key="title">
            <div class="table-title">
              {{ title }}
              <img class='disactive-ascen' @click="handleTransactionSort(title, $event)" src="../../assets/icons/up-arrow.png" alt="descendant-white" ref="icon">
            </div>
          </th>
        </tr>
        <tr v-for="transaction in filteredTransactions" :key="transaction.id" :transaction="transaction">
          <td @click="openTransaction(transaction)">
            <p>{{ transaction.id }}</p>
          </td>
          <td @click="openTransaction(transaction)">
            <h2>$ {{ transaction.payment_amount.toFixed(2) }}</h2>
          </td>
          <td @click="openTransaction(transaction)">
            <p v-if="transaction.user.first_name && transaction.user.last_name">{{ transaction.user.first_name }} {{ transaction.user.last_name }}</p>
            <p v-else>No Username</p>
          </td>
          <td @click="openTransaction(transaction)">
            <p>{{ transaction.play_date }}</p>
          </td>
          <td @click="openTransaction(transaction)">
            <p><strong>{{ transaction.total_hours }}</strong> hours</p>
          </td>
          <td @click="openTransaction(transaction)">
            <p>{{ format(new Date(transaction.createdAt), 'MMM do yyyy') }} {{ format(new Date(transaction.createdAt), 'HH:mm bbbb') }}</p>
          </td>
          <td @click="openTransaction(transaction)">
            <p>{{ transaction.payment_status }}</p>
          </td>
          <!-- <td>
            <div class="action delete">
              <button @click="deleteTransaction(transaction)">❌</button>
            </div>
          </td> -->
        </tr>
        <tr>
          <td>
            <p><b>Total: </b></p>
          </td>
          <td>
            <h2>$ {{calculateTotalPrice.toFixed(2)}}</h2>
          </td>
          <td></td>
          <td></td>
          <td><p><b>{{calculateTotalHours}} hours</b></p></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>

  <ModalView v-if="openedTransaction" @closeModal="openedTransaction = null" mode="transaction-modal" overlay="transaction-overlay">
   <TransactionDataView :transaction="openedTransaction" @changeTransaction="changeTransaction" />
  </ModalView>
</template>

<script>
import { ref } from 'vue'
import ModalView from '../main-component/ModalView.vue'
import TransactionDataView from './TransactionDataView.vue'
import { format } from 'date-fns'
import ConfirmDialog from 'primevue/confirmdialog';
import {calculateTotal} from '../../composable/calculateTotal'

export default {
  props: ['transactions', 'getAllSportClubs', 'selectedClub'],
  components: {
    ModalView,
    TransactionDataView,
    ConfirmDialog
  },
  data() {
    return {
      search: '',
      filter: '',
      searchDate: '',
      getTransactionPagInfo: null,
      isSortedDsec: false,
      idTitleRef: null,
      totalTitleRef: null,
      nameTitleRef: null,
      pdTitleRef: null,
      bhTitleRef: null,
      tdTitleRef: null,
      pmsTitleRef: null,
    }
  },
  setup() {
    const tableTitle = ref([
      'ID',
      'Total Amount',
      'Username',
      'Play Date',
      'Booking Hours',
      'Transaction Date',
      'Payment Status'
      // 'Action'
   ])
    return { format, tableTitle, openedTransaction: ref(null) }
  },
  methods: {
    handleTitleRef(curRef) {
      let allTitleRef = [
        this.idTitleRef,
        this.totalTitleRef,
        this.nameTitleRef,
        this.pdTitleRef,
        this.bhTitleRef,
        this.tdTitleRef,
        this.pmsTitleRef
      ]
      for (let i = 0; i < allTitleRef.length; i++) {
        if (allTitleRef[i] !== curRef) {
          allTitleRef[i] != null ? allTitleRef[i].classList.remove('is-dsec') : null
        }
      }
    },
    handleTransactionSort(title, e) {
      let getTableTitle = ''
      if (title == 'ID') {
        getTableTitle = 'id'
        this.idTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title == 'Total Amount') {
        getTableTitle = 'payment_amount'
        this.totalTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title == 'Play Date') {
        getTableTitle = 'play_date'
        this.pdTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title == 'Booking Hours') {
        getTableTitle = 'total_hours'
        this.bhTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title == 'Transaction Date') {
        getTableTitle = 'createdAt'
        this.tdTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title == 'Payment Status') {
        getTableTitle = 'payment_status'
        this.pmsTitleRef = e.target
        this.handleTitleRef(e.target)
      }

      if (this.isSortedDsec == false) {
        e.target.classList.add('is-dsec')
        const transactionsSort = {
          sortBy: [`${getTableTitle}`],
          sortDesc: [true]
        }
        this.$emit('dispatchTransactionByPag', transactionsSort)
        this.isSortedDsec = true
      } else {
        e.target.classList.remove('is-dsec')
        this.$emit('dispatchTransactionByPag', {
          sortBy: [`${getTableTitle}`],
          sortDesc: [false]
        })
        this.isSortedDsec = false
      }
    },
    openTransaction(transaction) {
      this.openedTransaction = transaction;
    },
    changeTransaction({closeModal}) {
      let transaction = this.openedTransaction
      if(closeModal) {
        this.openedTransaction = null
      }
    },
    getSelectedClub(curValue) {
      this.$emit('getSelectedClub', curValue)
    },
    clearAutoComplete() {
      this.$emit('clearAutoComplete')
    },
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('roles') === 'ROLE_ADMIN' ? true : false
    },
    filteredTransactions() {
      if (this.transactions && this.transactions.items) {
        return this.transactions.items.filter((transaction) => {
          let dateFormat = format(new Date(transaction.createdAt), 'yyyy-MM-dd');
  
          if(this.searchDate.length) {
            return dateFormat.includes(this.searchDate.toLowerCase().trim())
          }
          if(this.search.length) {
            return transaction.user.first_name.toLowerCase().includes(this.search.trim().toLowerCase()) || transaction.user.last_name.toLowerCase().includes(this.search.trim().toLowerCase()) || transaction.id.toString().includes(this.search.trim()) || transaction.payment_amount.toString().includes(this.search.trim()) || transaction.payment_status.toLowerCase().includes(this.search.trim().toLowerCase())
          }
          return transaction
        })
      }
    },
    calculateTotalPrice() {
      return calculateTotal(this.transactions, 'payment_amount')
    },

    calculateTotalHours() {
      return calculateTotal(this.transactions, 'total_hours')
    }
  },
}
</script>

<style>
.transaction-table-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.transaction-table-header h1 {
  font-size: 1.5em;
  text-align: right;
}
.transaction-table-header-left {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.transaction-table-header-left input {
  width: 30%;
}
.transaction-table-header-left input:nth-child(2) {
  margin-left: 1em;
}
</style>