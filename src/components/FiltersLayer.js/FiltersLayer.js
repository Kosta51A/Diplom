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
          <InputLabel className={classes.inputLabel} style={{ color: "#FFA500" }}>
            <RestaurantIcon className={classes.icon} style={{ color: "#FFA500" }} />
            Cuisine:
          </InputLabel>
          <Select
            multiple
            value={selectedCuisines}
            onChange={handleCuisineChange}
            renderValue={(selected) => selected.join(", ")}
            fullWidth
            MenuProps={{ classes: { paper: classes.menuPaper } }}
            className={classes.select}
            style={{ borderColor: "#FFA500" }}
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
          <InputLabel className={classes.inputLabel} style={{ color: "#e7ff00" }}>
            <StarIcon className={classes.icon} style={{ color: "#e7ff00" }} />
            Rating:
          </InputLabel>
          <Select
            value={selectedRating || ""}
            onChange={handleRatingChange}
            fullWidth
            MenuProps={{ classes: { paper: classes.menuPaper } }}
            className={classes.select}
            style={{ borderColor: "#FFD700" }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value={3}>3 stars and above</MenuItem>
            <MenuItem value={4}>4 stars and above</MenuItem>
            <MenuItem value={5}>5 stars</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel className={classes.inputLabel} style={{ color: "#0000FF" }}>
            <SortIcon className={classes.icon} style={{ color: "#0000FF" }} />
            Sort by Reviews:
          </InputLabel>
          <Select
            value={sortByReviews || ""}
            onChange={handleSortByReviewsChange}
            fullWidth
            MenuProps={{ classes: { paper: classes.menuPaper } }}
            className={classes.select}
            style={{ borderColor: "#0000FF" }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel className={classes.inputLabel} style={{ color: "#008000" }}>
            <AttachMoneyIcon className={classes.icon} style={{ color: "#008000" }} />
            Price Level:
          </InputLabel>
          <Select
            value={selectedPriceLevel || ""}
            onChange={handlePriceLevelChange}
            fullWidth
            MenuProps={{ classes: { paper: classes.menuPaper } }}
            className={classes.select}
            style={{ borderColor: "#008000" }}
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
        >
          Clear Filters
        </Button>
      </Grid>
    </Paper>
  );
}
