import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import MainHeader from "./components/Header/Header";
import { getPlacesDetails } from "./API/API";
import ResultsList from "./components/ResultList/ResultsList";
import LLMap from "./components/Map/Map";
import FavoritesList from "./components/Favorits/FavoritesList";

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

  useEffect(() => {
    const savedFavorites = sessionStorage.getItem("Favorites");
    if (savedFavorites) {
      setFavoritesList(JSON.parse(savedFavorites));
      console.log("Favorites loaded from sessionStorage:", JSON.parse(savedFavorites));
    }
  }, []);

  const handleAddToFavorites = (newPlace) => {
    if (!favoritesList.some((place) => place.address === newPlace.address)) {
      const updatedFavorites = [...favoritesList, newPlace];
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
      const filteredData = data.filter(
        (place) => place.name && place.num_reviews > 0
      );
      setPlaces(filteredData);
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
     />
      <Grid container style={{ width: "100%", height: "100%" }}>
        <Grid item xs={12} md={3}>
          <ResultsList
            type={type}
            setType={setType}
            childClicked={childClicked}
            isLoading={isLoading}
            places={places}
          />
        </Grid>
        <Grid item xs={12} md={isViewingFavorites ? 6 : 9}>
          <LLMap
            key={searchedCoords?.lat} 
            coords={coords}
            places={places}
            setBounds={setBounds}
            setCoords={setCoords}
            setChildClicked={setChildClicked}
            searchedCoords={searchedCoords}
          />
        </Grid>
        {isViewingFavorites && (
          <Grid item xs={12} md={3}>
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
