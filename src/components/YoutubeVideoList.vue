<template>
  <div class="youtube-list">
    <div class="youtube-list-title">推薦影片</div>
    <div class="youtube-list-content">
      <YoutubeVideoItem
        v-for="videoItem in videoList.items"
        :key="videoItem.id"
        :videoItem="videoItem"
      ></YoutubeVideoItem>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.youtube-list {
  display: flex;
  flex-direction: column;
  .youtube-list-title {
  }
  .youtube-list-content {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
  }
}
</style>

<script>
import { mapActions, mapState } from "vuex";
import YoutubeVideoItem from "./YoutubeViedoList/YoutubeVideoItem";

export default {
  name: "youtube-list",
  computed: {
    ...mapState(["videoList"])
  },
  methods: {
    ...mapActions(["getVideoFormYoutube"])
  },
  mounted() {
    this.getVideoFormYoutube();
  },
  components: {
    YoutubeVideoItem
  }
};
</script>