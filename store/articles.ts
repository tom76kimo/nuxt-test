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
    }
  ];

  @Mutation
  addArticle() {}
}

export default Articles;
