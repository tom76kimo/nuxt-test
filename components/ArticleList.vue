<template>
  <ul class="article-list-main">
    <li
      :class="{ article: true, active: currentIndex == i }"
      v-for="(a, i) in articleList"
      :key="a.id"
      @click.stop="onSelect(i)"
    >
      <div class="single-article-container">
        <span class="article-title">{{ a.title }}</span>
        <span class="article-content-glance">{{ findContent(a.content) }}</span>
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {};
  },
  computed: {
    articleList() {
      const articleList = this.$store.state.articles.list;
      return articleList;
    },
    currentIndex(): number {
      return this.$store.state.articles.currentIndex;
    }
  },
  methods: {
    onSelect(i: number) {
      this.$store.commit('articles/setCurrentIndex', i);
    },
    findContent(content: { content?: object[] }) {
      let finalContent: any = content;
      while (finalContent.content && Array.isArray(finalContent.content)) {
        finalContent = finalContent.content[0];
      }
      // Don't show the json structure when no `text` presented.
      return finalContent.text ? finalContent.text : '';
    }
  }
});
</script>
<style scoped>
.article-list-main {
  border-right: 1px solid #dedede;
  background-color: #fbfbfb;
  padding: 0;
  height: calc(100vh - 40px);
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
