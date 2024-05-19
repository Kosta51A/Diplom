import React, { useState, useRef, useEffect } from "react";
import {
  CircularProgress,
  Grid,
  Divider,
} from "@material-ui/core";
import PlaceCard from "../PlaceCard/PlaceCard";
import { filterByRating, sortByReviewCount, sortByPriceLevel } from "./utils";
import { useStyles } from "./styles";

export default function ResultsList({
  type,
  setType,
  isLoading,
  childClicked,
  places,
  setFilteredMarkers,
  selectedRating,
  sortByReviews,
  selectedPriceLevel,
  selectedCuisines
}) {
  const classes = useStyles();
  const elRefs = useRef([]);

  useEffect(() => {
    const filteredPlaces = filterByRating(places, selectedRating)
      .filter(place => !selectedPriceLevel || place.price_level === selectedPriceLevel)
      .filter(place => selectedCuisines.length === 0 || selectedCuisines.every(cuisine => place.cuisine.some(c => c.name === cuisine)))
      .sort((a, b) => sortByReviewCount(a, b, sortByReviews))
      .sort(sortByPriceLevel);

    setFilteredMarkers(filteredPlaces);

    if (
      selectedRating === "" &&
      sortByReviews === "" &&
      selectedPriceLevel === "" &&
      selectedCuisines.length === 0
    ) {
      setFilteredMarkers(places);
    }
  }, [selectedRating, sortByReviews, selectedPriceLevel, selectedCuisines, places, setFilteredMarkers]);

  return (
    <div className={classes.container}>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={3} className={classes.list}>
          {filterByRating(places, selectedRating)
            .filter(place => !selectedPriceLevel || place.price_level === selectedPriceLevel)
            .filter(place => selectedCuisines.length === 0 || selectedCuisines.every(cuisine => place.cuisine.some(c => c.name === cuisine)))
            .sort((a, b) => sortByReviewCount(a, b, sortByReviews))
            .sort(sortByPriceLevel)
            .map((place, index) => (
              <Grid key={index} item xs={12}>
                <PlaceCard
                  selected={Number(childClicked) === index}
                  placeRef={(element) => (elRefs.current[index] = element)}
                  place={place}
                />
                {index < places.length - 1 && <Divider />}
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
}
