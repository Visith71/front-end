<template>
  <div class='app'>
    <div class="app-calendar-checkbox" @click="closePopup">
      <div v-for="pitch in getAllPitchesNameArr" :key="pitch" class="p-field-checkbox">
        <Checkbox :id="pitch" name="pitch" :value="pitch" v-model="selectedPitchesName" />
        <label :for="pitch">PN: {{ pitch }}</label>
      </div>
    </div>

    <div class='app-main'>
      <full-calendar
        ref="fullCalendar"
        :options="{
          ...calendarOptions,
          events: calendarEvents
        }"
      >
        <template v-slot:eventContent='arg'>
          <b>⚽ {{ arg.event.title }}</b><br>
          <i>🕢 {{ arg.event.extendedProps.totalHours}} hours</i>
        </template>
      </full-calendar>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { format } from 'date-fns'
import Checkbox from 'primevue/checkbox';
import axios from 'axios'

export default {
  props: {
    getAllPitchesNameArr: {
      required: true
    },
    selectedClub: {
      required: true
    }
  },
  components: {
    FullCalendar,
    Checkbox
  },

  data() {
    const getClubId = JSON.parse(localStorage.getItem('sportClub'))
    const axiosConfig = {
      headers: {
        'x-access-token': localStorage.getItem('accessToken')
      }
    }
    return {
      getClubId,
      axiosConfig,
      celendarApi: null,
      calendarRef: null,
      calendarEventsByPitch: null,
      calendarEvents: null,
      isSelectedPitchNameChange: false,
      selectedEventTimein: null,
      selectedEventTimeout: null,
      bookingsLength: 0,
      calendarOptions: {
        height: 'auto',
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin
        ],
        headerToolbar: {
          left: 'listMonth timeGridDay,timeGridFourDay,timeGridWeek dayGridMonth',
          center: 'title',
          right: 'prev,next today'
        },
        initialView: 'timeGridWeek',
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        timeZone: 'GMT+7',
        navLinks: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        datesSet: this.handleDatesSet,
        firstDay: 1,
        eventTimeFormat: {
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'
        },
        views: {
          timeGridFourDay: {
            type: 'timeGrid',
            duration: { days: 4 },
            buttonText: '4 days'
          }
        },
        nowIndicator: true,
        businessHours: {
          daysOfWeek: [ 1, 2, 3, 4, 5, 6, 0 ],
          startTime: '7:00',
          endTime: '23:00'
        },
        slotMinTime: "7:00:00",
        eventMaxStack: 3,
        eventBackgroundColor: 'var(--blue)',
        eventDidMount: function(info) {
          if(info.event.extendedProps.user) {
            $(info.el).popover({
                delay: 50,
                title: '🧶 Booking Details',
                html: true,
                trigger: 'click',
                placement: 'auto',
                boundary: 'window',
                container: 'body',
                content: `<div class="popover-content"><ul><li><b>By:</b> ${Object.values(info.event.extendedProps.user)[1]}</li><li><b>Pitch Number:</b> ${info.event.extendedProps.pitchName}</li><li><b>Play Date:</b> ${info.event.extendedProps.playDate}</li><li><b>Time-In:</b> ${info.event.extendedProps.timeIn}</li><li><b>Time-Out:</b> ${info.event.extendedProps.timeOut}</li><li><b>Total Hours:</b> ${info.event.extendedProps.totalHours} hours</li><li><b>Match Finding:</b> ${info.event.extendedProps.matchFindingStatus}</li><li><b>Payment Amount:</b> $ ${info.event.extendedProps.paymentAmount.toFixed(2)}</li><li><b>Payment Status:</b> ${info.event.extendedProps.paymentStatus}</li></ul></div>`
            })
          }
        },
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      watchSelectedPitchName: [],
      selectedPitchesName: []
    }
  },
  watch: {
    selectedEventTimein(curValue, oldValue) {
      if(curValue) {
        this.$emit('isAddEventSelected', this.selectedEventTimein, this.selectedEventTimeout)
      }
    },
    selectedPitchesName(curValue, oldValue) {
      console.log(curValue)
      this.watchSelectedPitchName = curValue
      if (oldValue.length > 0 && curValue !== oldValue) {
        this.isSelectedPitchNameChange = true
      }
    },
    getAllPitchesNameArr(curValue) {
      this.selectedPitchesName = curValue
    },
    selectedClub(curValue) {
      this.getCalendarBookingsData(curValue.id)
    }
  },
  methods: {
    async getCalendarBookingsData(sportClubId) {
      const activeStart = format(new Date(this.calendarApi.currentData.viewApi.activeStart), 'yyyy-MM-dd')
      const activeEnd = format(new Date(this.calendarApi.currentData.viewApi.activeEnd), 'yyyy-MM-dd')

      await axios.get(`booking-details-calendar/${activeStart}/${activeEnd}/${sportClubId}`, this.axiosConfig)
      .then(res => {
        let initialEventsRes = res.data
        this.calendarEvents = initialEventsRes
        console.log(this.calendarEvents, initialEventsRes)
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.message)
        } else {
          console.log('Error: No response')
        }
      })
    },
    async handleDatesSet(dateInfo) {
      const startDate = format(new Date(dateInfo.start), 'yyyy-MM-dd')
      const endDate = format(new Date(dateInfo.end), 'yyyy-MM-dd')
      let sportClubId = null
      if (!this.isAdmin && this.getClubId && !this.selectedClub) {
        sportClubId = this.getClubId.id
      } if (this.isAdmin && !this.getClubId && this.selectedClub) {
        sportClubId = this.selectedClub.id
      }

      await axios.get(`booking-details-calendar/${startDate}/${endDate}/${sportClubId}`, this.axiosConfig)
      .then(res => {
        let newCalendarEvents = res.data
        this.calendarEventsByPitch = newCalendarEvents
        console.log(this.calendarEventsByPitch, newCalendarEvents)
        this.calendarApi.getEvents().forEach(event => event.remove())
        this.calendarEventsByPitch.forEach(event => this.calendarApi.addEvent(event))

        if (this.isSelectedPitchNameChange === true) {
          if (newCalendarEvents && newCalendarEvents.length > 0) {
            let filterEventByPitchName = newCalendarEvents.filter(booking => {
                if (this.watchSelectedPitchName && this.watchSelectedPitchName.length) {
                  for(var i = 0; i <= this.watchSelectedPitchName.length; i++) {
                    if(booking.extendedProps.pitchName === this.watchSelectedPitchName[i]) {
                      return booking
                  }
                }
              }
            })
            this.calendarApi.getEvents().forEach(event => event.remove())
            filterEventByPitchName.forEach(event => this.calendarApi.addEvent(event))
          }
        }
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.message)
          const error = new Error(err.response.data.message)
          throw error;
        } else {
          console.log('No response')
          throw 'No response!'
        }
      })
    },
    handleDateSelect(selectInfo) {
      console.log('selectInfo', selectInfo)
      this.selectedEventTimein = selectInfo.startStr
      this.selectedEventTimeout = selectInfo.endStr
    },

    handleEventClick(clickInfo) {
      $('.popover').addClass('animate__animated animate__fadeIn animate__faster')
    }
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('roles') === 'ROLE_ADMIN'
    }
  },
  created() {
    window.addEventListener('click', (e) => {
      const refDiv = document.getElementsByClassName('popover')
      if (refDiv[0]) {
        $('.popover').popover('hide');
      }
    })
  },
  mounted() {
    this.calendarApi = this.$refs.fullCalendar.getApi()
    this.calendarRef = this.$refs.fullCalendar

    if (!this.isAdmin) {
      this.getCalendarBookingsData(this.getClubId.id)
    }
  }
}
</script>

<style scoped>

h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b { /* used for event dates/times */
  margin-right: 3px;
}

.app {
  display: grid;
  grid-template-columns: 1fr 11fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  min-height: 100%;
  align-items: flex-start;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
  padding-bottom: 4em;
}

.app-main {
  flex-grow: 1;
  grid-area: 1 / 2 / 2 / 3;
}

.fc { /* the calendar root */
  max-width: 100%;
  margin: 0 auto;
}
.app-calendar-checkbox {
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  flex-direction: column;
  padding: 0 0em;
  margin-top: 4em;
}
.p-field-checkbox {
  display: flex;
  align-items: center;
}
.p-field-checkbox label {
  white-space: nowrap;
  padding-top: .7em;
}
.p-field-checkbox:checked label {
  font-weight: 600;
}
</style>
