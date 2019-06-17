<template>
  <v-flex v-flex xs8 offset-xs3 mt-5>
    <h1 class="artist-name">{{artist.name}}</h1>

    <!-- Audio Player -->
    <audio id="player" controls="" autoplay="" name="media" class="audio-player">
      <source src="audiofile" type="audio/mpeg">
    </audio>

    <!-- List of Albums -->
    <template
      v-if="albums.length !== 0"
      v-for="album in albums">
      <div class="album" :key="album.id">
        <v-toolbar flat dense dark class="album-title">
          <img :src="album.details.images[2].url"/>
          <v-toolbar-title>{{album.details.name}}</v-toolbar-title>
          <v-toolbar-items>
            <v-btn
              slot="action" class="white accent-2"
              @click="likeAlbum(album)"
              light small absolute right middle white fab>
              <v-icon v-if="!isAlbumLiked(album)">favorite_border</v-icon>
              <v-icon v-if="isAlbumLiked(album)">favorite</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <!-- List of album's tracks -->
        <div class="pl-4 pr-4 pt-2 pb-2">
          <slot>
            <v-list
              v-for="(track, index) in album.tracks"
              :key="track.id">
              <v-list-tile @click="playTrack(track)" class="track">
                <v-list-tile-content>
                  <v-list-tile-title>{{ index | numbers }} {{track.name}}</v-list-tile-title>
                </v-list-tile-content>
                <v-spacer></v-spacer>
                {{track.duration_ms | minutes}}
              </v-list-tile>
            </v-list>
          </slot>
        </div>
        <v-divider></v-divider>
      </div>
    </template>
  </v-flex>
</template>

<script>
import ArtistService from '@/services/ArtistService'
import AlbumService from '@/services/AlbumService'
import TrackService from '@/services/TrackService'
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      user: {},
      artist: {},
      albums: [],
      topTracks: [],
      selectedTrack: {},
      likedAlbums: []
    }
  },
  methods: {
    isAlbumLiked (album) {
      for (let i = 0; i < this.likedAlbums.length; i++) {
        if (this.likedAlbums[i].albumId === album.details.id) {
          return true
        }
      }
      return false
    },
    async likeAlbum (album) {
      if (!this.isAlbumLiked(album)) {
        await AlbumService.likeAlbum(this.user.id, album.details.id)
        console.log('not liked yet')
      } else {
        await AlbumService.unLikeAlbum(this.user.id, album.details.id)
      }
      this.likedAlbums = (await AlbumService.getUserLikedAlbums(this.user.id)).data
    },
    async playTrack (track) {
      try {
        // Highlight selected Track
        this.setTrackBackground(track)
        // Get Track details
        this.selectedTrack = (await TrackService.getTrackDetails(track.id)).data
        // Update audio player wih track
        let audio = document.getElementsByTagName('source')
        audio[0].setAttribute('src', this.selectedTrack.preview_url)
        document.getElementById('player').load()
      } catch (error) {
        console.log(error)
        this.listenInvalidToken(error)
      }
    },
    listenInvalidToken (error) {
      if ((error.response.data.error.message === 'Only valid bearer authentication supported') ||
          (error.response.data.error.status === 401)) {
        this.$store.dispatch('setToken', '')
        AuthenticationService.getToken()
      }
    },
    setTrackBackground (track) {
      let count = 0
      for (let i = 0; i < this.albums.length; i++) {
        for (let j = 0; j < this.albums[i].tracks.length; j++) {
          const t = this.albums[i].tracks[j]
          let color = '#FFFFFF'
          count++
          if (t === track) {
            color = '#90A4AE'
          }
          document.getElementsByClassName('track')[count - 1].style.backgroundColor = color
        }
      }
    }
  },
  async mounted () {
    try {
      this.user = this.$store.state.user
      // Extract token from URL
      const url = window.location.toString()
      if (url.includes('access_token=')) {
        const token = url.slice(url.indexOf('=') + 1, url.indexOf('&'))
        this.$store.dispatch('setToken', token)
      }
      // Fetch artist data (details, albums, tracks)
      const artistId = this.$store.state.artist
      this.artist = (await ArtistService.getArtistDetails(artistId)).data
      const response = (await ArtistService.getArtistAlbums(artistId)).data.items
      for (let i = 0; i < response.length; i++) {
        const albumId = response[i].id
        const tracks = (await AlbumService.getAlbumTracks(albumId)).data.items
        const album = {
          details: response[i],
          tracks: tracks
        }
        this.albums.push(album)
        console.log(album)
      }
      // Fetch user's liked albums
      this.likedAlbums = (await AlbumService.getUserLikedAlbums(this.user.id)).data
      console.log(this.likedAlbums)
    } catch (error) {
      console.log(error)
      // If token is expired or invalid
      this.listenInvalidToken(error)
    }
  }
}
</script>

<style scoped>

.artist-name {
  font-size: 40px;
  color: darkslategrey;
  padding-bottom: 10px;
}

.album {
  margin-top: 30px;
}
.album-title {
  padding-left: 20px;
  font-size: 24px;
  font-weight: bold;
  background-color: white;
  color: black;
  height: 70px;
}

.audio-player{
  position: fixed;
  z-index: 4;
  top: 97%;
  right: 30%;
  width: 550px;
  margin-top: -2.5em;
}

</style>
