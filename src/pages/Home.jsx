import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      Home &middot;
      <Link to="/characters">Go to Character List</Link>
    </div>
  );
}

export default Home;
