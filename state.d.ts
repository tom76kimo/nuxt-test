type EditorState = {
  isOnEditing: boolean;
};

type Article = {
  id: string;
  title: string;
  content: string | object;
};

type State = {
  articleList: Article[];
} & EditorState;
