import React, { useState } from "react";
import { Typography, Paper } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useStyles } from "./styles";

export default function FavoritesList({ Data, RemoveItem, setIsViewingFavorites }) {
  const classes = useStyles();
  const [ratings, setRatings] = useState({});

  const handleRatingChange = (index, newRating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [index]: newRating
    }));

    // Update sessionStorage with the new rating
    const updatedFavorites = Data.map((item, i) => ({
      ...item,
      rating: i === index ? newRating : item.rating
    }));
    sessionStorage.setItem("Favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Paper className={classes.container} elevation={3} style={{ backgroundColor: "transparent" }}>
      <div className={classes.listHeader}>
        <Typography
          variant="button"
          color="secondary"
          className={classes.closeButton}
          onClick={() => setIsViewingFavorites(false)}
        >
          <CloseIcon fontSize="small" /> Close
        </Typography>
      </div>
      <div className={classes.list}>
        {Data.length !== 0 ? (
          Data.map(({ name, address, rating }, index) => (
            <Paper key={index} className={classes.favItem} elevation={12}>
              <div className={classes.place}>
                <div className={classes.placeHeader}>
                  <Typography variant="h6" className={classes.placeName}>{name}</Typography>
                  <Typography
                    variant="button"
                    color="primary"
                    onClick={() => RemoveItem(Data[index])}
                    className={classes.removeButton}
                  >
                    Remove
                  </Typography>
                </div>
                <Typography variant="body1" className={classes.placeAddress}>{address}</Typography>
              </div>
              <div className={classes.actions}>
                <div className={classes.rating}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <StarButton
                      key={value}
                      value={value}
                      onClick={() => handleRatingChange(index, value)}
                      isActive={ratings[index] >= value || rating >= value}
                    />
                  ))}
                </div>
              </div>
            </Paper>
          ))
        ) : (
          <div className={classes.noFav}>
            <Typography variant="h6" className={classes.noFavText}>No favorites yet</Typography>
          </div>
        )}
      </div>
    </Paper>
  );
}

const StarButton = ({ value, onClick, isActive }) => (
  <Typography
    variant="button"
    color="primary"
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    {isActive ? <StarIcon /> : <StarBorderIcon />}
  </Typography>
);
