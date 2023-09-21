import axios from 'axios'
let timer;

export default {
  state() {
  return {
    accessToken: null,
    id: null,
    first_name: null,
    last_name: null,
    city: null,
    roles: null,
    sportClub: null,
    email: null,
    didAutoLogout: false
  }
  },
  actions: {
    async signup(context, payload) {
      const response = await axios.post('auth/signup', {
        first_name: payload.first_name,
        last_name: payload.last_name,
        // city: 'Phnom Penh',
        roles: ["club_owner"],
        status: "active",
        membership: "normal",
        email: payload.email,
        password: payload.password,
        phone_num: payload.phone_number,
        accepted: payload.accepted
      })
      .catch(err => {
        console.log(err)
        if (err.response) {
          console.log(err.response.data.message)
          const error = new Error(err.response.data.message)
          throw error;
        } else {
          console.log('No response')
        }
      })
      const responseData = await response.data
      console.log(responseData)

      const expiresIn = +responseData.expiresIn * 1000
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('accessToken', responseData.accessToken)
      localStorage.setItem('id', responseData.id)
      localStorage.setItem('first_name', responseData.first_name)
      localStorage.setItem('last_name', responseData.last_name)
      localStorage.setItem('city', responseData.city)
      localStorage.setItem('roles', responseData.roles)
      localStorage.setItem('tokenExpiration', expirationDate);
      localStorage.setItem('sportClub', JSON.stringify(responseData.sport_club))

      timer = setTimeout(function() {
        context.dispatch('autoLogout');
      }, expiresIn);

      context.commit('setUser', {
        accessToken: responseData.accessToken,
        id: responseData.id,
        roles: responseData.roles,
        first_name: responseData.first_name,
        last_name: responseData.last_name,
        city: responseData.city,
        email: responseData.email,
        sportClub: responseData.sport_club
      });
    },
    async signin(context, payload) {
      const response = await axios.post('auth/signin', {
        email: payload.email,
        password: payload.password
      })
      .catch(err => {
        console.log(err)
        if (err.response) {
          console.log(err.response.data.message)
          const error = new Error(err.response.data.message)
          throw error;
        } else {
          console.log('No response')
        }
      })
      const responseData = await response.data
      console.log(responseData)

      const expiresIn = +responseData.expiresIn * 1000
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('accessToken', responseData.accessToken)
      localStorage.setItem('id', responseData.id)
      localStorage.setItem('first_name', responseData.first_name)
      localStorage.setItem('last_name', responseData.last_name)
      localStorage.setItem('city', responseData.city)
      localStorage.setItem('roles', responseData.roles)
      localStorage.setItem('tokenExpiration', expirationDate);
      localStorage.setItem('sportClub', JSON.stringify(responseData.sport_club))

      timer = setTimeout(function() {
        context.dispatch('autoLogout');
      }, expiresIn);

      context.commit('setUser', {
        accessToken: responseData.accessToken,
        id: responseData.id,
        roles: responseData.roles,
        first_name: responseData.first_name,
        last_name: responseData.last_name,
        city: responseData.city,
        email: responseData.email,
        sportClub: responseData.sport_club
      });
    },
    autoLogin(context) {
      const accessToken = localStorage.getItem('accessToken');
      const id = localStorage.getItem('id')
      const email = localStorage.getItem('email');
      const first_name = localStorage.getItem('first_name');
      const last_name = localStorage.getItem('last_name');
      const city = localStorage.getItem('city');
      const roles = localStorage.getItem('roles');
      const sportClub = localStorage.getItem('sportClub');
      const tokenExpiration = localStorage.getItem('tokenExpiration');

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      timer = setTimeout(function() {
        context.dispatch('autoLogout');
      }, expiresIn);

      if (accessToken) {
        context.commit('setUser', {
          accessToken: accessToken,
          id: id,
          first_name: first_name,
          last_name: last_name,
          city: city,
          roles: roles,
          email: email,
          sportClub: sportClub
        })
      }
    },
    logout(context) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem('id');
      localStorage.removeItem('first_name');
      localStorage.removeItem('last_name');
      localStorage.removeItem('city');
      localStorage.removeItem('roles');
      localStorage.removeItem('email');
      localStorage.removeItem('sportClub');
      localStorage.removeItem('clubInfo');
      localStorage.removeItem('allPitchesName');
      localStorage.removeItem('activeUserInfo');
      localStorage.removeItem('city');
      localStorage.removeItem('isEditUserAccount');
      localStorage.removeItem('isEditUserAccount');
      localStorage.removeItem('allPitchesName');

      clearTimeout(timer);

      context.commit('setUser', {
        accessToken: null,
        id: null,
        first_name: null,
        last_name: null,
        city: null,
        roles: null,
        email: null,
        sportClub: null
      })
    },
    autoLogout(context) {
      context.dispatch('logout');
      context.commit('setAutoLogout');
    },
    async gAuthSignin(context, payload) {
      const response = await axios.post('auth/g-sign-in', {
        idtoken: payload.idtoken
      })
      .catch(err => {
        console.log(err)
        if (err.response) {
          console.log(err.response.data.message)
          const error = new Error(err.response.data.message)
          throw error;
        } else {
          console.log('No response')
        }
      })

      const responseData = response.data
      console.log(responseData)

      const expiresIn = +responseData.expiresIn * 1000
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem('accessToken', responseData.accessToken)
      localStorage.setItem('id', responseData.id)
      localStorage.setItem('first_name', responseData.first_name)
      localStorage.setItem('last_name', responseData.last_name)
      localStorage.setItem('city', responseData.city)
      localStorage.setItem('roles', responseData.roles)
      localStorage.setItem('tokenExpiration', expirationDate);
      localStorage.setItem('sportClub', JSON.stringify(responseData.sport_club))

      timer = setTimeout(function() {
        context.dispatch('autoLogout');
      }, expiresIn);

      context.commit('setUser', {
        accessToken: responseData.accessToken,
        id: responseData.id,
        roles: responseData.roles,
        first_name: responseData.first_name,
        last_name: responseData.last_name,
        city: responseData.city,
        email: responseData.email,
        sportClub: responseData.sport_club
      });
    }
  },
  mutations: {
    setUser(state, payload) {
      state.accessToken = payload.accessToken;
      state.id = payload.id;
      state.first_name = payload.first_name;
      state.last_name = payload.last_name;
      state.city = payload.city;
      state.roles = payload.roles;
      state.email = payload.email;
      state.sportClub = payload.sportClub;
      state.expirationDate = payload.expirationDate;
      state.didAutoLogout = false;
    },
    setAutoLogout(state) {
      state.didAutoLogout = true
    }
  },
  getters: {
    accessToken(state) {
      return state.accessToken;
    },
    isAuthenticated(state) {
      return !!state.accessToken;
    },
    isClubOwner(state) {
      return !!state.accessToken && state.roles === 'ROLE_CLUB_OWNER'
    },
    isAuthenticatedAsClubOwner(state) {
      return !!state.accessToken && state.roles === 'ROLE_CLUB_OWNER' && state.sportClub !== 'null'; 
    },
    isAuthenticatedAsClubOwnerNoSportClub(state) {
      return !!state.accessToken && state.roles === 'ROLE_CLUB_OWNER' && state.sportClub === 'null'; 
    },
    isAuthenticatedAsSuperAdmin(state) {
      return !!state.accessToken && state.roles === 'ROLE_ADMIN'; 
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    },
    getSportClub(state) {
      return state.sportClub == !null;
    },
    getUserInfo(state) {
      const userInfo = {
        username: state.first_name + " " + state.last_name,
        city: state.city
      }
      return userInfo
    }
  }
}