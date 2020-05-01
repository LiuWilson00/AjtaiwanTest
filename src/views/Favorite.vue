<template>
  <div class="Favorite">
    <FavoriteVideoList></FavoriteVideoList>
  </div>
</template>
<script>
// @ is an alias to /src
import FavoriteVideoList from "@/components/FavoriteVideoList.vue";

export default {
  name: "Home",
  components: {
    FavoriteVideoList
  }
};
</script>
