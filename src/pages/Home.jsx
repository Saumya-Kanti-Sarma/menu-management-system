// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <nav>
        <Link to="/customer">Customer Portal</Link>
        <Link to="/restaurant">Restaurant Portal</Link>
      </nav>
    </div>
  );
}

export default Home;
