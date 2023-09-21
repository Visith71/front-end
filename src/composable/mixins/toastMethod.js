export const toastMethod = {
  methods: {
    toast(msg, duration, type) {
      const style = this.$toastStyles(duration, type)
      this.$toast(msg, style)
    },
  }
}