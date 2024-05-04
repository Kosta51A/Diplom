// Header.js
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, TextField } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./styles";


export default function MainHeader({ selected, openFavorites, AddNewFav, setSearchedCoords,setCoords }) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  const handleAddToFavorites = () => {
    const { name, address } = selected;
    AddNewFav({ name, address });
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    try {
      // Сначала устанавливаем searchedCoords в null
      setSearchedCoords(null);
  
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchValue}&format=json&limit=1`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        console.log("Found location:", lat, lon);
        // Затем устанавливаем новые координаты
        setSearchedCoords({ lat, lng: lon });
      } else {
        console.log("Location not found");
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
  
  
  

  return (
    <AppBar position="static">
      <Toolbar style={{ flex: 1, justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" className={classes.title}>
            Diplom work
          </Typography>
          {selected && (
            <Typography variant="h6" className={classes.title}>
              Selected place: {selected?.name}                      ////////////
            </Typography>
          )}
        </div>
        <div>
          <TextField
            className={classes.searchField}
            placeholder="Search for a location"
            variant="outlined"
            size="small"
            value={searchValue || ""}
            onChange={handleSearchChange}
          />
          <Button className={classes.favoritesButton} onClick={handleSearch}>
            Search
          </Button>
          <Button className={classes.favoritesButton} onClick={handleAddToFavorites}>
            Add to Favorites
          </Button>
          <Button className={classes.favoritesButton} onClick={() => openFavorites(true)}>
            View Favorites
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}