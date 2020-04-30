import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const youtubeURL = "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=12&key=AIzaSyAmVTuMZ3S8Gig6YFQaCztNQiT2sGL515E"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videoList: {}
  },
  mutations: {
    SET_VIDEO_LIST(state, video) {
      state.videoList = video
    }
  },
  actions: {
    async getVideoFormYoutube({ commit }) {
      await axios.get(youtubeURL)
        .then(res => {
          commit("SET_VIDEO_LIST", res.data)

        }).catch(() => {
          commit("SET_VIDEO_LIST", false)

        })
    }
  },
  modules: {
  }
})
