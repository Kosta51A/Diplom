import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  popup: {
    maxWidth: 300,
    backgroundColor: "#fff",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    "& .leaflet-popup-content-wrapper": {
      padding: theme.spacing(1),
    },
    "& .leaflet-popup-content": {
      width: "100%",
      textAlign: "left",
    },
    "& .leaflet-popup-tip-container": {
      display: "none",
    },
  },
  cardImage: {
    height: 100,
    width: "100%",
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
  },
  highlightedText: {
    fontWeight: "bold",
  },
  mapContainer: {
    height: "90vh",
    width: "100%",
  },
}));
export default useStyles;
