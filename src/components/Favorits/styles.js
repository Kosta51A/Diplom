import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: 25,
  },
  loading: {
    width: "100%",
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listHeader: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  list: {
    height: "75vh",
    overflow: "auto",
  },
  place: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  placeName: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  placeAddress: {
    fontSize: "0.75rem",
    marginBottom: "1rem",
  },
  remove: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
  },
  favItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottom: "1px solid #ccc",
  },
  noFav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottom: "1px solid #ccc",
  },
  noFavText: {
    fontSize: "1rem",
    fontWeight: "bold",
    marginTop: "1rem",
  },
}));
