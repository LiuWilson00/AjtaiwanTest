<template>
  <div class="Video">
    <div class="header">
      <button @click="backToMenu">
        <i class="material-icons">keyboard_backspace</i>
      </button>
    </div>

    <VideoPlayer :videoID="videoID" :options="videoOptions"></VideoPlayer>
  </div>
</template>
<style lang="scss" scoped>
@import "../style/style.scss";
.header {
  width: 600px;
  button {
    background-color: transparent;
    border: 0;
  }
}
</style>
<script>
// @ is an alias to /src
import VideoPlayer from "@/components/VideoPlayer.vue";

export default {
  name: "Home",
  data() {
    return {
      videoID: this.$route.params.id,
      videoOptions: {
        autoplay: false,
        controls: true,
        width: "600",
        height: "400",
        sources: [
          {
            src:
              "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
            type: "application/x-mpegURL"
          }
        ]
      }
    };
  },
  methods: {
    backToMenu() {
      this.$router.go(-1);
    }
  },
  components: {
    VideoPlayer
  }
};
</script>
