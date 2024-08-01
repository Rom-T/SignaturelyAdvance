export const API_URL_END_POINTS = {
    signInEndPoint: '/auth/sign_in',
    getDocumentsEndPoint: '/documents?limit=10&page=1',
    getDocumentByIdEndPoint: '/documents/',
    deleteDocumentsEndPoint: '/grids/trash',
    emptyTrash: '/grids/trash/empty',
    signUpEndPoint: '/auth/sign_up',
    createFolderEndPoint: '/folders/create',
    userProfileEndPoint: '/user/profile',
    addTeamMember: '/add-teammates',
    upgradeTeamMemberRole:(memberID) => `/teams/${memberID}/upgrade_to_admin`,
};
