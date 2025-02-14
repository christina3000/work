import React, { useState } from 'react';

function ListComponent() {
  // Define a list of items
  const [items, setItems] = useState([
    "Apple",
    "Banana",
    "Orange",
    "Mango"
  ]);

  return (
    <div>
      <h1>Fruit List</h1>
      {/* Render the list using map */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListComponent;