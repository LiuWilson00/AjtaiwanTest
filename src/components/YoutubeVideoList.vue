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
      <ListDirectory :tokenList="tokenList" :nowPage="nowPage" @changePage="changePage" :range="5"></ListDirectory>
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
      return `${this.youtubeURL}&key=${this.apiKey}&chart=${this.chart}`;
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
      console.log(removeIndex);
      let newFavoriteVideoList = this.favoriteVideoList;
      console.log(newFavoriteVideoList);
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
    this.getVideoFormYoutube(this.callAPIURL);
    this.getFavoriteVideoList();
    this.getTokenList(this.callAPIURL);
  },
  watch: {
    nowPage: {
      handler(val) {
        if (val <= 1) {
          this.getVideoFormYoutube(this.callAPIURL);
        } else {
          this.getVideoFormYoutube(
            this.callAPIURL + "&pageToken=" + this.tokenList[this.nowPage - 1]
          );
        }
      }
    }
  },
  components: {
    YoutubeVideoItem,
    ListDirectory
  }
};
</script>