import { Module, VuexModule, Mutation } from "vuex-module-decorators";

@Module({
  name: "articles",
  stateFactory: true,
  namespaced: true
})
class Articles extends VuexModule {
  list: Article[] = [
    {
      id: "123456",
      title: "今日進度",
      content: "<p>I’m running tiptap with Vue.js. 🎉</p>"
    },
    {
      id: "4568789",
      title: "煮菜食譜",
      content: ""
    }
  ];

  currentIndex = 0;

  @Mutation
  addArticle() {}

  @Mutation
  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  @Mutation
  updateCurrentArticle({ content }: { content: string }) {
    const article = this.list[this.currentIndex] || {};
    article.content = content;
  }

  get currentArticle() {
    return this.list[this.currentIndex] || {};
  }

  get currentArticleContent() {
    return this.list[this.currentIndex]?.content ?? "";
  }

  get computedCurrentArticleContent() {
    const content = this.list[this.currentIndex]?.content ?? "";
    return content[0].replaceAll("\n", "<br />");
  }
}

export default Articles;
