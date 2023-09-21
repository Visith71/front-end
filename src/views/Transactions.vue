<template>
  <div class="main transactions-main">
    <div class="main-title title-section transaction-title">
      <div class="title">
        <img src="../assets/icons/transaction-icon.svg">
        <h1>Transactions</h1>
      </div>
    </div>
      <div class="card-section animate__animated animate__fadeInUp">
        <div class="transaction-card-layout cards-layout">
          <div>
            <TransactionListView 
              :transactions="transactions"
              @dispatchTransactionByPag="dispatchTransactionByPag"
              :getAllSportClubs="getAllSportClubs"
              @getSelectedClub="getSelectedClub"
              :selectedClub="selectedClub"
              @clearAutoComplete="clearAutoComplete"
            />
            <div class="table-pagination">
              <div class="page-size">
                <select v-model="itemSize" class="item-size-select">
                  <option v-for="opt in itemSizeList" :key="opt" :value="opt">
                    {{ opt }}
                  </option>
                </select>
                <p class="item-per-page"> | Showing {{ getFirstItemNum }} to {{getLastItemNum}} of <i>{{transactions.total}} items</i></p>
              </div>
              <v-pagination 
                v-model="pageNum"
                :pages="getTotalPage"
                :range-size="1"
                active-color="f2f2f2"
              />
            </div>
          </div>
          <div v-if="transactions.items && transactions.items.length <= 0" class="no-data-div no-transaction-data animate__animated animate__jello">
            <h1>No Transactions Data Available 🌟🙌👏</h1>
          </div>
        </div>
      </div>
  </div>

  <ModalView v-if="openedAddTransaction" @closeModal="openedAddTransaction = null">
   <AddTransaction @changeAddTransaction="changeAddTransaction" />
  </ModalView>
</template>

<script>
import ModalView from '../components/main-component/ModalView.vue'
import TransactionListView from '../components/transactions/TransactionListView.vue'
import VPagination from '@hennge/vue3-pagination';
import "@hennge/vue3-pagination/dist/vue3-pagination.css"
import { getAllClubs } from '../composable/mixins/getAllClub' 

export default {
  mixins: [getAllClubs],
  components: { 
    ModalView,
    TransactionListView,
    VPagination
  },
  data() {
    // var transactionsSort = localStorage.getItem('transactionsSort')
    return {
      // transactionsSort: transactionsSort ? JSON.parse(transactionsSort) : null,
      transactionsSort: null,
      pageNum: 1,
      pageSize: 3,
      itemSize: null,
      itemSizeList: [5, 10, 20, 30, 40, 50],
      pickedItemSize: null,
      openedAddTransaction: null,
      selectedClub: null
    }
  },
  watch: {
    pageNum() {
      let params = null
      if (!this.transactionsSort) {
        params = {
          page: this.pageNum,
          itemsPerPage: this.itemSize
        }
      } else {
        params = {
          page: this.pageNum,
          itemsPerPage: this.itemSize,
          sortBy: this.transactionsSort.sortBy,
          sortDesc: this.transactionsSort.sortDesc
        }
      }
      localStorage.setItem('transactionPagInfo', JSON.stringify(params))
      if (!this.selectedClub) {
        this.$store.dispatch('transactions/getTransactions', params)
      } else {
        this.$store.dispatch('transactions/getTransactionsByClubId', {
          ...params,
          id: this.selectedClub.id
        })
      }
    },
    itemSize(curValue) {
      let params = null
      if (!this.transactionsSort) {
        params = {
          page: this.pageNum,
          itemsPerPage: this.itemSize
        }
      } else {
        params = {
          page: this.pageNum,
          itemsPerPage: this.itemSize,
          sortBy: this.transactionsSort.sortBy,
          sortDesc: this.transactionsSort.sortDesc
        }
      }
      localStorage.setItem('transactionPagInfo', JSON.stringify(params))
      if (!this.selectedClub) {
        this.$store.dispatch('transactions/getTransactions', params)
      } else {
        this.$store.dispatch('transactions/getTransactionsByClubId', {
          ...params,
          id: this.selectedClub.id
        })
      }
    },
    selectedClub(curValue) {
      if (curValue && curValue.id) {
        const pagInfo = JSON.parse(localStorage.getItem('transactionPagInfo'))
        try {
          this.$store.dispatch('transactions/getTransactionsByClubId', {  
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
    dispatchTransactionByPag(params) {
      this.transactionsSort = params
      if (!this.selectedClub) {
        this.$store.dispatch('transactions/getTransactions', {
          itemsPerPage: this.itemSize,
          page: this.pageNum,
          sortDesc: params.sortDesc,
          sortBy: params.sortBy
        })
      } else {
        this.$store.dispatch('transactions/getTransactionsByClubId', {
          itemsPerPage: this.itemSize,
          page: this.pageNum,
          sortDesc: params.sortDesc,
          sortBy: params.sortBy,
          id: this.selectedClub.id
        })
      }
    },
    openAddTransaction() {
      this.openedAddTransaction = true
    },
    changeAddTransaction({closeModal}) {
      if(closeModal) {
        this.openedAddTransaction = null
      }
    },
    clearAutoComplete() {
      const pagInfo = JSON.parse(localStorage.getItem('transactionPagInfo'))
      this.$store.dispatch('transactions/getTransactions', pagInfo)
      this.selectedClub = null
    },
  },
  computed: {
    transactions() {
      return this.$store.getters['transactions/transactions']
    },
    getTotalPage() {
      return Math.ceil(this.transactions.total / this.itemSize)
    },
    getFirstItemNum() {
      return (this.itemSize * this.pageNum) - (this.itemSize) + 1
    },
    getLastItemNum() {
      const lastItemNum = (this.itemSize * this.pageNum)
      return lastItemNum >= this.transactions.total ? this.transactions.total : lastItemNum  
    }
  },
  created() {
    const transactionPagInfo = JSON.parse(localStorage.getItem('transactionPagInfo'))
    if (transactionPagInfo) {
      this.itemSize = transactionPagInfo.itemsPerPage;
      this.pickedItemSize = transactionPagInfo.itemsPerPage;
    } else {
      this.itemSize = 10;
      this.pickedItemSize = 10
    }

    let params = {
      itemsPerPage: this.itemSize,
      page: this.pageNum
    }
    localStorage.setItem('transactionPagInfo', JSON.stringify(params))

    this.$store.dispatch('transactions/getTransactions', params)
  },
};
</script>

<style scoped>
.no-transaction-data {
  font-size: 1.1em;
  margin-top: 2em;
}
.transaction-card-layout {
  margin-top: 2em;
  padding-bottom: 2em;
}
</style>