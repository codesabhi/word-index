import React from "react";
import "./Header.css";
import { createTheme, MenuItem, TextField, ThemeProvider } from "@material-ui/core";
import categories from "../../data/Category";

const Header = ({category, setcategory, word, setWord, lightMode}) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main:  lightMode? "#000" : "#fff",
      },
      type: lightMode? "light" : "dark",
    },
  });

  const handleChange = (language) => {
      setcategory(language);
      setWord("")

  }

  return (
    <div className="Header">
      <span className="title"> {word? word : "word hunt"} </span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField 
          className="search"  
          label="Word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
           />

          <TextField
          className="select"
        //   id="standard-select-currency"
          select
          label="Language"
          value={category}
          onChange={(e) => handleChange(e.target.value)}
        >
        {categories.map((options) => (
            <MenuItem key={options.label} value={options.label} >
              {options.value}
            </MenuItem>
        ))}
         
            
         
        </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
