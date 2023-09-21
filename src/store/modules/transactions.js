import axios from 'axios'

export default {
  namespaced: true,
  state() {
    return {
    transactions: []
    }
  },
  actions: {
    async getTransactions(context, params) {
      const axiosConfig = {
        params: params
      }

      await axios.get('booking-details', axiosConfig)
      .then(res => {
        context.commit('SET_TRANSACTIONS', res.data)
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.message)
          const error = new Error(err.response.data.message)
          throw error;
        } else {
          throw new Error('Error: No Response!')
        }
      })
    },
  async getTransactionsByClubId(context, params) {
    let pagInfo = null
    if (params.sortDesc && params.sortBy) {
      pagInfo = {
        itemsPerPage: params.itemsPerPage,
        page: params.page,
        sortDesc: params.sortDesc,
        sortBy: params.sortBy
      }
    } else {
      pagInfo = {
        itemsPerPage: params.itemsPerPage,
        page: params.page,
      }
    }
    await axios.get(`booking-details/${params.id}`, {
      params: pagInfo
    })
    .then(res => {
      console.log(res.data)
      context.commit('SET_TRANSACTIONS', res.data)
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response.data.message)
        const error = new Error(err.response.data.message)
        throw error;
      } else {
        throw new Error('Error: No Response!')
      }
    })
  }
  },
  mutations: {
    SET_TRANSACTIONS(state, transactions) {
      state.transactions = transactions
    }
  },
  getters: {
    transactions(state) {
      return state.transactions;
    }
  }
}