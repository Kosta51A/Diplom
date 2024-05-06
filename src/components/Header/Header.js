import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./styles";


export default function MainHeader({ selected, openFavorites, AddNewFav, setSearchedCoords }) {
  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // Добавляем состояние для выбранного варианта

  const handleAddToFavorites = () => {
    const { name, address } = selected;
    AddNewFav({ name, address });
  };

  const handleSearchChange = async (event, value) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${value}&format=json&limit=5`);
      const data = await response.json();
      if (data && data.length > 0) {
        const formattedOptions = data.map((item) => ({
          name: item.display_name,
          lat: item.lat,
          lon: item.lon
        }));
        setOptions(formattedOptions);
      } else {
        console.log("Location not found");
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleOptionSelect = (event, value) => {
    if (value) {
      setSelectedOption(value); // Устанавливаем выбранный вариант
    }
  };

  const handleSearch = () => {
    if (selectedOption) {
      setSearchedCoords({ lat: selectedOption.lat, lng: selectedOption.lon });
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
              Selected place: {selected?.name}
            </Typography>
          )}
        </div>
        <div>
          <Autocomplete
            className={classes.searchField}
            options={options}
            getOptionLabel={(option) => option.name}
            onChange={handleOptionSelect}
            onInputChange={handleSearchChange}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search for a location"
                variant="outlined"
                size="small"
              />
            )}
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
