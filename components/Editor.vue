<template>
  <editor-content :id="currentArticle.id" :editor="editor" />
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import _debounce from "lodash/debounce";
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";

type CommitFunction = (commitName: string, payload: any) => any;
type StoreType = {
  commit: CommitFunction;
};

function initializeEditor(currentArticleContent: string, $store: StoreType) {
  return new Editor({
    content: currentArticleContent,
    extensions: [StarterKit],
    onUpdate: _debounce(({ editor }) => {
      // The content has changed.
      const json = editor.getJSON();
      $store.commit("articles/updateCurrentArticle", { content: json });
    }, 500)
  });
}

export default Vue.extend({
  components: {
    EditorContent
  },
  created() {},
  data() {
    return {
      editor: null
    };
  },
  methods: {},
  mounted() {
    this.$data.editor = initializeEditor(
      this.currentArticleContent,
      this.$store
    );
  },
  computed: {
    ...mapGetters({
      currentArticle: "articles/currentArticle",
      currentArticleContent: "articles/currentArticleContent"
    })
  },
  beforeDestroy() {
    this.$data.editor.destroy();
  },
  watch: {
    currentArticle(article, oldArticle) {
      if (article.id !== oldArticle.id) {
        this.$data.editor.destroy();
        this.$data.editor = initializeEditor(
          this.currentArticleContent,
          this.$store
        );
      }
    }
  }
});
</script>

<style scoped>
h1 {
  margin-bottom: 30px;
}
.editor-container {
  margin: 0 auto;
  padding: 30px 10%;
  box-sizing: border-box;
  background-color: #fbfbfb;
  outline: none;
  text-align: left;
}

.editor-main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
<style>
.ProseMirror {
  outline: none;
  width: 100%;
  text-align: left;
  padding: 30px 10%;
  box-sizing: border-box;
  height: 100vh;
}
</style>
