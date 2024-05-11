import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useStyles from "./styles"; // Добавлен импорт стилей

export default function MainHeader({ selected, openFavorites, AddNewFav, setSearchedCoords }) {
  const classes = useStyles(); // Использование стилей
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddToFavorites = () => {
    const { name, address } = selected;
    AddNewFav({ name, address });
    handleMenuClose();
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
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <SearchIcon style={{ color: "#9e9e9e", marginRight: "8px" }} />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                  style: { backgroundColor: "#f5f5f5", width: "100%" } // Устанавливаем цвет фона и относительную ширину поля ввода
                }}
                onKeyPress={handleKeyPress}
              />
            )} 
          />
          <IconButton
            className={classes.searchButton}
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            <SearchIcon style={{ color: "#fff" }} />
          </IconButton>
          <IconButton
            aria-label="menu"
            aria-controls="header-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
            color="inherit"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="header-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleAddToFavorites}>Add to Favorites</MenuItem>
            <MenuItem onClick={() => openFavorites(true)}>View Favorites</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
