Happy Coding!

# VanLife

A small React + Vite app for renting and managing vans. Includes Firebase Authentication and Firestore for data storage.

## Result Screenshots

### Home Page
![Home Page](assets/result%20snap/home.JPG)

### Vans Listing
![Vans Listing](assets/result%20snap/vans.JPG)

### Host Dashboard
![Host Dashboard](assets/result%20snap/dashboard.JPG)


## Features

- Browse vans and view details
- Modern, responsive UI 
- Auth (signup/login) with Firebase
- Host dashboard: list vans owned by the user
- Rent a van 
- Page transitions and skeleton loaders

## Getting started

Prerequisites:
- Node.js 16+ and npm
- A Firebase project (Firestore + Authentication)

1. Install dependencies

```bash
npm install
```

2. Configure Firebase (.env)

Create a `.env` file in the project root using the provided `.env.example` and fill in your Firebase values.

```
cp .env.example .env
# then edit .env and set:
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Note: Vite only exposes variables prefixed with `VITE_`. The app now reads these from `import.meta.env` in `api.js`.

3. Run the dev server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

## Adding vans (for testing)

You can add vans via the Firebase Console (Firestore) or create a small admin page. Each van document should have the following fields:

- `name` (string)
- `price` (number)
- `description` (string)
- `imageUrl` (string)
- `type` (string) - one of `simple`, `rugged`, `luxury`
- `hostId` (string) - the UID of the user who "owns" the van

To make a van appear in your Host dashboard, set `hostId` to your Firebase Auth UID.


## Contributing

Open a PR or issue and I'll review it.

---

Made with ❤️ for road-trippers.
