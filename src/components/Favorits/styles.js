//FavoritesList.js styles
import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: 25,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  listHeader: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  list: {
    maxHeight: "60vh",
    overflowY: "auto",
  },
  place: {
    marginBottom: 10,
  },
  placeName: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: 5,
  },
  placeAddress: {
    fontSize: "0.9rem",
    color: "#666",
  },
  remove: {
    marginTop: "1rem",
  },
  favItem: {
    padding: 15,
    borderBottom: "1px solid #ccc",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  noFav: {
    textAlign: "center",
    padding: 20,
    color: "#999",
  },
  noFavText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
}));
