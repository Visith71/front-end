import axios from 'axios'

export default {
  namespaced: true,
  state() {
    return {
      users: [],
      activeUserInfo: null,
      updateUserInfo: null,
      updatePassword: null,
      allClubOwners: []
    }
  },
  actions: {
  async getUsers(context, pagination) {
    const axiosConfig = {
      params: pagination
    }

    await axios.get('user', axiosConfig)
    .then(res => {
      console.log(res.data)
      context.commit('SET_USERS', res.data)
    })
    .catch(err => {
      if (err.response) {
        const error = new Error(err.response.data.message)
        throw error;
      } else {
        console.log('No reponse!')
      }
    })
  },
  async getClubOwners(context) {
    // const axiosConfig = {
    //   headers: {
    //     'x-access-token': localStorage.getItem('accessToken')
    //   }
    // }

    await axios.get('club-owner')
    .then(res => {
      const clubOwnersMap = {
        items: res.data.map(co => {
          return {
            id: co.id,
            name: `${co.first_name ? co.first_name : ''} ${co.last_name ? co.last_name : ''}`,
            email: co.email,
            sport_club: co.sport_club ? co.sport_club : null
          }
        }),
        total: res.data && res.data.length ? res.data.length : 0 
      }
      console.log(clubOwnersMap)
      context.commit('allClubOwners', clubOwnersMap)
    })
    .catch(err => {
      if (err.response) {
        const error = new Error(err.response.data.message)
        throw error;
      } else {
        console.log('No reponse!')
      }
    })
  },
  async getUserById(context, userId) {
    await axios.get(`user/${userId}`)
    .then(res => {
      console.log(res.data)
      context.commit('activeUserInfo', res.data)
      localStorage.setItem('activeUserInfo', JSON.stringify(res.data))
    })
    .catch(err => {
      if (err.response) {
        const error = new Error(err.response.data.message)
        throw error;
      } else {
        console.log('No reponse!')
      }
    })
  },
  async updateUserById(context, newUserInfo) {
    let formData = new FormData()
    formData.append('first_name', newUserInfo.first_name)
    formData.append('last_name', newUserInfo.last_name)
    formData.append('city', newUserInfo.city)
    formData.append('phone_num', newUserInfo.phone_num)

    if (newUserInfo.userProfile) {
      formData.append('file', newUserInfo.userProfile)
    }

    await axios({
      method: 'put',
      url: `user/${newUserInfo.userId}`,
      data: formData
    })
    .then(res => {
      console.log(res.data)
      context.commit('updateUserInfo', res.data)
    })
    .catch(err => {
      if (err.response) {
        const error = new Error(err.response.data.message)
        throw error;
      } else {
        console.log('No reponse!')
      }
    })
  },
  async updateUserNewPassword(context, payload) {
    const rootUserId = context.rootState.auth.id
    if (rootUserId) {
      await axios.put(`auth/update-pass/${rootUserId}`, {
        old_password: payload.curPassword,
        new_password: payload.newPass,
        confirm_new_password: payload.confirmNewPass
      } )
      .then(res => {
        console.log(res.data)
        context.commit('updatePassword', res.data)
      })
      .catch(err => {
        if (err.response) {
          const error = new Error(err.response.data.message)
          throw error;
        } else {
          console.log('No reponse!')
        }
      })
    }
  }
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    allClubOwners(state, allClubOwners) {
      state.allClubOwners = allClubOwners
    },
    activeUserInfo(state, userInfo) {
      state.activeUserInfo = userInfo
    },
    updateUserInfo(state, userInfo) {
      state.updateUserInfo = userInfo
    },
    updatePassword(state, payload) {
      state.updatePassword = payload
    }
  },
  getters: {
    users(state) {
      return state.users;
    },
    allClubOwners(state) {
      return state.allClubOwners;
    },
    activeUserInfo(state) {
      return state.activeUserInfo
    },
    updateUserInfo(state) {
      return state.updateUserInfo
    },
    updatePassword(state) {
      return state.updatePassword
    }
  }
}