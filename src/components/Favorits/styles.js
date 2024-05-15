import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    height: "auto", // Установка высоты на auto
    display: "flex",
    flexDirection: "column", // Расположение по вертикали
  },
  listHeader: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  closeButton: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  list: {
    overflowY: "auto",
    flex: 1, // Растягиваем список на всю доступную высоту
  },
  removeButton: {
    cursor: "pointer",
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
    padding: theme.spacing(2),
    color: "#999",
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
