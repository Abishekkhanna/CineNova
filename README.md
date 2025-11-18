# 🎬 CineNova

CineNova is a modern movie discovery web application built using **React**, **Appwrite**, and **TMDB API**, inspired by a tutorial from **JS Mastery**.  
It allows users to search movies, view trending titles, and track search popularity using Appwrite.

---

## 🚀 Features

### 🔍 Search Movies

- Search instantly through TMDB’s movie database
- Debounced search (prevents excessive API calls)
- Each search is stored in Appwrite with a search count

### 📈 Trending Movies

- Top 5 trending movies fetched from Appwrite
- Sorted by most searched movies
- Displays posters for top trending titles

### 🎥 Movie List

- Poster
- Title
- Rating
- Language
- Release Year
- Fallback image if poster not available

### ⚡ User Experience

- Clean, simple UI
- Fully responsive
- Smooth loading states
- Error handling (API failures, empty results)

---

## 🛠️ Tech Stack

### **Frontend**

- React
- Vite
- Tailwind CSS / Custom CSS
- react-use (Debounce)

### **Backend**

- Appwrite (Database, Collections)

### **External API**

- TMDB (The Movie Database API)

---

## 📁 Project Structure

```
src/
│── App.jsx
│── appwrite.js
│── components/
│     ├── Search.jsx
│     ├── Spinner.jsx
│     └── MovieCard.jsx
│── assets/
│     ├── hero.png
│     ├── search.svg
│     └── no-movie.png
```

---

## 🔧 Environment Variables

Create a **.env** file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_NAME=your_collection_name
```

---

## 📝 How CineNova Works

### 1️⃣ Fetching Movies

- If user types something → Use TMDB **search/movie**
- If search box is empty → Load popular movies from **discover/movie**

### 2️⃣ Appwrite Search Tracking Logic

Each time user searches:

- Check if the search term already exists in Appwrite
- If exists → increment count
- If not → create new document with:
  - searchTerm
  - count = 1
  - movie_id
  - poster_url

### 3️⃣ Trending Movies

Trending movies are fetched from Appwrite using:

- `Query.orderDesc("count")`
- `Query.limit(5)`

These are displayed at the top of the page with ranking numbers.

---

## ▶️ Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

---

## 🗄️ Appwrite Collection Structure

Your Appwrite Collection must contain the following fields:

| Field Name | Type   | Description              |
| ---------- | ------ | ------------------------ |
| searchTerm | String | The user's search text   |
| count      | Number | Number of times searched |
| movie_id   | Number | TMDB movie ID            |
| poster_url | String | Movie poster image       |

---

## 🚀 Deploying to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Prerequisites

1. Make sure GitHub Pages is enabled in your repository settings:
   - Go to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

### Automatic Deployment

The project will automatically deploy to GitHub Pages when you push to the `main` branch. The workflow:

1. Builds the project using `npm run build`
2. Uploads the `dist` folder as an artifact
3. Deploys to GitHub Pages

Your site will be available at: `https://[your-username].github.io/CineNova/`

### Manual Deployment

You can also manually trigger the deployment:

1. Go to **Actions** tab in your GitHub repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

### Local Testing

To test the production build locally:

```bash
npm run build
npm run preview
```

---
