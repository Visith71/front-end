<template>
  <div class="support-main">
    <div class="new-booking-section">
      <div class="title-section">
        <div class="page-name">
          <img src="../assets/icons/support-icon.png" />
          <h1>Support</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: { },

  setup() {
  },
};
</script>

<style scoped>
.support-main {
  height: 60vh;
  width: 30vw;
  margin: 15vh auto;
  align-items: center;
  padding: 50px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.page-name {
  display: flex;
  align-items: center;
}
.page-name h1 {
  margin-left: 1vw;
}

@media only screen and (max-width: 768px) {
  .support-main {
    height: 70vh;
    width: 50vw;
  }
  .page-name {
    margin-left: -15px;
  }
}
</style>
