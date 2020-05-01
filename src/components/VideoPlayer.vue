<template>
  <div class="video-player">
    <div class="video">
      <video
        class="video-js vjs-default-skin vjs-big-play-centered"
        id="video-js-player"
        ref="videoPlayer"
        :poster="videoObject.items[0].snippet.thumbnails.high.url"
      ></video>
    </div>
    <VideoPlayerInfo
      :videoItem="videoObject=={}?'':videoObject.items[0]"
      :isFavorite="isFavorite(videoObject.items[0].id)"
      @collectVideo="collectVideo"
      @removeCollection="removeCollection"
    ></VideoPlayerInfo>
  </div>
</template>

<style lang="scss" scoped>
.video-player {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";

import VideoPlayerInfo from "./VideoPlayer/VideoPlayerInfo";

export default {
  name: "video-player",
  data() {
    return {
      player: null,
      videoObject: {}
    };
  },
  props: ["options", "videoID"],
  computed: {
    ...mapState([
      "videoList",
      "favoriteVideoList",
      "apiKey",
      "youtubeURL",
      "tokenList"
    ]),
    callAPIURL() {
      return `${this.youtubeURL}&key=${this.apiKey}`;
    }
  },
  methods: {
    ...mapActions(["getFavoriteVideoList"]),
    getAPIVideoObject() {
      return new Promise(resolve => {
        axios
          .get(this.callAPIURL + "&id=" + this.videoID)
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            resolve(err);
          });
      });
    },
    collectVideo(id) {
      let newFavoriteVideoList = this.favoriteVideoList;
      newFavoriteVideoList.push(id);
      localStorage.setItem("MyFavoriteVideoList", newFavoriteVideoList);
      this.getFavoriteVideoList();
    },
    removeCollection(id) {
      let removeIndex = this.favoriteVideoList.indexOf(id);
      console.log(removeIndex);
      let newFavoriteVideoList = this.favoriteVideoList;
      console.log(newFavoriteVideoList);
      removeIndex >= 0 ? newFavoriteVideoList.splice(removeIndex, 1) : "";
      localStorage.setItem("MyFavoriteVideoList", newFavoriteVideoList);
      this.getFavoriteVideoList();
    },
    isFavorite(id) {
      return this.favoriteVideoList.indexOf(id) >= 0;
    }
  },
  async mounted() {
    await this.getFavoriteVideoList();
    this.videoObject = await this.getAPIVideoObject();
    setTimeout(() => {
      this.player = this.$video(this.$refs.videoPlayer, this.options);
    }, 10);
  },
  components: {
    VideoPlayerInfo
  }
};
</script>