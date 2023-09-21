<template>
  <ConfirmDialog></ConfirmDialog>
  <div class="pitches-list">
    <ul>
      <li v-for="pitch in pitches.items" :key="pitch" class="pitch-list">
      <div class="pitch-num" @click="openPitch(pitch)">
        <p>{{ pitch.name }}</p>
      </div>
      <div class="pitch-desc" @click="openPitch(pitch)">
        <div class="created-at">
        <p>
          <strong>🧶 Created by: </strong> &nbsp;{{ pitch.sport_club.name }}
        </p>
        </div>
        <div class="short-desc">
        <p>{{ pitch.description }}</p>
        </div>
        <div class="created-by">
        <p><strong>🏁 Pitch size: </strong>{{ pitch.size }}</p>
        </div>
      </div>
      <div class="pitch-action">
        <div class="pitch-action-dub" @click="openDubPitch(pitch)">
          <h2 @click="openDubPitch(pitch)">⚡</h2>
        </div>
        <div class="pitch-action-edit" @click="openEditPitch(pitch)">
          <h2>🔨</h2>
        </div>
        <div class="pitch-action-delete" @click="deletePitch(pitch)">
          <h2>❌</h2>
        </div>
      </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { format } from 'date-fns'
import axios from 'axios'
import ModalView from '../main-component/ModalView.vue'
import ConfirmDialog from 'primevue/confirmdialog';

export default {
  props: ['pitches'],
 components: {
  ModalView,
  ConfirmDialog,
 },
 setup() {

  return {
    format
  }
 },
 methods: {
    openPitch(pitch) {
      this.$emit('openPitch', pitch)
    },
    openEditPitch(pitch) {
      this.$emit('openEditPitch', pitch)
    },
    openDubPitch(pitch) {
      this.$emit('openDubPitch', pitch)
    },
    async deletePitch(pitch) {
      this.$confirm.require({
        message: `Are you sure want to delete pitch ${pitch.name}?`,
        header: 'Pitch Delete Confirmation ⭕❗❕',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          axios.delete(`pitch-details/${pitch.id}`, {
            headers: {
              'x-access-token': `${localStorage.getItem('accessToken')}`
            }
          })
          .then(() => {
            this.toast('Pitch ' + pitch.name + ' has been deleted!', 3000, 'error')
            this.$confirm.close()
            this.$store.dispatch('pitches/getPitches', JSON.parse(localStorage.getItem('pitchesPagInfo')))
          }).catch(err => {
            if(err.response) {
              this.toast(err.response.data.message, 3000, 'error')
            } else {
              this.toast('Error: No Response!', 3000, 'error')
            }
          })
        },
        reject: () => {
          this.$confirm.close();
        }
      })
    }
  }
}
</script>

<style scoped>
.pitches-list {
  padding-bottom: 5em;
}
.pitches-list > ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  grid-gap: 3rem;
  list-style: none;
  padding-left: 0;
  width: 90%;
  margin: 0 auto;
}
.pitches-list > ul > li {
 background: #fff;
 box-shadow: 0px 5px 5px rgba(0,0,0,.05);
 border-radius: 20px;
 overflow: hidden;
}
.pitch-list {
 display: flex;
 align-items: center;
 justify-content: space-between;
 cursor: pointer;
 transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pitch-list:hover {
  transform: scale(1.07);
}
.pitch-num {
  display: flex;
  align-items: center;
  padding: 1.1em .4em;
  height: auto;
 /* background: #fdfdfd; */
  font-size: 3em;
  font-weight: 600;
  box-shadow: inset 0px 5px 10px rgba(0,0,0,.1);
 /* border-right: 2px solid var(--black); */
}
.pitch-desc {
  padding: 1em 1em;
  width: 80%;
  overflow: hidden;
}
.short-desc {
  padding: .4em 0;
  font-size: 1.1em;
}
.short-desc p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.pitch-action {
  /* background: #fdfdfd; */
  height: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  text-align: center;
 /* background: #fdfdfd; */
 border-left: 2px solid var(--black);
  /* padding: 1em 0; */
}
.pitch-action div:nth-child(2) {
  border-top: 2px solid var(--black);
  border-bottom: 2px solid var(--black);
}
.pitch-action div {
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 33.33%;
  justify-content: center;
  padding: .5em;
}
.pitch-action div:hover {
 box-shadow: inset 0px 5px 10px rgba(0,0,0,.1);
}
.created-by p {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>