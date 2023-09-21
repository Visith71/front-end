<template>
  <div class="index-main">
    <div class="info">
    <div class="logo">
      <img src="../../assets/pitchbooker-logo.png" alt="pitchbooker-logo">
      <h1>PitchBooker</h1>
      <p>Administation's Dashboard</p>
    </div>
    <div class="form">
      <form id="submit-signin" @submit.prevent="handleLogin">
      <div class="form-input">
        <div>
        <label><img src="../../assets/icons/email-icon.png"></label>
        </div>
        <div>
        <input class="signin-input" type="email" required placeholder="admin-email..." v-model="email">
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
      </form>
      <button class="exit" @click="handleClickSignIn"><img src="../../assets/icons/google.png"> Google</button>
      <button form="submit-signin" class="login"><img src="../../assets/icons/login-icon.png"> Login</button>
    </div>
    </div>
    <div>
    
    </div>
  </div>
</template>

<script>
import { ref, inject, toRefs } from 'vue'
import axios from 'axios'

  export default {
    components: {
    },
    props: {
      msg: String
    },
    data() {
      return {
        user: ''
      }
    },
    setup(props) {
      const email = ref('')
      const password = ref('')

      const { isSignIn } = toRefs(props);
      const Vue3GoogleOauth = inject("Vue3GoogleOauth");
      const handleClickSignIn = () => {};

      return { email, password, isSignIn, handleClickSignIn, Vue3GoogleOauth }
    },
    methods: {
      async handleClickSignIn(){
        try {
          const googleUser = await this.$gAuth.signIn();
          if (!googleUser) {
            return null;
          }

          try {
            this.$store.dispatch('gAuthSignin', {
              idtoken: googleUser.getAuthResponse().id_token
            })
            this.toast("Welcome To PitchBooker 👏", 3000, 'successed')
            setTimeout(() => {
              this.$router.go()
            }, 1000)
            
          } catch (err) {
            console.log(err)
          }

          // console.log("googleUser", googleUser);
          // this.user = googleUser.getBasicProfile();
          // console.log(this.user)
          // console.log(this.user.getName())
          // console.log("getId", this.user);
          // console.log("getBasicProfile", googleUser.getBasicProfile());
          // console.log("getAuthResponse", googleUser.getAuthResponse());
          // console.log(
          //   "getAuthResponse",
          //   this.$gAuth.instance.currentUser.get().getAuthResponse()
          // );
        } catch (error) {
          //on fail do something
          console.error(error);
          return null;
        }
      },
      async handleLogin() {
        try {
          await this.$store.dispatch('signin', {
            email: this.email,
            password: this.password
          })

          this.toast("Welcome To PitchBooker 👏", 3000, 'successed')
          setTimeout(() =>{
            this.$router.go()
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
      isClubOwner() {
        return this.$store.getters.isAuthenticated;
      },
      isClubOwnerNoSportClub() {
        return this.$store.getters.isAuthenticatedAsClubOwnerNoSportClub;
      }
    }
    }
</script>

<style>
  .index-main .info .logo > img {
  height: 6em;
  }
  .form-input {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  }
  .form-input {
  margin-bottom: .5em;
  }
  label > img {
  margin-right: .5em;
  }
  .form-input input {
  width: 18em;
  padding: 0em 1em;
  }
  .index-main button {
  border-radius: 30px;
  height: 2.5em;
  padding: 0 1.5em;
  }
</style>