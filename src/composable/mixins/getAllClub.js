export const getAllClubs = {
  methods: {
    getSelectedClub(curValue) {
      this.selectedClub = curValue
    }
  },
  computed: {
    getAllSportClubs() {
      return this.$store.getters['sportClubs/getAllSportClubs']
    },
    isAdmin() {
      return localStorage.getItem('roles') === 'ROLE_ADMIN'
    }
  },
  mounted() {
    this.$store.dispatch('sportClubs/getAllSportClubs', {
      itemsPerPage: -1,
      page: 1
    })
  }
}