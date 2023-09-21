import axios from 'axios'

export function addTimeAdj(context, params, api, mutationName) {
  const postInfo = {
    ...params
  }
  return axios.post(api, postInfo)
    .then(res => {
      console.log(res.data)
      context.commit(mutationName, res.data)
    })
    .catch(err => {
      if(err.response) {
        console.log(err.response.data.message)
        const error = new Error(err.response.data.message)
        throw error;
      } else {
        console.log('No response')
        const error = new Error('Error: No Response!')
        throw error;
      }
    })
}

export default {
  namespaced: true,
  state() {
    return {
    timePart: [],
    addTimePart: null,
    updateTimePart: null,
    dayPart: [],
    addDayPart: null,
    updateDayPart: null,
    dayPartItems: [],
    weekPart: [],
    addWeekPart: [],
    updateWeekPart: null,
    weekPartItems: []
    }
  },
  actions: {
    async getTimePart(context, params) {
      await axios.get('time-parts/', {
        params: params
      })
      .then(res => {
        // console.log(res.data)
        context.commit('timePart', res.data)
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
    async addTimePart(context, params) {
      await addTimeAdj(context, params, 'time-parts/', 'addTimePart')
    },
    async updateTimePart(context, params) {
      const updateInfo = {
        start_time: params.start_time,
        end_time: params.end_time,
        dayPartId: params.dayPartId
      }
      await axios.put(`time-parts/${params.id}`, updateInfo)
      .then(res => {
        context.commit('updateTimePart', res.data)
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
    async getDayPart(context, params) {
      await axios.get('day-parts/', {
        params: params
      })
      .then(res => {
        // console.log(res.data)
        context.commit('dayPart', res.data)
        context.commit('dayPartItems', res.data.items)
      })
      .catch(err => {
        if(err.response) {
          context.commit('dayPart', err.response.data.message)
          // console.log(err.response.data.message)
        } else {
          context.commit('dayPart', 'No response!')
          // console.log('No reponse')
        }
      })
    },
    async addDayPart(context, params) {
      await addTimeAdj(context, params, 'day-parts/', 'addDayPart')
    },
    async updateDayPart(context, params) {
      const updateInfo = {
        name: params.name,
        weekPartId: params.weekPartId
      }
      await axios.put(`day-parts/${params.id}`, updateInfo)
      .then(res => {
        context.commit('updateDayPart', res.data)
      })
      .catch(err => {
        if(err.response) {
          // context.commit('dayPart', err.response.data.message)
          const error = new Error(err.response.data.message)
          throw error;
        } else {
          const error = new Error('Error: No Response!')
          throw error;
        }
      })
    },
    async getWeekPart(context, params) {
      await axios.get('week-parts/', {
        params: params
      })
      .then(res => {
        console.log(res.data)
        context.commit('weekPart', res.data)
        context.commit('weekPartItems', res.data.items)
      })
        .catch(err => {
          if(err.response) {
            context.commit('weekPart', err.response.data.message)
            console.log(err.response.data.message)
          } else {
            context.commit('weekPart', 'No response!')
            console.log('No reponse')
          }
        })
      },
    async addWeekPart(context, params) {
      await addTimeAdj(context, params, 'week-parts/', 'addWeekPart')
    },
    async updateWeekPart(context, params) {
      console.log(params)
      const updateInfo = {
        name: params.name
      }
      await axios.put(`week-parts/${params.id}`, updateInfo )
      .then(res => {
        context.commit('updateWeekPart', res.data)
      })
      .catch(err => {
        if(err.response) {
          // context.commit('dayPart', err.response.data.message)
          const error = new Error(err.response.data.message)
          throw error;
        } else {
          const error = new Error('Error: No Response!')
          throw error;
        }
      })
    }
  },
  mutations: {
    timePart(state, timePart) {
      state.timePart = timePart
    },
    addTimePart(state, addTimePart) {
      state.addTimePart = addTimePart
    },
    updateTimePart(state, updateTimePart) {
      state.updateTimePart = updateTimePart
    },
    dayPart(state, dayPart) {
      state.dayPart = dayPart
    },
    addDayPart(state, addDayPart) {
      state.addDayPart = addDayPart
    },
    updateDayPart(state, updateDayPart) {
      state.updateDayPart = updateDayPart
    },
    dayPartItems(state, dayPartItems) {
      state.dayPartItems = dayPartItems
    },
    weekPart(state, weekPart) {
      state.weekPart = weekPart
    },
    addWeekPart(state, addWeekPart) {
      state.addWeekPart = addWeekPart
    },
    updateWeekPart(state, updateWeekPart) {
      state.updateWeekPart = updateWeekPart
    },
    weekPartItems(state, weekPartItems) {
      state.weekPartItems = weekPartItems
    }
  },
  getters: {
    getTimePart(state) {
      return state.timePart;
    },
    getAddTimePart(state) {
      return state.addTimePart;
    },
    getUpdateTimePart(state) {
      return state.updateTimePart;
    },
    getDayPart(state) {
      return state.dayPart;
    },
    getAddDayPart(state) {
      return state.addDayPart;
    },
    getUpdateDayPart(state) {
      return state.updateDayPart;
    },
    getDayPartIdName(state) {
      return state.dayPartItems.map(dp => {
        return {
          id: dp.id,
          name: dp.name,
          weekPartName: dp.week_part.name
        }
      })
    },
    getWeekPart(state) {
      return state.weekPart;
    },
    getAddWeekPart(state) {
      return state.addWeekPart;
    },
    getUpdateWeekPart(state) {
      return state.updateWeekPart;
    },
    getWeekPartIdName(state) {
      return state.weekPartItems.map(wp => {
        return {
          id: wp.id,
          name: wp.name
        }
      })
    },
  }
}