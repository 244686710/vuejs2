<template>
  <div class="ticket">
    <h2>Ticket</h2>
    <Loading v-if="remoteDataLoading" />
    <div class="empty" v-else-if="!ticket">
      Ticket not found.
    </div>
    <template v-else>
      <!-- General info -->
      <section>
        <div class="info">
          Created on <strong>{{ ticket.date | date }}</strong>
        </div>
        <div class="info">
          Auther <strong>{{ ticket.user.username }}</strong>
        </div>
        <div class="info">
          Status <span class="badge">{{ ticket.status }}</span>
        </div>
      </section>
      <!-- Content -->
      <section class="content">
        <h3>{{ ticket.title }}</h3>
        <p>{{ ticket.description }}</p>
      </section>
    </template>
  </div>
</template>

<script>
import RemoteData from '../minxins/RemoteData'
export default {
  mixins: [
    RemoteData({
      ticket () {
        return `ticket/${this.id}`
      }
    })
  ],
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>
