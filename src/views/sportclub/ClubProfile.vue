<template>
  <div class="club-profile-main">
    <div class="club-profile-section">
      <div class="title-section">
        <div class="page-name">
          <img src="../../assets/icons/pitches-icon.png" />
          <h1>Sport Club's Profile</h1>
        </div>
        <div class="user-account">
          <button @click="handleSwitchAccount">{{titleButtonLabel}}</button>
        </div>
      </div>
      <div class="card-section animate__animated animate__fadeInUp">
        <div class="cards-layout club-profile-layout" v-if="!isEditUserAccount">
          <div class="edit-club01">
            <div class="club-profile">
              <div class="club-profile-cropper">
                <div class="club-cropper-wrapper">
                  <cropper 
                    ref="clubCropper"
                    class="club-cropper"
                    :src="clubImage.src"
                    :debounce="false"
                    :stencil-props="{
                      aspectRatio: 1/1,
                    }"
                    :stencil-size="{
                      width: 300,
                      height: 300
                    }"
                    @change="onClubProfileChange"
                    imageClass="club-img-class"
                    backgroundClass="user-cropper-background"
                    foregroundClass="user-cropper-foreground"
                  />
                  <vertical-buttons v-if="clubImage && clubProfile">
                    <square-button title="Flip Horizontal" @click="clubFlip(true, false)">
                      <img src="../../assets/icons/flip-horizontal-white.png">
                    </square-button>
                    <square-button title="Flip Vertical" @click="clubFlip(false, true)">
                      <img src="../../assets/icons/flip-vertical-white.png">
                    </square-button>
                    <square-button title="Rotate Clockwise" @click="clubRotate(90)">
                      <img src="../../assets/icons/rotating-arrow-to-the-right-white.png">
                    </square-button>
                    <square-button title="Rotate Counter-Clockwise" @click="clubRotate(-90)">
                      <img src="../../assets/icons/rotate-left-circular-arrow-interface-symbol-white.png">
                    </square-button>
                  </vertical-buttons>
                </div>
              </div>
              <img v-if="clubProfileUrl && !previewUrl" :src="clubProfileUrl" alt="active-club-profile" class="active-club-profile">
              <div class="preview animate__animated animate__fadeIn" v-if="previewUrl">
                <img src="../../assets/icons/close-icon.png" alt="close-preview-icon" class="close-preview-img" @click="closePreview">
                <img class="is-preview" :src="previewUrl">
              </div>
              <p class="error-file" v-if="fileError">{{ fileError }}</p>
              <input type="file" 
              class="custom-file-input"
              @change="loadClubProfile($event)"
              accept="image/*"
              id="file"
              ref="profile"
              >
            </div>
            <div class="club-name">
              <h1>🧶 Club's Name:</h1>
              <input 
                type="text" 
                v-model="clubName"
                placeholder="Enter Club's Name..."
                @keydown="checkNameInput($event)"
                ref="name">
            </div>
            <div class="club-desc">
              <h1>🎪 Club's Description:</h1>
              <textarea 
                type="text" 
                @keydown="checkDescInput($event)"
                v-model="clubDesc"
                placeholder="Enter Club's Description..."
                ref="desc">
              </textarea>
            </div>
          </div>
          <div class="edit-club02">
            <div class="club-images">
              <h1>⛲ Club's Images:</h1>
              <div class="club-images-preview" v-if="clubImages && clubImages.length > 0">
                <Carousel 
                  :value="clubImages"
                  :numVisible="1"
                  :numScroll="1"
                  :responsiveOptions="responsiveOptions"
                  class="custom-carousel" 
                  :circular="true" 
                  :autoplayInterval="3000"
                >
                  <template #item="slotProps">
                    <div class="product-item">
                      <div class="product-item-content">
                        <img :src="slotProps.data" :alt="slotProps.data.name" class="product-image">
                      </div>
                    </div>
                  </template>
                </Carousel>
              </div>
              <div class="files-upload">
                <FileUpload
                  name="files[]"
                  @select="onClubImages"
                  :multiple="true"
                  accept="image/*"
                  :fileLimit="5"
                  ref="files"
                  :maxFileSize="3000000"
                  :showUploadButton="false"
                >
                  <template #empty>
                    <p>Drag and drop your club's images here.</p>
                  </template>
                </FileUpload>
              </div>
            </div>
          </div>
          <div class="edit-club03">
            <h1>🌍 Club's Location:</h1>
              <div class="map-location">
                <div class="location-input">
                  <input 
                    type="text"
                    placeholder="Enter a Location..."
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
        </div>
        <div class="cards-layout club-profile-layout edit-user-account" v-if="isEditUserAccount">
          <div class="user-account">
            <h1>😀 User Account</h1>
            <div class="user-profile-cropper">
              <div class="cropper-wrapper">
                <cropper 
                  ref="cropper"
                  class="profile-cropper"
                  :src="userImage.src"
                  :debounce="false"
                  :stencil-props="{
                    aspectRatio: 1/1,
                  }"
                  :stencil-size="{
                    width: 320,
                    height: 320
                  }"
                  @change="onUserProfileChange"
                  imageClass="profile-img-class"
                  backgroundClass="user-cropper-background"
                  foregroundClass="user-cropper-foreground"
                />
                <vertical-buttons v-if="userImage && newUserProfile">
                  <square-button title="Flip Horizontal" @click="flip(true, false)">
                    <img src="../../assets/icons/flip-horizontal-white.png">
                  </square-button>
                  <square-button title="Flip Vertical" @click="flip(false, true)">
                    <img src="../../assets/icons/flip-vertical-white.png">
                  </square-button>
                  <square-button title="Rotate Clockwise" @click="rotate(90)">
                    <img src="../../assets/icons/rotating-arrow-to-the-right-white.png">
                  </square-button>
                  <square-button title="Rotate Counter-Clockwise" @click="rotate(-90)">
                    <img src="../../assets/icons/rotate-left-circular-arrow-interface-symbol-white.png">
                  </square-button>
                </vertical-buttons>
              </div>
            </div>
            <div class="club-profile user-profile">
              <img v-if="userProfile && !previewUserUrl" :src="userProfile" alt="active-user-profile" class="active-user-profile">
              <div class="preview user-preview animate__animated animate__fadeIn" v-if="previewUserUrl">
                <img src="../../assets/icons/close-icon.png" alt="close-preview-icon" class="close-preview-img" @click="closeUserPreview">
                <img class="is-preview" :src="previewUserUrl">
              </div>
              <p class="error-file" v-if="fileError">{{ fileError }}</p>
              <input type="file" 
              class="custom-file-input"
              @change="loadUserProfile($event)"
              accept="image/*"
              id="file"
              ref="userProfile"
              >
            </div>
            <div class="user-account-row user-name">
              <div class="user-account-row01 first-name">
                <h3>First Name:</h3>
                <input 
                  type="text" 
                  v-model="userFirstName"
                  placeholder="FirstName..." 
                />
              </div>
              <div class="user-account-row02 last-name">
                <h3>Last Name:</h3>
                <input 
                  type="text" 
                  v-model="userLastName"
                  placeholder="LastName..." 
                />
              </div>
            </div>

            <div class="user-account-row user-pn-city">
              <div class="user-account-row01 phone-num">
                <h3>Phone Number:</h3>
                <InputMask v-model="userPhoneNum" mask="999 999-999" class="input-mask" />
              </div>
              <div class="user-account-row02 city">
                <h3>City:</h3>
                <Dropdown 
                  v-model="userCity" 
                  :options="cities" 
                  optionLabel="name" 
                  :placeholder="userCityPH" 
                  :filter="true" 
                  :showClear="true" 
                />
              </div>
            </div>
            <div class="user-account-row user-submit">
              <button @click="handleUpdateUser">Update User Account 🖋️</button>
            </div>
          </div>
          <div class="update-password">
            <h1>🔏 Update Password</h1>
            <div class="update-password-div">
              <h3>🔑 Current Password</h3>
              <Password 
                id="curPass" 
                v-model="curPassword" 
                placeholder="Enter Current Password..."
                toggleMask
                :feedback="false"
                ref="curPass"
              />
              <h3>🗝️ New Password</h3>
              <Password 
                id="newPass" 
                v-model="newPass" 
                placeholder="Enter a Strong New Password..."
                toggleMask
                ref="newPass"
              >
                <template #header>
                  <h3 style="padding-bottom: .5em;">Create New Password</h3>
                </template>
                <template #footer="sp">
                  {{sp.level}}
                  <br>
                  <p style="padding: .5em 0 .5em 0;border-top: 2px solid grey;">Suggestions</p>
                  <ul style="line-height: 1.5">
                    <li>At least one lowercase</li>
                    <li>At least one uppercase</li>
                    <li>At least one numeric</li>
                    <li>Minimum 8 characters</li>
                  </ul>
                </template>
              </Password>
              <h3>🗝️ Confirm New Password</h3>
              <Password 
                id="confirmNewPass" 
                v-model="confirmNewPass" 
                placeholder="Enter Confirm Password..."
                toggleMask
                :feedback="false"
                ref="confirmNewPass"
              />
              <div class="update-pass-button">
                <button @click="handleUpdatePass">
                  Update Password 🖊️
                </button>
              </div>
            </div>
          </div>
        </div>
      <div class="submit-edit-club" v-if="!isEditUserAccount">
        <button @click="handleEditClub">Update Club Information 🌠</button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import axios from 'axios'
import { ref } from '@vue/reactivity';
import { onBeforeUnmount } from '@vue/runtime-core';
import FileUpload from 'primevue/fileupload';
import Carousel from 'primevue/carousel';
import Dropdown from 'primevue/dropdown'
import InputMask from 'primevue/inputmask'
import Password from 'primevue/password'
import InputText from 'primevue/inputtext'
import { Cropper, Preview } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import VerticalButtons from '../../components/cropper/VerticalButtons.vue'
import SquareButton from '../../components/cropper/SquareButton.vue'

function getMimeType(file, fallback = null) {
	const byteArray = (new Uint8Array(file)).subarray(0, 4);
    let header = '';
    for (let i = 0; i < byteArray.length; i++) {
      header += byteArray[i].toString(16);
    }
	switch (header) {
        case "89504e47":
            return "image/png";
        case "47494638":
            return "image/gif";
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
            return "image/jpeg";
        default:
            return fallback;
    }
}


export default {
  setup() {
    const fileError = ref(null)
    const clubProfile = ref(null)
    const previewUrl = ref(null)
    const previewUserUrl  =ref(null) 
    const newUserProfile = ref(null)

    const fileTypes = ['image/png', 'image/jpeg', 'image/jpg']
    const maxSize = 3000000;

    return { format, fileError, clubProfile, previewUrl, previewUserUrl,
    newUserProfile, fileTypes, maxSize }
  },
  data() {
    const clubInfoLocal = JSON.parse(localStorage.getItem('clubInfo'))
    return {
      clubInfo: clubInfoLocal,
      clubName: clubInfoLocal.name,
      address: JSON.parse(clubInfoLocal.locationUrl).formatted_address,
      clubDesc: clubInfoLocal.description,
      clubAddress: JSON.parse(clubInfoLocal.locationUrl),
      clubProfileUrl: clubInfoLocal.clubProfile,
      clubImages: clubInfoLocal.clubImages,
      selectedClubImages: [],
      isEvent: null,
      responsiveOptions: [
				{
					breakpoint: '1024px',
					numVisible: 3,
					numScroll: 3
				},
				{
					breakpoint: '600px',
					numVisible: 2,
					numScroll: 2
				},
				{
					breakpoint: '480px',
					numVisible: 1,
					numScroll: 1
				}
			],
      isEditUserAccount: false,
      titleButtonLabel: 'User Account',
      userFirstName: '',
      userLastName: '',
      userPhoneNum: '',
      userCity: '',
      userProfile: '',
      userCityPH: '',
      activeUserId: null,
      watchedUserCity: '',
      newPass: '',
      confirmNewPass: '',
      curPassword: '',

      cities: [
        {name: 'Phnom Penh', code: 'PP'},
        {name: 'Banteay Meanchey', code: 'BTM'},
        {name: 'Battambang', code: 'BTB'},
        {name: 'Kampong Cham', code: 'KPC'},
        {name: 'Kampong Chhnang', code: 'KPCH'},
        {name: 'Kampong Speu', code: 'KPS'},
        {name: 'Kampot', code: 'KP'},
        {name: 'Kandal', code: 'KD'},
        {name: 'Kep', code: 'KEP'},
        {name: 'Koh Kong', code: 'KK'},
        {name: 'Kratie', code: 'KT'},
        {name: 'Mundulkiri', code: 'MDKR'},
        {name: 'Oddor Meanchey', code: 'ODMC'},
        {name: 'Pailin', code: 'PL'},
        {name: 'Prey Veng', code: 'PV'},
        {name: 'Pursat', code: 'PS'},
        {name: 'Rattanakiri', code: 'RTNK'},
        {name: 'Siem Reap', code: 'SR'},
        {name: 'Sihanouk ville', code: 'SHN'},
        {name: 'Stung Treng', code: 'ST'},
        {name: 'Svay Rieng', code: 'SVR'},
        {name: 'Takeo', code: 'TK'},
        {name: 'Kampong Thom', code: 'KPT'},
        {name: 'Preah Vihear', code: 'PVH'},
        {name: 'Tbong Khmum', code: 'TK'}
      ],

      userImage: {
        src: null,
        type: null,
        name: null
      },
      clubImage: {
        src: null,
        type: null,
        name: null
      }
    }
  },
  components: {
    FileUpload,
    Carousel,
    Dropdown,
    InputMask,
    Password,
    InputText,
    Cropper,
    Preview,
    VerticalButtons,
    SquareButton
  },
  watch: {
    confirmNewPass(curValue) {
      if (curValue == this.newPass) {
        document.getElementById('confirmNewPass').classList.remove('p-invalid-confirm-pass')
      }
      if (curValue && curValue !== this.newPass) {
        document.getElementById('confirmNewPass').classList.add('p-invalid-confirm-pass')
      }
    },
    userCity(curValue) {
      if(curValue && curValue.name) {
        this.watchedUserCity = curValue.name
      }
    },
    newPass(curValue) {
      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      if(curValue && passRegex.test(curValue)) {
        document.getElementById('newPass').classList.remove('p-invalid')
      }
    }
  },
  methods: {
    flip(x,y) {
			this.$refs.cropper.flip(x,y);
		},
		rotate(angle) {
			this.$refs.cropper.rotate(angle);
		},
    clubFlip(x,y) {
			this.$refs.clubCropper.flip(x,y);
		},
		clubRotate(angle) {
			this.$refs.clubCropper.rotate(angle);
		},
    // crop() {
    //   const { canvas } = this.$refs.cropper.getResult()
    //   console.log(canvas)
    //   canvas.toBlob((blob) => {
    //     console.log(blob)
    //     this.newUserProfile = blob
    //   }, this.userImage.type)
    //   console.log(this.newUserProfile)
    // },
    onUserProfileChange({ canvas }) {
      this.previewUserUrl = canvas.toDataURL()
      canvas.toBlob((blob) => {
        const file = new File([blob], this.userImage.name, { type: this.userImage.type })
        this.newUserProfile = file
      }, this.userImage.type)
    },
    onClubProfileChange({ canvas }) {
      this.previewUrl = canvas.toDataURL()
      canvas.toBlob((blob) => {
        const file = new File([blob], this.clubImage.name, { type: this.clubImage.type })
        this.clubProfile = file
      }, this.clubImage.type)
    },
    reset() {
      if (this.userImage) {
        this.userImage = {
          src: null,
          type: null,
          name: null
        }
      }
      if (this.clubImage) {
        this.clubImage = {
          src: null,
          type: null,
          name: null
        }
      }
    },
    loadUserProfile(event) {
      const { files } = event.target
      const selected = files[0]
      if (files && files[0]) {
        if (selected && this.fileTypes.includes(selected.type) && selected.size <= this.maxSize) {
          this.fileError = null
          document.getElementById('file').classList.remove('custom-invalid-input')
          if (this.userImage.src) {
            URL.revokeObjectURL(this.userImage.src)
          }
          const blob = URL.createObjectURL(files[0])
          const reader = new FileReader();
          reader.onload = (e) => {
            this.userImage = {
              src: blob,
              type: getMimeType(e.target.result, files[0].type),
              name: selected.name
            }
          }
          reader.readAsArrayBuffer(files[0])
        } else {
          this.fileError = selected.size > this.maxSize ? `Max File Size: ${this.maxSize/1000000}Mb!`:`.jpeg .jpg .png File Only!`
          return
        }
      }
    },
    loadClubProfile(event) {
      const { files } = event.target
      const selected = files[0]
      if (files && files[0]) {
        if (selected && this.fileTypes.includes(selected.type) && selected.size <= this.maxSize) {
          this.fileError = null
          document.getElementById('file').classList.remove('custom-invalid-input')
          if (this.clubImage.src) {
            URL.revokeObjectURL(this.clubImage.src)
          }
          const blob = URL.createObjectURL(files[0])
          const reader = new FileReader();
          reader.onload = (e) => {
            this.clubImage = {
              src: blob,
              type: getMimeType(e.target.result, files[0].type),
              name: selected.name
            }
          }
          reader.readAsArrayBuffer(files[0])
        } else {
          this.fileError = selected.size > this.maxSize ? `Max File Size: ${this.maxSize/1000000}Mb!`:`.jpeg .jpg .png File Only!`
          return
        }
      }
    },
    onClubImages(event) {
      this.selectedClubImages = event.files
      console.log(event.files)
      this.isEvent = event.originalEvent.target.files
      console.log(this.isEvent)
    },
    handleSwitchAccount() {
      if (this.isEditUserAccount == false) {
        this.isEditUserAccount = true;
        this.titleButtonLabel = 'Sport Club Account'
      } else {
        this.isEditUserAccount = false;
        this.titleButtonLabel = 'User Account'
      }
    },
    checkNameInput(e) {
      if(e.target.value.length >= 0) {
        this.$refs.name.classList.remove('error-input')
      }
    },
    checkDescInput(e) {
      if(e.target.value.length >= 0) {
        this.$refs.desc.classList.remove('error-input')
      }
    },
    locationInputKey(e) {
      console.log(e.target.value.length)
      if(e.target.value.length >= 0) {
        this.$refs.desc.classList.remove('error-input')
      }
    },
    closePreview() {
      this.clubProfile = null
      this.previewUrl = null
      this.reset()
    },
    closeUserPreview() {
      this.newUserProfile = null
      this.previewUserUrl = null
      this.reset()
    },
    async handleEditClub() {
      if (this.clubProfile) {
        try {
          await axios({
            method: "delete",
            url: 'sport-clubs/delete-club-profile/',
            data: {
              filename: this.clubProfileUrl
            }
          })
        } catch (err) {
          console.log(err)
        }
      }
      if(!this.clubName) {
        this.$refs.name.classList.add('error-input')
        this.$refs.name.focus()
        return
      } if(!this.clubDesc) {
        this.$refs.desc.classList.add('error-input')
        this.$refs.desc.focus()
        return
      } if(!this.address) {
        this.$refs.autocomplete.classList.add('error-input')
        this.$refs.autocomplete.focus()
        return
      } if(!this.clubAddress) {
        return
      }

      try {
        await this.$store.dispatch('sportClubs/updateSportClub', {
          id: null,
          name: this.clubName,
          description: this.clubDesc,
          locationUrl: this.clubAddress,
          clubProfile: this.clubProfile,
          clubImages: this.selectedClubImages
        })
        this.toast(`Sport Club Update Successfully 👏`, 3000, 'successed')
        if (this.clubProfile || this.selectedClubImages.length > 0) {
          setTimeout(() => {
            this.$router.go()
          }, 1000)
        } else {
          return
        }
        if (this.selectedClubImages && this.selectedClubImages.length > 0) {
          try {
            await axios({
              method: "delete",
              url: 'sport-clubs/delete-club-images/',
              data: {
                filenames: this.clubImages
              }
            })
          } catch (err) {
            console.log(err)
          }
        }
      }
      catch(err) {
        this.toast(err, 3000, 'error')
      }
    },
    async handleUpdateUser() {
      if (this.newUserProfile) {
        try {
          await axios({
            method: "delete",
            url: 'delete-user-profile',
            data: {
              filename: this.userProfile
            }
          })
        } catch (err) {
          console.log(err)
        }
      }
      const newUserInfo = {
        userId: this.activeUserId,
        first_name: this.userFirstName,
        last_name: this.userLastName,
        phone_num: this.userPhoneNum,
        city: this.watchedUserCity ? this.watchedUserCity : this.userCity,
        userProfile: this.newUserProfile
      }
      try {
        await this.$store.dispatch('users/updateUserById', newUserInfo)

        this.toast('Edit Successed!', 3000, 'successed')
        this.$store.dispatch('users/getUserById', this.activeUserId)
        localStorage.setItem('isEditUser', true)
        if (this.newUserProfile) {
        setTimeout(() => {
            this.$router.go()
        }, 1000)
        }
      }
      catch(err) {
        this.toast(err, 3000, 'error')
      }
    },
    async handleUpdatePass() {
      const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/ 
      if (!this.curPassword) {
        document.getElementById('curPass').focus()
        return
      }
      if (!this.newPass) {
        document.getElementById('newPass').focus()
        return
      }
      if (!passRegex.test(this.newPass)) {
        document.getElementById('newPass').classList.add('p-invalid')
        document.getElementById('newPass').focus()
        this.toast('Password must has minimum 8 characters, at least one uppercase letter, one lowercase letter and one number 🙏', 3000, 'error')
        return;
      } 
      if (!this.confirmNewPass && this.newPass.length >= 8) {
        document.getElementById('confirmNewPass').focus()
        return
      }
      try {
        await this.$store.dispatch('users/updateUserNewPassword', {
          curPassword: this.curPassword,
          newPass: this.newPass,
          confirmNewPass: this.confirmNewPass
        })
        this.toast('New Password Updated Successfully!', 3000, 'successed')
        this.newPass = null
        this.curPassword = null
        this.confirmNewPass = null
      }
      catch(err) {
        this.toast(err, 3000, 'error')
        document.getElementById('confirmNewPass').focus()
      }
    },
    getLocaInput(e) {
      if(!e.target.value) {
        this.clubAddress = []
      }
    },
    locationInputKey(e) {
      this.$refs.autocomplete.classList.remove('error-input')
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
              this.toast("Locator is unable to find your address. Please type your address manually. 🙏 ", 5000, 'error')
          }
        );
      } else {
        this.error = error.message;
              this.toast("Your browser does not support geolocation API. ", error.message, 5000, 'error')
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
  // computed: {
  //   getActiveUserInfo() {
  //     return this.$store.getters['users/activeUserInfo']
  //   }
  // },
  destroyed() {
    if (this.image.src) {
      URL.revokeObjectURL(this.image.src)
    }
  },
  mounted() {
    const getActiveClubGeo = JSON.parse(JSON.parse(localStorage.getItem('clubInfo')).locationUrl)
    if(getActiveClubGeo.geometry) {
    const clubGeometry = getActiveClubGeo.geometry

    this.showLocationOnTheMap(
      clubGeometry.location.lat, clubGeometry.location.lng
    )
    }

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

    if (localStorage.getItem('isEditUser')) {
      this.isEditUserAccount = true
      localStorage.removeItem('isEditUser')
    }

    
  },
  created() {
    this.$store.dispatch('sportClubs/getActiceSportClub')
    const getActiveUserId = localStorage.getItem('id')
    this.activeUserId = getActiveUserId
    if (getActiveUserId) {
      this.$store.dispatch('users/getUserById', getActiveUserId)
    }

    let activeUserInfoLocal = JSON.parse(localStorage.getItem('activeUserInfo'))
    this.userFirstName = activeUserInfoLocal.first_name
    this.userLastName = activeUserInfoLocal.last_name
    this.userPhoneNum = activeUserInfoLocal.phone_num
    this.userCity = activeUserInfoLocal.city
    this.userProfile = activeUserInfoLocal.userProfile
    this.userCityPH = activeUserInfoLocal.city
  },
  beforeUnmount() {
    this.clubName = null
  }
}
</script>

<style scoped>
/* .club-profile-main {
  height: auto;
} */
.page-name {
  display: flex;
  align-items: center;
}
.page-name > h1 {
  margin-left: 1vw;
  font-size: 2.5em;
}
.page-name > img {
  height: 2.5em;
  height: auto;
}
.club-desc {
  margin-top: 1em;
}

/* user-account-container-style */
.edit-user-account {
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 3em;
  width: 100%;
}
.user-account {
  grid-area: 1 / 1 / 2 / 2;
}
.user-account div {
  margin-top: 1em;
  width: 100%;
}
.user-account div:first-child {
  margin-right: 2em;
}
.user-account div h3 {
  margin-right: .5em;
  font-weight: 600;
  margin-bottom: .5em;
}
.user-account div h3::before {
  content: '🧶 ';
}
.user-account div div input {
  font-size: 1em;
  font-weight: 700;
  width: 100%;
}
.update-password {
  grid-area: 1 / 2 / 2 / 3;
}
.user-account-row {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-profile input {
  width: 20em;
}
.user-profile input::before {
  content: 'UPDATE USER PROFILE...👽';
}
.user-preview {
  justify-content: center;
}
.user-account-row:last-child {
  justify-content: center;
  align-items: flex-end;
  padding-top: 2em; 
}
.city .p-dropdown,
.phone-num input{
  margin-top: 0;
  height: 3em;
  display: flex;
  align-items: center;
}
.update-password-div {
  margin-top: 1em;
  width: 100%;
}
.update-password-div h3 {
  font-weight: 600;
  margin-bottom: .5em;
}
.update-password-div .p-password {
  width: 100%;
  margin-bottom: 1em;
}
.update-password-div input {
  width: 100%;
  height: 3.5em;
  margin-bottom: 1em;
}
.update-pass-button {
  margin-top: 1em;
  text-align: center;
}

.cropper-wrapper,
.club-cropper-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cropper-wrapper div {
  /* margin: 0; */
  width: auto;
}
.cropper-wrapper div div {
  padding: .2em;
  border-radius: 5px;
}
.cropper-wrapper div div:first-child {
  margin-right: 0;
}
.profile-cropper,
.profile-img-class {
  min-height: 0px;
  min-width: 0px;
  max-width: 40em;
  max-height: 20em;
  margin-left: 2em;
}
.club-cropper,
.club-img-class {
  min-height: 0px;
  min-width: 0px;
  max-width: 20em;
  max-height: auto;
  /* margin-left: 2em; */
}
.club-cropper-wrapper .vertical-buttons .square-button img{
  width: 1.2em;
  padding: .2em;
}
.club-cropper-wrapper .vertical-buttons {
  right: 4%;
}
.club-cropper-wrapper .vertical-buttons .square-button {
  margin: 0;
}
.club-cropper-wrapper .vertical-buttons .square-button:not(:last-child) {
  margin-bottom: .5em;
}
.club-cropper-wrapper {
  background: var(--black);
  width: 95%;
}
.club-profile {
  margin-bottom: 1em;
}
</style>
