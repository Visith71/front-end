<template>
  <div class="edit-time-part">
    <h1>📅 Edit Week-Part</h1>
    <div class="edit-time-part-form">
      <div class="edit-time-part-start-time">
        <p>📆 Week-Part Name</p>
        <input 
          type="text"
          v-model="weekPartName"
          ref="weekPartName"
        >
      </div>
    </div>
    <div class="edit-time-part-submit">
      <button @click="addWeekPart">Create Week-Part</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weekPartName: ''
    }
  },
  methods: {
    async addWeekPart() {
      if (!this.weekPartName) {
        this.$refs.weekPartName.focus()
        this.toast('Please Enter a WEEK-PART!', 3000, 'error')
        return
      }
      try {
        await this.$store.dispatch('timeAdj/addWeekPart', {
          id: 5,
          name: this.weekPartName
        })
        this.$store.dispatch('timeAdj/getWeekPart', JSON.parse(localStorage.getItem('weekPartPagInfo')))
        this.$emit('closeAddWeekPart')
        const bodyRefClass = document.body.classList
        if (bodyRefClass.contains('no-scroll')) {
          bodyRefClass.remove('no-scroll')
        }
        this.toast(this.getAddWeekPart, 3000, 'successed')
      } catch(err) {
        this.toast(err, 3000, 'error')
      }
    }
  },
  computed: {
    getAddWeekPart() {
      return this.$store.getters['timeAdj/getAddWeekPart']
    }
  },
  mounted() {
    this.$refs.weekPartName.focus()
  }
}
</script>