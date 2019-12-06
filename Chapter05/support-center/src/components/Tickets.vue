<template>
  <div class="tickets">
    <Loading v-if="remoteDataBudy" />

    <div class="empty" v-else-if="tickets.length === 0">
      You don't have any ticket yet.
    </div>

    <section v-else class="tickets-list">
      <div v-for="(ticket, index) in tickets" :key="index" class="ticket-item">
        <router-link :to="{ name: 'ticket', params: { id: ticket._id } }">
          {{ ticket.title }}
        </router-link>
        <span class="badge">{{ ticket.status }}</span>
        <span class="date">{{ ticket.date | date }}</span>
      </div>
    </section>
    <Ticket :id="id" v-if="id" />
  </div>
</template>
<script>
import RemoteData from '../minxins/RemoteData'
import Ticket from './Ticket'
export default {
  mixins: [
    RemoteData({
      tickets: 'tickets'
    })
  ],
  components: {
    Ticket
  },
  data () {
    return {
      id: null
    }
  }
}
</script>
