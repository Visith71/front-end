<template>
  <div class="modal">
    <div :class="overlay" class="overlay" @click="closeModal"></div>
    <div class="modal-card animate__animated animate__fadeIn animate__faster" :class="mode">
      <slot />
    </div>
  </div>
</template>

<script>
import { enableScroll, disableScroll } from '../../composable/bodyScroll'
export default {
  setup(props, {emit}) {
    return {
      emit
    }
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    overlay: {
      type: String,
      required: false,
      default: null
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
      const bodyRefClass = document.body.classList
      if (bodyRefClass.contains('no-scroll')) {
        bodyRefClass.remove('no-scroll')
      }
    }
  },
  mounted() {
    disableScroll()
  },
  beforeUnmount() {
    enableScroll()
  }
}
</script>

<style>
.overlay {
  width: 100%;
  position: fixed !important;
  left: 0;
  top: 0;
  opacity: 0.1;
  background-color: black;
  height: 100%;
  z-index: 1000;
}
.modal-card {
  position: fixed;
  width: 60%;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  padding: 2em;
  background-color: white;
  max-height: 80vh;
  overflow: auto;
  z-index: 1001;
  opacity: 1;
  border-radius: 10px;
}
.wide-modal-card {
  width: 65%;
}
.up-overlay {
  top: -15%;
}
.pitches-overlay {
  top: -10.5%;
  height: 100vh;
}
.edit-user-overlay {
  top: -15%;
  height: 110vh;
}
.open-user-overlay {
  top: -10.5%;
}
.up-modal-card {
  top: 27.5%;
  max-height: 70%;
}
.wide-height {
  top: 35%;
  max-height: 90%;
}
.pitch-modal,
.add-user-modal {
  max-height: 90%;
  top: 50%;
}
.open-user-modal {
  top: 22.5%;
}
.edit-user-modal {
  max-height: 90%;
  top: 24%;
}
.transaction-overlay {
  height: 100vh;
  top: -17.5%;
}
.transaction-modal {
  top: 27.5%;
  width: 70%;
}
/* Email Modal */

.email-display {
  text-align: left;
}
.sport-club-modal-card {
  width: 85%;
  top: 50%;
}

</style>