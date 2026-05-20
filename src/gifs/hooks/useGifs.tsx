import { useState } from 'react';

import type { Gif } from '../interfaces/gif.interface';
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';

const gifCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifList, setGifList] = useState<Gif[]>([]);

  const handleTermClicked = async (term: string) => {
    if (gifCache[term]) {
      setGifList(gifCache[term]);
      return;
    }

    const gifs = await getGifsByQuery(term);
    setGifList(gifs);
  };

  const handleSearch = async (query: string) => {
    const newQuery = query.trim().toLowerCase();

    if (newQuery.length === 0) return;

    if (previousTerms.includes(newQuery)) return;

    setPreviousTerms([newQuery, ...previousTerms].splice(0, 7));

    const gifs = await getGifsByQuery(newQuery);

    setGifList(gifs);

    gifCache[newQuery] = gifs;
  };

  return {
    previousTerms,
    gifList,

    handleTermClicked,
    handleSearch,
  };
};
