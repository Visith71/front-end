<template>
  <div class="edit-time-part">
    <h1>📅 Create A Time-Part</h1>
    <div class="edit-time-part-form">
      <div class="edit-time-part-start-time">
        <p>🕛 Start-Time</p>
        <InputMask 
          v-model="startTime"
          mask="99:99:00"
          slotChar="00:00:00"
          id="startTime"
        />
      </div>
      <div class="edit-time-part-end-time">
        <p>🕜 End-Time</p>
        <InputMask
          v-model="endTime"
          mask="99:99:00"
          slotChar="00:00:00"
          id="endTime"
        />
      </div>
      <div class="edit-time-part-autocomplete">
        <p>📆 Choose A Day-Part</p>
        <AutoComplete 
          v-model="selectedDayPart"
          :suggestions="filteredDayPart"
          @complete="searchDayPart($event)"
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
      <button @click="addTimePart">Create Time-Part</button>
    </div>
  </div>
</template>

<script>
import InputMask from 'primevue/inputmask';
import AutoComplete from 'primevue/autocomplete';
import { filteredGroupedArr } from '../../composable/queryAutoComplete'

export default {
  props: ['groupedDayPart'],
  components: {
    AutoComplete,
    InputMask
  },
  data() {
    return {
      startTime: '', 
      endTime: '',
      selectedDayPart: null,
      filteredDayPart: null,
      groupedDayPartName: this.groupedDayPart
    }
  },
  methods: {
    searchDayPart(e) {
      this.filteredDayPart = filteredGroupedArr(e, this.groupedDayPartName)
    },
    async addTimePart() {
      try {
        if(!this.startTime || !this.endTime) {
          this.toast('Start-Time and End-Time Should Be Enter!', 3000, 'error')
          !this.startTime ? document.querySelector('#startTime').focus() : document.querySelector('#endTime').focus()
          return
        } if(!this.selectedDayPart) {
          document.querySelector('#autoComplete').focus()
          this.toast('Please Select a Day-Part!', 3000, 'error')
        }
        await this.$store.dispatch('timeAdj/addTimePart', {
          start_time: this.startTime,
          end_time: this.endTime,
          dayPartId: this.selectedDayPart.id
        })
        this.$store.dispatch('timeAdj/getTimePart', JSON.parse(localStorage.getItem('timePartPagInfo')))
        this.$emit('closeAddTimePart')
        this.toast(this.getAddTimePart, 3000, 'successed')
      } catch(err) {
        this.toast(err, 3000, 'error')
      }
    }
  },
  computed: {
    getAddTimePart() {
      return this.$store.getters['timeAdj/getAddTimePart']
    }
  },
  mounted() {
    document.querySelector('#startTime').focus()
  }
}
</script>