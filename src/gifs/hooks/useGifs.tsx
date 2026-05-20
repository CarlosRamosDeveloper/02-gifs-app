import { useRef, useState } from 'react';

import type { Gif } from '../interfaces/gif.interface';
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';

//const gifCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifList, setGifList] = useState<Gif[]>([]);
  const gifCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifCache.current[term]) {
      setGifList(gifCache.current[term]);
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

    gifCache.current[newQuery] = gifs;
  };

  return {
    previousTerms,
    gifList,

    handleTermClicked,
    handleSearch,
  };
};
