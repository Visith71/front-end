<template>
  <div class="container">
    <div class="form">
      <div v-if="showSignin" class="index-form">
        <SigninForm />
        <span id="index-span" @click="showSignin = false">Create a new account?</span>
      </div>
      <div v-else class="index-form">
        <SignupForm />
        <span id="index-span" @click="showSignin = true">Already have an account?</span>
      </div>
    </div>
    <div class="img">
      <img src="../assets/futsal-field-login.png">
    </div>
  </div>

</template>

<script>
import SignupForm from '@/components/authentication/SignupForm.vue'
import SigninForm from '@/components/authentication/SigninForm.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  components: {
    SigninForm,
    SignupForm,
  },
  // data() {
  //   return {
  //     showSignin: true
  //   }
  // },
  setup() {
    const showSignin = ref(true)
    const router = useRouter()


    return { showSignin }
  }
}
</script>

<style>
.container {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  grid-template-rows: 1fr;
  height: 100vh;
  width: 100%;
  align-items: center;
  overflow: hidden;
}
.img {
  grid-area: 1 / 2 / 2 / 3;
  justify-items: flex-start;
}
.img img {
  width: 80%;
}
.form {
  grid-area: 1 / 1 / 2 / 2;
  
}
.index-form {
  width: 50%;
  margin-left: 35%;
}
@media only screen and (max-width: 768px) {
  .img {
    display: none;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
  .index-form {
    margin-left: 20vw;
  }

}
</style>
