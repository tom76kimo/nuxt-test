<template>
  <ul class="article-list">
    <li class="article" v-for="a in articleList" :key="a.id">
      {{ a.title }}
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  computed: {
    articleList() {
      return this.$store.state.articles.list;
    }
  }
});
</script>
<style scoped>
.article-list {
  border-right: 1px solid #dedede;
  background: #fbfbfb;
}
.article {
  list-style: none;
}
</style>
