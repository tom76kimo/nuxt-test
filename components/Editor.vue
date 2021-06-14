<template>
  <div contenteditable="true" class="editor-container">
    <div class="editor-main"></div>
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
