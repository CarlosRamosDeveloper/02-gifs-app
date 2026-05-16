import { useState } from 'react';

interface Props {
  placeholder?: string;
  onSearchFunction: (query: string) => void;
}

export const SearchBar = ({
  placeholder = 'Buscar',
  onSearchFunction,
}: Props) => {
  const [query, setQuery] = useState('');

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
