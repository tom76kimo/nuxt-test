type EditorState = {
  isOnEditing: boolean;
};

type Article = {
  id: string;
  title: string;
  content: string | any[];
};

type State = {
  articleList: Article[];
} & EditorState;
