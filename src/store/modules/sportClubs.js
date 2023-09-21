import axios from 'axios'

export default {
  namespaced: true,
  state() {
    return {
      sportClubs: [],
      registerSportClub: null,
      clubInfo: null,
      updateClubInfo: null,
      getAllSportClubs: null,
      pitchesNameByClubId: null,
      summaryStatisticById: null,
      pitchesRanking: null
    }
  },
  actions: {
    async registerSportClub(context, sportClubInfo) {
      const getSportClubInfo = {
        ...sportClubInfo
      }

      var formData = new FormData();

      formData.append("name", getSportClubInfo.name)
      formData.append("description", getSportClubInfo.description)
      formData.append("locationUrl", JSON.stringify(getSportClubInfo.locationUrl))
      if (getSportClubInfo.clubProfile) {
        formData.append("file", getSportClubInfo.clubProfile)
      }
      if (getSportClubInfo.ownerId) {
        formData.append("ownerId", getSportClubInfo.ownerId)
      }
      
      await axios({
        method: "post",
        url: 'sport-clubs',
        data: formData
      })
      .then(res => {
        console.log(res.data)
        localStorage.setItem('sportClub', JSON.stringify(res.data))
        context.commit('registerSportClub', res.data)
      })
      .catch(err => {
        if(err.response) {
          const error = new Error(err.response.data.message)
          throw error;
        } else {
          const error = new Error('Error: No Response!')
          throw error;
        }
      })
    },
    async getActiceSportClub(context) {
      const getClubId = JSON.parse(context.rootState.auth.sportClub)
      console.log(getClubId)

      if(getClubId !== null) {
      return await axios.get(`sport-clubs/${getClubId.id}`)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('clubInfo', JSON.stringify({
          clubImages: res.data.clubImages,
          clubProfile: res.data.clubProfile,
          description: res.data.description,
          id: res.data.id,
          locationUrl: res.data.locationUrl,
          name: res.data.name,
          pitch_details: res.data.pitch_details,
          rating: res.data.rating,
          user: res.data.user
        }))
        context.commit('clubInfo', res.data)
      })
      .catch(err => {
        if(err.response) {
          console.log(err.response.data.message)
          // context.commit('activeSportClubInfo', err.response.data.message)
        } else {
          // context.commit('activeSportClubInfo', 'No response!')
          console.log('No response!')
        }
      })
      }
    },
    async getAllSportClubs(context, params) {
      await axios.get(`sport-clubs`, {
        params: params
      })
      .then(res => {
        console.log(res.data)
        context.commit('getAllSportClubs', res.data)
      })
      .catch(err => {
        if(err.response) {
          console.log(err.response.data.message)
          context.commit('getAllSportClubs', err.response.data.message)
        } else {
          context.commit('getAllSportClubs', 'No response!')
          console.log('No response!')
        }
      })
    },
    async updateSportClub(context, payload) {
      let getClubId = null
      if (JSON.parse(context.rootState.auth.sportClub) && JSON.parse(context.rootState.auth.sportClub).id) {
        getClubId = JSON.parse(context.rootState.auth.sportClub).id
      }
      const updateClubInfo = {
        ...payload
      }
      let isClubId = null 
      if (updateClubInfo.id) {
        isClubId = updateClubInfo.id
      }

      var formData = new FormData();

      formData.append("name", updateClubInfo.name)
      formData.append("description", updateClubInfo.description)
      formData.append("locationUrl", JSON.stringify(updateClubInfo.locationUrl))
      updateClubInfo.clubProfile ? formData.append("file", updateClubInfo.clubProfile) : null;
      
      if (updateClubInfo.clubImages.length > 0) {
        for (const i of Object.keys(updateClubInfo.clubImages)) {
            formData.append('files', updateClubInfo.clubImages[i])
        }
      }

      await axios({
        method: "put",
        url: `sport-clubs/${isClubId ? isClubId : getClubId}`,
        data: formData
      })
      .then(res => {
        localStorage.setItem('clubInfo', JSON.stringify(res.data))
        context.commit('updateClubInfo', res.data)
      })
      .catch(err => {
        if(err.response) {
          context.commit('updateClubInfo', err.response.data.message)
        } else {
          context.commit('updateClubInfo', 'No response!')
          console.log('No reponse')
        }
      })
    },
    async getSummaryStatistic(context, sportClubId) {
      let getClubId = null
      const rootClubId = JSON.parse(context.rootState.auth.sportClub)
      if (!sportClubId) {
        getClubId = rootClubId.id
      } else {
        getClubId = sportClubId
      }

      await axios.get(`get-summary-statistic-data/${getClubId}`)
      .then(res => {
        context.commit('summaryStatisticById', res.data)
        console.log(res.data)
      })
      .catch(err => {
        if(err.response) {
          context.commit('summaryStatisticById', err.response.data.message)
          console.log(err.response.data.message)
        } else {
          context.commit('summaryStatisticById', 'No response!')
          console.log('No reponse')
        }
      })
    },
    async getPitchesRanking(context, sportClubId) {
      let getClubId = null
      const rootClubId = JSON.parse(context.rootState.auth.sportClub)
      if (!sportClubId) {
        getClubId = rootClubId.id
      } else {
        getClubId = sportClubId
      }

      await axios.get(`get-top-ten-booking-pitch-club-wise/${getClubId}`)
      .then(res => {
        console.log(res.data)
        context.commit('pitchesRanking', res.data)
      })
      .catch(err => {
        if(err.response) {
          context.commit('pitchesRanking', err.response.data.message)
          console.log(err.response.data.message)
        } else {
          context.commit('pitchesRanking', 'No response!')
          console.log('No reponse')
        }
      })
    },
  },
  mutations: {
    registerSportClub (state, payload) {
      state.registerSportClub = payload || null
    },
    clubInfo(state, clubInfo) {
      state.clubInfo = clubInfo
    },
    pitchesNameByClubId(state, pitchesNameByClubId) {
      state.pitchesNameByClubId = pitchesNameByClubId
    },
    updateClubInfo(state, payload) {
      state.updateClubInfo = payload
    },
    getAllSportClubs(state, payload) {
      state.getAllSportClubs = payload
    },
    summaryStatisticById(state, payload) {
      state.summaryStatisticById = payload
    },
    pitchesRanking(state, payload) {
      state.pitchesRanking = payload
    }
  },
  getters: {
    registerSportClub(state) {
      return state.registerSportClub;
    },
    clubInfo(state) {
      return state.clubInfo;
    },
    getAllSportClubs(state) {
      return state.getAllSportClubs
    },
    getPitchesNameByClubId(state) {
      return state.pitchesNameByClubId
    },
    summaryStatisticById(state) {
      return state.summaryStatisticById
    },
    pitchesRanking(state) {
      return state.pitchesRanking
    }
  }
}