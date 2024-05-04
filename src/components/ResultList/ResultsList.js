//ResultsList.js
import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import PlaceCard from "../PlaceCard/PlaceCard";
import { filterByRating, sortByReviewCount } from "./utils";
import { useStyles } from "./styles";

export default function ResultsList({
  type,
  setType,
  isLoading,
  childClicked,
  places,
}) {
  const [elRefs, setElRefs] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortByReviews, setSortByReviews] = useState(null);
  const classes = useStyles();

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleSortByReviewsChange = (event) => {
    setSortByReviews(event.target.value);
  };

  return (
    <div className={classes.container}>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating:</InputLabel>
            <Select
              labelId="rating"
              id="rating-select"
              value={selectedRating}
              onChange={handleRatingChange}
            >
              <MenuItem value={null}>All</MenuItem>
              <MenuItem value={3}>3 stars and above</MenuItem>
              <MenuItem value={4}>4 stars and above</MenuItem>
              <MenuItem value={5}>5 stars</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="sort-by-reviews">Sort by Reviews:</InputLabel>
            <Select
              labelId="sort-by-reviews"
              id="sort-by-reviews-select"
              value={sortByReviews}
              onChange={handleSortByReviewsChange}
            >
              <MenuItem value={null}>None</MenuItem>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {filterByRating(places, selectedRating)
              .sort((a, b) => sortByReviewCount(a, b, sortByReviews))
              .map((place, index) => (
                <Grid ref={elRefs[index]} key={index} item xs={12}>
                  <PlaceCard
                    selected={Number(childClicked) === index}
                    placeRef={elRefs[index]}
                    place={place}
                    key={index}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
      )}
    </div>
  );
}
