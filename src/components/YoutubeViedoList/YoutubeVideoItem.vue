<template>
  <div class="youtube-video-item">
    <img
      class="video-item-image"
      @click="intoVideo"
      :src="videoItem.snippet.thumbnails[thumbnailsType].url"
      alt
    />
    <div class="video-item-footer">
      <button class="video-item-button" @click="collectVideoButton(videoItem.id)">
        <i class="material-icons" :class="{favorite:isFavorite}">grade</i>
      </button>
      <div class="video-item-info">
        <div class="info-title">
          <p @click="intoVideo">{{videoItem.snippet.title}}</p>
        </div>
        <div class="info-duration">
          <p>{{videoItemDuration}}</p>
        </div>
      </div>
    </div>
    <div class="video-item-description">
      <p>Description:</p>
      <p>
        {{videoItemDescription}}
        <button class="item-description-button" @click="intoVideo">...more</button>
      </p>
    </div>
  </div>
</template>
<style lang="scss" src="../../style/YoutubeVideoList/YoutubeVideoItem.scss" scoped></style>
<script>
export default {
  name: "youtube-video-item",
  props: {
    videoItem: {
      type: Object,
      required: true
    },
    thumbnailsType: {
      type: String,
      default: "default"
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    itemImgHeight() {
      return 0;
    },
    videoItemDescription() {
      return `${this.videoItem.snippet.description
        .replace("\n", "")
        .substr(0, 50)}`;
    },
    videoItemDuration() {
      return this.videoItem.contentDetails.duration
        .replace("PT", "")
        .replace("M", " minute ")
        .replace("S", " second");
    }
  },
  methods: {
    collectVideoButton(id) {
      if (this.isFavorite) {
        this.$emit("removeCollection", id);
      } else {
        this.$emit("collectVideo", id);
      }
    },
    intoVideo() {
      console.log(this.$router);
      this.$router.push({
        name: "Video",
        params: { id: this.videoItem.id }
      });
    }
  }
};
</script>