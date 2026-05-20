import { CustomHeader } from './shared/components/CustomHeader';
import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './shared/components/PreviousSearches';
import { SearchBar } from './shared/components/SearchBar';
import { useGifs } from './gifs/hooks/useGifs';

export const GifsApp = () => {
  const { gifList, previousTerms, handleSearch, handleTermClicked } = useGifs();

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
