import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function DropdownMenu({ header, options, onChange}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.value);
    setIsOpen(false);
    if (onChange) {
      onChange(option.id);
    }
    console.log(option.id);
  };

  return (
    <div className="dropdown-menu">
      <button className="dropdown-toggle" onClick={toggleMenu}>
        {selectedOption || header}
      </button>
      {isOpen && (
        <ul className="dropdown-list">
            <li className="dropdown-item"
              onClick={() => handleOptionClick(header)}>
                {header}
              </li>
          {options.map((option, index) => (
            <li
              className="dropdown-item"
              key={index}
              onClick={() => handleOptionClick(option)}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}




