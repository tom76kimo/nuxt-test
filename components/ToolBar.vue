<template>
  <div class="toolbar">
    <button @click="addArticle">Create</button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {};
  },
  computed: {},
  methods: {
    addArticle() {
      this.$store.dispatch('articles/addArticleAction');
    }
  }
});
</script>
<style scoped>
.toolbar {
  height: 40px;
  border-bottom: 1px solid #dedede;
  border-right: 1px solid #dedede;
  background-color: #fbfbfb;
}
</style>
