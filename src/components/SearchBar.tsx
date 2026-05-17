import { useEffect, useState } from 'react';

interface Props {
  placeholder?: string;
  onSearchFunction: (query: string) => void;
}

const timeToResetInMills = 1000;

export const SearchBar = ({
  placeholder = 'Buscar',
  onSearchFunction,
}: Props) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchFunction(query);
    }, timeToResetInMills);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, onSearchFunction]);

  const handleSearch = () => {
    onSearchFunction(query);
    setQuery('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
