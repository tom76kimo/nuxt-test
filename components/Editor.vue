<template>
  <div
    contenteditable="true"
    class="editor-container"
    @click="cleanupEditingState"
  >
    <div class="editor-main">
      <div v-for="article in articleList" :key="article.id">
        {{ article.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {};
  },
  methods: {},
  computed: {}
});
</script>

<style scoped>
.editor-container {
  margin: 0 auto;
  padding: 50px 10%;
  box-sizing: border-box;
  background-color: #fbfbfb;
  outline: none;
}

.editor-main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
