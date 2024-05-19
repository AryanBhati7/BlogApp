const conf = {
  appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwritePostsCollectionID: String(
    import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID
  ),
  appwriteSavesCollectionID: String(
    import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID
  ),
  appwriteUsersCollectionID: String(
    import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID
  ),
  appwritePostImgBucketID: String(
    import.meta.env.VITE_APPWRITE_POST_IMG_BUCKET_ID
  ),
  appwriteProfileImgBucketID: String(
    import.meta.env.VITE_APPWRITE_PROFILE_IMG_BUCKET_ID
  ),
  appwriteCoverPhotoBucketID: String(
    import.meta.env.VITE_APPWRITE_COVER_PHOTO_BUCKET_ID
  ),
  tinyMCEKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
};

export default conf;

// import.meta.env._____
