import { Module, VuexModule, Mutation } from "vuex-module-decorators";

@Module({
  name: "articles",
  stateFactory: true,
  namespaced: true
})
class Articles extends VuexModule {
  list = [
    {
      id: "123456",
      title: "今日進度"
    }
  ];

  @Mutation
  addArticle() {}
}

export default Articles;
