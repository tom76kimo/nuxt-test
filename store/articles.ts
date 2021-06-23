import { Action, Module, VuexModule, Mutation } from 'vuex-module-decorators';

const LOCAL_STORAGE_KEY = 'bear:articles';

@Module({
  stateFactory: true,
  namespaced: true
})
class Articles extends VuexModule {
  list: Article[] = [];

  currentIndex = 0;

  @Mutation
  addArticle(newList: Article[]) {
    this.list = newList;
  }

  @Mutation
  setArticles(articles: Article[]) {
    this.list = articles;
  }

  @Mutation
  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  @Mutation
  updateCurrentArticle(content: any[]) {
    const article = this.list[this.currentIndex] || {};
    article.content = content;
  }

  @Action({ commit: 'addArticle' })
  addArticleAction() {
    const createTime = new Date().getTime();
    const newList = [
      {
        content: '',
        createTime,
        id: createTime,
        title: ''
      },
      ...this.list
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newList));
    return newList;
  }

  @Action({ commit: 'updateCurrentArticle' })
  updateCurrentArticleAction({ content }: { content: any[] }) {
    const newList = [
      ...this.list.slice(0, this.currentIndex),
      { ...this.list[this.currentIndex], content: content },
      ...this.list.slice(this.currentIndex + 1)
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newList));
    return content;
  }

  @Action({ commit: 'setArticles', rawError: true })
  fetchArticles() {
    const articleList = localStorage.getItem(LOCAL_STORAGE_KEY) || '[]';
    let data = [];
    try {
      data = JSON.parse(articleList);
    } catch {
      data = [];
    }
    return data;
  }

  get currentArticle() {
    return this.list[this.currentIndex] || {};
  }

  get currentArticleContent() {
    return this.list[this.currentIndex]?.content ?? '';
  }

  get computedCurrentArticleContent() {
    const content = this.list[this.currentIndex]?.content ?? '';
    return content[0].replaceAll('\n', '<br />');
  }
}

export default Articles;
