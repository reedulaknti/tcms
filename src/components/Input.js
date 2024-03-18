import React from 'react';

export default function Input({
  type = 'text',
  label,
  name,
  value,
  onChange = () => {},
  placeholder,
  ...resProps
}) {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        className="input"
        data-testid={name}
        aria-label={label}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...resProps}
      />
    </>
  );
}
