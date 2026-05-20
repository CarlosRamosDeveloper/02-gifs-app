import { useState } from 'react';

import { CustomHeader } from './shared/components/CustomHeader';
import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './shared/components/PreviousSearches';
import { SearchBar } from './shared/components/SearchBar';
import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.action';
import type { Gif } from './gifs/interfaces/gif.interface';

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifList, setGifList] = useState<Gif[]>([]);

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

    setGifList(gifs);
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

      <GifList gifs={gifList} />
    </>
  );
};
