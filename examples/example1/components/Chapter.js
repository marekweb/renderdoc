import React from 'react';
export default function Chapter({ title, children }) {
  return (
    <div className="Chapter">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
