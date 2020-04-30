<template>
  <div class="home">
    <YoutubeVideoList></YoutubeVideoList>
  </div>
</template>

<script>
// @ is an alias to /src
import YoutubeVideoList from "@/components/YoutubeVideoList.vue";

export default {
  name: "Home",
  components: {
    YoutubeVideoList
  }
};
</script>
