import React from 'react';

const FilterInput = ({ label, value, onChange }) => {
  const handleChange = (newValue) => {
    onChange(newValue);
  };

  return (
    <div className="me-2">
      <label className="form-label">{label}</label>
      <input
        type="text"
        className="form-control"
        value={value || ''}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default FilterInput;