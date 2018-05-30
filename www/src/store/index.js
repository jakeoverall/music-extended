import vue from 'vue'
import vuex from 'vuex'
import router from '../router'
import axios from 'axios'
import store from '../store'

vue.use(vuex)

var api = axios.create({
    baseURL: 'https://itunes.apple.com/',
    timeout: 3000
})

var server = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000
})

function swapUrlSize(url, pixels) {
    var sizeString = `${pixels}x${pixels}`;
    var newURL = url.replace("60x60", sizeString);
    return newURL;
}

export default new vuex.Store({
    state: {
        songs: [],
        playlist: [],
        activePlaylist: {},
        //user: {}
    },

    mutations: {
        setSongs(state, songs) {
            state.songs = songs
        },
        addSong(state, newList) {
            state.activePlaylist = newList
        },
        removeSong(state, indexToRemove) {
            state.playlist.splice(indexToRemove, 1)
        },
        setPlaylists(state, lists) {
            state.playlist = lists
        },
        setActivePlaylist(state, list) {
            state.activePlaylist = list
        },
        // setUser(state, user) {
        //     state.user = user
        // },
    },

    actions: {
        addSong({ commit, dispatch, state }, song) {
            debugger //error here you dont have an activePlaylist
            state.activePlaylist.songs.push(song) 
            server.put('/playlist/' + state.activePlaylist._id, state.activePlaylist)
                .then(newList => {
                    commit('addSong', newList)
                })
        },

        findSong({ commit, dispatch }, query) {
            api.get('search?media=music&term=' + query)
                .then(res => {
                    var songList = res.data.results.map(function (song) {
                        return {
                            title: song.trackName,
                            albumArt: swapUrlSize(song.artworkUrl60, 275),
                            artist: song.artistName,
                            collection: song.collectionName,
                            price: song.collectionPrice,
                            preview: song.previewUrl
                        };
                    })
                    commit('setSongs', songList)
                })
        },

        removeSong({ dispatch, commit, state }, song) {
            var index = state.playlist.findIndex(s => s.id == song.id)
            commit('removeSong', index)
        },
        // addUser({ dispatch, commit }, user) {
        //     server.post('/api/create', user)
        //         .then(newUser => {
        //             commit('setUser', newUser)
        //             router.push('/home')
        //         })
        // },
        // getUser({ dispatch, commit }, user) {
        //     server.post('/api/login', user)
        //         .then(newUser => {
        //             commit('setUser', newUser)
        //         })
        //},
        getPlaylists({ dispatch, commit, state }) {
            server.get('/api/user-playlists/')      //+ state.user._id
                .then(lists => {
                    commit('setPlaylists', lists)
                })
        },
        activePlaylist({ dispatch, commit }, list) {
            commit('setActivePlaylist', list)
        }

    }
})