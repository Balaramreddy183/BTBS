export const AppConfig = {
  constants: {
    EMAIL_ID_REGEX: new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,10}$'),
  },

  //API URLS



  //User API
  userLogin: 'user/login',
  userLogout: 'user/logout',
  updatePassword: 'users/updatePassword',
  getAllUsers: 'users/getAllUsers',

  // File ENDPONTS
  getAllUploadedFilesByFileType: 'upload/getAllUploadedFilesByFileType',
  translateAndReturn: 'upload/translateAndReturn',
  updateTranslations: 'upload/updateTranslations',

  // Dashboard APIS
  upload: 'upload',
  getAllProjects: 'project/getAllProjects', // Already present, ensure it's used consistently

  // Project Specific APIs (ensure these are distinct if getAllProjects is also under dashboard)
  addProject: 'project/addProject',
  editProject: 'project/editProject',
  deleteProject: 'project/deleteProject', // Already present, ensure it's used consistently

  // Language APIs
  getSourceLanguages: 'language/getSourceLanguages',
  getDestinationLanguages: 'language/getDestinationLanguages',

  // Upload/File specific APIs (for ProjectFilesComponent)
  getAllFilesByProjectId: 'upload/getAllFilesByProjectId',
  uploadExcel: 'upload/upload-excel', // Added for Excel import

}