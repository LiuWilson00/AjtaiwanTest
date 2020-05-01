<template>
  <div class="directory">
    <button class="before-gotop" :disabled="nowPage==1" @click="changePage(1)">
      <i class="material-icons">arrow_back_ios</i>
    </button>
    <button class="before-button" :disabled="nowPage==1" @click="changePage(nowPage-1 )">
      <i class="material-icons">navigate_before</i>
    </button>
    <div
      class="page-item"
      v-for="(page) in displayItems"
      :key="page"
      :class="{active:tokenList.indexOf(page)+1==nowPage}"
      @click="changePage(tokenList.indexOf(page)+1)"
    >{{tokenList.indexOf(page)+1}}</div>
    <button
      class="next-button"
      :disabled="nowPage==tokenList.length"
      @click="changePage(nowPage+1)"
    >
      <i class="material-icons">navigate_next</i>
    </button>
    <button class="before-godown" :disabled="nowPage==1" @click="changePage(tokenList.length )">
      <i class="material-icons">arrow_forward_ios</i>
    </button>
  </div>
</template>
<style src="../../style/YoutubeVideoList/ListDirectory.scss" lang="scss" scoped>
</style>
<script>
export default {
  name: "directory",
  props: {
    tokenList: {
      type: Array,
      default: new Array()
    },
    nowPage: {
      type: Number,
      default: 1
    },
    range: {
      type: Number
    }
  },
  computed: {
    displayItems() {
      if (this.nowPage < 4) {
        return this.tokenList.slice(0, this.range);
      }
      if (
        this.nowPage >
          this.tokenList.length - this.range + Math.floor(this.range / 2) &&
        this.tokenList.length > 5
      ) {
        return this.tokenList.slice(this.tokenList.length - this.range);
      }

      return this.tokenList.slice(
        this.nowPage - Math.floor(this.range / 2) - 1,
        this.nowPage + Math.floor(this.range / 2)
      );
    }
  },
  methods: {
    changePage(pageNumber) {
      this.$emit("changePage", pageNumber);
    }
  }
};
</script>