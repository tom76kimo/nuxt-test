<template>
  <div class="editor-container" @click="cleanupEditingState">
    <div class="editor-main">
      <div>adsf</div>
      <div>123</div>
      <div>adsfadsfef</div>
      <Editable isOnEditable="isOnEditable" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {};
  },
  methods: {
    cleanupEditingState() {
      this.$store.commit("editor/setOnEditing", { isOnEditing: false });
    }
  }
});
</script>

<style scoped>
.editor-container {
  margin: 0 auto;
  padding: 50px 10%;
  box-sizing: border-box;
}

.editor-main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
