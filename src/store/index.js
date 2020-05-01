import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

//https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&maxResults=12&
//id=lZDLxyAUHHA,RH3Rp80rbkQ&key=AIzaSyAmVTuMZ3S8Gig6YFQaCztNQiT2sGL515E
Vue.use(Vuex)

function getToken(youtubeURL) {
  return new Promise((resolve, reject) => {
    axios.get(youtubeURL).then(res => {
      resolve(res.data.nextPageToken)
    }).catch(err => {
      reject(err)
    })
  })
}


export default new Vuex.Store({
  state: {
    videoList: {},
    favoriteVideoList: [],
    apiKey: "AIzaSyAmVTuMZ3S8Gig6YFQaCztNQiT2sGL515E",
    youtubeURL: "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&maxResults=12",
    tokenList: []
  },
  mutations: {
    SET_VIDEO_LIST(state, video) {
      state.videoList = video
    },
    SET_FAVORITE_LIST(state, favorite) {
      state.favoriteVideoList = favorite
    },
    PUSH_TOKEN_LIST(state, token) {
      state.tokenList.push(token)
    },
    RESET_TOKEN_LIST(state) {
      state.tokenList = []
    }
  },
  actions: {
    async getVideoFormYoutube({ commit }, youtubeURL) {
      await axios.get(youtubeURL)
        .then(res => {
          commit("SET_VIDEO_LIST", res.data)

        }).catch(() => {
          commit("SET_VIDEO_LIST", false)

        })
    },
    getFavoriteVideoList({ commit }) {
      let favoriteVideoListString = localStorage.getItem("MyFavoriteVideoList")
      let favoriteVideoList = [...new Set(favoriteVideoListString == null ? [] : favoriteVideoListString.split(","))]

      commit("SET_FAVORITE_LIST", favoriteVideoList)
    },
    async getTokenList({ commit }, youtubeURL) {
      commit("RESET_TOKEN_LIST")
      commit("PUSH_TOKEN_LIST", "")
      let token = ""
      while (token != undefined) {
        let newToken = token == "" ?
          await getToken(youtubeURL) :
          await getToken(youtubeURL + "&pageToken=" + token)

        await newToken != undefined ? commit("PUSH_TOKEN_LIST", newToken) : ""

        token = newToken
      }

    }
  },
  modules: {
  }
})
