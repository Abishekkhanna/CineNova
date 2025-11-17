import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endPoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endPoint, API_OPTION);

      if (!response.ok) {
        throw new Error("Failed to Fetch Movies");
      }

      const data = await response.json();
      if (data.response === "False") {
        setErrorMessage(data.Error || "Failed to Fetch Movie");
        return;
      }
      console.log(data);
      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error Loading Movies : ${error}`);
      setErrorMessage("Error Loading Movies. Please try again later ");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Image" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Love
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className="mt-5">All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
