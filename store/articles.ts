import { Action, Module, VuexModule, Mutation } from 'vuex-module-decorators';

const LOCAL_STORAGE_KEY = 'bear:articles';

function findTitle(article: any) {
  const headingElement = article.content?.[0] ?? null;
  if (!headingElement) {
    return '';
  }
  const headingElementText = headingElement.content?.[0].text ?? '';
  return headingElementText;
}

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
  updateCurrentArticle(articleObj: Article) {
    const article = this.list[this.currentIndex] || {};
    article.content = articleObj.content;
    article.title = articleObj.title;
  }

  @Action({ commit: 'addArticle' })
  addArticleAction() {
    const createTime = new Date().getTime();
    const newList = [
      {
        content: '<h1></h1>',
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
  updateCurrentArticleAction({ content }: { content: object }) {
    const title = findTitle(content);

    const newList = [
      ...this.list.slice(0, this.currentIndex),
      { ...this.list[this.currentIndex], content, title },
      ...this.list.slice(this.currentIndex + 1)
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newList));
    return { content, title };
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
}

export default Articles;
