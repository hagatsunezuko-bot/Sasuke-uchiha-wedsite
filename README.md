# Sasuke Uchiha Anime Vault — video upload + admin

This site uses GitHub Pages for the interface and Firebase for login, video storage, and video metadata. **Uploads will not work until you set up Firebase and add your config to app.js.**

## 1. Create Firebase project
1. Open https://console.firebase.google.com/ and create a project.
2. Add a Web app and copy its config.
3. In `app.js`, replace `PASTE_API_KEY`, `PASTE_PROJECT_ID`, `PASTE_STORAGE_BUCKET`, `PASTE_SENDER_ID`, and `PASTE_APP_ID` with your actual config values.

## 2. Create admin login
1. Firebase Console → Build → Authentication → Get started → Sign-in method → enable Email/Password.
2. Authentication → Users → Add user. Make an admin email and password.
3. Copy that user's UID from the Users page.
4. Firestore Database → Create database.
5. Create collection `admins`. Create a document whose **document ID is exactly the admin user's UID**. Add a field like `role` (string) = `admin`. The project owner does this in the Firebase Console.
6. Publish the contents of `firestore.rules` in Firestore → Rules.

## 3. Set up video storage
1. Firebase Console → Build → Storage → Get started.
2. Publish the contents of `storage.rules` in Storage → Rules.
3. Review Firebase's current plan, billing requirements, quotas, and download costs before uploading. Videos use storage and bandwidth.

## 4. Upload to GitHub
Upload these files to the root of your existing GitHub repository: `index.html`, `style.css`, `app.js`, `firestore.rules`, `storage.rules`, and `README.md`. GitHub → repository Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.

## 5. Use the admin panel
Open the published site, tap Admin login, sign in, then choose title, episode, genre, description, and a video file. Supported types are MP4, WebM, and Ogg; demo upload limit is 500 MB. MP4 encoded with H.264 video and AAC audio is usually the most compatible.

## Security and limitations
- Only users whose UID is listed as a document ID in `admins` can upload/delete.
- Never make Storage/Firestore writable by everyone, and never put private service-account keys in browser code.
- Public visitors can play uploaded videos. Only upload content you own or are authorized to distribute.
- This is a starter project, not a production streaming service; it has no adaptive streaming, subtitles, transcoding, or upload moderation. Cloud usage can cost money.
