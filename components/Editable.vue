<template>
  <div
    class="editable"
    @click.stop="onClick"
    :class="{ active: isOnEditing }"
  ></div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {};
  },
  methods: {
    onClick() {
      this.$store.commit("editor/setOnEditing", { isOnEditing: true });
    }
  },
  computed: {
    isOnEditing() {
      return this.$store.state.editor.isOnEditing;
    }
  }
});
</script>

<style scoped>
.editable {
  height: 30px;
  cursor: text;
  width: 100%;
}

.active {
  background: #aaa;
}
</style>
