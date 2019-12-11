<template>
  <div class="welcome">
    <h1>Welcome</h1>

    <div class="actions">
      <button @click="openGoogleSignin">Sign in with Google</button>
      <h3>test modules</h3>
      <div>center:{{ center }}</div>
      <div>zoom: {{ zoom }}</div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      center: "maps/center"
    }),
    ...mapGetters("maps", ["zoom"])
  },
  methods: {
    ...mapActions(["login"]),
    openGoogleSignin() {
      // TODO
      const url = "http://localhost:3000/auth/google";
      const name = "google_login";
      const specs = "width=500,height=500";
      window.open(url, name, specs);
    },
    handleMessage({ data, origin }) {
      if (origin !== "http://localhost:3000") {
        return;
      }
      if (data === "success") {
        this.login();
      }
    }
  },
  mounted() {
    window.addEventListener("message", this.handleMessage);
    console.log(this.center);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.handleMessage);
  }
};
</script>
