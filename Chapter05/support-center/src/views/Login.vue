<template>
  <main class="login">
    <h1>Please login to continue</h1>
    <smart-form
      class="form"
      :title="title"
      :operation="operation"
      :valid="valid"
    >
      <!-- <form-input
        name="username"
        :value="username"
        placeholder="Username"
        @input="val => username =val"
        v-model="username"
      /> -->
      <FormInput
        name="username"
        :value="username"
        placeholder="Username"
        v-model="username"
      />
      <FormInput
        name="password"
        type="password"
        :value="password"
        placeholder="Password"
        v-model="password"
      />
      <template v-if="mode === 'signup'">
        <FormInput
          name="verify-password"
          type="password"
          :value="password2"
          placeholder="Retype Password"
          v-model="password2"
          :invalid="retypePasswordError"
        />
        <FormInput
          name="email"
          :value="email"
          placeholder="Email"
          v-model="email"
        />
      </template>
      <!-- actions -->
      <template slot="actions">
        <template v-if="mode === 'login'">
          <button
            type="button"
            class="secondary"
            @click="mode = 'signup'"
            >Sign up</button>
          <button type="submit"
            :disabled="!valid">
            Login
          </button>
        </template>
        <template v-else-if="mode === 'signup'">
          <button type="button" class="secondary" @click="mode = 'login'">Back to login</button>
          <button type="submit" :disabled="!valid">
            Create account
          </button>
        </template>
      </template>
    </smart-form>
  </main>
</template>
<script>
export default {
  data () {
    return {
      mode: 'login',
      username: '',
      password: '',
      password2: '',
      email: ''
    }
  },
  computed: {
    title () {
      let res
      switch (this.mode) {
        case 'login' :
          res = 'Login'
          break
        case 'signup' :
          res = 'Create a new account'
          break
      }
      return res
    },

    retypePasswordError () {
      return this.password2 && this.password !== this.password2
    },

    signupValid () {
      return this.password2 && this.email && !this.retypePasswordError
    },

    valid () {
      return this.username && this.password && (this.mode !== 'signup' || this.signupValid)
    }
  },

  methods: {
    async operation () {
      await this[this.mode]()
    },

    async login () {
      // TODO
      this.$state.user = await this.$fetch('login', {
        method: 'POST',
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })
      this.$router.replace(this.$route.params.wantedRoute || { name: 'home' }) // 将浏览器历史记录中的当前条目调换为新路由，而不是添加新条目
    },

    async signup () {
      // TODO
      await this.$fetch('signup', {
        method: 'POST',
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          email: this.email
        })
      })
      this.mode = 'login'
    }
  }
}
</script>
<style lang="stylus" scoped>
.form {
  >>> .content {
    max-width 400px
  }
}
</style>
