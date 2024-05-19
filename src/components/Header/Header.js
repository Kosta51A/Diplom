import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, TextField, Button, Paper, Box } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import FavoriteIcon from "@material-ui/icons/Favorite";
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
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4" className={classes.title}>
          Where to eat?
        </Typography>
        <div className={classes.favoritesContainer}>
          <IconButton onClick={handleAddToFavorites}>
            <AddIcon style={{ color: "#fff" }} />
          </IconButton>
          <IconButton onClick={() => openFavorites(true)}>
            <FavoriteIcon style={{ color: "red" }} />
          </IconButton>
        </div>
      </Toolbar>
      <Box className={classes.searchBox}>
        <Paper elevation={3} className={classes.searchPaper}>
          <Autocomplete
            className={classes.searchField}
            options={options}
            getOptionLabel={(option) => option.name}
            onChange={handleOptionSelect}
            onInputChange={handleSearchChange}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="city, name, address"
                variant="outlined"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <SearchIcon style={{ color: "red", marginRight: "8px" }} />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                  style: { borderRadius: 25, backgroundColor: "#cccccc" },
                }}
                onKeyPress={handleKeyPress}
              />
            )}
          />
          <Button
            className={classes.searchButton}
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            search
          </Button>
        </Paper>
      </Box>
    </AppBar>
  );
}
