<template>

  <div class="hello">
    <div class="searchbar">
      <form @submit.prevent="findSongs">
        <input type="text" v-model="query">
      </form>
    </div>
    <div>
      <!-- <button :v-for="playlist in playlists" @click="activePlaylist(playlist)">{{playlist.title}}</button> -->
    </div>

<div class="songs-section">
<div class="results">
        <h4>Results for {{title}}:</h4>
        <div class="row">
          <songs :list="songs" button-text="Add to playlist" :handle-button-click="addSong"></songs>
        </div>
      </div>
      
      <hr>
      <div class="playlist">
        <div class="row">
          <songs :list="playlists" button-text="Remove from playlist" :handle-button-click="removeSong"></songs>
        </div>
      </div>
    </div>

    <div class="detailed-view">
      details here
    </div>
  </div>

</template>

<script>

import songs from "./SongDetails.vue";
export default {
  name: "Home",
  components: {
    songs
  },
  data() {
    return {
      query: "",
      title: "",
      playlist: {}
    };
  },

  computed: {
    songs() {
      return this.$store.state.songs;
    },
    playlists() {
      return this.$store.state.playlist;
    },
    activeSong() {
      return this.$store.state.activeSong
    }
  },

  methods: {
    findSongs() {
      this.$store.dispatch("findSong", this.query);
      this.title = this.query;
      this.query = "";
    },
    addSong(song) {
      this.$store.dispatch("addSong", song);
    },
    removeSong(song) {
      this.$store.dispatch("removeSong", song);
    },
    activePlaylist(list) {
      this.$store.dispatch("activePlaylist", list);
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.songs-section {
  display: grid;
  grid-template-areas: "results playlist";
}
.results {
  grid-area: results;
}
.playlist {
  grid-area: watchlist;
}
ol {
  list-style-type: none;
}
</style>