export const setCommentSettings = (settingStatus: number) => ({
    type: 'SET_COMMENT_SETTINGS' as const,
    payload: settingStatus,
  });
  
  export type CommentSettingsAction = ReturnType<typeof setCommentSettings>;