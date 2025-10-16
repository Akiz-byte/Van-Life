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

2. Configure Firebase

Update the Firebase config in `api.js` with your project's values (apiKey, authDomain, projectId, etc.).

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
