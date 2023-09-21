<template>
  <AutoComplete
    v-model="selectedClub"
    :suggestions="filteredClub"
    @complete="searchClub($event)"
    :dropdown="true"
    field="name"
    forceSelection
    @clear="clearAutoComplete"
    @item-select="itemSelect($event)"
  >
    <template #item="slotProps">
      <div :class="slotProps.item.sport_club ? 'owned-club':''">
        ⚽ #{{ slotProps.item.id }}: <b>{{ slotProps.item.name }}</b> <span v-if="slotProps.item.sport_club">owned <b>{{ slotProps.item.sport_club.name }}</b></span>
      </div>
    </template>
  </AutoComplete>
</template>

<script>
import AutoComplete from 'primevue/autocomplete';

export default {
  props: ['getAllSportClubs', 'selected'],
  components: {
    AutoComplete
  },
  data() {
    return {
      selectedClub: this.selected ? this.selected : null,
      filteredClub: null
    }
  },
  watch: {
    selectedClub(curValue) {
      if (curValue && curValue.id) {
        this.$emit('emitSelectedClub', curValue)
      }
    }
  },
  methods: {
    searchClub(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
          this.filteredClub = [...this.getAllSportClubs.items];
        } else {
          this.filteredClub = this.getAllSportClubs.items.filter((club) => {
            return club.name.toLowerCase().startsWith(event.query.toLowerCase())
          })
        }
      }, 250)
    },
    clearAutoComplete() {
      this.$emit('clearAutoComplete')
      console.log('clear')
    },
    itemSelect(event) {
      if(event.value && event.value.sport_club) {
        this.toast(`${event.value.name} already owned a sportclub!`, 3000, 'error')
        this.selectedClub = null
        return
      }
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.owned-club {
  pointer-events: none;
  opacity: .5;
}
</style>