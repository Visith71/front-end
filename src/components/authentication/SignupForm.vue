<template>
 <div class="index-main">
  <div class="info">
   <div class="logo">
    <img src="../../assets/pitchbooker-logo.png" alt="pitchbooker-logo">
    <h1>PitchBooker</h1>
    <p>Administation's Dashboard</p>
   </div>
   <div class="form">
    <div v-if="error">
     <div class="signin-fail">
      <p>{{ error }}</p>
     </div>
    </div>

    <form id="submit-form" @submit.prevent="handleSignup">
     <div class="form-input">
      <div>
       <label><img src="../../assets/icons/pitch-icon.png"></label>
      </div>
      <div>
       <input class="signin-input" type="text" required placeholder="Firstname..." v-model="firstName">
      </div>
     </div>
     <div class="form-input">
      <div>
       <label><img src="../../assets/icons/pitch-icon.png"></label>
      </div>
      <div>
       <input class="signin-input" type="text" required placeholder="Lastname..." v-model="lastName">
      </div>
     </div>
     <div class="form-input">
      <div>
       <label><img src="../../assets/icons/email-icon.png"></label>
      </div>
      <div>
       <input class="signin-input" type="email" required placeholder="Email..." v-model="email">
      </div>
     </div>

     <div class="form-input">
      <div>
       <label><img src="../../assets/icons/password-icon.png"></label>
      </div>
      <div>
       <input class="signin-input" type="password" required placeholder="password..." v-model="password">
      </div>
     </div>

     <div class="form-input">
      <div>
       <label><img src="../../assets/icons/phone-number-icon.png"></label>
      </div>
      <div>
       <input class="signin-input" type="tel" required placeholder="phone number..." v-model="phone_number">
      </div>
     </div>

     <div class="form-input accepted-input">
      <div>
       <label><a href="https://google.com" target="_blank">Term and Condition Policy</a></label>
      </div>
      <div>
       <input class="accepted" type="checkbox" required v-model="accepted">
      </div>
     </div>
    </form>
    <button class="exit" @click="closeWindow"><img src="../../assets/icons/exit-icon.png"> Exit</button>
    <button form="submit-form" class="login"><img src="../../assets/icons/register-icon.png"> Register</button>
    <!-- <button form="submit-form" class="login" @click="handleClickSignIn"><img src="../../assets/icons/register-icon.png">Google</button> -->
   </div>
  </div>
 </div>
</template>

<script>
import { ref, inject, toRefs } from 'vue'
import axios from 'axios'

export default {
  props: {
    msg: String,
  },
  setup(props) {
    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const password = ref('')
    const phone_number = ref('')
    const accepted = ref(false)
    const showFail = ref(false)

  //  const handleSubmit = async () => {
  //   await signup(displayName.value, email.value, password.value, phoneNumber.value)
  //   if (!error.value) {
  //    context.emit('signup')
  //   }
  //  }

    return { 
      firstName, 
      lastName, 
      email, 
      password, 
      showFail, 
      phone_number, 
      accepted
    }

  },
  data() {
    return {
      // user: ''
    }
  },
  methods: {
    async handleSignup() {
      try {
        await this.$store.dispatch('signup', {
          first_name: this.firstName,
          last_name: this.lastName,
          password: this.password,
          phone_number: this.phone_number,
          email: this.email,
          accepted: this.accepted
        })

        this.toast("User Signed Up 👏 Check your email for verification!", 3000, 'successed')
        setTimeout(() =>{
          this.$router.go('')
        }, 1000)
      } catch (err) {
        this.toast(err, 3000, 'error')
      }
    },
    closeWindow() {
      if (confirm("Are you sure want to exit PitchBooker Dashboard?")) {
        close();
      }
    }
  },
  computed: {
  }
  }
</script>

<style scoped>
.accepted {
  width: auto;
}
.accepted-input a {
  font-style: italic;
  font-weight: 600;
  color: var(--black);
  text-decoration: none;
}
.accepted {
  height: 3em;
  width: 2em;
}
.accepted-input {
  width: 100%;
  justify-content: space-around;
  align-items: center;
}
</style>