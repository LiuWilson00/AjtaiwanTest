<template>
  <div class="youtube-video-item">
    <div class="video-item-footer">
      <button class="video-item-button" @click="collectVideoButton(videoItem.id)">
        <i class="material-icons" :class="{favorite:isFavorite}">grade</i>
      </button>
      <div class="video-item-info">
        <div class="info-title">
          <p>{{videoItem.snippet.title}}</p>
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
        <button
          class="item-description-button"
          @click="readMore"
        >...{{isMore?"less":"more"}}</button>
      </p>
    </div>
  </div>
</template>
<style lang="scss" src="../../style/YoutubeVideoList/VideoPlayInfo.scss" scoped></style>
<script>
export default {
  name: "youtube-video-item",
  data() {
    return {
      isMore: false
    };
  },
  props: {
    videoItem: {
      type: Object,
      required: true
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
      if (this.isMore) {
        return this.videoItem.snippet.description;
      } else {
        return `${this.videoItem.snippet.description
          .replace("\n", "")
          .substr(0, 50)}`;
      }
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
    readMore() {
      this.isMore = !this.isMore;
    }
  }
};
</script>