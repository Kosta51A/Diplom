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
    [theme.breakpoints.down("xs")]: {
      maxWidth: "90%", // Изменяем максимальную ширину для мобильных устройств
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
    height: "100%",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      height: "70vh", // Уменьшаем высоту контейнера для мобильных устройств
    },
  },
}));

export default useStyles;
