<template>
  <div class="add-user">
    <form @submit.prevent="handleUser">
      <div class="new-user-title">
      <h1>🧔 Add User</h1>
      <div class="created-at">
        <p>Created At: </p>
        <h3>{{ format(new Date(), 'MMM do yyyy') }}</h3>
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
        <InputMask v-model="phone_number" mask="999 999-999" class="input-mask" />
      </div>
      <div class="city">
        <label for="name">🌏 City/Province:</label>
        <Dropdown v-model="city" :options="cities" optionLabel="name" placeholder="Select a City/Province" :filter="true" :showClear="true" />
      </div>
      <div class="member">
        <label for="member">🗽 Membership Status:</label>
        <Dropdown v-model="membStatus" :options="membStatuses" optionLabel="name" placeholder="Select a Status" :showClear="true" />
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
      <button>Add New User ➕</button>
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
  components: {
    Dropdown,
    InputMask
  },
  setup() {
    return { format }
  },
  data() {
    return {
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
      watchedRole: [],
      watchedStatus: null,
      watchedMembStatus: null,
      // watchedCity: null,

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
  watch: {
    role(curValue, oldValue) {
      if(curValue.code === 'AM') {
        this.watchedRole = []
        this.watchedRole.push('admin')
      } if(curValue.code === 'CO') {
        this.watchedRole = []
        this.watchedRole.push('club_owner')
      } if(curValue.code === 'US') {
        this.watchedRole = []
        this.watchedRole.push('user')
      }
    },
    membStatus(curValue, oldValue) {
      if(curValue.code === 'NM') {
        this.watchedMembStatus = "normal"
      } if(curValue.code === 'PM') {
        this.watchedMembStatus = "premium"
      }
    },
    status(curValue, oldValue) {
      if(curValue.code === 'AT') {
        this.watchedStatus = 'active'
      } if(curValue.code === 'PD') {
        this.watchedStatus = 'pending...'
      }
    },
    // city(curValue, oldValue) {
    //   if(curValue.name) {
    //     this.watchedCity = curValue.name
    //     console.log(curValue.name)
    //   }
    // }
  },
  methods: {
    async handleUser() {
      await axios.post('auth/signup', {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        phone_num: this.phone_number,
        city: this.city.name,
        membership: this.watchedMembStatus,
        roles: this.watchedRole,
        status: this.watchedStatus,
        password: 'admin@pitchbooker',
        accepted: true
      }).then(() => {
        this.toast('Add User Successed!', 3000, 'successed')
        this.$emit('closeAddUser')
        this.$store.dispatch('users/getUsers', JSON.parse(localStorage.getItem('userPagInfo')))
      }).catch(err => {
        if(err.response) {
          this.toast(err.response.data.message, 3000, 'error')
        } else {
            this.toast('Could Not Add User!', 3000, 'error')
          }
        }
      )
    }
  }
}
</script>

<style>
.add-user {
  padding: 0em 1em;
}
.name,
.email,
.phone-number,
.city,
.member,
.payway,
.role,
.status {
  display: flex;
  flex-direction: column;
}
.new-user-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
}
.add-user-row01 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-gap: 1.5em;
  grid-row-gap: 1em;
  padding-bottom: 1em;
}
label {
  margin-bottom: .5em;
}
.add-user-row03 {
  text-align: center;
  margin-top: 1em;
}
.add-user-row03 > button {
  border-radius: 30px;
}
.created-at {
  display: flex;
  align-items: center;
}
.created-at > p {
  margin-right: .5em;
}
</style>