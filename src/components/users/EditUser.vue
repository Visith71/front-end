<template>
  <div class="add-user">
    <form @submit.prevent="handleEditUser">
      <div class="new-user-title">
      <h1>🧔 Edit User</h1>
      <div class="created-at">
        <p>Created At: </p>
        <h3>{{ format(new Date(user.createdAt), 'MMM do yyyy') }}</h3>
      </div>
    </div>
    <div class="add-user-row01">
      <div class="name">
        <label for="first_name">👦 First Name:</label>
        <input type="text" v-model="first_name" required/>
      </div>
      <div class="name">
        <label for="last_name">👦 Last Name:</label>
        <input type="text" v-model="last_name" required/>
      </div>
      <div class="email">
        <label for="email">📬 Email Address:</label>
        <input type="email" v-model="email" required/>        
      </div>
      <div class="phone-number">
        <label for="phone">📞 Personal Phone Number:</label>
        <InputMask v-model="phone_number" mask="999 999-999" class="input-mask" required/>
      </div>
      <div class="city">
        <label for="city">🌏 City/Province:</label>
        <Dropdown v-model="city" :options="cities" optionLabel="name" :placeholder="cityPlaceholder" :filter="true" :showClear="true" required />
      </div>
      <div class="member">
        <label for="member">🗽 Membership Status:</label>
        <Dropdown v-model="membStatus" :options="membStatuses" optionLabel="name" :placeholder="membPlaceholder" :showClear="true" required />
      </div>
      <div class="role">
        <label for="role">🐵 User Role:</label>
        <Dropdown v-model="role" :options="roles" optionLabel="name" :placeholder="rolePlaceholder" :filter="true" :showClear="true" required />
      </div>
      <div class="status">
        <label for="status">🧘‍♀️ User Status:</label>
        <Dropdown v-model="status" :options="statuses" optionLabel="name" :placeholder="statusPlaceholder" :filter="true" :showClear="true" required />
      </div>
    </div>
    <div class="add-user-row03">
      <button>⚡ Update User 🙌</button>
    </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { format } from 'date-fns'
import Dropdown from 'primevue/dropdown'
import InputMask from 'primevue/inputmask'

export default {
  props: ['user'],
  components: {
    Dropdown,
    InputMask
  },
  setup() {
    return { format }
  },
  data() {
    return {
      uri: 'user/',
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      city: null,
      role: null,
      status: null,
      membStatus: null,
      registered_date: '',
      cityPlaceholder: 'Select a City/Province',
      membPlaceholder: 'Select a Status',
      rolePlaceholder: 'Select a Role',
      statusPlaceholder: 'Select a Status',
      watchedRole: null,
      watchedStatus: null,
      watchedMembStatus: null,
      watchedCity: null,

      cities: [
        {name: 'Phnom Penh', code: 'PP'},
        {name: 'Banteay Meanchey', code: 'BTM'},
        {name: 'Battambang', code: 'BTB'},
        {name: 'Kampong Cham', code: 'KPC'},
        {name: 'Kampong Chhnang', code: 'KPCH'},
        {name: 'Kampong Speu', code: 'KPS'},
        {name: 'Kampot', code: 'KP'},
        {name: 'Kandal', code: 'KD'},
        {name: 'Kep', code: 'KEP'},
        {name: 'Koh Kong', code: 'KK'},
        {name: 'Kratie', code: 'KT'},
        {name: 'Mundulkiri', code: 'MDKR'},
        {name: 'Oddor Meanchey', code: 'ODMC'},
        {name: 'Pailin', code: 'PL'},
        {name: 'Prey Veng', code: 'PV'},
        {name: 'Pursat', code: 'PS'},
        {name: 'Rattanakiri', code: 'RTNK'},
        {name: 'Siem Reap', code: 'SR'},
        {name: 'Sihanouk ville', code: 'SHN'},
        {name: 'Stung Treng', code: 'ST'},
        {name: 'Svay Rieng', code: 'SVR'},
        {name: 'Takeo', code: 'TK'},
        {name: 'Kampong Thom', code: 'KPT'},
        {name: 'Preah Vihear', code: 'PVH'},
        {name: 'Tbong Khmum', code: 'TK'}
      ],
      membStatuses: [
        {name: 'Normal 🥩', code: 'NM'},
        {name: 'Premium 🍤', code: 'PM'}
      ],
      statuses: [
        {name: 'Active 👌', code: 'AT'},
        {name: 'Pending...❗', code: 'PD'}
      ],
      roles: [
        {name: 'Admin 🧐', code: 'AM'},
        {name: 'Club Owner 🤗', code: 'CO'},
        {name: 'User 😀', code: 'US'}
      ]
    }
  },
  async mounted() {
    await axios.get(this.uri + this.user.id, {
      headers: {
        'x-access-token': localStorage.getItem('accessToken')
      }
    })
    .then(res => {
      console.log(res.data)
      this.cityPlaceholder = res.data.city
      this.membPlaceholder = res.data.membership.name
      this.rolePlaceholder = res.data.roles[0].name,
      this.statusPlaceholder = res.data.status,
      this.first_name = res.data.first_name,
      this.last_name = res.data.last_name,
      this.email = res.data.email,
      this.phone_number = res.data.phone_num,
      this.city = res.data.city,
      this.role = res.data.roles[0].name
      this.status = res.data.status
      this.membStatus = res.data.membership.name,
      this.registered_date.name = res.data.createdAt
    }).catch(err => {
      if(err.response) {
        console.log(err.response.data.message)
      } else {
        console.log('No response')
      }
    })
  },
  watch: {
    role(curValue, oldValue) {
      if(curValue.code === 'AM') {
        this.watchedRole = 'admin'
      } if(curValue.code === 'CO') {
        this.watchedRole = 'club_owner'
      } if(curValue.code === 'US') {
        this.watchedRole = 'user'
      }
    },
    membStatus(curValue, oldValue) {
      if(curValue.code === 'NM') {
        this.watchedMembStatus = 1
      } if(curValue.code === 'PM') {
        this.watchedMembStatus = 2
      }
    },
    status(curValue, oldValue) {
      if(curValue.code === 'AT') {
        this.watchedStatus = 'active'
      } if(curValue.code === 'PD') {
        this.watchedStatus = 'pending...'
      }
    },
    city(curValue, oldValue) {
      if(curValue.name) {
        this.watchedCity = curValue.name
        console.log(curValue.name)
      }
    }
  },
  methods: {
    getMembership(e) {
      // if(e.value.code === 'NM') {
      //   this.membStatus = 1
      //   return
      // } if(e.value.code === 'PM') {
      //   this.membStatus = 2
      //   return
      // }
    },
    async handleEditUser() {
      const ifNotMembId = null
      if(this.membStatus.code === 'NM') {
        this.ifNotMembId = 1
      } if(this.membStatus.code === 'PM') {
        this.ifNotMembId = 2
      }
      await axios.put(this.uri + this.user.id, {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone_num: this.phone_number,
        city: this.watchedCity || this.city,
        membershipId: this.watchedMembStatus || this.ifNotMembId,
        roles: [this.watchedRole] || [this.role],
        status: this.watchedStatus || this.status
      }, {
        headers: {
          'x-access-token': localStorage.getItem('accessToken')
        }
      }).then(() => {
        this.toast('Edit Successed!', 3000, 'successed')
        this.$emit('closeEditUser')
        this.$store.dispatch('users/getUsers', JSON.parse(localStorage.getItem('userPagInfo')))
      }).catch(err => {
        if(err.response) {
          this.toast(err.response.data.message, 3000, 'error')
        } else {
          this.toast('Error: No Response!', 3000, 'error')
        }
      }
      )
    }
  }
}
</script>

<style>

</style>