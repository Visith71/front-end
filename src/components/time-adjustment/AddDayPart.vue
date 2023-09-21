<template>
  <div class="edit-time-part">
    <h1>📅 Create A Day-Part</h1>
    <div class="edit-time-part-form">
      <div class="edit-time-part-start-time">
        <p>🗓️ Day-Part Name</p>
        <input 
          type="text"
          v-model="dayPartName"
          ref="dayPartName"
          required
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
          id="autoComplete"
        >
          <template #optiongroup="slotProps">
            📅 {{ slotProps.item.label }}
          </template>
        </AutoComplete>
      </div>
    </div>
    <div class="edit-time-part-submit">
      <button @click="addDayPart">Create Day-Part</button>
    </div>
  </div>
</template>

<script>
import AutoComplete from 'primevue/autocomplete';
import { filteredGroupedArr } from '../../composable/queryAutoComplete'

export default {
  props: ['groupedWeekPart'],
  components: {
    AutoComplete
  },
  data() {
    return {
      dayPartName: '',
      selectedWeekPart: null,
      filteredWeekPart: null,
      groupedWeekPartName: this.groupedWeekPart
    }
  },
  methods: {
    searchWeekPart(e) {
      this.filteredWeekPart = filteredGroupedArr(e, this.groupedWeekPartName)
    },
    async addDayPart() {
      if (!this.dayPartName) {
        this.$refs.dayPartName.focus()
        this.toast('Please Enter a DAY-PART!', 3000, 'error')
        return
      }
      else if (!this.selectedWeekPart) {
        document.querySelector('#autoComplete').focus()
        this.toast('Please Select a WEEK-PART!', 3000, 'error')
        return
      }
      try {
        await this.$store.dispatch('timeAdj/addDayPart', {
          name: this.dayPartName,
          weekPartId: this.selectedWeekPart.id
        })
        this.$store.dispatch('timeAdj/getDayPart', JSON.parse(localStorage.getItem('dayPartPagInfo')))
        this.$emit('closeAddDayPart')
        this.toast(this.getAddDayPart, 3000, 'successed')
      } catch(err) {
        this.toast(err, 3000, 'error')
      }
    }
  },
  computed: {
    getAddDayPart() {
      return this.$store.getters['timeAdj/getAddDayPart']
    }
  },
  mounted() {
    this.$refs.dayPartName.focus()
  }
}
</script>

<style scoped>
</style>