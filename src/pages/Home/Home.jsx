import React, { useEffect, useState } from "react";
import Trending from "./Trending";
import Recomended from "./Recomended";
import { useFetch } from "../../hooks/useFetch";
import SearchResults from "./SearchResults";
import { useCustomParams } from "../../hooks/useCustomParams";
import Loading from "../../utils/Loading";

const Home = () => {
  const { data, error, loading, updateUI } = useFetch("/api/movie");
  const { userInput, filteredMovie } = useCustomParams(data);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (userInput) {
    return (
      <SearchResults userInput={userInput} filteredMovie={filteredMovie} />
    );
  }
  return (
    <div className="px-4">
      <div className="text-start py-3">
        <h2 className="py-2">Trending</h2>
        <Trending
          data={data}
          error={error}
          loading={loading}
          updateUI={updateUI}
        />
      </div>

      <div className="text-start ">
        <h2 className="py-2">Recomended for you</h2>
        <Recomended
          data={data}
          error={error}
          loading={loading}
          updateUI={updateUI}
        />
      </div>
    </div>
  );
};

export default Home;
