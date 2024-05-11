import React, { useState, useRef } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Grid,
  Divider 
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
}) {
  const [selectedRating, setSelectedRating] = useState('');
  const [sortByReviews, setSortByReviews] = useState('');
  const [selectedPriceLevel, setSelectedPriceLevel] = useState('');
  const classes = useStyles();
  const elRefs = useRef([]);

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
  };

  const handleSortByReviewsChange = (event) => {
    setSortByReviews(event.target.value);
  };

  const handlePriceLevelChange = (event) => {
    setSelectedPriceLevel(event.target.value);
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
              value={selectedRating || ''}
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
              value={sortByReviews || ''}
              onChange={handleSortByReviewsChange}
            >
              <MenuItem value={null}>None</MenuItem>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
  <InputLabel id="price-level">Price Level:</InputLabel>
  <Select
    labelId="price-level"
    id="price-level-select"
    value={selectedPriceLevel || ''}
    onChange={handlePriceLevelChange}
  >
    <MenuItem value={null}>All</MenuItem>
    <MenuItem value="$">Cheap</MenuItem>
    <MenuItem value="$$ - $$$">Medium</MenuItem>
    <MenuItem value="$$$$">Expensive</MenuItem>
  </Select>
</FormControl>

          <Grid container spacing={3} className={classes.list}>
          {filterByRating(places, selectedRating)
  .filter(place => !selectedPriceLevel || place.price_level === selectedPriceLevel) // Фильтрация по уровню цен
  .sort((a, b) => sortByReviewCount(a, b, sortByReviews)) // Сортировка по количеству отзывов
  .sort(sortByPriceLevel) // Дополнительная сортировка по уровню цен
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
        </div>
      )}
    </div>
  );
}
