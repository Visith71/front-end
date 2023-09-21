<template>
  <ConfirmDialog></ConfirmDialog>
  <div>
    <div class="table-header user-table-header">
      <div>
        <input type="text" class="table-search" placeholder="🔎 ID, Username, Email, P/N, City, Membership..." v-model="search">

        <input type="date" class="table-search" placeholder="📆 Filter Pitch by Created Date..." v-model="searchDate">
      </div>
      <h1>{{ users.total }} Actived Users 🧑</h1>
    </div>
    <div class="table">
      <table>
        <tr>
          <th v-for="title in tableTitle" :key="title">
            <div class="table-title">
              {{ title }}
              <img class='disactive-ascen' @click="handleUserSort(title, $event)" src="../../assets/icons/up-arrow.png" alt="descendant-white" ref="icon">
            </div>
          </th>
          <th colspan="2">Actions</th>
        </tr>
        <tr v-for="user in filteredUsers" :key="user.id" :user="user">
          <td @click="openUser(user)">
            <p>{{ user.id }}</p>
          </td>
          <td @click="openUser(user)">
            <h2><strong>{{ user.first_name }} {{ user.last_name }}</strong></h2>
          </td>
          <td @click="openUser(user)">
            <p>{{ user.email }}</p>
          </td>
          <td @click="openUser(user)">
            <p>{{ user.phone_num }}</p>
          </td>
          <td @click="openUser(user)">
            <p><b>{{ user.roles[0].name.toUpperCase() }}</b></p>
          </td>
          <td @click="openUser(user)">
            <p>{{ user.membership.name }}</p>
          </td>
          <td @click="openUser(user)">
            <p>{{ user.status }}</p>
          </td>
          <td>
            <div class="action edit">
              <button @click="openEditUser(user)">🔨</button>
            </div>
          </td>
          <td>
            <div class="action delete">
              <button @click="deleteUser(user)">❌</button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>

  <ModalView v-if="openedUser" @closeModal="openedUser = null" overlay="open-user-overlay" mode="open-user-modal">
   <UserDataView :user="openedUser" @changeUser="changeUser" />
  </ModalView>

  <ModalView v-if="openedEditUser" @closeModal="openedEditUser = null" overlay="edit-user-overlay" mode="edit-user-modal">
   <EditUser :user="openedEditUser" @changeEditUser="changeEditUser"
   @closeEditUser="openedEditUser = null" />
  </ModalView>

</template>

<script>
import { ref } from 'vue'
import ModalView from '../main-component/ModalView.vue'
import UserDataView from './UserDataView.vue'
import EditUser from './EditUser.vue'
import axios from 'axios'
import { format } from 'date-fns'
import ConfirmDialog from 'primevue/confirmdialog';

export default {
  props: ['users'],
  components: {
    ModalView,
    UserDataView,
    EditUser,
    ConfirmDialog
  },
  data() {
    return {
      search: '',
      currentPage: 1,
      filter: '',
      searchDate: '',
      getUserPagInfo: null,
      isSortedDsec: false,
      idTitleRef: null,
      nameTitleRef: null,
      emailTitleRef: null,
      pnTitleRef: null,
      mbsTitleRef: null,
      stTitleRef: null
    }
  },
  setup () {
    const tableTitle = ref([
      'ID',
      'Username',
      'Email',
      'P/N',
      'User Role',
      'Membership',
      'Status'
    ])
    return { format, tableTitle, openedUser: ref(null), openedEditUser: ref(null) }
  },
  methods: {
    handleTitleRef(curRef) {
      let allTitleRef = [
        this.idTitleRef,
        this.nameTitleRef,
        this.emailTitleRef,
        this.pnTitleRef,
        this.mbsTitleRef,
        this.stTitleRef
      ]
      for (let i = 0; i < allTitleRef.length; i++) {
        if (allTitleRef[i] !== curRef) {
          allTitleRef[i] != null ? allTitleRef[i].classList.remove('is-dsec') : null
        }
      }
    },
    handleUserSort(title, e) {
      let getTableTitle = ''
      if (title === 'Username') {
        getTableTitle = 'first_name'
        this.nameTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title === 'ID') {
        getTableTitle = 'id'
        this.idTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title === 'Email') {
        getTableTitle = 'email'
        this.emailTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title === 'P/N') {
        getTableTitle = 'phone_num'
        this.pnTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title === 'Status') {
        getTableTitle = 'status'
        this.stTitleRef = e.target
        this.handleTitleRef(e.target)
      } if (title === 'Membership') {
        getTableTitle = 'membershipId'
        this.mbsTitleRef = e.target
        this.handleTitleRef(e.target)
      }

      if (this.isSortedDsec == false) {
        e.target.classList.add('is-dsec')
        this.$emit('dispatchUserByPag', {
          sortBy: [`${getTableTitle}`],
          sortDesc: [true]
        })
        this.isSortedDsec = true
      } else {
        e.target.classList.remove('is-dsec')
        this.$emit('dispatchUserByPag', {
          sortBy: [`${getTableTitle}`],
          sortDesc: [false]
        })
        this.isSortedDsec = false
      }
    },
    openUser(user) {
      this.openedUser = user;
    },
    changeUser({closeModal}) {
      let user = this.openedUser
      if(closeModal) {
        this.openedUser = null
      }
    },
    openEditUser(user) {
      this.openedEditUser = user;
    },
    changeEditUser({closeModal}) {
      let user = this.openedEditUser
      if(closeModal) {
        this.openedEditUser = null
      }
    },
    async deleteUser(user) {
      this.$confirm.require({
        message: `Are you sure want to delete transaction ${user.first_name} ${user.last_name}?`,
        header: 'Transaction Delete Confirmation ⭕❗❕',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          axios.delete(`user/${user.id}`, {
            headers: {
              'x-access-token': `${localStorage.getItem('accessToken')}`
            }
          })
          .then(() => {
            this.toast(user.first_name + ' ' + user.last_name + ' has been deleted!', 3000, 'successed')
            this.$confirm.close()
            this.$store.dispatch('users/getUsers', JSON.parse(localStorage.getItem('userPagInfo')))
          }).catch(err => {
            if(err.response) {
              this.toast(err.response.data.message, 3000, 'error')
            } else {
              this.toast('Error: No Response!', 3000, 'error')
            }
          })
        },
        reject: () => {
          this.$confirm.close();
        }
      })
    }
  },
  computed: {
    filteredUsers() {
      return this.users.items.filter((user) => {
        let dateFormat = format(new Date(user.createdAt), 'yyyy-MM-dd');

        if(this.searchDate.length) {
          return dateFormat.includes(this.searchDate.toLowerCase().trim())
        }
        if(this.search.length) {
          return user.first_name.toLowerCase().includes(this.search.toLowerCase().trim()) || user.last_name.toLowerCase().includes(this.search.toLowerCase().trim()) || user.email.toLowerCase().includes(this.search.toLowerCase().trim()) || user.phone_num.includes(this.search.trim()) || user.membershipId.toString().includes(this.search.trim()) || user.status.toLowerCase().includes(this.search.toLowerCase().trim()) || user.id.toString().includes(this.search.toString().trim())
        }
        return user
      })
    },
  },
  created() {

  }
}
</script>

<style>
.data-table {
  width: 100%;
}
.table-search {
  width: 20em;
  margin-right: 1em;
}
tr {
  height: 1em;
}
td > h2 {
  font-size: 1.2em;
}
.user-table-header {
  padding-top: 2em;
}
</style>