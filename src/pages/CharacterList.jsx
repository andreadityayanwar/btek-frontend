/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import http from '../helpers/http';

function CharacterCard({ char }) {
  return (
    <div className="character-card">
      <Link to={`/characters/${char.id}`}>
        <img className="img-responsive" src={char.image} alt={char.name} />
      </Link>
      <div className="character-name">{char.name}</div>
    </div>
  );
} // stateless component

function App() {
  const [data, setData] = React.useState({});

  const getCharacterData = async (url) => {
    const condUrl = url || '/character';
    const { data: results } = await http().get(condUrl);
    setData(results);
  };

  React.useEffect(() => {
    getCharacterData();
  }, []);

  return (
    <>
      <div className="character-grid">
        {data.results && data.results.map((char) => <CharacterCard key={String(char.id)} char={char} />)}
      </div>
      <div className="nav-button">
        <button type="button" disabled={data?.info?.prev === null} onClick={() => getCharacterData(data?.info?.prev)} className="btn">Previous</button>
        <button type="button" disabled={data?.info?.next === null} onClick={() => getCharacterData(data?.info?.next)} className="btn">Next</button>
      </div>
    </>
  );
}

export default App;
