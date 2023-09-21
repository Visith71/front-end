<template>
  <div>
    <nav class="navbar">
      <ul class="navbar-nav">
        <li class="logo">
          <router-link :to="{ name: 'TodayBookings' }" class="logo-link">
            <img class="logo-img" src="../../assets/pitchbooker-logo.png" />
            <span class="logo-text">PitchBooker</span>
          </router-link>
        </li>
        <li class="club-logo"  v-if="!isAdmin">
          <router-link :to="{ name: 'TodayBookings' }" class="club-link">
            <img class="logo-img" :src="clubInfo.clubProfile" v-if="clubInfo"/>
          </router-link>
          <div class="edit-club-icon">
            <router-link :to="{ name: 'ClubProfile' }">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="24" height="24"
              viewBox="0 0 30 30"
              style=" fill:var(--black);">    
              <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
              </svg>
            </router-link>
          </div>
        </li>

        <li class="nav-item">
          <router-link :to="{ name: 'TodayBookings' }" class="nav-link">
            <svg
              width="28"
              height="29"
              viewBox="0 0 28 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.6241 13.8086L24.2823 10.4669V5.72416C24.2823 5.01725 23.7039 4.43887 22.997 4.43887H18.2543L14.9126 1.09712C14.4113 0.595861 13.6016 0.595861 13.1003 1.09712L9.7457 4.43887H5.00298C4.29608 4.43887 3.7177 5.01725 3.7177 5.72416V10.4669L0.375947 13.8086C-0.125316 14.3099 -0.125316 15.1196 0.375947 15.6209L3.7177 18.9626V23.7182C3.7177 24.4251 4.29608 25.0035 5.00298 25.0035H9.7457L13.0874 28.3452C13.5887 28.8465 14.3984 28.8465 14.8997 28.3452L18.2415 25.0035H22.997C23.7039 25.0035 24.2823 24.4251 24.2823 23.7182V18.9755L27.6241 15.6337C28.1253 15.1325 28.1253 14.3099 27.6241 13.8086ZM21.6089 15.9808C21.1719 18.7056 19.2311 21.0448 16.622 21.9702C15.0668 22.5229 13.5244 22.5486 12.1235 22.2016C11.5965 22.073 11.5065 21.3661 11.9564 21.0448C13.9743 19.6567 15.2853 17.3432 15.2853 14.7212C15.2853 12.0992 13.9743 9.78567 11.9692 8.39756C11.5194 8.08909 11.5965 7.38218 12.1363 7.2408C13.5373 6.89377 15.0796 6.91948 16.6348 7.47215C19.2311 8.39756 21.1848 10.7368 21.6218 13.4616C21.686 13.8857 21.7117 14.3099 21.7117 14.7212C21.6989 15.1325 21.6732 15.5566 21.6089 15.9808Z"
                fill="#222325"
              />
            </svg>
            <span class="link-text">Today Bookings</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link :to="{ name: 'Calendar' }" class="nav-link">
            <svg
              width="22"
              height="25"
              viewBox="0 0 22 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.2 3.12118H18V1.92118C18 1.26118 17.46 0.721176 16.8 0.721176C16.14 0.721176 15.6 1.26118 15.6 1.92118V3.12118H6V1.92118C6 1.26118 5.46 0.721176 4.8 0.721176C4.14 0.721176 3.6 1.26118 3.6 1.92118V3.12118H2.4C1.068 3.12118 0.012 4.20118 0.012 5.52118L0 22.3212C0 23.6412 1.068 24.7212 2.4 24.7212H19.2C20.52 24.7212 21.6 23.6412 21.6 22.3212V5.52118C21.6 4.20118 20.52 3.12118 19.2 3.12118ZM18 22.3212H3.6C2.94 22.3212 2.4 21.7812 2.4 21.1212V9.12118H19.2V21.1212C19.2 21.7812 18.66 22.3212 18 22.3212ZM6 11.5212H9.6C10.26 11.5212 10.8 12.0612 10.8 12.7212V16.3212C10.8 16.9812 10.26 17.5212 9.6 17.5212H6C5.34 17.5212 4.8 16.9812 4.8 16.3212V12.7212C4.8 12.0612 5.34 11.5212 6 11.5212Z"
                fill="#222325"
              />
            </svg>
            <span class="link-text">Calendar</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link :to="{ name: 'Statistic' }" class="nav-link">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.4 7.92118H2.74286C4.06286 7.92118 5.14286 9.00118 5.14286 10.3212V22.3212C5.14286 23.6412 4.06286 24.7212 2.74286 24.7212H2.4C1.08 24.7212 0 23.6412 0 22.3212V10.3212C0 9.00118 1.08 7.92118 2.4 7.92118ZM12 0.721176C13.32 0.721176 14.4 1.80118 14.4 3.12118V22.3212C14.4 23.6412 13.32 24.7212 12 24.7212C10.68 24.7212 9.6 23.6412 9.6 22.3212V3.12118C9.6 1.80118 10.68 0.721176 12 0.721176ZM21.6 14.4355C22.92 14.4355 24 15.5155 24 16.8355V22.3212C24 23.6412 22.92 24.7212 21.6 24.7212C20.28 24.7212 19.2 23.6412 19.2 22.3212V16.8355C19.2 15.5155 20.28 14.4355 21.6 14.4355Z"
                fill="#222325"
              />
            </svg>
            <span class="link-text">Dashboard</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link :to="{ name: 'Transactions' }" class="nav-link">
            <svg
              width="22"
              height="25"
              viewBox="0 0 22 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.2 9.12118H8.40001C7.74001 9.12118 7.20001 8.58118 7.20001 7.92118C7.20001 7.26118 7.74001 6.72118 8.40001 6.72118H13.2C13.86 6.72118 14.4 7.26118 14.4 7.92118C14.4 8.58118 13.86 9.12118 13.2 9.12118Z"
                fill="#222325"
              />
              <path
                d="M13.2 12.7212H8.40001C7.74001 12.7212 7.20001 12.1812 7.20001 11.5212C7.20001 10.8612 7.74001 10.3212 8.40001 10.3212H13.2C13.86 10.3212 14.4 10.8612 14.4 11.5212C14.4 12.1812 13.86 12.7212 13.2 12.7212Z"
                fill="#222325"
              />
              <path
                d="M19.8 2.52118L18 0.721176L16.2 2.52118L14.4 0.721176L12.6 2.52118L10.8 0.721176L9 2.52118L7.2 0.721176L5.4 2.52118L3.6 0.721176V17.5212H1.2C0.54 17.5212 0 18.0612 0 18.7212V21.1212C0 23.1132 1.608 24.7212 3.6 24.7212H18C19.992 24.7212 21.6 23.1132 21.6 21.1212V0.721176L19.8 2.52118ZM14.4 22.3212H3.6C2.94 22.3212 2.4 21.7812 2.4 21.1212V19.9212H6H10.8H14.4V22.3212ZM19.2 21.1212C19.2 21.7812 18.66 22.3212 18 22.3212C17.34 22.3212 16.8 21.7812 16.8 21.1212V18.7212C16.8 18.0612 16.26 17.5212 15.6 17.5212H13.2H10.8H6V4.32118H19.2V21.1212Z"
                fill="#222325"
              />
              <path
                d="M16.8 9.12118C17.4627 9.12118 18 8.58392 18 7.92118C18 7.25843 17.4627 6.72118 16.8 6.72118C16.1372 6.72118 15.6 7.25843 15.6 7.92118C15.6 8.58392 16.1372 9.12118 16.8 9.12118Z"
                fill="#222325"
              />
              <path
                d="M16.8 12.7212C17.4627 12.7212 18 12.1839 18 11.5212C18 10.8584 17.4627 10.3212 16.8 10.3212C16.1372 10.3212 15.6 10.8584 15.6 11.5212C15.6 12.1839 16.1372 12.7212 16.8 12.7212Z"
                fill="#222325"
              />
            </svg>
            <span class="link-text">Transactions</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link :to="{ name: 'Pitches' }" class="nav-link">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.7365 3.23873L8.98266 0.874871C8.41533 0.672254 7.79398 0.672254 7.22665 0.861363L1.83706 2.6714C0.742927 3.04962 0 4.07621 0 5.23788V21.2446C0 23.1492 1.90459 24.4459 3.67411 23.757L7.63188 22.2171C7.92905 22.0956 8.26675 22.0956 8.56392 22.2036L15.3178 24.5675C15.8851 24.7701 16.5065 24.7701 17.0738 24.581L22.4634 22.7709C23.5575 22.4062 24.3005 21.3661 24.3005 20.2045V4.19778C24.3005 2.29319 22.3959 0.99644 20.6264 1.68534L16.6686 3.22522C16.3714 3.33328 16.0472 3.34679 15.7365 3.23873ZM16.2093 22.028L8.10466 19.1779V3.41433L16.2093 6.26447V22.028Z"
                fill="#222325"
              />
            </svg>
            <span class="link-text">Pitches</span>
          </router-link>
        </li>

        <li class="nav-item" v-if="isAdmin">
          <router-link :to="{ name: 'UserData' }" class="nav-link">
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 25.813 25.813"
              style="enable-background: new 0 0 25.813 25.813"
              xml:space="preserve"
            >
              <g>
                <g>
                  <ellipse
                    style="fill: #030104"
                    cx="10.813"
                    cy="4.813"
                    rx="10.813"
                    ry="4.813"
                  />
                  <path
                    style="fill: #030104"
                    d="M13.317,22.489c-0.758-0.193-1.324-0.811-1.467-1.566c-0.342,0.015-0.688,0.023-1.037,0.023
			C4.84,20.946,0,18.793,0,16.133c0,1.11,0,1.852,0,3.68c0,2.659,4.84,4.813,10.813,4.813c0.859,0,1.691-0.049,2.493-0.134
			C12.958,23.875,12.942,23.113,13.317,22.489z"
                  />
                  <path
                    style="fill: #030104"
                    d="M10.813,19.626c0.338,0,0.67-0.009,1-0.022v-0.552c0-0.924,0.631-1.719,1.514-1.939
			c-0.232-0.393-0.317-0.84-0.262-1.271c-0.727,0.068-1.479,0.105-2.252,0.105C4.84,15.947,0,13.794,0,11.134c0,1.11,0,1.852,0,3.68
			C0.001,17.472,4.84,19.626,10.813,19.626z"
                  />
                  <path
                    style="fill: #030104"
                    d="M10.813,14.626c1.068,0,2.098-0.071,3.073-0.2l0.808-0.808c0.387-0.388,0.899-0.586,1.415-0.586
			c0.347,0,0.695,0.09,1.008,0.273c0.228-0.871,1.018-1.492,1.934-1.492h1.5c0.027,0,0.054,0.006,0.08,0.007
			c0.633-0.611,0.994-1.29,0.994-2.007c0-0.977,0-1.995,0-3.68c0,2.659-4.84,4.813-10.813,4.813S0.001,8.792,0.001,6.133
			c0,1.11,0,1.852,0,3.68C0.001,12.472,4.84,14.626,10.813,14.626z"
                  />
                </g>
                <g>
                  <path
                    style="fill: #030104"
                    d="M25.813,20.551v-1.5l-1.785-0.292c-0.105-0.422-0.271-0.819-0.49-1.185l1.04-1.482l-1.061-1.061
			l-1.464,1.053c-0.365-0.221-0.765-0.39-1.19-0.495l-0.312-1.776h-1.5l-0.289,1.771c-0.426,0.104-0.828,0.27-1.194,0.489
			l-1.46-1.042l-1.061,1.061l1.027,1.468c-0.223,0.368-0.392,0.769-0.498,1.198l-1.763,0.293v1.5l1.762,0.312
			c0.105,0.429,0.274,0.831,0.498,1.199l-1.041,1.455l1.061,1.062l1.47-1.029c0.368,0.221,0.769,0.387,1.194,0.492l0.294,1.771h1.5
			l0.315-1.776c0.423-0.106,0.823-0.276,1.188-0.497l1.481,1.039l1.06-1.062l-1.057-1.467c0.219-0.365,0.385-0.763,0.489-1.187
			L25.813,20.551z M19.813,21.905c-1.154,0-2.092-0.936-2.092-2.092c0-1.154,0.938-2.092,2.092-2.092
			c1.156,0,2.092,0.938,2.092,2.092C21.905,20.969,20.969,21.905,19.813,21.905z"
                  />
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>

            <span class="link-text">User's Data</span>
          </router-link>
        </li>

        <li class="nav-item sport-club-li" v-if="isAdmin">
          <router-link :to="{ name: 'SportClubs' }" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="64" height="64"
            viewBox="0 0 50 50"
            style=" fill:#000000;"><path d="M 0 10 L 0 40 L 5 40 L 5 15 L 45 15 L 45 40 L 50 40 L 50 10 Z M 9.59375 17 L 7 19.59375 L 7 22.40625 L 10.09375 25.5 L 7 28.59375 L 7 31.40625 L 10.09375 34.5 L 7 37.59375 L 7 40 C 7.257813 40 7.523438 39.914063 7.71875 39.71875 L 11.5 35.90625 L 15.28125 39.71875 C 15.476563 39.914063 15.742188 40 16 40 C 16.257813 40 16.523438 39.914063 16.71875 39.71875 L 20.5 35.90625 L 24.28125 39.71875 C 24.476563 39.914063 24.742188 40 25 40 C 25.257813 40 25.523438 39.914063 25.71875 39.71875 L 29.5 35.90625 L 33.28125 39.71875 C 33.476563 39.914063 33.742188 40 34 40 C 34.257813 40 34.523438 39.914063 34.71875 39.71875 L 38.5 35.90625 L 42.28125 39.71875 C 42.476563 39.914063 42.742188 40 43 40 L 43 37.59375 L 39.90625 34.5 L 43 31.40625 L 43 28.59375 L 39.90625 25.5 L 43 22.40625 L 43 19.59375 L 40.40625 17 L 36.59375 17 L 34 19.59375 L 31.40625 17 L 27.59375 17 L 25 19.59375 L 22.40625 17 L 18.59375 17 L 16 19.59375 L 13.40625 17 Z M 11.5 17.90625 L 14.59375 21 L 11.5 24.09375 L 8.40625 21 Z M 20.5 17.90625 L 23.59375 21 L 20.5 24.09375 L 17.40625 21 Z M 29.5 17.90625 L 32.59375 21 L 29.5 24.09375 L 26.40625 21 Z M 38.5 17.90625 L 41.59375 21 L 38.5 24.09375 L 35.40625 21 Z M 16 22.40625 L 19.09375 25.5 L 16 28.59375 L 12.90625 25.5 Z M 25 22.40625 L 28.09375 25.5 L 25 28.59375 L 21.90625 25.5 Z M 34 22.40625 L 37.09375 25.5 L 34 28.59375 L 30.90625 25.5 Z M 11.5 26.90625 L 14.59375 30 L 11.5 33.09375 L 8.40625 30 Z M 20.5 26.90625 L 23.59375 30 L 20.5 33.09375 L 17.40625 30 Z M 29.5 26.90625 L 32.59375 30 L 29.5 33.09375 L 26.40625 30 Z M 38.5 26.90625 L 41.59375 30 L 38.5 33.09375 L 35.40625 30 Z M 16 31.40625 L 19.09375 34.5 L 16 37.59375 L 12.90625 34.5 Z M 25 31.40625 L 28.09375 34.5 L 25 37.59375 L 21.90625 34.5 Z M 34 31.40625 L 37.09375 34.5 L 34 37.59375 L 30.90625 34.5 Z"></path></svg>

            <span class="link-text">Sport Clubs</span>
          </router-link>
        </li>

        <li class="nav-item sport-club-li time-adj-li" v-if="isAdmin">
          <router-link :to="{ name: 'TimePart' }" class="nav-link">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              width="559.98px" height="559.98px" viewBox="0 0 559.98 559.98" style="enable-background:new 0 0 559.98 559.98;"
              xml:space="preserve">
            <g>
              <g>
                <path d="M279.99,0C125.601,0,0,125.601,0,279.99c0,154.39,125.601,279.99,279.99,279.99c154.39,0,279.99-125.601,279.99-279.99
                  C559.98,125.601,434.38,0,279.99,0z M279.99,498.78c-120.644,0-218.79-98.146-218.79-218.79
                  c0-120.638,98.146-218.79,218.79-218.79s218.79,98.152,218.79,218.79C498.78,400.634,400.634,498.78,279.99,498.78z"/>
                <path d="M304.226,280.326V162.976c0-13.103-10.618-23.721-23.716-23.721c-13.102,0-23.721,10.618-23.721,23.721v124.928
                  c0,0.373,0.092,0.723,0.11,1.096c-0.312,6.45,1.91,12.999,6.836,17.926l88.343,88.336c9.266,9.266,24.284,9.266,33.543,0
                  c9.26-9.266,9.266-24.284,0-33.544L304.226,280.326z"/>
              </g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            </svg>
              <span class="link-text">Times Adjustment</span>
          </router-link>
          <div class="time-sub-menu">
            <ul class="time-sub-ul">
              <li v-for="(subTitle, i) in timeSubMenuTitle" :key="i">
                <router-link :to="{ name: subTitle.route }">
                  {{ subTitle.title }}
                </router-link>
              </li>
            </ul>
          </div>
        </li>

        <li class="nav-bottom">
          <div class="nav-item-bottom">
            <router-link :to="{ name: 'Support' }" class="nav-link">
              <svg
                width="27"
                height="25"
                viewBox="0 0 27 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.3333 12.5145C25.3333 5.1945 19.6533 0.221161 13.3333 0.221161C7.08 0.221161 1.33333 5.08783 1.33333 12.5945C0.533333 13.0478 0 13.9012 0 14.8878V17.5545C0 19.0212 1.2 20.2212 2.66667 20.2212C3.4 20.2212 4 19.6212 4 18.8878V12.4745C4 7.36783 7.93333 2.90116 13.04 2.75449C18.32 2.59449 22.6667 6.83449 22.6667 12.0878V21.5545H13.3333C12.6 21.5545 12 22.1545 12 22.8878C12 23.6212 12.6 24.2212 13.3333 24.2212H22.6667C24.1333 24.2212 25.3333 23.0212 25.3333 21.5545V19.9278C26.12 19.5145 26.6667 18.7012 26.6667 17.7412V14.6745C26.6667 13.7412 26.12 12.9278 25.3333 12.5145Z"
                  fill="#222325"
                />
                <path
                  d="M9.33333 14.8878C10.0697 14.8878 10.6667 14.2909 10.6667 13.5545C10.6667 12.8181 10.0697 12.2212 9.33333 12.2212C8.59695 12.2212 8 12.8181 8 13.5545C8 14.2909 8.59695 14.8878 9.33333 14.8878Z"
                  fill="#222325"
                />
                <path
                  d="M17.3333 14.8878C18.0697 14.8878 18.6667 14.2909 18.6667 13.5545C18.6667 12.8181 18.0697 12.2212 17.3333 12.2212C16.597 12.2212 16 12.8181 16 13.5545C16 14.2909 16.597 14.8878 17.3333 14.8878Z"
                  fill="#222325"
                />
                <path
                  d="M21.3333 10.9278C20.6933 7.12783 17.3866 4.22116 13.4 4.22116C9.35998 4.22116 5.01331 7.56783 5.35998 12.8212C8.65331 11.4745 11.1333 8.54116 11.84 4.96783C13.5866 8.47449 17.1733 10.8878 21.3333 10.9278Z"
                  fill="#222325"
                />
              </svg>

              <span class="link-text">Support</span>
            </router-link>
            <div class="nav-link logout-button" @click="handleLogout">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    d="M14.9998 13.2213C14.4469 13.2213 13.9999 13.6693 13.9999 14.2212V18.2213C13.9999 18.7722 13.5519 19.2212 12.9998 19.2212H9.99983V4.22137C9.99983 3.36737 9.45583 2.60438 8.63791 2.32038L8.34183 2.22132H12.9998C13.5519 2.22132 13.9999 2.67029 13.9999 3.22144V6.22141C13.9999 6.77328 14.4469 7.22134 14.9998 7.22134C15.5528 7.22134 15.9998 6.77328 15.9998 6.22141V3.22144C15.9998 1.56746 14.6538 0.221466 12.9998 0.221466H2.24998C2.21189 0.221466 2.18003 0.238495 2.14304 0.243438C2.09489 0.23941 2.04893 0.221466 2.00004 0.221466C0.897024 0.221466 0 1.11831 0 2.22132V20.2211C0 21.0751 0.544001 21.8381 1.36192 22.1221L7.37999 24.1282C7.58397 24.1912 7.78684 24.2212 7.99998 24.2212C9.10299 24.2212 9.99983 23.3242 9.99983 22.2212V21.2213H12.9998C14.6538 21.2213 15.9998 19.8753 15.9998 18.2213V14.2212C15.9998 13.6693 15.5528 13.2213 14.9998 13.2213Z"
                    fill="black"
                  />
                  <path
                    d="M23.7068 9.51433L19.7067 5.51443C19.4209 5.22842 18.9908 5.14236 18.6169 5.29727C18.2439 5.45236 17.9998 5.81728 17.9998 6.22139V9.22136H13.9999C13.4479 9.22136 12.9998 9.66924 12.9998 10.2213C12.9998 10.7734 13.4479 11.2212 13.9999 11.2212H17.9998V14.2212C17.9998 14.6253 18.2439 14.9902 18.6169 15.1453C18.9908 15.3002 19.4209 15.2142 19.7067 14.9283L23.7068 10.9283C24.0977 10.5373 24.0977 9.90526 23.7068 9.51433Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.221161)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <span class="link-text">Logout</span>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ["clubInfo"],
  setup() {
    return { };
  },
  data() {
    return {
      // clubInfo: null
      timeSubMenuTitle: [
        {
          title: 'Time Part',
          route: 'TimePart'
        },
        {
          title: 'Day Part',
          route: 'DayPart'
        },
        {
          title: 'Week Part',
          route: 'WeekPart'
        },
      ],
      showSubTime: false
    }
  },
  methods: {
    onHover() {
      this.showSubTime = true
    },
    onLeave() {
      this.showSubTime = false
    },
    handleLogout() {
      try {
        this.$store.dispatch('logout');
        this.toast("User logged out 👏 See you again soon.", 3000, 'successed')
        setTimeout(() =>{
          this.$router.replace('/')
        }, 2000)
      } catch (err) {
        this.toast('Could not log user out 🙏', 3000, 'error')
      }
    }
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('roles') === 'ROLE_ADMIN'
    },
  }
};
</script>
<style>
:root {
  font-size: 16px;
  --bg-primary: #fff;
  --bg-secondary: #ffffff;
  --text-primary: #222325;
  --text-secondary: #222325;
  --text-hover: var(--blue);
  --transition-speed: 300ms;
}

body {
  color: black;
  margin: 0;
  padding: 0;
}
.club-logo {
  width: 100%;
  position: relative;
}
.navbar:hover .club-logo img {
  width: 50%;
}
.club-logo img {
  width: 100%;
}
.edit-club-icon {
  position: absolute;
  top: 10%;
  right: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, .2);
  z-index: 100;
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: none;
}
.navbar:hover .edit-club-icon {
  display: flex;
  /* color: var(--text-primary); */
}
.edit-club-icon svg {
  opacity: .5;
}
.edit-club-icon:hover {
  border: 2px solid var(--black);
  box-shadow: -3px 3px 0 rgba(0, 0, 0, 0.1);
}
.edit-club-icon:hover svg {
  filter: invert(9%) sepia(6%) saturate(676%) hue-rotate(182deg) brightness(94%) contrast(87%);
  opacity: 1;
}
.edit-club-icon svg {
  width: 1.4em;
  height: 1.4em;
  margin-top: .2em;
}
.navbar {
  position: fixed;
  background-color: var(--bg-secondary);
  transition: var(--transition-speed);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.navbar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.nav-item {
  width: 100%;
  display: flex;
}

li:nth-last-child(-n + 1) {
  margin-top: auto;
}

.nav-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 3.5rem;
  color: var(--text-primary);
  filter: grayscale(100%) opacity(0.8);
  transition: var(--transition-speed);
}

.logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  height: 5rem;
  color: var(--text-primary);
}

.nav-item:hover {
  font-weight: bold;
  filter: grayscale(0%) opacity(1);
  background: var(--text-hover);
  color: var(--text-secondary);
}

.nav-link:hover {
  filter: grayscale(0%) opacity(1);
  color: var(--text-secondary);
}

.link-text {
  display: none;
  margin-left: 0.2rem;
}

.nav-link svg {
  height: 3vh;
  min-width: 2rem;
  margin: 0 1.5rem;
}

.nav-link:hover path {
  fill: var(--black);
}
.sport-club-li svg{
  width: auto;
}
.nav-link path {
  fill: var(--black);
}
.navbar:hover .link-text {
  display: block;
  font-size: 2.5vh;
  color: var(--text-primary);
}
.nav-bottom {
  width: 100%;
  display: flex;
}

.navbar:hover .logo-text {
  display: flex;
  font-size: 1.5em;
  font-weight: 600;
  margin-left: 1em;
  color: var(--black);
}

.navbar:hover .club-text {
  display: block;
  font-size: 20px;
  margin-left: 20px;
  color: var(--text-primary);
}
.logo img {
  height: 3em;
  text-align: center;
  color: var(--text-secondary);
}
.logout-button {
  cursor: pointer;
}
.logout-button:hover {
  font-weight: 700;
}

.club-link {
  padding: 1em;
  margin-bottom: 0em;
}

.logo-text {
  display: none;
}
.club-link {
  text-decoration: none;
  text-align: center;
  display: block;
}

.club-text {
  display: none;
}

.time-adj-li {
  position: relative;
}
.time-sub-menu {
  display: none;
  position: absolute;
  height: auto;
  width: 9em;
  background: var(--white);
  border-radius: 0 5px 5px 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  top: 0;
  left: 100%;
}
.time-sub-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.time-sub-menu ul li {
  padding: .5em 1em;
  width: 100%;
  transition: .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.time-sub-menu ul li:nth-child(1)::before {
  content: '🕜 '
}
.time-sub-menu ul li:nth-child(2)::before {
  content: '🪟 '
}
.time-sub-menu ul li:nth-child(3)::before {
  content: '📅 '
}
.time-sub-menu ul li:hover {
  background: var(--blue);
}
.time-adj-li:hover .time-sub-menu {
  display: block;
}

@media only screen and (min-width: 600px) {
  .navbar {
    top: 0;
    width: 5rem;
    height: 100vh;
  }

  .navbar:hover {
    width: 16rem;
  }

  .navbar:hover .link-text {
    display: inline;
    transition: opacity var(--transition-speed);
  }
}

@media only screen and (max-width: 600px) {
  .navbar {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    bottom: 0;
    width: 100vw;
    height: 5rem;
  }
  .club-logo {
    display: none;
  }
  .logo {
    display: none;
  }

  .navbar-nav {
    flex-direction: row;
  }

  .nav-link {
    justify-content: center;
  }
  .navbar:hover .link-text {
    display: none;
    transition: opacity var(--transition-speed);
  }
  .nav-item:nth-last-child(-n + 2) {
    margin-top: 0;
  }
  .nav-item:nth-last-child(-n + 1) {
    margin-top: 0;
  }
  .nav-item-bottom {
    margin-bottom: 11px;
    display: flex;
  }
}
</style>