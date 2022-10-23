import axios from "axios";
import React, {useEffect, useState} from "react";
import character from "./components/character";
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
      <character data={data}/>
    </>
  );
};

export default App;