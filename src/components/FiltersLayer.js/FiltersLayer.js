import React from "react";
import {
  Paper,
  InputLabel,
  Button,
  Grid,
  IconButton,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import {
  ClearAll as ClearAllIcon,
  Restaurant as RestaurantIcon,
  Star as StarIcon,
  Sort as SortIcon,
  AttachMoney as AttachMoneyIcon,
  Fastfood as FastfoodIcon,
  LocalBar as LocalBarIcon,
  LocalPizza as LocalPizzaIcon,
  EmojiFoodBeverage as SushiIcon,
  OutdoorGrill as GrillIcon,
  Star as StarFullIcon,
  StarBorder as StarBorderIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@material-ui/icons";
import { useStyles } from "./styles";
import RemoveIcon from "@material-ui/icons/Remove";
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

  const handleClearFilters = () => {
    setSelectedRating(0);
    setSortByReviews("");
    setSelectedPriceLevel("");
    setSelectedCuisines([]);
  };

  const priceLevels = ["$", "$$ - $$$", "$$$$", ""];
  const priceLevelColors = ["#00FF00", "#FFFF00", "#FF0000", "#000000"];

  return (
    <Paper elevation={3} className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel className={classes.inputLabel} style={{ color: "#FFA500" }}>
            <RestaurantIcon className={classes.icon} style={{ color: "#FFA500" }} />
            Cuisine:
          </InputLabel>
          <Select
            multiple
            value={selectedCuisines}
            onChange={(event) => setSelectedCuisines(event.target.value)}
            renderValue={(selected) => selected.join(", ")}
            fullWidth
            MenuProps={{ classes: { paper: classes.menuPaper } }}
            className={classes.select}
            style={{ borderColor: "#FFA500" }}
          >
            {Array.from(new Set(places.flatMap((place) => place.cuisine.map((c) => c.name)))).map((cuisine) => (
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
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <IconButton key={star} onClick={() => setSelectedRating(star)}>
                {selectedRating >= star ? <StarFullIcon style={{ color: "#FFD700" }} /> : <StarBorderIcon />}
              </IconButton>
            ))}
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel className={classes.inputLabel} style={{ color: "#0000FF" }}>
            <SortIcon className={classes.icon} style={{ color: "#0000FF" }} />
            Sort by Reviews:
          </InputLabel>
          <IconButton onClick={() => setSortByReviews((prevSort) => (prevSort === "asc" ? "desc" : prevSort === "desc" ? null : "asc"))}>
  {sortByReviews === "asc" ? (
    <ArrowUpwardIcon style={{ color: "green" }} />
  ) : sortByReviews === "desc" ? (
    <ArrowDownwardIcon style={{ color: "red" }} />
  ) : (
    <RemoveIcon style={{ color: "gray" }} />
  )}
</IconButton>

        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel className={classes.inputLabel} style={{ color: "#008000" }}>
            <AttachMoneyIcon className={classes.icon} style={{ color: "#008000" }} />
            Price Level:
          </InputLabel>
          <div className={classes.priceLevelContainer}>
            {priceLevels.map((level, index) => (
              <Button
                key={level}
                onClick={() => setSelectedPriceLevel(level)}
                style={{
                  backgroundColor: selectedPriceLevel === level ? priceLevelColors[index] : "",
                  borderColor: priceLevelColors[index],
                  color: selectedPriceLevel === level ? "white" : "black",
                  margin: "2px",
                }}
                variant="outlined"
              >
                {level || "All"}
              </Button>
            ))}
          </div>
        </Grid>
      </Grid>
      
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
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
