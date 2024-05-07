import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./styles";

export default function MainHeader({ selected, openFavorites, AddNewFav, setSearchedCoords }) {
  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

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
      setSelectedOption(value);
    }
  };

  const handleSearch = () => {
    if (selectedOption) {
      setSearchLoading(true);
      setSearchedCoords({ lat: parseFloat(selectedOption.lat), lng: parseFloat(selectedOption.lon) });
      setSearchLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSearchedCoords({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);
    
  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div className={classes.headerLeft}>
          <Typography variant="h6" className={classes.title}>
            Diplom work
          </Typography>
          {selected && (
            <Typography variant="h6" className={classes.title}>
              Selected place: {selected?.name}
            </Typography>
          )}
        </div>
        <div className={classes.headerRight}>
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
                onKeyPress={handleKeyPress}
              />
            )} 
          />
          <Button className={classes.searchButton} variant="contained" color="primary" onClick={handleSearch}>
            {searchLoading ? "Searching..." : "Search"}
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
