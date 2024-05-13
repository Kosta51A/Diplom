import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Box, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { DomEvent } from "leaflet";

const LeafIcon = L.Icon.extend({
  options: {
    iconSize: [35, 44],
    iconAnchor: [22, 44],
    popupAnchor: [-2, -75],
  },
});

const Icon = new LeafIcon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/10713/10713974.png",
});

const LLMap = ({ coords, places, setBounds, setCoords, setChildClicked, searchedCoords }) => {
  const classes = useStyles();
  const [markers, setMarkers] = useState(null);
  const [allMarkers, setallMarkers] = useState(null);
  const [zoom, setZoom] = useState(16);
  const [mapKey, setMapKey] = useState(0); // Добавляем состояние для ключа

  function DisplayMarkers() {
    const mMap = useMap();
    const map = useMapEvents({
      moveend() {
        setBounds(mMap.getBounds());
        setCoords(mMap.getCenter());
        const markers = allMarkers?.filter((m) => mMap?.getBounds().contains(m));
        setMarkers(markers);
        setZoom(mMap.getZoom());
      },
    });

    return markers == null
      ? null
      : places?.length > 0 &&
          places?.map((place, index) => (
            place.latitude && place.longitude ? (
            <Marker
              key={index}
              position={[place.latitude, place.longitude]}
              icon={Icon}
              eventHandlers={{
                click: (e) => {
                  DomEvent.stopPropagation(e); // Остановка распространения события
                  setChildClicked(place);
                },
              }}
            >
              <Popup
                className={classes.popup}
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                autoPan={false} 
              >
                <Box className={classes.popupContent}>
                  <img
                    className={classes.cardImage}
                    src={place.photo ? place.photo.images.large.url : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"}
                    alt={place.name}
                  />
                  <Box ml={2}>
                    <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: 10 }}>
                      {place.name}
                    </Typography>
                    <Typography>
                      <span className={classes.highlightedText}>Cuisine:</span> {place.cuisine.length > 0 ? place.cuisine.map(c => c.name).join(", ") : "Not shown"}
                    </Typography>
                    <Typography>
                      <span className={classes.highlightedText}>Open Now:</span> {place.open_now_text === "Open Now" ? "Yes" : "No"}
                    </Typography>
                    <Typography>
                      <span className={classes.highlightedText}>Ranking:</span> {place.ranking}
                    </Typography>
                  </Box>
                </Box>
              </Popup>
            </Marker>
            ):null
          ));
  }

  useEffect(() => {
    const southWest = new L.LatLng(36.824932, 10.194655),
      northEast = new L.LatLng(36.794009, 10.164443),
      bounds = new L.LatLngBounds(southWest, northEast);
    const myMarkers = generateMarkers(25, bounds);
    setallMarkers(myMarkers);
  }, []);

  useEffect(() => {
    console.log("New coordinates:", coords);
  }, [coords]);

  useEffect(() => {
    console.log("New places:", places);
  }, [places]);

  useEffect(() => {
    if (searchedCoords) {
      setCoords(searchedCoords); // Устанавливаем новые координаты в центр карты
      setMapKey(prevKey => prevKey + 1); // Увеличиваем ключ для вызова перерисовки MapContainer
    }
  }, [searchedCoords]);

  return (
    <MapContainer
      key={mapKey} // Используем ключ для принудительного обновления MapContainer
      className={classes.mapContainer}
      center={[coords?.lat || 53.68487875915163 , coords?.lng || 23.839491321653313]}
      zoom={zoom}
      zoomControl={true}
      doubleClickZoom={true}
      scrollWheelZoom={false}
      dragging={true}
      zoomAnimation={true}
      easeLinearity={0.35}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <DisplayMarkers />
    </MapContainer>
  );
};

function generateMarkers(count, bounds) {
  const minLat = bounds.getSouthWest().lat,
    rangeLng = bounds.getNorthEast().lat - minLat,
    minLng = bounds.getSouthWest().lng,
    rangeLat = bounds.getNorthEast().lng - minLng;

  return Array.from({ length: count }, () => {
    return new L.LatLng(
      minLat + Math.random() * rangeLng,
      minLng + Math.random() * rangeLat
    );
  });
}

export default LLMap;
