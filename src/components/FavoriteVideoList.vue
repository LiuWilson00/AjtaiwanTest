<template>
  <div class="youtube-list">
    <div class="youtube-list-title">推薦影片</div>
    <div class="youtube-list-content">
      <YoutubeVideoItem
        v-for="videoItem in youtubeItems"
        :key="videoItem.id"
        :videoItem="videoItem"
        :isFavorite="isFavorite(videoItem.id)"
        @collectVideo="collectVideo"
        @removeCollection="removeCollection"
      ></YoutubeVideoItem>
    </div>
    <div class="youtube-list-directory">
      <ListDirectory
        :tokenList="favoritePageList"
        :nowPage="nowPage"
        @changePage="changePage"
        :range="5"
      ></ListDirectory>
    </div>
  </div>
</template>
<style lang="scss" src="../style/YoutubeVideoList/YoutubeVideoList.scss" scoped>
</style>

<script>
import { mapActions, mapState } from "vuex";
import YoutubeVideoItem from "./YoutubeViedoList/YoutubeVideoItem";
import ListDirectory from "./YoutubeViedoList/ListDirectory";

export default {
  name: "youtube-list",
  data() {
    return {
      chart: "mostPopular",
      nowPage: 1
    };
  },
  computed: {
    ...mapState([
      "videoList",
      "favoriteVideoList",
      "apiKey",
      "youtubeURL",
      "tokenList"
    ]),
    favoritePageList() {
      return [
        ...Array(Math.floor(this.favoriteVideoList.length / 12) + 1).keys()
      ].map(e => e + 1);
    },
    youtubeItems() {
      let newvideoList = this.videoList.items;
      return newvideoList == undefined
        ? []
        : newvideoList.map(item => {
            item.isFavorite = this.isFavorite(item.id);
            return item;
          });
    },
    callAPIURL() {
      return `${this.youtubeURL}&key=${this.apiKey}`;
    },
    nowFavoriteVideo() {
      return this.favoriteVideoList.slice(
        (this.nowPage - 1) * 12,
        this.nowPage * 12
      );
    }
  },
  methods: {
    ...mapActions([
      "getVideoFormYoutube",
      "getFavoriteVideoList",
      "getTokenList"
    ]),
    collectVideo(id) {
      let newFavoriteVideoList = this.favoriteVideoList;
      newFavoriteVideoList.push(id);
      localStorage.setItem("MyFavoriteVideoList", newFavoriteVideoList);
      this.getFavoriteVideoList();
    },
    removeCollection(id) {
      let removeIndex = this.favoriteVideoList.indexOf(id);
      
      let newFavoriteVideoList = this.favoriteVideoList;
      
      removeIndex >= 0 ? newFavoriteVideoList.splice(removeIndex, 1) : "";
      localStorage.setItem("MyFavoriteVideoList", newFavoriteVideoList);
      this.getFavoriteVideoList();
    },
    isFavorite(id) {
      return this.favoriteVideoList.indexOf(id) >= 0;
    },
    changePage(pageNumber) {
      this.nowPage = pageNumber;
    }
  },
  mounted() {
    this.getFavoriteVideoList();
    this.getVideoFormYoutube(
      this.callAPIURL + "&id=" + this.nowFavoriteVideo.join()
    );
  },
  watch: {
    nowPage: {
      handler() {
        this.getVideoFormYoutube(
          this.callAPIURL + "&id=" + this.nowFavoriteVideo.join()
        );
      }
    }
  },
  components: {
    YoutubeVideoItem,
    ListDirectory
  }
};
</script>