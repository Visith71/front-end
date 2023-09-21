<template>
  <div class="edit-time-part">
    <h1>📅 Edit Day-Part</h1>
    <div class="edit-time-part-form">
      <div class="edit-time-part-start-time">
        <p>🗓️ Day-Part Name</p>
        <input 
          type="text"
          v-model="dayPartName"
          ref="dayPartName"
        >
      </div>
      <div class="edit-time-part-autocomplete">
        <p>📆 Choose A Week-Part</p>
        <AutoComplete 
          v-model="selectedWeekPart"
          :suggestions="filteredWeekPart"
          @complete="searchWeekPart($event)"
          :dropdown="true"
          field="name" 
          optionGroupLabel="label" 
          optionGroupChildren="items"
        >
          <template #optiongroup="slotProps">
            📅 {{ slotProps.item.label }}
          </template>
        </AutoComplete>
      </div>
    </div>
    <div class="edit-time-part-submit">
      <button @click="updateDayPart">Update Day-Part</button>
    </div>
  </div>
</template>

<script>
import AutoComplete from 'primevue/autocomplete';
import { filteredGroupedArr } from '../../composable/queryAutoComplete'

export default {
  props: ['item', 'groupedWeekPart'],
  components: {
    AutoComplete
  },
  data() {
    return {
      dayPartName: this.item.name,
      selectedWeekPart: this.item.week_part.name,
      filteredWeekPart: null,
      groupedWeekPartName: this.groupedWeekPart
    }
  },
  methods: {
    searchWeekPart(e) {
      this.filteredWeekPart = filteredGroupedArr(e, this.groupedWeekPartName)
    },
    async updateDayPart() {
      try {
        await this.$store.dispatch('timeAdj/updateDayPart', {
          id: this.item.id,
          name: this.dayPartName ? this.dayPartName : this.item.name,
          weekPartId: this.selectedWeekPart.id ? this.selectedWeekPart.id : this.item.weekPartId
        })
        this.$store.dispatch('timeAdj/getDayPart', JSON.parse(localStorage.getItem('dayPartPagInfo')))
        this.$emit('closeEditDayPart')
        this.toast(this.getUpdateDayPart, 3000, 'successed')
      } catch(err) {
        this.toast(err, 3000, 'error')
      }
    }
  },
  computed: {
    getUpdateDayPart() {
      return this.$store.getters['timeAdj/getUpdateDayPart']
    }
  },
  mounted() {
    this.$refs.dayPartName.focus()
  }
}
</script>

<style scoped>
</style>