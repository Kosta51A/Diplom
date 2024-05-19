import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#333",
    paddingBottom: theme.spacing(2),
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    color: "#fff",
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1),
    width: "100%",
  },
  searchPaper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: 25,
    width: "80%",
    maxWidth: 800,
    backgroundColor: "#404040",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  searchField: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
    backgroundColor: "#404040",
  },
  searchButton: {
    textTransform: "none",
    borderRadius: 25,
    backgroundColor: "#d32f2f", // Малиновый цвет кнопки
    color: "#fff",
  },
  favoritesContainer: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: theme.spacing(2),
  },
  iconButton: {
    color: "#fff",
    marginRight: theme.spacing(1),
  },
  favoriteIcon: {
    color: "#d32f2f",
  },
}));

export default useStyles;
