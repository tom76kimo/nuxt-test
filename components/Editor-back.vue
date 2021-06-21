<template>
  <div class="editor-container">
    <div class="editor-main">
      <h1>{{ currentArticle.title }}</h1>
      <div
        :class="{ editableblock: true, active: activeIndex === i }"
        contenteditable="true"
        :key="i"
        v-html="toMD(c)"
        v-for="(c, i) in currentArticleContent"
        @focus="onFocus(i)"
        @keydown.up="keyUP"
        @keydown.down="keyDOWN"
        @input="onInput($event, i)"
        ref="line"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import marked from "marked";
import _debounce from "lodash/debounce";
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";

const renderer = {
  heading(text: string, level: number, raw: string) {
    let symbol = "";
    for (let i = 0; i < level; ++i) {
      symbol += "#";
    }
    return `<h${level}>${symbol} ${text}</h${level}\n`;
  }
  // code(text: string, ...rest: any) {
  //   return `<code>\`\`\`<br />${text}<br />\`\`\`</code>`;
  // },
  // codespan(text: string) {
  //   return `<code>\`${text}\`</code>`;
  // },
  // listitem(...params: any[]) {
  //   console.log("===listitem", params);
  //   return "";
  // }
};

marked.setOptions({
  breaks: true,
  gfm: true
});
marked.use({ renderer });

// node_walk: walk the element tree, stop when func(node) returns false
function node_walk(node: any, func: (node: any) => any) {
  var result = func(node);
  for (
    node = node.firstChild;
    result !== false && node;
    node = node.nextSibling
  )
    result = node_walk(node, func);
  return result;
}

// getCaretPosition: return [start, end] as offsets to elem.textContent that
//   correspond to the selected portion of text
//   (if start == end, caret is at given position and no text is selected)
function getCaretPosition(elem: any) {
  var sel = window.getSelection() as any;
  var cum_length = [0, 0];

  if (!sel) {
    return;
  }

  if (sel.anchorNode == elem) cum_length = [sel.anchorOffset, sel.extentOffset];
  else {
    console.log("===focusNode", sel.focusNode);
    var nodes_to_find = [sel.anchorNode, sel.focusNode];
    if (!elem.contains(sel.anchorNode) || !elem.contains(sel.focusNode))
      return undefined;
    else {
      var found = [0, 0] as [any, any];
      var i;
      node_walk(elem, function(node) {
        for (i = 0; i < 2; i++) {
          if (node == nodes_to_find[i]) {
            found[i] = true;
            if (found[i == 0 ? 1 : 0]) return false; // all done
          }
        }

        if (node.textContent && !node.firstChild) {
          for (i = 0; i < 2; i++) {
            if (!found[i]) cum_length[i] += node.textContent.length;
          }
        }
      });
      cum_length[0] += sel.anchorOffset;
      cum_length[1] += sel.extentOffset;
    }
  }
  if (cum_length[0] <= cum_length[1]) return cum_length;
  return [cum_length[1], cum_length[0]];
}

function setCaretPosition(el: any, pos: number): number {
  // Loop through all child nodes
  if (!el || !el.childNodes) {
    return -1;
  }
  for (var node of el.childNodes) {
    if (node.nodeType == 3) {
      // we have a text node
      if (node.length >= pos) {
        // finally add our range
        var range = document.createRange(),
          sel = window.getSelection() as any;
        range.setStart(node, pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        return -1; // we are done
      } else {
        pos -= node.length;
      }
    } else {
      pos = setCaretPosition(node, pos);
      if (pos == -1) {
        return -1; // no need to finish the for loop
      }
    }
  }
  return pos; // needed because of recursion stuff
}

export default Vue.extend({
  created() {},
  data() {
    return {
      editing: false,
      activeIndex: -1,
      caretPos: -1
    };
  },
  methods: {
    keyUP() {
      // if (this.$data.activeIndex - 1 >= 0) {
      //   this.$data.activeIndex -= 1;
      //   (this.$refs.line as HTMLElement[])[this.$data.activeIndex].focus();
      // }
    },
    keyDOWN() {
      // if (
      //   this.$data.activeIndex + 1 <
      //   (this.$refs.line as HTMLElement[]).length
      // ) {
      //   this.$data.activeIndex += 1;
      //   (this.$refs.line as HTMLElement[])[this.$data.activeIndex].focus();
      // }
    },
    onFocus(index: number) {
      this.$data.activeIndex = index;
    },
    onInput(e: Event, index: number) {
      const content = (e.target as HTMLElement).innerText;
      const position = getCaretPosition(e.target) || [];
      this.$data.caretPos = position[0];
      console.log("===position", position);
      this.$store.commit("articles/updateCurrentArticle", { content, index });
    },
    save() {
      // if (!this.editing) {
      //   return;
      // }
      // const content = (this.$refs.editor as HTMLElement)?.innerText;
      // this.editing = false;
      // this.$store.commit("articles/updateCurrentArticle", content);
      // (this.$refs.editor as HTMLElement).innerText = "";
    },
    toMD: marked,
    editorClick(e: Event) {
      // if (!this.editing) {
      //   this.editing = true;
      //   this.$refs.editor && (this.$refs.editor as HTMLElement).focus();
      // }
    }
  },
  computed: {
    ...mapGetters({
      currentArticle: "articles/currentArticle",
      currentArticleContent: "articles/currentArticleContent",
      computedCurrentArticleContent: "articles/computedCurrentArticleContent"
    })
  },
  updated() {
    const elem = (this.$refs.line as HTMLElement[])[this.$data.activeIndex];
    console.log("===update", elem, this.$data.caretPos);
    if (this.$data.caretPos < 0) {
      return;
    }
    setTimeout(() => {
      setCaretPosition(elem, this.$data.caretPos);
    }, 0);
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

.editableblock {
  /* height: calc(100vh - 150px); */
  outline: none;
  width: 100%;
  text-align: left;
  cursor: text;
}
</style>
