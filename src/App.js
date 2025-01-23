import React, { useState } from 'react';

const Home = () => {
  
  const [newItem, setNewItem] = useState('');
  
  
  const [todos, setTodos] = useState([]);

  
  const handleAddItem = () => {
    if (newItem.trim() !== '') {
      setTodos([...todos, newItem]); 
      setNewItem(''); 
    }
  };

  
  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index); 
    setTodos(updatedTodos); 
  };

  return (
    <div>
      <nav className="navbar">
        <h1>TODO</h1>
      </nav>

      <div className="input">
        
        <input
          type="text"
          name="item"
          placeholder="Enter item"
          value={newItem} 
          onChange={(e) => setNewItem(e.target.value)} 
        />
        
        
        <button id="add-btn" onClick={handleAddItem}>
          ADD
        </button>
      </div>

      <div className="list">
        <h1>List of Todos</h1>
        <ul>
          
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}
              
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;