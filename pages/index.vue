<template>
  <div class="container">
    <div class="sidebar"></div>
    <div class="article-list">
      <ToolBar />
      <ArticleList />
    </div>
    <Editor class="editor" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {};
  },
  async asyncData(context) {},
  mounted() {
    this.$store.dispatch('articles/fetchArticles');
  }
});
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 780px;
  background-color: #dedede;
}

.sidebar {
  flex: 0 0;
  flex-basis: 50px;
  background: black;
  min-height: 100vh;
}

.article-list {
  flex: 0 0;
  width: 150px;
  flex-basis: 150px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.editor {
  flex: 1 1;
  height: 100vh;
  overflow-y: scroll;
}
</style>

<style>
html {
  font-size: 12px;
}
</style>
