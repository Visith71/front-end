<template>
  <div class="parent">
    <div
      @mouseover="mouseOver()"
      @mouseleave="mouseLeave()"
      class="app-left-section"
      v-if="!['index'].includes($route.name) && !['CreateSportClub'].includes($route.name) && !isNotDesktopView"
    >
      <div class="appNavigation">
        <AppNavigation :clubInfo="clubInfo" />
      </div>
    </div>
    <div
      class="app-right-section"
      :class="{ 'main-section': !showNav, 'main-section-back': showNav }"
      v-if="!isNotDesktopView"
    >
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <router-view />
      </transition>

      <!-- Notification bell -->
      <img id="notification" src="./assets/icons/notification-icon.png" @click="showNotification = !showNotification" 
      :class="unreadBookings ? 'animate__animated animate__swing animate__infinite':''" v-if="!['index'].includes($route.name) && !['CreateSportClub'].includes($route.name)"/>

      <!-- Notification length -->
      <div class="notification-length" :class="unreadBookings ? 'notification-length animate__animated animate__pulse animate__infinite':'notification-length'"
      @click="showNotification = !showNotification"
      v-if="unreadBookings && !['index'].includes($route.name) && !['CreateSportClub'].includes($route.name)">
        <span>{{ unreadBookings.length }}</span>
      </div>

      <!-- Notification layout components -->
      <transition mode="out-in"
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut animate__faster">
        <div class="notification-comp" v-if="showNotification && !['index'].includes($route.name) && !['CreateSportClub'].includes($route.name)">
          <Notification :bookings="notificationBookings.items" />
        </div>
      </transition>
    </div>
    <!-- tablet-mobile-responsive-view -->
    <transition 
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        class="responsive-view-main"
        v-if="isNotDesktopView"
      >
        <div class="responsive-view-inner">
          <div class="inner-view-title">
            <img
              src="./assets/kaktarang-logo-svg.svg"
              alt="kaktarang-logo"
            >
            <h1>KakTarang</h1>
          </div>
          <h1 class="innner-view-detial-h1">👋 Tablet and Mobile view<br>will be here to serve you soon. 😉🎉</h1>
        </div>
      </div>
    </transition>

    <!-- scroll-to-top component -->
    <ScrollTop :threshold="200" v-if="!['index'].includes($route.name) && !['CreateSportClub'].includes($route.name)" />
  </div>
</template>

<script>
import { ref } from "vue";
import AppNavigation from "./components/main-component/AppNavigation-V2.vue";
import Notification from './components/notification/Notification.vue'
import ScrollTop from 'primevue/scrolltop';
import { windowResize } from "./composable/mixins/windowResize";

export default {
  mixins: [windowResize],
  components: { 
    AppNavigation, 
    Notification,
    ScrollTop
  },
  setup() {
    const showNav = ref(true);
    const showNotification = ref(false)

    return { showNav, showNotification };
  },
  data () {
    return {
      isNotDesktopView: false
    }
  },
  methods: {
    mouseOver() {
      this.showNav = true;
    },
    mouseLeave() {
      this.showNav = false;
    },
    handleView() {
      this.showNav = window.innerWidth <= 1366;
    },
    onResize () {
      if (window.innerWidth <= 1200) {
        this.isNotDesktopView = true
      } else {
        this.isNotDesktopView = false
      }
    }
  },
  created() {
    this.handleView();
    window.addEventListener("resize", this.handleView);
    this.$store.dispatch('bookings/getBookingsNotification', {
      page: 1,
      itemsPerPage: 20
    });

    this.$store.dispatch('autoLogin');
    this.$store.dispatch('sportClubs/getActiceSportClub')

    const getActiveUserId = localStorage.getItem('id')
    if (getActiveUserId) {
      this.$store.dispatch('users/getUserById', getActiveUserId)
    }
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace('/');
      }
    }
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
    isOwnedSportClub() {
      return this.$store.getters.isAuthenticatedAsClubOwner;
    },
    notificationBookings() {
      return this.$store.getters['bookings/notificationBookings']
    },
    unreadBookings() {
      return this.notificationBookings && this.notificationBookings.items ? this.notificationBookings.items.filter((booking) => {
        return booking.read.toString() === 'false'
      }) : null
    },
    clubInfo() {
      return this.$store.getters['sportClubs/clubInfo']
    }
  }
};
</script>

<style>
.parent {
  display: flex;
  align-items: center;
  /* overflow-x: hidden; */
  justify-content: space-between;
  position: relative;
}
.app-left-section {
  z-index: 1;
  position: fixed;
}
.app-right-section {
  /* height: auto; */
  justify-content: center;
  position: relative;
  /* overflow-y: scroll;
  top: 0;
  width: 100%;
  right: 0;
  position: absolute; */
}
.notification-length {
  position: absolute;
  z-index: 100;
  top: 1.7em;
  right: 1.7em;
  width: 1.4em;
  height: 1.4em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--red);
  cursor: pointer;
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.notification-length span {
  font-size: .7em;
  font-weight: 700;
  color: var(--red);
  margin-top: -.1em;
}

#notification {
  top: 2em;
  right: 2em;
  width: 2em;
  height: 2em;
  position: absolute;
}
.notification-comp {
  position: absolute;
  top: 5em;
  right: 3em;
  max-height: 35em;
  overflow-y: auto;
}

html {
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  font-family: "Titillium Web", sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box; 
  margin: 0;
}

.mobile-view-nav {
  left: 50rem;
  transform: translateX(-11vw);
  transition: 1.5s transform cubic-bezier(0, 0.12, 0.14, 1);
}

.mobile-view-nav-back {
  transition: 0.5s transform cubic-bezier(0, 0.12, 0.14, 1);
}

/* durations and timing functions.*/
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(0.13, 0.54, 0.7, 1.08);
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}

.main-section {
  transform: translateX(5%);
  width: 95%;
  left: 0;
  transition: .5s transform cubic-bezier(0, 0.12, 0.14, 1);
}

.main-section-back {
  transform: translateX(17%);
  width: 85%;
  left: 0;
  transition: .5s transform cubic-bezier(0, 0.12, 0.14, 1);
}

.to-top {
  position: fixed;
  bottom: 2em;
  right: 2em;
  z-index: 1000;
}
.to-top-button {
  background: none;
  border: none;
  cursor: pointer;
}
.to-top-button img{
  width: 4em;
  height: auto;
  filter: drop-shadow(-5px 5px 0 rgba(0,0,0,0.2));
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.to-top-button img:hover {
  transform: scale(1.1) rotate(-10deg) translateY(-15px);
}

/* tablet-mobile-responsive-styles */
.responsive-view-main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  background: var(--white);
}
.responsive-view-inner,
.inner-view-title {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.responsive-view-inner {
  width: 100%;
  height: 100%;
}
.inner-view-title {
  flex-direction: row;
}
.inner-view-title img {
  height: 100px;
  margin-right: 40px;
}
.innner-view-detial-h1 {
  font-size: 6vh;
  margin-top: 40px;
  text-align: center;
}
</style>
