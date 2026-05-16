import { CustomHeader } from './components/CustomHeader';
import { GifList } from './components/GifList';
import { PreviousSearches } from './components/PreviousSearches';
import { SearchBar } from './components/SearchBar';
import { mockGifs } from './mock-data/gifs.mock';

export const GifsApp = () => {
  return (
    <>
      <CustomHeader
        title="Buscador de Gifs"
        description="Encuentra el gif perfecto para ti"
      />

      <SearchBar placeholder="Buscar gifs" />

      <PreviousSearches />

      <GifList gifs={mockGifs} />
    </>
  );
};
