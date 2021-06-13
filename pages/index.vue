<template>
  <div class="container">
    <div class="sidebar"></div>
    <div class="article-list"></div>
    <Editor class="editor" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      name: 'Tom'
    }
  }
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.sidebar {
  flex: 1;
  background: green;
  min-height: 100vh;
}

.article-list {
  flex: 2;
  background: gray;
  min-height: 100vh;
}

.editor {
  flex: 10;
  min-height: 100vh;
}
</style>
