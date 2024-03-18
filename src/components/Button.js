import React from "react";

export default function Button({ type = "button", label, name, onClick }) {
  return (
    <button
      data-testid={name}
      className="btn"
      type={type}
      name={name}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
