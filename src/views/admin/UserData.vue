<template>
  <div class="main users-main">
    <div class="main-title title-section">
      <div class="title">
        <img src="../../assets/icons/database-configuration.svg">
        <h1>Users Data</h1>
      </div>
      <div class="add-new-button add-user-button">
        <button @click="openAddUser()">➕ Add User 🎃</button>
      </div>
    </div>
      <div class="card-section animate__animated animate__fadeInUp">
        <div class="cards-layout">
          <div v-if="users.items">
            <UserListView :users="users" @dispatchUserByPag="dispatchUserByPag" />
            <div class="table-pagination">
              <div class="page-size">
                <select v-model="itemSize" class="item-size-select">
                  <option v-for="opt in itemSizeList" :key="opt" :value="opt">
                    {{ opt }}
                  </option>
                </select>
                <p class="item-per-page"> | Showing {{ getFirstItemNum }} to {{getLastItemNum}} of <i>{{users.total}} items</i></p>
              </div>
              <v-pagination 
                v-model="pageNum"
                :pages="getTotalPage"
                :range-size="1"
                active-color="f2f2f2"
              />
            </div>
          </div>
          <div v-else>
            <h1>No Users Data Available 🌟🙌👏</h1>
          </div>
        </div>
      </div>
  </div>

  <ModalView v-if="openedAddUser" @closeModal="openedAddUser = null" mode="add-user-modal">
   <AddUser @changeAddUser="changeAddUser" @closeAddUser="openedAddUser = null" />
  </ModalView>
</template>

<script>
import UserListView from '../../components/users/UserListView.vue'
import { watch } from "vue";
import { useRouter } from "vue-router";
import ModalView from '../../components/main-component/ModalView.vue'
import AddUser from '../../components/users/AddUser.vue'
import VPagination from '@hennge/vue3-pagination';
import "@hennge/vue3-pagination/dist/vue3-pagination.css"
import { ref } from 'vue'

export default {
  components: {
    UserListView,
    ModalView,
    AddUser,
    VPagination
  },
  setup() {
    const router = useRouter();

    // watch(user, () => {
    //   if (!user.vlaue) {
    //     router.push({ name: "index" });
    //   }
    // });

    return {openedAddUser: ref(null) };
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 3,
      itemSize: null,
      itemSizeList: [5, 10, 20, 30, 40, 50],
      pickedItemSize: null
    }
  },
  watch: {
    pageNum() {
      let params = {
        page: this.pageNum,
        itemsPerPage: this.itemSize,
        // sortBy: ['first_name'],
        // sortDesc: [false]
      }
      localStorage.setItem('userPagInfo', JSON.stringify(params))
      this.$store.dispatch('users/getUsers', params)
    },
    itemSize(curValue) {
        let params = {
          page: this.pageNum,
          itemsPerPage: this.itemSize,
          // sortBy: ['first_name'],
          // sortDesc: [false]
        }
        localStorage.setItem('userPagInfo', JSON.stringify(params))
        this.$store.dispatch('users/getUsers', params)
    }
  },
  methods: {
    dispatchUserByPag(params) {
      this.$store.dispatch('users/getUsers', {
        itemsPerPage: this.itemSize,
        page: this.pageNum,
        sortDesc: params.sortDesc,
        sortBy: params.sortBy
      })
    },
    openAddUser() {
      this.openedAddUser = true
    },
    changeAddUser({closeModal}) {
      if(closeModal) {
        this.openedAddUser = null
      }
    },
  },
  computed: {
    users() {
      return this.$store.getters['users/users']
    },
    getTotalPage() {
      return Math.ceil(this.users.total / this.itemSize)
    },
    getFirstItemNum() {
      return (this.itemSize * this.pageNum) - (this.itemSize) + 1
    },
    getLastItemNum() {
      const lastItemNum = (this.itemSize * this.pageNum)
      return lastItemNum >= this.users.total ? this.users.total : lastItemNum  
    }
  },
  created() {
    const userPagInfo = JSON.parse(localStorage.getItem('userPagInfo'))
    if (userPagInfo) {
      this.itemSize = userPagInfo.itemsPerPage;
      this.pickedItemSize = userPagInfo.itemsPerPage;
    } else {
      this.itemSize = 10;
      this.pickedItemSize = 10;
    }

    let params = {
      itemsPerPage: this.itemSize,
      page: this.pageNum,
      // sortBy: ['first_name'],
      // sortDesc: [false]
    }
    localStorage.setItem('userPagInfo', JSON.stringify(params))
    
    this.$store.dispatch('users/getUsers', params)
  },
}
</script>

<style>
.main {
  height: 100vh;
}
.main-title h1 {
  font-size: 2.5em;
}
.title {
  display: flex;
  align-items: center;
}
.main-title img {
  width: 3em;
  margin-right: .5em;
}
.add-new-button > button {
  border-radius: 30px;
}
</style>