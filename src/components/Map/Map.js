// Map.js
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
import { Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";

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
            <Marker
              key={index}
              position={[place.latitude, place.longitude]}
              icon={Icon}
              eventHandlers={{
                click: (e) => {
                  setChildClicked(place);
                },
              }}
            >
<Popup>
  <Typography>{place.name}</Typography>
  <Typography>
  Cuisine: {place.cuisine.map(c => c.name).join(", ")}
</Typography>
<Typography>
  Website: <a href={place.website} target="_blank">{place.website}</a>
</Typography>



  <div>
    <img
      className={classes.cardImage}
      src={
        place.photo
          ? place.photo.images.large.url
          : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
      }
      alt={place.name}
    />
    <Rating readOnly size={"small"} value={Number(place.rating)} />
  </div>
</Popup>

            </Marker>
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
    }
  }, [searchedCoords]);

  return (
    <MapContainer
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