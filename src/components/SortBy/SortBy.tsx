import React, { useState, useRef, useEffect } from 'react';
import { CustomDropdownProps } from '../../types'; // Assuming types.ts is in the same directory
import { options, useStore } from "../../store"
import "./SortBy.css"

const SortBy: React.FC<CustomDropdownProps> = ({
  placeholder = 'Select an option',
}) => {
  const { setSortby, sortBy } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    setSortby(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const selectedLabel = options.find(option => option.value === sortBy)?.label || placeholder;

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={handleToggle}>
        {selectedLabel}
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}>&#9660;</span> {/* Example arrow */}
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              key={option.value}
              className={`dropdown-item ${option.value === sortBy ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortBy;