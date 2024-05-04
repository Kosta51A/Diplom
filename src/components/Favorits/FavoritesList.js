import React from "react";
import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "./styles";

export default function FavoritesList({ Data, RemoveItem, setIsViewingFavorites }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.listHeader}>
        <Button
          endIcon={<CloseIcon />}
          variant="outlined"
          color="secondary"
          onClick={() => setIsViewingFavorites(false)}
        >
          Close
        </Button>
      </div>
      <div className={classes.list}>
        {Data.length !== 0 ? (
          Data.map(({ name, address }, index) => (
            <div key={index} className={classes.favItem}>
              <div className={classes.place}>
                <div className={classes.placeName}>{name}</div>
                <div className={classes.placeAddress}>{address}</div>
              </div>
              <div className={classes.remove}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => RemoveItem(Data[index])}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className={classes.noFav}>
            <div className={classes.noFavText}>No favorites yet</div>
          </div>
        )}
      </div>
    </div>
  );
}
