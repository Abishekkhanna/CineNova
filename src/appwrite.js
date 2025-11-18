import { Client, Databases, Query, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_NAME;
const END_POINT = import.meta.env.VITE_APPWRITE_ENDPOINT;

const client = new Client().setEndpoint(END_POINT).setProject(PROJECT_ID);
const database = new Databases(client);

export const updateSearchTerm = async (searchTerm, movie) => {
  // 1. use appwrite to check the searchTerm exist in DB
  try {
    const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    // 2. If available then update it
    if (res.documents.length > 0) {
      const doc = res.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      // 3. If it doesn't, create a new document with the searchTerm and count as 1
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error(`Error updating search term in appwrite ${error}`);
  }
};

export const getTrendingMovies = async () => {
  try {
    const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);
    return res.documents;
  } catch (error) {
    console.error(error);
  }
};
