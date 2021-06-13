<template>
  <div class="editable" @click="onClick" :class="{active: isOnEdit}" @blur="onBlur"></div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
        isOnEdit: false
    }
  },
  methods: {
    onClick() {
        this.isOnEdit = true;
    },
    onBlur() {
        this.isOnEdit = false;
    }
  },
  watch: {
      isOnEditable(oldVal, newVal) {
          this.isOnEdit = newVal;
      }
  },
  computed: {
      isOnEditing() {
          return this.$store.state.isOnEditing
      }
  }
})
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
