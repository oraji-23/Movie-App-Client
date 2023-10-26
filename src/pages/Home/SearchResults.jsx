import React from "react";
import MovieCard from "../../components/MovieCard/MovieCard";

const SearchResults = ({ userInput, filteredMovie }) => {
  return (
    <div className="px-4 text-start">
      <h2 className="pb-3">
        Found {filteredMovie.length} out results for {userInput}
      </h2>
      <div className="grid gap-3">
        {filteredMovie.map((movie) => {
          return <MovieCard key={movie._id} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default SearchResults;
