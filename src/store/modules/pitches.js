import axios from 'axios'

export default {
  namespaced: true,
  state() {
    return {
    pitches: [],
    pitchesByClubId: [],
    pitchesNameByClubId: null
    }
  },
  actions: {
  async getPitches(context, params) {
    await axios.get('pitch-details/', {
      params: params
    })
    .then(res => {
      console.log(res.data)
      context.commit('SET_PITCHES', res.data)
    })
  },
  async getPitchesByClubId(context, params) {
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
    await axios.get(`pitch-details/${params.id}`, {
      params: pagInfo
    })
    .then(res => {
      console.log('getPitchesByClubId', res.data)
      context.commit('SET_PITCHES', res.data)
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
    async getAllPitchesName(context, sportClubId) {
      let getClubId = null
      const rootClubId = JSON.parse(context.rootState.auth.sportClub)
      if (!sportClubId) {
        getClubId = rootClubId.id
      } else {
        getClubId = sportClubId
      }

      await axios.get(`sport-clubs/get-pitch-name-in-club/${getClubId}`)
      .then(res => {
        console.log(res.data)
        // const getPitchesNameArray = res.data.pitch_details.map(pitch => {
        //   return pitch.name
        // })
        context.commit('pitchesNameByClubId', res.data.pitch_details)
        // localStorage.setItem('allPitchesName', res.data)
      })
      .catch(err => {
        if (err.response) {
          const error = new Error(err.response.data.message)
          throw error;
        } else {
          throw new Error('Error: No Response!')
        }
      })
    },
  },
  mutations: {
    SET_PITCHES(state, pitches) {
      state.pitches = pitches
    },
    getPitchesByClubId(state, pitchesByClubId) {
      state.pitchesByClubId = pitchesByClubId
    },
    pitchesNameByClubId(state, pitchesNameByClubId) {
      state.pitchesNameByClubId = pitchesNameByClubId
    }
  },
  getters: {
    pitches(state) {
      return state.pitches;
    },
    getPitchesByClubId(state) {
      return state.pitchesByClubId
    },
    getPitchesNameByClubId(state) {
      return state.pitchesNameByClubId
    }
  }
}