<template>
  <div class="edit-sportclub-modal">
    <div class="cards-layout club-profile-layout">
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
              <img v-if="clubProfileUrl && !previewUrl" :src="clubProfileUrl" class="active-club-profile" alt="active-club-profile">
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
    <div class="submit-edit-club">
      <button @click="handleEditClub(club)">Update Club Information 🌠</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { format } from 'date-fns'
import axios from 'axios'
import FileUpload from 'primevue/fileupload';
import Carousel from 'primevue/carousel';
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
  props: ['club'],
  setup() {
    const fileError = ref(null)
    const clubProfile = ref(null)
    const previewUrl = ref(null) 

    const fileTypes = ['image/png', 'image/jpeg', 'image/jpg']
    const maxSize = 3000000;
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
    }

    return { format, handleFiles, fileError, clubProfile, previewUrl, fileTypes, maxSize }
  },
  data() {
    let locationParse = JSON.parse(this.club.locationUrl)
    return {
      clubInfo: this.club,
      clubName: this.club.name,
      address: locationParse.formatted_address,
      clubDesc: this.club.description,
      clubAddress: locationParse,
      clubProfileUrl: this.club.clubProfile,
      clubImages: this.club.clubImages,
      selectedClubImages: [],
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
      isEvent: null,
      clubImage: {
        src: null,
        type: null
      }
    }
  },
  components: {
    FileUpload,
    Carousel,
    Cropper,
    Preview,
    VerticalButtons,
    SquareButton
  },
  methods: {
    onClubImages(event) {
      this.selectedClubImages = event.files
      this.isEvent = event.originalEvent.target.files
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
    clubFlip(x,y) {
			this.$refs.clubCropper.flip(x,y);
		},
		clubRotate(angle) {
			this.$refs.clubCropper.rotate(angle);
		},
    onClubProfileChange({ canvas }) {
      this.previewUrl = canvas.toDataURL()
      canvas.toBlob((blob) => {
        this.clubProfile = blob
      }, this.clubImage.type)
    },
    reset() {
      if (this.clubImage) {
        this.clubImage = {
          src: null,
          type: null
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
            }
          }
          reader.readAsArrayBuffer(files[0])
        } else {
          this.fileError = selected.size > this.maxSize ? `Max File Size: ${this.maxSize/1000000}Mb!`:`.jpeg .jpg .png File Only!`
          return
        }
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
    async handleEditClub(club) {
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
          id: club.id,
          name: this.clubName,
          description: this.clubDesc,
          locationUrl: this.clubAddress,
          clubProfile: this.clubProfile,
          clubImages: this.selectedClubImages
        })
        this.toast(`${this.clubName} Has Been Updated Successfully 👏`, 3000, 'successed')
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
              this.toast(error.message, 5000, 'error')
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
    let locationUrlParse = JSON.parse(this.club.locationUrl)
    if(locationUrlParse.geometry) {
    const clubGeometry = locationUrlParse.geometry

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
  },
}
</script>

<style scoped>
.club-cropper-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.club-cropper-wrapper div div {
  padding: .2em;
  border-radius: 5px;
}
.club-cropper-wrapper div div:first-child {
  margin-right: 0;
}
.club-cropper,
.club-img-class {
  min-height: 0px;
  min-width: 0px;
  max-width: 15em;
  max-height: auto;
  /* margin-left: 2em; */
}
.club-cropper-wrapper .vertical-buttons .square-button img{
  width: 1.2em;
  padding: .2em;
}
.club-cropper-wrapper .vertical-buttons {
  right: 7%;
}
.club-cropper-wrapper .vertical-buttons .square-button {
  margin: 0;
}
.club-cropper-wrapper .vertical-buttons .square-button:not(:last-child) {
  margin-bottom: .5em;
}
.club-cropper-wrapper {
  background: var(--black);
  width: 90%;
}
.club-profile {
  margin-bottom: 1em;
}
</style>