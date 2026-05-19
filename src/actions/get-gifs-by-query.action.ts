import axios from 'axios';
import type { GiphyResponse } from '../interfaces/giphy.response';
import type { Gif } from '../interfaces/gif.interface';

const url = 'https://api.giphy.com/v1/gifs/search';

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {  
  const response = await axios.get<GiphyResponse>(url, {
    params: {
      api_key: import.meta.env.VITE_GYPHY_API_KEY,
      q: query,
      limit: 5,
      lang: 'en',      
    },
  });

  return response.data.data.map(( gif ) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height)
  }))
};
