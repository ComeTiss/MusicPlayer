<template>
  <div id="background">
    <v-layout>
      <v-flex mt-5 offset-xs3 xs6>
          <form autocomplete="off">
            <v-text-field
              label="Email"
              v-model="email"/>
            <br>
            <v-text-field
              autocomplete="new-password"
              label="Password"
              type="password"
              v-model="password"/>
            <br>
            <div class="error" v-html="error"/>
            <br>
            <v-btn @click="register" class="blue-grey lighten-2" dark>Register</v-btn>
          </form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({name: 'artist-details'})
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
  .error {
    color: red;
  }
</style>
