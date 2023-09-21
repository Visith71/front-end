<template>
  <div class="popular-time-chart-main">
    <div class="popular-time-chart-main-title">
      <h1>🏹⌛⏲ Popular Times</h1>
      <div class="popular-time-filter">
        <select v-model="selectedLabel" @change="getLabelOption($event)" class="option-selection">
          <option value="" disabled>Please Select an option</option>
          <option v-for="label in labelOptions" :key="label" :value="label">
            {{label}}
          </option>
        </select>
        <Calendar 
          v-model="monthPickerValue"
          view="month"
          dateFormat="mm/yy"
          :showIcon="true"
          v-if="showMonthPicker"
        />
        <select v-model="yearPickerValue" 
        class="option-selection year-selection" 
        v-if="showYearPicker">
          <option v-for="year in loopYears" :key="year" :value="year" class="year-option">
            {{year}}
          </option>
        </select>
      </div>
    </div>
    <vue3-chart-js v-bind="{ ...lineChart }" ref="chartRef" />
  </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import zoomPlugin from 'chartjs-plugin-zoom'
import dataLabels from 'chartjs-plugin-datalabels'
import { onMounted, ref, computed, watch, toRefs } from '@vue/runtime-core'
import axios from 'axios'
import Calendar from 'primevue/calendar';
import { format } from 'date-fns'

Vue3ChartJs.registerGlobalPlugins([zoomPlugin])

export default {
  props: {
    selectedClub: {
      required: true
    }
  },
  components: {
    Vue3ChartJs,
    Calendar
  },
  setup(props) {
    const selectedClub = toRefs(props).selectedClub
    const labelOptions = ref(['Monthly', 'Yearly'])
    const getPopularTimesLabels = ref([])
    const getPopularTimesHours = ref([])
    const chartRef = ref(null)
    const showMonthPicker = ref(false)
    const showYearPicker = ref(false)
    const monthPickerValue = ref(null)
    const yearPickerValue = ref(null)
    const isYearly =  ref(false)
    const selectedLabel = ref('Monthly')
    const range = ref({
      start: new Date(),
      end: new Date()
    })

    const loopYears = computed(() => {
      var thisYear = new Date().getFullYear()
      var previousYear = thisYear - 10
      var yearsList = []
      for(let i = previousYear; i <= thisYear; i++) {
        yearsList.push(i)
      }
      return yearsList
    })

    const getLabelOption = (e) => {
      if (e.target.value) {
        isYearly.value = false
      }

      if (e.target.value === 'Monthly') {
        showMonthPicker.value = true
        monthPickerValue.value = new Date()
        yearPickerValue.value = null
      } else {
        showMonthPicker.value = false
      }

      if (e.target.value === 'Yearly') {
        showYearPicker.value = true
        yearPickerValue.value = new Date().getFullYear()
      } else {
        showYearPicker.value = false
      }
    }

    watch(() => selectedClub.value, (currentValue, oldValue) => {
      const startDate = format(new Date(range.value.start), 'yyyy-MM-dd') 
      const endDate = format(new Date(range.value.end), 'yyyy-MM-dd')
      const activeClubId = currentValue.id
      getPopularTimesData(startDate, endDate, activeClubId)
    }, {
      deep: true
    })

    watch(() => monthPickerValue, (currentValue, oldValue) => {
      var date = currentValue.value
      var firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
      var lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)

      range.value.start = firstDateOfMonth
      range.value.end = lastDateOfMonth
    }, 
    { deep: true })

    watch(() => yearPickerValue, (currentValue, oldValue) => {
      const firstDay = new Date(currentValue.value, 0, 1)
      const lastDay = new Date(currentValue.value, 12, 0)
      const firstDayOfYear = format(new Date(firstDay), 'yyyy-MM-dd') 
      const lastDayOfYear = format(new Date(lastDay), 'yyyy-MM-dd') 
      range.value.start = firstDayOfYear
      range.value.end = lastDayOfYear
      if (currentValue.value || oldValue.value) {
        isYearly.value = true
      } else {
        isYearly.value = false
      }
      const clubIdParse = JSON.parse(localStorage.getItem('sportClub'))
      const activeClubId = clubIdParse && clubIdParse.id ? clubIdParse.id : selectedClub.value.id
      
      getPopularTimesData(firstDayOfYear, lastDayOfYear, activeClubId)
    }, 
    { deep: true })

    const getPopularTimesData = async (startDate, endDate, activeClubId) => {
      if (!activeClubId) {
        return;
      }
      axios.get(`get-most-booking-hour-club-wise/${startDate}/${endDate}/${activeClubId}`)
      .then(res => {
        const totalHoursArr = []
        const getUpdateLabels = []
        res.data.map(hour => {
          const hourStr = `${hour.hour} - ${(parseInt(hour.hour) + 1)} ${(parseInt(hour.hour) + 1) > 11 ? 'PM':'AM'}`
          getUpdateLabels.push(hourStr)
          totalHoursArr.push(hour.total)

        })
        lineChart.data.labels = getUpdateLabels
        lineChart.data.datasets[0].data = totalHoursArr
        lineChart.data.datasets[0].label = `SHOWED DATA FROM ${startDate} • ${endDate}`
        chartRef.value.update(300)
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.message)
        } else {
          console.log('No response!')
        }
      })
    }

    watch(() => range, (currentValue, oldValue) => {
      const startDate = format(new Date(currentValue.value.start), 'yyyy-MM-dd') 
      const endDate = format(new Date(currentValue.value.end), 'yyyy-MM-dd')
      const clubIdParse = JSON.parse(localStorage.getItem('sportClub'))
      const activeClubId = clubIdParse && clubIdParse.id ? clubIdParse.id : selectedClub.value.id

      getPopularTimesData(startDate, endDate, activeClubId)
    }, 
    { deep: true })

    const lineChart = {
      type: "line",
      plugins: [dataLabels],
      data: {
        labels: getPopularTimesLabels.value,
        datasets: [
          {
            label: "Caffine Consumption",
            data: [4, 3, 2, 3, 4, 2, 1, 4, 5, 9, 10],
            fill: false,
            borderColor: "blue",
            backgroundColor: "black",
          }
        ],
      },
      options: {
        hoverRadius: 18,
        hoverBackgroundColor: 'black',
        min: 0,
        max: 100,
        responsive: true,
        plugins: {
          // zoom: {
          //   zoom: {
          //     wheel: {
          //       enabled: true
          //     },
          //     pinch: {
          //       enabled: true
          //     },
          //     mode: "y"
          //   }
          // },
          datalabels: {
            backgroundColor: function (context) {
              return context.dataset.backgroundColor
            },
            borderRadius: 4,
            color: "white",
            font: {
              weight: "bold"
            },
            formatter: Math.round,
            padding: 6
          },
          legend: {
            labels: {
              font: {
                weight: '600',
                size: '18'
              }
            }
          }
        },
        scales: {
          y: {
            min: 0,
            ticks: {
              callback: function (value) {
                return `${value} times`
              }
            }
          }
        }
      }
    }

    onMounted(() => {
      showMonthPicker.value = true
      monthPickerValue.value = new Date()

      var date = new Date()
      var firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const startDate = format(firstDateOfMonth, 'yyyy-MM-dd') 
      const endDate = format(lastDateOfMonth, 'yyyy-MM-dd')
      const clubIdParse = JSON.parse(localStorage.getItem('sportClub'))
      const activeClubId = clubIdParse && clubIdParse.id ? clubIdParse.id : selectedClub.value.id

      getPopularTimesData(startDate, endDate, activeClubId)
    })

    return {
      getPopularTimesData,
      lineChart,
      getPopularTimesLabels,
      getPopularTimesHours,
      chartRef,
      showMonthPicker,
      showYearPicker,
      monthPickerValue,
      yearPickerValue,
      loopYears,
      isYearly,
      labelOptions,
      range,
      getLabelOption,
      selectedLabel
    }
  }
}
</script>

<style scoped>
.select-option {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
}
.option-selection {
  border-radius: 10px;
  padding: .5em 1em;
  margin-right: 1em;
  height: 3em;
}
.option-selection:focus {
  outline: none;
}
.popular-time-chart-main-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
}
</style>