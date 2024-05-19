import React from "react";
import {
  Paper,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  Grid,
} from "@material-ui/core";
import {
  ClearAll as ClearAllIcon,
  Restaurant as RestaurantIcon,
  Star as StarIcon,
  Sort as SortIcon,
  AttachMoney as AttachMoneyIcon,
} from "@material-ui/icons";
import { useStyles } from "./styles";

export default function FiltersLayer({
  places,
  setFilteredMarkers,
  selectedRating,
  setSelectedRating,
  sortByReviews,
  setSortByReviews,
  selectedPriceLevel,
  setSelectedPriceLevel,
  selectedCuisines,
  setSelectedCuisines,
  open,
  setOpen,
}) {
  const classes = useStyles();

  const handleRatingChange = (event) => setSelectedRating(event.target.value);
  const handleSortByReviewsChange = (event) =>
    setSortByReviews(event.target.value);
  const handlePriceLevelChange = (event) =>
    setSelectedPriceLevel(event.target.value);
  const handleCuisineChange = (event) =>
    setSelectedCuisines(event.target.value);
  const handleDialogClose = () => setOpen(false);
  const handleClearFilters = () => {
    setSelectedRating("");
    setSortByReviews("");
    setSelectedPriceLevel("");
    setSelectedCuisines([]);
  };

  return (
    <Paper elevation={3} className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel>
            <RestaurantIcon className={classes.icon} />
            Cuisine:
          </InputLabel>
          <Select
            multiple
            value={selectedCuisines}
            onChange={handleCuisineChange}
            renderValue={(selected) => selected.join(", ")}
            fullWidth
            MenuProps={{
              PaperProps: {
                style: {
                  borderRadius: 20, // Rounded edges for the dropdown list
                },
              },
            }}
          >
            {Array.from(
              new Set(
                places.flatMap((place) =>
                  place.cuisine.map((c) => c.name)
                )
              )
            ).map((cuisine) => (
              <MenuItem key={cuisine} value={cuisine}>
                <Checkbox checked={selectedCuisines.includes(cuisine)} />
                <ListItemText primary={cuisine} />
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel>
            <StarIcon className={classes.icon} />
            Rating:
          </InputLabel>
          <Select
            value={selectedRating || ""}
            onChange={handleRatingChange}
            fullWidth
            MenuProps={{
              PaperProps: {
                style: {
                  borderRadius: 20, // Rounded edges for the dropdown list
                },
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value={3}>3 stars and above</MenuItem>
            <MenuItem value={4}>4 stars and above</MenuItem>
            <MenuItem value={5}>5 stars</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel>
            <SortIcon className={classes.icon} />
            Sort by Reviews:
          </InputLabel>
          <Select
            value={sortByReviews || ""}
            onChange={handleSortByReviewsChange}
            fullWidth
            MenuProps={{
              PaperProps: {
                style: {
                  borderRadius: 20, // Rounded edges for the dropdown list
                },
              },
            }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel>
            <AttachMoneyIcon className={classes.icon} />
            Price Level:
          </InputLabel>
          <Select
            value={selectedPriceLevel || ""}
            onChange={handlePriceLevelChange}
            fullWidth
            MenuProps={{
              PaperProps: {
                style: {
                  borderRadius: 20, // Rounded edges for the dropdown list
                },
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="$">Cheap</MenuItem>
            <MenuItem value="$$ - $$$">Medium</MenuItem>
            <MenuItem value="$$$$">Expensive</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Button
          onClick={handleClearFilters}
          color="secondary"
          startIcon={<ClearAllIcon />}
          className={classes.clearButton}
          variant="contained"
          style={{ borderRadius: 20 }} // Rounded corners for the button
        >
          Clear Filters
        </Button>
      </Grid>
    </Paper>
  );
}
