import { useState } from 'react';
import { CustomHeader } from './components/CustomHeader';
import { GifList } from './components/GifList';
import { PreviousSearches } from './components/PreviousSearches';
import { SearchBar } from './components/SearchBar';
import { mockGifs } from './mock-data/gifs.mock';
import { getGifsByQuery } from './actions/get-gifs-by-query.action';

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState(['Golden sun']);

  const handleTermClicked = (term: string) => {
    console.log(term);
  };

  const handleSearch = async (query: string) => {
    const newQuery = query.trim().toLowerCase();
    const currentTerms = previousTerms.slice(0, 7);

    if (newQuery.length === 0) return;

    if (previousTerms.includes(newQuery)) return;

    currentTerms.unshift(newQuery);

    setPreviousTerms(currentTerms);

    const gifs = await getGifsByQuery(query);

    console.log({ gifs });
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
