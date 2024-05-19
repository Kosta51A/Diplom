import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "transparent",
    width: "fit-content", // Set initial width to fit content
  },
  listHeader: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2),
    
  },
  closeButton: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
    padding: theme.spacing(1),
    borderRadius: "50%",
    backgroundColor: "#f5f5f5",
  },
  list: {
    overflowY: "auto",
    flex: 1,
  },
  removeButton: {
    cursor: "pointer",
    color: theme.palette.error.main,
    "&:hover": {
      color: theme.palette.error.dark,
    },
  },
  place: {
    marginBottom: theme.spacing(1),
  },
  placeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(0.5),
  },
  placeName: {
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
  placeAddress: {
    fontSize: "0.9rem",
    color: "#666",
  },
  favItem: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  noFav: {
    textAlign: "center",
    padding: theme.spacing(4), // Increase padding for better spacing
    color: "#999",
    backgroundColor: "#f9f9f9", // Add background color
    borderRadius: theme.spacing(2), // Add border radius
    width: "100%", // Set width to 100% when there are no favorites
  },
  noFavText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rating: {
    display: "flex",
    alignItems: "center",
  },
}));
