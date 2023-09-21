<template>
  <div class="user-view">
    <div class="user-view-title">
      <h1>⚽ {{ user.first_name }} {{user.last_name}}</h1>
      <div class="created-at">
        <p>Registered At: </p>
        <h3>{{ format(new Date(user.createdAt), 'MMM do yyyy') }}</h3>
      </div>
    </div>
    <div class="user-view-row01">
      <div class="user-email">
        <h2>🤪</h2>
        <p>User Email:</p>
        <h2>{{ user.email }}</h2>
      </div>
      <div class="user-phone">
        <h2>😗</h2>
        <p>Personal Phone Number:</p>
        <h2>{{ user.phone_num }}</h2>
      </div>
      <div class="user-id">
        <h2>😎</h2>
        <p>User ID:</p>
        <h2>{{ user.id }}</h2>
      </div>
      <div class="user-city">
        <h2>😛</h2>
        <p>City/Province:</p>
        <h2>{{ user.city }}</h2>
      </div>
      <div class="user-member">
        <h2>🥱</h2>
        <p>Membership:</p>
        <h2>{{ user.membership.name }}</h2>
      </div>
      <div class="user-payway">
        <h2>🤑</h2>
        <p>User Role:</p>
        <h2>{{ user.roles[0].name }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  setup(props, {emit}) {
    const user = props.user;

    return { format }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.user-view-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-view p {
  font-size: 1.2em;
}
.user-view-row01 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1.5rem;
  text-align: center;
  margin-top: 1.5em;
}
.user-view-row01 div:not(:first-child) h2 {
  text-transform: capitalize;
}
.user-view-row01 {
  margin-bottom: 1em;
}
</style>