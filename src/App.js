import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import MainHeader from "./components/Header/Header";
import { getPlacesDetails } from "./API/API";
import ResultsList from "./components/ResultList/ResultsList";
import LLMap from "./components/Map/Map";
import FavoritesList from "./components/Favorits/FavoritesList";
import FiltersLayer from "./components/FiltersLayer.js/FiltersLayer";

function App() {
  const [type, setType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isViewingFavorites, setIsViewingFavorites] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);
  const [searchedCoords, setSearchedCoords] = useState(null);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [selectedRating, setSelectedRating] = useState('');
  const [sortByReviews, setSortByReviews] = useState('');
  const [selectedPriceLevel, setSelectedPriceLevel] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedFavorites = sessionStorage.getItem("Favorites");
    if (savedFavorites) {
      setFavoritesList(JSON.parse(savedFavorites));
      console.log("Favorites loaded from sessionStorage:", JSON.parse(savedFavorites));
    }
  }, []);

  const handleAddToFavorites = (newPlace, rating) => {
    if (!favoritesList.some((place) => place.address === newPlace.address)) {
      const updatedFavorites = [...favoritesList, { ...newPlace, rating }];
      setFavoritesList(updatedFavorites);
      sessionStorage.setItem("Favorites", JSON.stringify(updatedFavorites));
      console.log("Added to favorites:", newPlace);
      console.log("Favorites after adding:", updatedFavorites);
    }
  };

  const handleRemoveFromFavorites = (place) => {
    const updatedFavorites = favoritesList.filter(
      (fav) => fav.address !== place.address
    );
    setFavoritesList(updatedFavorites);
    sessionStorage.setItem("Favorites", JSON.stringify(updatedFavorites));
    console.log("Removed from favorites:", place);
    console.log("Favorites after removing:", updatedFavorites);
  };

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getPlaces();
    }
  }, [type, bounds]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoLocation);
  }, []);

  const getPlaces = async () => {
    try {
      const data = await getPlacesDetails(
        type,
        bounds?._northEast,
        bounds?._southWest
      );

      if (Array.isArray(data)) {
        const filteredData = data.filter(
          (place) => place.name && place.num_reviews > 0
        );
        setPlaces(filteredData);
      } else {
        console.error("Error: Data is not in expected format", data);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching places:", error);
      setIsLoading(false);
    }
  };

  const handleGeoLocation = ({ coords }) => {
    const { latitude, longitude } = coords;
    setCoords({ lat: latitude, lng: longitude });
  };

  const handleSearchCoords = (newCoords) => {
    setSearchedCoords(newCoords);
    setBounds(null);
  };

  return (
    <div>
      <CssBaseline />
      <MainHeader
        selected={childClicked}
        openFavorites={setIsViewingFavorites}
        AddNewFav={handleAddToFavorites}
        setSearchCoords={handleSearchCoords}
        setSearchedCoords={setSearchedCoords}
        setSelectedRating={setSelectedRating}
      />
      <FiltersLayer
        places={places}
        setFilteredMarkers={setFilteredMarkers}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        sortByReviews={sortByReviews}
        setSortByReviews={setSortByReviews}
        selectedPriceLevel={selectedPriceLevel}
        setSelectedPriceLevel={setSelectedPriceLevel}
        selectedCuisines={selectedCuisines}
        setSelectedCuisines={setSelectedCuisines}
        open={open}
        setOpen={setOpen}
      />
      <Grid container style={{ position: "relative", width: "100%", height: "100%" }}>
        <Grid item xs={12} md={3} style={{ zIndex: 1 }}>
          <ResultsList
            type={type}
            setType={setType}
            childClicked={childClicked}
            isLoading={isLoading}
            places={places}
            setFilteredMarkers={setFilteredMarkers}
            selectedRating={selectedRating}
            sortByReviews={sortByReviews}
            selectedPriceLevel={selectedPriceLevel}
            selectedCuisines={selectedCuisines}
          />
        </Grid>
        <Grid item xs={12} md={9} style={{ position: "relative", zIndex: 0 }}>
          <LLMap
            coords={coords}
            places={filteredMarkers}
            setCoords={setCoords}
            setBounds={setBounds}
            setChildClicked={setChildClicked}
            searchedCoords={searchedCoords}
            style={{ pointerEvents: isViewingFavorites ? "none" : "auto" }}
          />
        </Grid>
        {isViewingFavorites && (
          <Grid item xs={12} md={3} style={{ position: "absolute", top: 0, right: 0, zIndex: 2 }}>
            <FavoritesList
              setIsViewingFavorites={setIsViewingFavorites}
              Data={favoritesList}
              RemoveItem={handleRemoveFromFavorites}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default App;
