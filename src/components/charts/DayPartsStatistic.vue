<template>
  <div class="day-parts-stat">
    <div class="day-parts-stat-barchart">
      <div class="select-option">
        <div class="selection-section">
        <select v-model="selectedLabel" @change="getLabelOption($event)" class="option-selection">
          <option value="" disabled>Please Select an option</option>
          <option v-for="label in labelOptions" :key="label" :value="label">
            {{label}}
          </option>
        </select>
        <v-date-picker 
          v-model="range" 
          is-range 
          v-if="showDatePicker"
          :select-attribute="selectDragAttribute"
          :drag-attribute="selectDragAttribute"
          @drag="dragValue = $event"
          :max-date='new Date()'
          color="teal"
          class="date-range-picker"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <div class="date-picker-container">
              <input
                :value="inputValue.start"
                v-on="inputEvents.start"
              />
              <h2>👉</h2>
              <input
                :value="inputValue.end"
                v-on="inputEvents.end"
              />
            </div>
          </template>
          <template v-slot:day-popover="{ format }">
            <div>
              {{ format(dragValue ? dragValue.start : range.start, 'MMM D') }}
              -
              {{ format(dragValue ? dragValue.end : range.end, 'MMM D') }}
            </div>
          </template>
        </v-date-picker>
        <Calendar 
          v-model="monthPickerValue" 
          view="month" 
          dateFormat="mm/yy" 
          v-if="showMonthPicker" 
          :showIcon="true"
        />
        <select v-model="yearPickerValue" 
        class="option-selection year-selection" 
        v-if="showYearPicker">
          <option v-for="year in loopYears" :key="year" :value="year" class="year-option">
            {{year}}
          </option>
        </select>
        </div>
        <div class="barchart-title" v-if="!isYearly">
          <p>{{ format(new Date(range.start), 'MMM dd') }} - {{ format(new Date(range.end), 'MMM dd') }}</p>
          <h2>ALL BOOKING HOURS</h2>
        </div>
        <div class="barchart-title" v-if="isYearly">
          <p>JAN​​ {{ yearPickerValue }} - DEC {{ yearPickerValue }}</p>
          <h2>ALL BOOKING HOURS</h2>
        </div>
      </div>
      <div class="day-parts-barchart">
        <vue3-chart-js v-bind="{ ...barChart }" ref="barChartRef" />
      </div>
    </div>
    <div class="day-parts-stat-doughnut">
      <div style="height:400px;width: 400px;display: flex;flex-direction:column;">
        <div class="doughnut-title" v-if="isYearly">
          <p>JAN {{ yearPickerValue }} - DEC {{ yearPickerValue }}</p>
          <h2>FAVORITE PARTS OF THE DAY</h2>
        </div>
        <div class="doughnut-title" v-if="!isYearly">
          <p>{{ format(new Date(range.start), 'MMM dd') }} - {{ format(new Date(range.end), 'MMM dd') }}</p>
          <h2>FAVORITE PARTS OF THE DAY</h2>
        </div>
        <vue3-chart-js
          :id="doughnutChart.id"
          ref="chartRef"
          :type="doughnutChart.type"
          :data="doughnutChart.data"
          :options="doughnutChart.options"
        ></vue3-chart-js>
      </div>
    </div>
  </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
// import { Calendar, DatePicker } from 'v-calendar'
import { format } from 'date-fns'
import axios from 'axios'
import { computed, onBeforeMount, onMounted, ref, toRefs, watch } from 'vue'
import Calendar from 'primevue/calendar';

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
  computed: {
    selectDragAttribute() {
      return {
        popover: {
          visibility: 'hover',
          isInteractive: false
        }
      }
    }
  },
  setup (props) {
    const selectedClub = toRefs(props).selectedClub
    const selectedClubId = ref(null)
    const labelOptions = ref(['Last 7 Days', 'Last 30 Days', 'Monthly', 'Yearly', 'Date Range'])
    const selectedLabel = ref('Last 7 Days')
    const showDatePicker = ref(false)
    const showMonthPicker = ref(false)
    const showYearPicker = ref(false)
    const monthPickerValue = ref(null)
    const yearPickerValue = ref(null)

    const loopYears = computed(() => {
      var thisYear = new Date().getFullYear()
      var previousYear = thisYear - 10
      var yearsList = []
      for(let i = previousYear; i <= thisYear; i++) {
        yearsList.push(i)
      }
      return yearsList
    })

    const range = ref({
      start: new Date(),
      end: new Date()
    })
    const barChartRef = ref(null)
    const chartRef = ref(null)

    const isYearly = ref(false)

    const dragValue = ref(null)

    watch(() => selectedClub.value, (currentValue, oldValue) => {
      if (currentValue !== oldValue) {
        const startDate = format(new Date(range.value.start), 'yyyy-MM-dd') 
        const endDate = format(new Date(range.value.end), 'yyyy-MM-dd')
        const activeClubId = currentValue.id
        getRangeDateData(startDate, endDate, activeClubId)
        getYearData(activeClubId, yearPickerValue.value)
      }
    }, {
      deep: true
    })

    watch(() => yearPickerValue, (currentValue, oldValue) => {
      if(currentValue.value || oldValue.value) {
        isYearly.value = true
      } else {
        isYearly.value = false
      }
      const clubIdParse = JSON.parse(localStorage.getItem('sportClub'))
      const activeClubId = clubIdParse && clubIdParse.id ? clubIdParse.id : selectedClub.value.id
      getYearData(activeClubId, currentValue.value)
    },
    { deep: true })

    const getYearData = async (activeClubId, year) => {
      if (!activeClubId) {
        return;
      }
      await axios.get(`get-yearly-dashboard-statistic-data/${activeClubId}/${year}`)
      .then(res => {
        var yearlyTotalHours = res.data[4].TotalHours
        var yearsRange = res.data[0].Morning[0].map(function (day) {
          return day.month
        })
        var yearlyMorningHoursData = res.data[0].Morning[0].map(function(hours) {
          return hours.total_hours
        })
        var yearlyAfternoonHoursData = res.data[1].Afternoon[0].map(function (hours) {
          return hours.total_hours
        })
        var yearlyEveningHoursData = res.data[2].Evening[0].map(function (hours) {
          return hours.total_hours
        })
        var yearlyNightHoursData = res.data[3].Night[0].map(function (hours) {
          return hours.total_hours
        })

          doughnutChart.options.plugins.title = {
            text: `FAVORITE PART OF THE DAY FROM JAN - DEC ${yearPickerValue.value}`,
            display: false
          }
          doughnutChart.data.labels = ['Morning', 'Afternoon', 'Evening', 'Night']
          doughnutChart.data.datasets = [
            {
              backgroundColor: [
                '#abecd8',
                '#46cdcf',
                '#3c84a8',
                '#47466d'
              ],
            data: yearlyTotalHours
            }
          ]
          chartRef.value.update(300)

          barChart.options.plugins.title = {
            display: false,
            text: `BOOKING HOURS DATA FROM JAN-DEC ${yearPickerValue.value}`
          }
          barChart.data.labels = yearsRange
          barChart.data.datasets = [
            {
              label: "Morning",
              backgroundColor: ['#abecd8'],
              data: yearlyMorningHoursData,
            },
            {
              label: "Afternoon",
              backgroundColor: ['#46cdcf'],
              data: yearlyAfternoonHoursData,
            },
            {
              label: "Evening",
              backgroundColor: ['#3c84a8'],
              data: yearlyEveningHoursData,
            },
            {
              label: "Night",
              backgroundColor: ['#47466d'],
              data: yearlyNightHoursData,
            },
          ]
          barChartRef.value.update(250)
      })
      .catch(err => {
        if(err.response) {
          console.log(err.response.data.message)
        } else {
          console.log('No response!')
        }
      })
    }

    const getLabelOption = (e) => {
      if(e.target.value) {
        isYearly.value = false
      }

      if(e.target.value === 'Date Range') {
        showDatePicker.value = true
        yearPickerValue.value = null
      } else {
        showDatePicker.value = false
      }

      if(e.target.value === 'Last 7 Days') {
        var date = new Date()
        date.setDate(date.getDate() - 7);
        yearPickerValue.value = null

        range.value.end = new Date(),
        range.value.start = new Date(date)
      }

      if(e.target.value === 'Last 30 Days') {
        var date = new Date()
        date.setDate(date.getDate() - 30);
        yearPickerValue.value = null

        range.value.end = new Date(),
        range.value.start = new Date(date)
      }

      if(e.target.value === 'Monthly') {
        showMonthPicker.value = true
        monthPickerValue.value = new Date()
        yearPickerValue.value = null
      } else {
        showMonthPicker.value = false
      }

      if(e.target.value === 'Yearly') {
        showYearPicker.value = true
        yearPickerValue.value = new Date().getFullYear()
      } else {
        showYearPicker.value = false
      }
    }

    onMounted(() => {
      var date = new Date()
      date.setDate(date.getDate() - 7);

      range.value.end = new Date(),
      range.value.start = new Date(date)
    })

    watch(() => monthPickerValue, (currentValue, oldValue) => {
      var date = currentValue.value
      var firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      range.value.end = lastDateOfMonth
      range.value.start = firstDateOfMonth
    },
    { deep: true })

    watch(() => range, (currentValue, oldValue) => {
      const startDate = format(new Date(currentValue.value.start), 'yyyy-MM-dd') 
      const endDate = format(new Date(currentValue.value.end), 'yyyy-MM-dd')
      const clubIdParse = JSON.parse(localStorage.getItem('sportClub'))
      const activeClubId = clubIdParse && clubIdParse.id ? clubIdParse.id : selectedClub.value.id

      getRangeDateData(startDate, endDate, activeClubId)
      },
      { deep: true }
    )

    const getRangeDateData = async (startDate, endDate, activeClubId) => {
      if (!activeClubId) {
        return;
      }
      await axios.get(`get-weekly-dashboard-statistics-data/${startDate}/${endDate}/${activeClubId}`)
      .then(res => {
        var totalHours = res.data[4].TotalHours
        // var totalHours = 25
        var dateRange = res.data[0].Morning[0].map(function(date) {
          return format(new Date(date.play_date), 'dd,MMM')
        })
        var morningHoursData = res.data[0].Morning[0].map(function(hours) {
          return hours.total_hours
        })
        var afternoonHoursData = res.data[1].Afternoon[0].map(function(hours) {
          return hours.total_hours
        })
        var eveningHoursData = res.data[2].Evening[0].map(function(hours) {
          return hours.total_hours
        })
        var nightHoursData = res.data[3].Night[0].map(function(hours) {
          return hours.total_hours
        })
          doughnutChart.options.plugins.title = {
            text: `FAVORITE PART OF THE DAY FROM ${startDate} TO ${endDate}`,
            display: false
          }
          doughnutChart.data.labels = ['Morning', 'Afternoon', 'Evening', 'Night']
          doughnutChart.data.datasets = [
            {
              backgroundColor: [
                '#abecd8',
                '#46cdcf',
                '#3c84a8',
                '#47466d'
              ],
            data: totalHours
            }
          ]
          chartRef.value.update(300)

          barChart.options.plugins.title = {
            display: false,
            text: `BOOKING HOURS DATA FROM ${startDate} TO ${endDate}`
          }
          barChart.data.labels = dateRange
          barChart.data.datasets = [
            {
              label: "Morning",
              backgroundColor: ['#abecd8'],
              data: morningHoursData,
            },
            {
              label: "Afternoon",
              backgroundColor: ['#46cdcf'],
              data: afternoonHoursData,
            },
            {
              label: "Evening",
              backgroundColor: ['#3c84a8'],
              data:eveningHoursData,
            },
            {
              label: "Night",
              backgroundColor: ['#47466d'],
              data: nightHoursData,
            },
          ]
          barChartRef.value.update(250)
      })
      .catch(err => {
        if(err.response) {
          console.log(err.response.data.message)
        } else {
          console.log('No response!')
        }
      })
    }

    const delayed = ref();

    const barChart = {
      type: "bar",
      options: {
        interaction: {
          mode: 'index',
          intersect: false
        },
        tooltip: {
          display: true
        },
        animation: {
          onComplete: () => {
            delayed.value = true;
          },
          delay: (context) => {
            var delay = 0;
            if (context.type === 'data' && context.mode === 'default' && !delayed.value) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          }
        },
        min: 0,
        max: 100,
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
          title: {
            display: false,
            text: 'BAR CHART'
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            min: 0,
            ticks: {
              callback: function (value) {
                return `${value} H` 
              }
            },
            stacked: true
          }
        }
      },
      data: {
        labels: ['Date Range'],
        datasets: [
          {
            label: "Morning",
            backgroundColor: ["#abecd8"],
            data: ['23', '12']
          },
          {
            label: "Afternoon",
            backgroundColor: ["#47466d"],
            data: ['23', '12'],
          },
          {
            label: "Evening",
            backgroundColor: ["#3c84a8"],
            data: ['23', '12'],
          },
          {
            label: "Night",
            backgroundColor: [ "#46cdcf"],
            data: ['23', '12'],
          },
        ]
      },
    }

    const doughnutChart = {
      id: 'doughnut',
      type: 'doughnut',
      data: {
        labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
        datasets: [
          {
            backgroundColor: [
              '#abecd8',
              '#47466d',
              '#3c84a8',
              '#46cdcf'
            ],
            data: ['23', '12', '34', '42']
          }
        ]
      },
      options: {
        plugins: {}
      }
    }

    return {
      format,
      labelOptions,
      selectedLabel,
      getLabelOption,
      showDatePicker,
      range,
      barChart,
      delayed,
      doughnutChart,
      chartRef,
      barChartRef,
      dragValue,
      showMonthPicker,
      monthPickerValue,
      showYearPicker,
      yearPickerValue,
      loopYears,
      isYearly,
      selectedClub,
      selectedClubId,
      getRangeDateData,
      getYearData
    }
  }
}
</script>

<style scoped>
.day-parts-stat {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
  padding-top: 1em;
}
.day-parts-stat-barchart {
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.day-parts-stat-doughnut {
  grid-area: 1 / 2 / 2 / 3;
  display: flex;
  justify-content: flex-end;
}
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
}
.option-selection:focus {
  outline: none;
}
.date-picker-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.date-range-picker {
  margin-top: 1em;
}
.date-picker-container h2 {
  padding: 0 .5em;
}
.barchart-title {
  text-align: right;
  line-height: 2em;
}
.doughnut-title {
  margin-top: -1em;
  text-align: center;
  line-height: 2em;
  margin-bottom: .5em;
}
.doughnut-title p,
.barchart-title p {
  font-size: 1.2em;
}
</style>