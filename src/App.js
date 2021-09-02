import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Switch, withStyles } from "@material-ui/core";
import "./App.css";
import Header from "./components/Headers/Header";
import Definitions from "./components/definitions/Definitions";
import { grey } from "@material-ui/core/colors";

const App = () => {

  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setcategory] = useState("en");
  const [lightMode, setlightMode] = useState(false);


//  DarkMode 
  const DarkMode = withStyles({
    switchBase: {
      color: grey[300],
      "&$checked": {
        color: grey[500],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const dictionaryApi = async () => {
    try {
      const { data } = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setMeanings(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    dictionaryApi();
  }, [word, category]);

  return (
    <div
      className="App"
      style={{
        backgroundColor: lightMode ? "#fff" : "#282c34",
        color: lightMode ? "black" : "white",
        transition: "all 0.5s linear",
      }}
    >
      <Container maxWidth="md" className="container">
        <div
          style={{ position: "absolute", top: 0, right: 15, paddingTop: 10 }}
        >
          <DarkMode
            checked={lightMode}
            onChange={() => setlightMode(!lightMode)}
          />
        </div>
        <Header
          category={category}
          setcategory={setcategory}
          word={word}
          setWord={setWord}
          lightMode={lightMode}
        />
        {meanings && (
          <Definitions
            word={word}
            meanings={meanings}
            category={category}
            lightMode={lightMode}
          />
        )}
      </Container>
    </div>
  );
};

export default App;
