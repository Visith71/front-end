<template>
  <div class="edit-time-part">
    <h1>📅 Edit Time-Part</h1>
    <div class="edit-time-part-form">
      <div class="edit-time-part-start-time">
        <p>🕛 Start-Time</p>
        <InputMask 
          v-model="startTime"
          mask="99:99:00"
          slotChar="07:00:00"
          id="startTime"
        />
      </div>
      <div class="edit-time-part-end-time">
        <p>🕜 End-Time</p>
        <InputMask
          v-model="endTime"
          mask="99:99:00"
          slotChar="08:00:00"
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
        >
          <template #optiongroup="slotProps">
            📅 {{ slotProps.item.label }}
          </template>
        </AutoComplete>
      </div>
    </div>
    <div class="edit-time-part-submit">
      <button @click="updateTimePart">Update Time-Part</button>
    </div>
  </div>
</template>

<script>
import InputMask from 'primevue/inputmask';
import AutoComplete from 'primevue/autocomplete';
import { filteredGroupedArr } from '../../composable/queryAutoComplete'

export default {
  props: ['item', 'groupedDayPart'],
  components: {
    AutoComplete,
    InputMask
  },
  data() {
    return {
      startTime: this.item.start_time, 
      endTime: this.item.end_time,
      selectedDayPart: `${this.item.day_part.name}, ${this.item.day_part.week_part.name}`,
      filteredDayPart: null,
      groupedDayPartName: this.groupedDayPart
    }
  },
  methods: {
    searchDayPart(e) {
      this.filteredDayPart = filteredGroupedArr(e, this.groupedDayPartName)
    },
    async updateTimePart() {
      try {
        await this.$store.dispatch('timeAdj/updateTimePart', {
          id: this.item.id,
          start_time: this.startTime ? this.startTime : this.item.start_time,
          end_time: this.endTime ? this.endTime : this.item.end_time,
          dayPartId: this.selectedDayPart.id ? this.selectedDayPart.id : this.item.dayPartId
        })
        this.$store.dispatch('timeAdj/getTimePart', JSON.parse(localStorage.getItem('timePartPagInfo')))
        this.$emit('closeEditTimePart')
        this.toast(this.getUpdateTimePart, 3000, 'successed')
      } catch(err) {
        this.toast(err, 3000, 'error')
      }
    }
  },
  computed: {
    getUpdateTimePart() {
      return this.$store.getters['timeAdj/getUpdateTimePart']
    }
  },
  mounted() {
    document.querySelector('#startTime').focus()
  }
}
</script>

<style>
.edit-time-part-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: 1em auto;
}
.edit-time-part-form div {
  width: 100%;
}
.edit-time-part-form div p {
  margin-bottom: .2em;
}
.edit-time-part-form div:not(:first-child) {
  margin-left: .5em;
}
.edit-time-part-form input,
.edit-time-part-form span {
  width: 100%;
}
.edit-time-part-submit {
  width: 100%;
  text-align: center;
  margin-top: 2em;
}

</style>