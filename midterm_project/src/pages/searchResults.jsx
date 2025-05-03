import React from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get('query');

  return (
    <div>
      <h1>Search Results</h1>
      <p>Showing results for: <strong>{query}</strong></p>
      <p>Placeholder for search results...</p>
    </div>
  );
}

export default SearchResults;