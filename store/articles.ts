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
      content: ["今天做了 xxxxx", "跟 bbb 一起看 bug"]
    },
    {
      id: "4568789",
      title: "煮菜食譜",
      content: ["先加一勺醬油，再加入寬油，越多越好", "將油溫燒到六成熱"]
    }
  ];

  currentIndex = 0;

  @Mutation
  addArticle() {}

  @Mutation
  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }
}

export default Articles;
