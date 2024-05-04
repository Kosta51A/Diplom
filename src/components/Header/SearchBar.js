//SearchBar.js
import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-geocode";

const SearchBar = ({ setCoords }) => {
  const [address, setAddress] = useState("");

  const handleSelect = async (value) => {
    setAddress(value);
    try {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setCoords(latLng);
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
  };

  return (
    <Autocomplete onLoad={(autocomplete) => (autocomplete ? setAddress(autocomplete) : null)} onPlaceChanged={() => handleSelect(address)}>
      <input
        type="text"
        placeholder="Enter a city..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </Autocomplete>
  );
};

export default SearchBar;
