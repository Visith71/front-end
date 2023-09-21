<template>
  <div class="user-view">
    <div class="user-view-title">
      <h1>⚽ Transaction Details</h1>
      <div class="created-at">
        <p>Transaction ID: </p>
        <h3>{{ transaction.id }}</h3>
      </div>
    </div>
    <div class="user-view-row01 transaction-view-row01">
      <div class="user-email">
        <h2>💵</h2>
        <p>Total Amount:</p>
        <h2>$ {{ transaction.payment_amount.toFixed(2) }}</h2>
      </div>
      <div class="user-phone">
        <h2>🧶</h2>
        <p>Payway Status:</p>
        <h2>{{ transaction.payment_status }}</h2>
      </div>
      <div class="user-id">
        <h2>😀</h2>
        <p>Transfered By:</p>
        <h2>{{ transaction.user.membership.name.toUpperCase() }}</h2>
      </div>
      <div class="user-city transaction-email">
        <h2>📧</h2>
        <p>Transfered Email:</p>
        <h2>{{ transaction.user.email }}</h2>
      </div>
    </div>
    <div class="user-view-row02 transaction-view-row02">
      <div class="user-city">
        <h2>📆</h2>
        <p>Transfered Date:</p>
        <h2>{{ format(new Date(transaction.createdAt), 'MMM do yyyy') }}<br>{{ format(new Date(transaction.createdAt), 'HH:mm bbbb') }}</h2>
      </div>
      <div class="user-city">
        <h2>📅</h2>
        <p>Play Date:</p>
        <h2>{{ format(new Date(transaction.play_date), 'MMM do yyyy') }}</h2>
      </div>
      <div class="user-member">
        <h2>⏰</h2>
        <p>Play Time:</p>
        <h2>{{ transaction.time_in.slice(0,5) }} - {{ transaction.time_out.slice(0,5) }}</h2>
      </div>
      <div class="user-member">
        <h2>🥅</h2>
        <p>Pitch Name:</p>
        <h2>{{ transaction.pitch_detail.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  setup(props, {emit}) {
    const transaction = props.transaction;

    return { format }
  },
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.transaction-view-row01,
.transaction-view-row02 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: .5em;
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
.transaction-view-row01 div h2,
.transaction-view-row02 div h2 {
  font-size: 1.2em;
}
</style>