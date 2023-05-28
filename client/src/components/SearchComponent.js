import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchComponent({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="search" onSubmit={handleSearch}>
        <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Шарик"
        />
        <button type="submit">
            <SearchIcon />
        </button>
    </form>
  );
}