<template>
  <editor-content :id="currentArticle.id" :editor="editor" />
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import _debounce from 'lodash/debounce';
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faPlusCircle);

type CommitFunction = (commitName: string, payload: any) => void;
type StoreType = {
  commit: CommitFunction;
  dispatch: CommitFunction;
};

function initializeEditor(
  currentArticleContent: string,
  $store: StoreType
): Editor {
  return new Editor({
    content: currentArticleContent,
    extensions: [StarterKit],
    onUpdate: _debounce(({ editor }) => {
      // The content has changed.
      const json = editor.getJSON();
      $store.dispatch('articles/updateCurrentArticleAction', { content: json });
    }, 500)
  });
}

export default Vue.extend({
  components: {
    EditorContent,
    'font-awesome-icon': FontAwesomeIcon
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
      currentArticle: 'articles/currentArticle',
      currentArticleContent: 'articles/currentArticleContent'
    })
  },
  beforeDestroy() {
    const editorInstance = this.$data.editor;
    editorInstance && editorInstance.destroy();
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
.editor-container {
  margin: 0 auto;
  padding: 30px 10%;
  box-sizing: border-box;

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
  background-color: #fbfbfb;
}

h1 {
  margin-bottom: 30px;
}
pre {
  background-color: #fff;
  padding: 4px 6px;
  border: 1px solid #dddddd;
  border-radius: 2px;
}
</style>
