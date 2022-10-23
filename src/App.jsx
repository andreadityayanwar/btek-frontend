import axios from "axios";
import React, {useEffect, useState} from "react";
import Character from "./components/Character";
import "./assets/style.css"

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://rickandmortyapi.com/api/character",
    }).then((response) => setData(response.data.results));
  }, []);

  return(
    <>
      <Character data={data}/>
    </>
  );
};

export default App;