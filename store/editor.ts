export const state = (): EditorState => ({
  isOnEditing: false
});

export const mutations = {
  setOnEditing(
    state: EditorState,
    { isOnEditing }: { isOnEditing: boolean }
  ): void {
    state.isOnEditing = isOnEditing;
  }
};
