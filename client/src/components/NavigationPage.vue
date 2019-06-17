<template>
  <v-navigation-drawer fixed>
    <v-toolbar flat class="blue-grey lighten-2" />
    <v-divider></v-divider>

    <!-- Menu elements when User Logged out -->
    <v-list blue dense class="pt-0">
      <v-list-tile
        v-for="item in linksLogout"
        :key="item.title"
        @click="navigateTo({name: item.route})"
        v-if="!$store.getters.isUserLoggedIn">

        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <!-- Menu elements when User is Logged in -->
      <v-list-tile
        v-for="item in linkLogin"
        :key="item.title"
        @click="navigateTo({name: item.route})"
        v-if="$store.getters.isUserLoggedIn">

        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    data () {
      return {
        linkLogin: [
          {title: 'Tracks', icon: 'music_note', route: 'artist-details'},
          {title: 'Albums', icon: 'album', route: 'favourites'},
          {title: 'Log Out', icon: 'lock', route: 'logout'}
        ],
        linksLogout: [
          {title: 'Login', icon: 'fingerprint', route: 'login'},
          {title: 'Sign Up', icon: 'input', route: 'register'}
        ]
      }
    },
    methods: {
      async navigateTo (route) {
        if (route.name === 'logout') {
          this.$store.dispatch('setToken', '')
          this.$store.dispatch('setUser', '')
          this.$router.push('/login')
        }
        else {
          this.$router.push({name: route.name})
        }
      }
    }
  }
</script>

<style scoped>

</style>
