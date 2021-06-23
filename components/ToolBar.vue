<template>
  <div class="toolbar">
    <input class="search-box" type="input" />
    <button class="create-btn" @click="addArticle">
      <font-awesome-icon icon="plus-circle"></font-awesome-icon>
    </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlusCircle);

export default Vue.extend({
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px;
}
.create-btn {
  background: transparent;
  border: 0;
  cursor: pointer;
  outline: #dedede;
  flex: 1 1;
  width: 1px;
  padding-right: 0;
}
.search-box {
  flex: 8 8;
  width: 1px;
  border: 1px solid #cacaca;
  border-radius: 3px;
}
</style>
