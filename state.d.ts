type EditorState = {
  isOnEditing: boolean;
};

type Article = {
  id: string;
  title: string;
  content: string;
};

type State = {
  articleList: Article[];
} & EditorState;
