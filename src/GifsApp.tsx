import { useState } from 'react';
import { CustomHeader } from './components/CustomHeader';
import { GifList } from './components/GifList';
import { PreviousSearches } from './components/PreviousSearches';
import { SearchBar } from './components/SearchBar';
import { mockGifs } from './mock-data/gifs.mock';

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(['Golden sun']);

  const handleTermClicked = (term: string) => {
    console.log(term);
  };

  const handleSearch = (query: string) => {
    const newQuery = query.trim().toLowerCase();
    const currentTerms = previousTerms.slice(0, 7);

    if (newQuery.length === 0) return;

    if (previousTerms.includes(newQuery)) return;

    currentTerms.unshift(newQuery);

    setPreviousTerms(currentTerms);
  };

  return (
    <>
      <CustomHeader
        title="Buscador de Gifs"
        description="Encuentra el gif perfecto para ti"
      />

      <SearchBar placeholder="Buscar gifs" onSearchFunction={handleSearch} />

      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      <GifList gifs={mockGifs} />
    </>
  );
};
