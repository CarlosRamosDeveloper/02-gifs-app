import { useState } from 'react';

import type { Gif } from '../interfaces/gif.interface';
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';

export const useGifs = () => {
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

  return {
    previousTerms,
    gifList,

    handleTermClicked,
    handleSearch,
  };
};
