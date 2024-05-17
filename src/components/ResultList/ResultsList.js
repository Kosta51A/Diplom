import React, { useState, useRef, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  CircularProgress,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Button
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
  setFilteredMarkers
}) {
  const [selectedRating, setSelectedRating] = useState('');
  const [sortByReviews, setSortByReviews] = useState('');
  const [selectedPriceLevel, setSelectedPriceLevel] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [open, setOpen] = useState(false); 
  const classes = useStyles();
  const elRefs = useRef([]);

  const handleRatingChange = (event) => setSelectedRating(event.target.value);
  const handleSortByReviewsChange = (event) => setSortByReviews(event.target.value);
  const handlePriceLevelChange = (event) => setSelectedPriceLevel(event.target.value);
  const handleCuisineChange = (event) => setSelectedCuisines(event.target.value);
  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);
  const handleClearFilters = () => {
    setSelectedRating('');
    setSortByReviews('');
    setSelectedPriceLevel('');
    setSelectedCuisines([]);
  };

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
        <div>
          <FormControl className={classes.formControl} variant="outlined" >
            <InputLabel id="cuisine">Cuisine:</InputLabel>
            <Select
              labelId="cuisine"
              id="cuisine-select"
              multiple
              value={selectedCuisines}
              onChange={handleCuisineChange}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
            >
              {Array.from(new Set(places.flatMap(place => place.cuisine.map(c => c.name)))).map(cuisine => (
                <MenuItem key={cuisine} value={cuisine}>
                  <Checkbox checked={selectedCuisines.includes(cuisine)} />
                  <ListItemText primary={cuisine} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl} variant="outlined">
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
          
          <FormControl className={classes.formControl} variant="outlined">
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
          
          <FormControl className={classes.formControl} variant="outlined">
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

          <Button onClick={handleClearFilters} color="secondary">Clear Filters</Button>

          <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle>Choose Cuisines</DialogTitle>
            <DialogContent>
              {Array.from(new Set(places.flatMap(place => place.cuisine.map(c => c.name)))).map(cuisine => (
                <FormControlLabel
                  key={cuisine}
                  control={
                    <Checkbox
                      checked={selectedCuisines.includes(cuisine)}
                      onChange={handleCuisineChange}
                      value={cuisine}
                      color="primary"
                    />
                  }
                  label={cuisine}
                />
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

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
        </div>
      )}
    </div>
  );
}
