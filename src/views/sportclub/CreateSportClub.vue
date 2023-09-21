<template>
  <div class="main create-sport-club-main">
    <div class="logout">
      <button @click="logout">🚀</button>
    </div>
    <div class="create-sport-club-section create-sport-club-section01">
      <div class="pitchbooker-title">
        <img src="../../assets/icons/PtchBooker-logo.svg">
        <h3>PitchBooker</h3>
      </div>
      <transition :name="animateName">
      <div class="create-sport-club-section-body create-sport-club-section01-body"
      v-if="slideNum === 0">
        <h1><span>Good {{ getDayPart }},</span> {{ getUserInfo.username }} 🤗</h1>
        <h1>Welcome to PitchBooker 👋</h1>
        <img src="../../assets/images/urban-line-496.svg">
      </div>
      </transition>

      <transition :name="animateName">
      <div class="create-sport-club-section-body create-sport-club-section02-body"
      v-show="slideNum === 1">
        <h1><span>Now let's create your,</span> Sport Club 🤘</h1>

        <div class="sport-club-form">
          <transition :name="inputAnimate">
              <input 
                type="text" 
                v-model="clubName" 
                :placeholder="enterClubPH" 
                @keyup.enter="nextInput($event)"
                @keydown="checkClubNameInput($event)" 
                v-show="inputNum === 0"
                ref="clubName">
          </transition>
        
          <transition :name="inputAnimate">
              <input 
                type="text" 
                v-model="clubDesc" 
                :placeholder="enterDescPH" 
                @keyup.enter="nextInput($event)"
                @keydown="checkClubDescInput($event)" 
                v-show="inputNum === 1"
                ref="clubDesc">
          </transition>
        </div>

        <div class="input-slide-active">
          <div 
            @click="backInput" 
            :class="inputNum == 0 ? 'active-input':''"
            ref="slideActiveOne"></div>
          <div 
            @click="clickNextInput" 
            :class="inputNum == 1 ? 'active-input':''"
            ref="slideActiveTwo"></div>
        </div>
        
        <!-- <h2>Enter Your Sport Club Name...👆</h2> -->
      </div>
      </transition>

      <transition :name="animateName">
      <div class="create-sport-club-section-body create-sport-club-section03-body"
      v-show="slideNum === 2">
        <div class="club-location">
          <h1>🌍 Club's Location</h1>
          <div class="map-location">
            <div class="location-input">
              <input 
                type="text"
                :placeholder="locationPH"
                v-model="address"
                ref="autocomplete"
                @keyup="getLocaInput($event)"
                @keydown="locationInputKey($event)" >
              <button @click="locatorButtonPressed">📍</button>
              <!-- <button>Go</button> -->
            </div>
            <section id="map" ref="map"></section>
            <transition 
            mode="out-in"
            enter-active-class="animate__animated animate__fadeInUp animate__faster"
            leave-active-class="animate__animated animate__fadeOutDown animate__faster">
            <p class="show-location-address" v-if="clubAddress.formatted_address && address">{{ address }}</p>
            </transition>
            <transition 
            mode="out-in"
            enter-active-class="animate__animated animate__fadeInUp animate__faster"
            leave-active-class="animate__animated animate__fadeOutDown animate__faster">
            <p class="show-location-address" v-if="(clubAddress.name) && (!clubAddress.formatted_address) && address">{{ clubAddress.name }}</p>
            </transition>
          </div>
        </div>
        <div class="club-profile">
          <h1>🧐 Club's Profile</h1>
          <div class="profile">
            <input type="file" 
            class="custom-file-input"
            @change="handleFiles"
            id="file"
            ref="profile"
            name="file"
            >
            <p class="error-file" v-if="fileError">{{ fileError }}</p>
            <div class="preview animate__animated animate__fadeIn">
              <img class="is-preview" v-if="previewUrl" :src="previewUrl">
              <img v-else src="../../assets/images/icons8-image.svg" class="no-preview">
            </div>
          </div>
        </div>
      </div>
      </transition>

      <div class="submit-form-button"
      v-if="slideNum == 2">
        <button @click="handleSubmitClub">Submit Sport Club 👌</button>
      </div>

      <!-- <form ref="form">
        <label for="name">Name:</label>
              <input 
                type="text"
                placeholder="Enter your address..."
                v-model="location"
                ref="autocomplete" >
      </form> -->

      <div class="back-forte">
        <div class="back-button" @click="backSlide()" :class="slideNum === 0 ? 'disabled-click':''">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          width="36" height="36"
          viewBox="0 0 24 24"
          style=" fill:#000000;">
          <path d="M10.121,14.121c0.586-0.586,6.414-6.414,7-7c1.172-1.172,1.172-3.071,0-4.243	c-1.172-1.172-3.071-1.172-4.243,0c-0.586,0.586-6.414,6.414-7,7c-1.172,1.172-1.172,3.071,0,4.243	C7.05,15.293,8.95,15.293,10.121,14.121z" opacity=".35"></path><path d="M5.879,14.121c0.586,0.586,6.414,6.414,7,7c1.172,1.172,3.071,1.172,4.243,0c1.172-1.172,1.172-3.071,0-4.243	c-0.586-0.586-6.414-6.414-7-7c-1.172-1.172-3.071-1.172-4.243,0C4.707,11.05,4.707,12.95,5.879,14.121z"></path>
          </svg>
        </div>
        <div class="front-button" ref="next" @click="nextSlide($event)" :class="slideNum === 2 ? 'disabled-click':''">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          width="36" height="36"
          viewBox="0 0 24 24"
          style=" fill:#000000;">
          <path d="M10.121,14.121c0.586-0.586,6.414-6.414,7-7c1.172-1.172,1.172-3.071,0-4.243	c-1.172-1.172-3.071-1.172-4.243,0c-0.586,0.586-6.414,6.414-7,7c-1.172,1.172-1.172,3.071,0,4.243	C7.05,15.293,8.95,15.293,10.121,14.121z" opacity=".35"></path><path d="M5.879,14.121c0.586,0.586,6.414,6.414,7,7c1.172,1.172,3.071,1.172,4.243,0c1.172-1.172,1.172-3.071,0-4.243	c-0.586-0.586-6.414-6.414-7-7c-1.172-1.172-3.071-1.172-4.243,0C4.707,11.05,4.707,12.95,5.879,14.121z"></path>
          </svg>
        </div>
      </div>
    </div>
    <div v-if="registerSuccessed">
      <Particles
        id="tsparticles"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="{
          background: {
            color: {
              value: ''
            }
          },
          fulllScreen: {
            enable: true
          },
          particles: {
            bounce: {
              horizontal: {
                value: 0
              },
              vertical: {
                value: 0
              }
            },
            color: {
              value: ['#1E00FF',
                      '#FF0061',
                      '#E1FF00',
                      '#00FF9E'],
              animation: {
                h: {
                  enable: true,
                  speed: 30
                }
              }
            },
            move: {
              decay: 0.1,
              direction: 'top',
              enable: true,
              gravity: {
                enable: true,
                maxSpeed: 200
              },
              outModes: {
                default: 'destroy',
                bottom: 'bounce',
                left: 'destroy',
                tight: 'destroy',
                top: 'none'
              },
              speed: {
                min: 50,
                max: 150
              }
            },
            number: {
              limit: 300,
              value: 0
            },
            opacity: {
              animation: {
                speed: 0.3,
                sync: true,
                destroy: 'min',
                startValue: 'max'
              }
            },
            roll: {
              darken: {
                enable: true,
                value: 30
              },
              enable: true,
              enlighten: {
                enable: true,
                value: 30
              },
              speed: {
                min: 15,
                max: 25
              }
            },
            rotate: {
              value: {
                min: 15,
                max: 25
              }
            },
            rotate: {
              value: {
                min: 0,
                max: 360
              },
              animation: {
                enable: true,
                speed: 60
              },
              direction: 'random'
            },
            shape: {
              options: {
                polygon: [
                {
                  sides: 5
                },
                {
                  sides: 6
                }
                ],
                character: [
                  {
                    value: [
                      '💩',
                      '🤡',
                      '🍀',
                      '🍙'
                    ]
                  }
                ]
              },
              type: [
                'circle',
                'square',
                'polygon',
                'character',
                'character',
                'character'
              ]
            },
            tilt: {
              value: {
                min: 0,
                max: 360
              },
              animation: {
                enable: true,
                speed: 60
              },
              direction: 'random',
              enable: true
            },
            wobble: {
              distance: 30,
              enable: true,
              speed: {
                min: -15,
                max: 15
              }
            }
          },
          emitters: {
            autoPlay: true,
            life: {},
            rate: {
              quantity: 10,
              delay: 0.1
            },
            size: {
              mode: 'percent',
              height: 0,
              width: 0
            },
            position: {
              x: 50,
              y: 100
            }
          }
        }"
      >
      </Particles>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import axios from 'axios'
import { ref } from '@vue/reactivity';

export default {
  setup() {
    const fileError = ref(null)
    const clubProfile = ref(null)
    const previewUrl = ref(null)

    const fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']
    const maxSize = 50000000;
    const tooLarge = clubProfile.size > maxSize;

    const handleFiles = (e) => {
      const selected = e.target.files[0]
      if (selected && fileTypes.includes(selected.type) && !tooLarge) {
        clubProfile.value = selected
        previewUrl.value = URL.createObjectURL(selected)
        fileError.value = null
        document.getElementById('file').classList.remove('custom-invalid-input')
      } else {
        clubProfile.value = null
        fileError.value = tooLarge ? `Max File Size: ${maxSize/100000}Mb!`:`.jpeg .jpg .png .svg File Only!`
      }
      clubProfile.value = e.target.files[0]
    }

    return { format, handleFiles, fileError, clubProfile, previewUrl }
  },
  computed: {
    getDayPart() {
      var p = format(new Date(), 'BBBB').split(" ");
      return p[p.length - 1]
    },
    getUserInfo() {
      return this.$store.getters.getUserInfo
    },
    registerSportClub() {
      return this.$store.getters['sportClubs/registerSportClub']
    }
    // getLocationRef() {
    //   return this.$refs.autocomplete
    // }
  },
  data() {
    return {
      slideNum: 0,
      inputNum: 0,
      animateName: '',
      inputAnimate: '',
      clubName: '',
      clubDesc: '',
      enterClubPH: "Enter Club's Name...",
      enterDescPH: "Enter Club's Description...",
      address: '',
      error: '',
      clubAddress: {},
      autofocus: 'true',
      locationPH: 'Enter your address...',
      registerSuccessed: false
    }
  },
  methods: {
    backSlide() {
      if(this.slideNum > 0) {
        this.slideNum--
        this.animateName = 'slide-back'
        if(this.slideNum == 1 && this.inputNum == 0) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.clubName.focus();
          }, 800)
        })
        } else {
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.clubDesc.focus()
            }, 800)
          })
        }
      } else {
        return
      }
    },
    nextSlide(e) {
      if(this.slideNum < 2) {
        this.slideNum++
        this.animateName = 'slide-next'
        if(this.slideNum == 2) {
          if(!this.clubName) {
            this.$refs.next.classList.add('disabled-next')
            this.slideNum = 1
            this.inputNum = 0
            this.$refs.clubName.classList.add('invalid-input')
            this.$refs.slideActiveOne.classList.add('invalid-slide-num')
            this.enterClubPH = "Club's Name Can't Be Empty..."
          } else if(!this.clubDesc) {
            this.$refs.next.classList.add('disabled-next')
            this.slideNum = 1
            this.inputNum = 1
            this.$refs.clubDesc.classList.add('invalid-input')
            this.$refs.slideActiveTwo.classList.add('invalid-slide-num')
            this.enterDescPH = "Description Must Be Enter..."
          }
        }
        if(this.slideNum == 1) {
          if(this.inputNum == 0) {
            this.$nextTick(() => {
              setTimeout(() => {
                this.$refs.clubName.focus();
              }, 800)
          })
          } if(this.inputNum == 1) {
          this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.clubDesc.focus();
          }, 800)
        })
        }} 
      } else {
        return
      }
    },
    backInput() {
      if(this.inputNum > 0) {
        this.inputNum--
        this.inputAnimate = 'input-slide-back'
        if(this.inputNum == 0) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.clubName.focus();
          }, 800)
        })
      } 
      } else {
        return
      }
    },
    clickNextInput() {
      if(this.inputNum < 1) {
        this.inputNum++
        this.inputAnimate = 'input-slide-next'
        if(this.inputNum == 1) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.clubDesc.focus();
          }, 800)
        })
      } 
      } else {
        return
      }
    },
    checkClubNameInput(e) {
      if(e.target.value.length == 0) {
        this.$refs.next.classList.remove('disabled-next')
        this.$refs.clubName.classList.remove('invalid-input')
        this.$refs.slideActiveOne.classList.remove('invalid-slide-num')
      }
    },
    checkClubDescInput(e) {
      if(e.target.value.length == 0) {
        this.$refs.next.classList.remove('disabled-next')
        this.$refs.clubDesc.classList.remove('invalid-input')
        this.$refs.slideActiveTwo.classList.remove('invalid-slide-num')
      }
    },
    getLocaInput(e) {
      if(!e.target.value) {
        this.clubAddress = []
      }
    },
    locationInputKey(e) {
      this.$refs.autocomplete.classList.remove('invalid-input')
    },
    nextInput(e) {
      if(this.inputNum < 1) {
        this.inputNum++
        this.inputAnimate = 'input-slide-next'
        if(this.slideNum == 1 && this.inputNum == 1) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.clubDesc.focus();
          }, 800)
        })
      }
      } else {
          if(!this.clubName) {
            this.$refs.next.classList.add('disabled-next')
            this.inputNum = 0
            this.$refs.clubName.classList.add('invalid-input')
            this.$refs.slideActiveOne.classList.add('invalid-slide-num')
            this.enterClubPH = "Club's Name Can't Be Empty..."
            this.$nextTick(() => {
              setTimeout(() => {
                this.$refs.clubName.focus();
              }, 800)
            })
          } else if(!this.clubDesc) {
            this.$refs.next.classList.add('disabled-next')
            this.inputNum = 1
            this.$refs.clubDesc.classList.add('invalid-input')
            this.$refs.slideActiveTwo.classList.add('invalid-slide-num')
            this.enterDescPH = "Description Must Be Enter..."
            this.$nextTick(() => {
              setTimeout(() => {
                this.$refs.clubDesc.focus();
              }, 800)
            })
          } else {
            this.slideNum++
            e.preventDefault()
          }
      }
    },
    logout() {
      try {
        this.$store.dispatch('logout');

        this.toast("User logged out 👏 See you again soon.", 3000, 'successed')
        setTimeout(() =>{
          this.$router.replace('/')
        }, 0)
      } catch (err) {
        this.toast('Could not log user out 🙏', 3000, 'error')
      }
    },
    async handleSubmitClub() {
      if(Object.keys(this.clubAddress).length === 0) {
        this.$refs.autocomplete.classList.add('invalid-input')
        this.locationPH = 'Enter or Select a Location...'
        this.$refs.autocomplete.focus()
        this.toast('Please Select a Location 🙏', 3000, 'error')
        return
      } else if (!this.clubProfile) {
        this.$refs.profile.classList.add('custom-invalid-input')
        this.toast('Please Select a Profile Image 🙏', 3000, 'error')
        return
      }
      if(this.clubName && this.clubDesc && this.clubAddress && this.clubProfile) {
        await this.$store.dispatch("sportClubs/registerSportClub", {
          name: this.clubName,
          description: this.clubDesc,
          locationUrl: {
            icon: this.clubAddress.icon || null,
            name: this.clubAddress.name || null,
            address: this.clubAddress.adr_address || null,
            geometry: this.clubAddress.geometry || null,
            phone_number: this.clubAddress.formatted_phone_number || null,
            formatted_address: this.clubAddress.formatted_address || null,
            url: this.clubAddress.url || null,
            address_components: this.clubAddress.address_components || null
          },
          clubProfile: this.clubProfile
        })
        .then(() => {
          this.toast(`Congratulation, Sport Club Has Been Created 👏`, 3000, 'successed')
          this.registerSuccessed = true
          setTimeout(() => {
            this.$router.go()
          }, 5000)
        })
      } else {
        return
      }
    },
    locatorButtonPressed() {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords.latitude, position.coords.longitude)
            this.getAddressFrom(
              position.coords.latitude,
              position.coords.longitude
            );

            this.showLocationOnTheMap(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            this.error =
              "Locator is unable to find your address. Please type your address manually. 🙏";
              this.toast("Locator is unable to find your address. Please type your address manually. 🙏 " + error.message, 3000, 'error')
          }
        );
      } else {
        this.error = error.message;
        this.toast("Your browser does not support geolocation API. " + error.message, 3000, 'error')
      }
    },
    getAddressFrom(lat, long) {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=AIzaSyAiouz3LHkREF-0ANqAQPN-wkYCUe0hl1M"
        )
        .then((response) => {
          if (response.data.error_message) {
            this.error = response.data.error_message;
              this.toast(response.data.error_message, 3000, 'error')
          } else {
            this.address = response.data.results[0].formatted_address;
            console.log(response.data.results[0].formatted_address);
          }
        })
        .catch((error) => {
          this.error = error.message;
            this.toast(error.message, 3000, 'error')
        });
    },

    showLocationOnTheMap(latitude, longitude) {
      // Show & center the Map based oon
      var map = new google.maps.Map(this.$refs.map, {
        zoom: 15,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
      });
    },
  },
  mounted() {
    let onKeydown = (e) => {
      if(e.key === 'ArrowLeft') {
        return this.backSlide()
      } else if(e.key === 'ArrowRight') {
        return this.nextSlide()
      }
    }
    window.addEventListener('keydown', onKeydown)

    this.showLocationOnTheMap(
      11.5564, 104.9282
    )

    var autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete,
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(45.4215296, -75.6971931)
        ),
      }
    );

    autocomplete.addListener("place_changed", () => {
      var place = autocomplete.getPlace();
      this.address = place.name + ', ' + place.formatted_address
      this.clubAddress = place

      this.showLocationOnTheMap(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );
    });
  }
  // beforeUnmount() {
  //   window.removeEventListener('keydown', onKeydown)
  // }
}
</script>

<style scoped>
#tsparticles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
}
.pac-item {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.pac-item:hover {
  background-color: #ececec;
}

.pac-item-query {
  font-size: 16px;
}
.main{
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-5%);
  width: 100vw;
}
.logout {
  position: absolute;
  top: 5%;
  right: 2%;
}
.logout button:hover::before {
  content: "LogOut ";
}
.pitchbooker-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  top: 3%;
}
.pitchbooker-title img {
  height: 3em;
  margin-right: 1em;
  /* width: 10%; */
}
.create-sport-club-section {
  width: 60%;
  height: 80%;
  padding: 2em;
  background: var(--white);
  border-radius: 30px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.create-sport-club-section-body h1 {
  font-size: 2.5em;
  color: var(--black);
  text-transform: capitalize;
}
.create-sport-club-section-body {
  margin-top: 3em;
  overflow: hidden;
}
.create-sport-club-section-body h1:nth-child(2) {
  font-weight: 400;
  font-size: 1.5em;
}
.create-sport-club-section-body h1 span {
  font-size: .8em;
  font-weight: 400;
}
.create-sport-club-section-body img {
  width: 30em;
  margin: 0;
}
.back-forte {
  position: absolute;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.back-forte div {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.back-forte div svg {
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.back-forte div svg:hover {
  transform: scale(1.2);
}
.back-forte div:last-child {
  transform: rotate(180deg);
}
.disabled-click {
  pointer-events: none;
  opacity: .7;
}
.disabled-next {
  opacity: .7;
}
.invalid-input {
  border: 2px solid var(--red);
}
.invalid-input::placeholder::before {
  content: 'asdf'
}

.create-sport-club-section-body input {
  /* margin: 1em 0 .5em 0; */
  font-size: 2em;
  /* padding: 0 1em; */
  border-radius: 10px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 600;
  z-index: 1000;
}
.create-sport-club-section-body h2 {
  font-size: 1.5em;
  text-transform: capitalize;
  font-weight: 400;
}
.create-sport-club-section02-body {
  padding-bottom: 4em;
}
.create-sport-club-section02-body h1 {
  margin-bottom: .5em;
}
.create-sport-club-section02-body input {
  width: 100%;
  text-align: center;
}
.input-slide-active {
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 2em;
}
.input-slide-active div {
  height: 20px;
  width: 20px;
  cursor: pointer;
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border-radius: 50%;
  border: 2px solid var(--black);
}
.active-input {
  transform: scale(1.2);
  background: var(--blue);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.invalid-slide-num {
  background: var(--red);
  border: 2px solid var(--black);
}

.create-sport-club-section03-body input {
  font-size: 1em;
  width: 80%;
}
.create-sport-club-section03-body h1 {
  margin-bottom: 1em;
}
.sport-club-form {
  display: flex; 
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 8em;
  position: relative;
}
.create-sport-club-section03-body {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 75%;
  height: 75%;
  margin-top: -2em;
}
.create-sport-club-section03-body div h1 {
  font-size: 2em;
  margin: 0;
  /* margin-top: .5em; */
}
.create-sport-club-section03-body div {
  /* position: relative; */
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.create-sport-club-section03-body div:first-child {
  position: relative;
  margin-right: 2em;
}
.location-input {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: .5em;
}
.location-input input {
  margin: 0;
  z-index: 1000;
  position: relative;
  width: 100%;
  height: 3em;
  border-radius: 10px 0 0px 5px;
}
.location-input button {
  margin: 0;
  border-radius: 10px;
  z-index: 1000;
  height: 3em;
  border-radius: 0 10px 5px 0;
  border-left: none;
}
#map {
  position: absolute;
  left: 0;
  right: 0;
  top: 20%;
  bottom: 0;
  width: 100%;
  z-index: 0;
  border-radius: 5px 5px 10px 10px;
  /* transform: scale(.8); */
}
.show-location-address {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 2.5%;
  padding: .5em 0;
  border-radius: 10px;
  width: 95%;
  /* font-size: 1.2em; */
  font-weight: 600;
  border: 2px solid var(--black);
  transform: translate(2.5%, 0%);
  background: rgba(251,255,254,.7);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.profile {
  z-index: 10;
}
.error-file {
  color: var(--red);
  font-weight: 600;
}
.submit-form-button {
  position: absolute;
  bottom: 3%;
  left: 0;
  right: 0;
  text-align: center;
}
.submit-form-button button {
  text-transform: uppercase;
}

/* transition animation */
.slide-back-enter-active,
.slide-back-leave-active,
.slide-next-enter-active,
.slide-next-leave-active,
.input-slide-back-enter-active,
.input-slide-back-leave-action,
.input-slide-next-enter-active,
.input-slide-next-leave-active {
  transition: all 0.6s ease-in-out;
}
.slide-back-enter-to {
  position: absolute;
  left: 22%;
}
.slide-back-enter-from {
  position: absolute;
  left: -70%;
}
.slide-back-leave-to {
  position: absolute;
  right: -70%;
}
.slide-back-leave-from {
  position: absolute;
  right: 10%;
}

.slide-next-enter-to {
  position: absolute;
  right: 20%;
}
.slide-next-enter-from {
  position: absolute;
  right: -70%;
}
.slide-next-leave-to {
  position: absolute;
  left: -70%;
}
.slide-next-leave-from {
  position: absolute;
  left: 10%;
}

.input-slide-next-enter-to {
  position: absolute;
  right: 0%;
}
.input-slide-next-enter-from {
  position: absolute;
  right: -100%;
}
.input-slide-next-leave-to {
  position: absolute;
  left: -130%;
}
.input-slide-next-leave-from {
  position: absolute;
  left: 0%;
}

.input-slide-back-enter-to {
  position: absolute;
  left: 0%;
}
.input-slide-back-enter-from {
  position: absolute;
  left: -100%;
}
.input-slide-back-leave-to {
  position: absolute;
  right: -100%;
}
.input-slide-back-leave-from {
  position: absolute;
  right: 0%;
}
</style>