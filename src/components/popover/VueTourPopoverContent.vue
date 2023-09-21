<template>
  <div
    class="vue-tour-popover-content"
    ref="vueTourPopoverContent"
    tabindex="-1"
    @keydown.enter="proceedToNextStep"
    @keydown.esc="closePopover"
  >
    <div class="vue-tour-popover-content__header">
      <p>Welcome to Vue Tour!</p>
    </div>
    {{ currentDescription }}
    <div class="vue-tour-popover-content__actions">
      <button
        class="vue-tour-popover-content__button"
        :class="{ 'hidden' : step === 0 }"
        @click="backToPreviousStep"
      >Previous</button>
      
      <button
        class="vue-tour-popover-content__button"
        @click="proceedToNextStep"
      >{{ nextButtonLabel }}</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      descriptions: [
        "Vue is Awesome!",
        "#1 - Component data must be a function",
        "#2 - Prop definitions should be as detailed as possible",
        "#3 - Always use key with v-for",
        "#4 - Never use v-if on the same element as v-for"
      ],
      step: 0
    };
  },

  computed: {
    currentDescription() {
      return this.descriptions[this.step];
    },

    isLastStep() {
      return this.step === this.descriptions.length - 1;
    },

    nextButtonLabel() {
      return this.isLastStep ? "Finish tour" : "Next";
    }
  },

  methods: {
    backToPreviousStep() {
      this.step--;
    },

    closePopover() {
      this.$emit("closePopover");
    },

    proceedToNextStep() {
      if (this.isLastStep) {
        this.closePopover();
      } else {
        this.step++;
      }
    }
  },

  mounted() {
    this.$refs.vueTourPopoverContent.focus();
  }
};
</script>


<style scoped>
.vue-tour-popover-content {
	 display: flex;
	 flex-direction: column;
	 align-items: center;
	 width: 400px;
}
 .vue-tour-popover-content__header {
	 width: 100%;
	 border-bottom: solid 1px #000;
	 margin-bottom: 20px;
}
 .vue-tour-popover-content__actions {
	 display: flex;
	 justify-content: space-around;
	 width: 100%;
	 margin: 40px 0 20px;
}
 .vue-tour-popover-content__button {
	 background-color: #41b883;
	 border: none;
	 color: white;
	 padding: 15px 32px;
	 text-align: center;
	 text-decoration: none;
	 display: inline-block;
	 font-size: 16px;
	 border-radius: 4px;
}
 .vue-tour-popover-content__button.hidden {
	 visibility: hidden;
}
 
</style>
