<template>
  <div class="youtube-video-item">
    <img class="video-item-image" :src="videoItem.snippet.thumbnails[thumbnailsType].url" alt />
    <div class="video-item-footer">
      <div class="video-item-button">
        <i class="material-icons">grade</i>
      </div>
      <div class="video-item-info">
        <div class="info-title">
          <p>{{videoItem.snippet.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../../style/style.scss";
.youtube-video-item {
  display: flex;
  box-sizing: border-box;
  background-color: white;
  flex: 0 0 calc(25% - #{$item-margin} * 2);
  margin: 0 $item-margin;
  flex-direction: column;
  .video-item-image {
    width: 100%;
    cursor: pointer;
  }
  .video-item-footer {
    height: $item-footer-height;
    display: flex;
    align-items: center;
    .video-item-button {
      margin-right: $item-button-margin-left;
    }
    .video-item-info {
      .info-title {
        p {
          font-size: $item-font-size;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
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
    }
  },
  computed: {
    itemImgHeight() {
      return 0;
    }
  }
};
</script>