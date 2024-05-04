// App.js
import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import MainHeader from "./components/Header/Header";
import { getPlacesDetails } from "./API/API";
import ResultsList from "./components/ResultList/ResultsList";
import LLMap from "./components/Map/Map";
import FavoritesList from "./components/Favorits/FavoritesList";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

function App() {
  const [type, setType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isViewingFavorites, setIsViewingFavorites] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);
  const [searchedCoords, setSearchedCoords] = useState(null); // Добавляем состояние для новых координат

  useEffect(() => {
    const savedFavorites = localStorage.getItem("Favorites");
    if (savedFavorites) {
      setFavoritesList(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("Favorites", JSON.stringify(favoritesList));
  }, [favoritesList]);

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

  const handleAddToFavorites = (newPlace) => {
    if (!favoritesList.some((place) => place.address === newPlace.address)) {
      setFavoritesList((prevFavorites) => [...prevFavorites, newPlace]);
    }
  };

  const handleRemoveFromFavorites = (place) => {
    const updatedFavorites = favoritesList.filter(
      (fav) => fav.address !== place.address
    );
    setFavoritesList(updatedFavorites);
  };

  const handleSearchCoords = (newCoords) => {
    setSearchedCoords(newCoords); // Устанавливаем новые координаты из поиска
    setBounds(null); // Сбрасываем bounds для обновления мест
  };

  return (
    <div>
      <CssBaseline />
       <MainHeader
       selected={childClicked}
       openFavorites={setIsViewingFavorites}
       AddNewFav={handleAddToFavorites}
       setSearchCoords={handleSearchCoords}
       setSearchedCoords={setSearchedCoords} // Добавьте эту строку
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
            key={searchedCoords?.lat} // Используем новые координаты для обновления ключа
            coords={coords}
            places={places}
            setBounds={setBounds}
            setCoords={setCoords}
            setChildClicked={setChildClicked}
            searchedCoords={searchedCoords} // Передаем новые координаты в LLMap
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