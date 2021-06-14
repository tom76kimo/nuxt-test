<template>
  <ul class="article-list">
    <li class="article active" v-for="a in articleList" :key="a.id">
      <div class="single-article-container">
        <span class="article-title">{{ a.title }}</span>
        <span
          class="article-content-glance"
          v-for="c in a.content.slice(0, 2)"
          :key="c"
          >{{ c }}</span
        >
      </div>
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
  padding: 0;
}
.article {
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid #dedede;
  box-sizing: border-box;
  height: 80px;
  list-style: none;
  padding: 10px 10px 10px 15px;
}
.article.active {
  background-color: #fff;
}
.single-article-container {
  display: flex;
  flex-direction: column;
}
.article-title {
  font-weight: 400;
  font-size: 1.1rem;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.article-content-glance {
  font-size: 0.9rem;
  margin-bottom: 2px;
  color: #a3a3a3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
