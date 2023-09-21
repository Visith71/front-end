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
      <button @click="updateWeekPart">Update Week-Part</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  components: {
  },
  data() {
    return {
      weekPartName: this.item.name
    }
  },
  methods: {
    async updateWeekPart() {
      try {
        await this.$store.dispatch('timeAdj/updateWeekPart', {
          id: this.item.id,
          name: this.weekPartName ? this.weekPartName : this.item.name
        })
        this.$store.dispatch('timeAdj/getWeekPart', JSON.parse(localStorage.getItem('weekPartPagInfo')))
        this.$emit('closeEditWeekPart')
        this.toast(this.getUpdateWeekPart, 3000, 'successed')
      } catch(err) {
        this.toast(err, 3000, 'error')
      }
    }
  },
  computed: {
    getUpdateWeekPart() {
      return this.$store.getters['timeAdj/getUpdateWeekPart']
    }
  },
  mounted() {
    this.$refs.weekPartName.focus()
  }
}
</script>

<style scoped>
</style>