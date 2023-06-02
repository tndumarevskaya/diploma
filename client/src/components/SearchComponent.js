import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchComponent({ onSearch, text }) {
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
            placeholder={text}
        />
        <button type="submit">
            <SearchIcon />
        </button>
    </form>
  );
}