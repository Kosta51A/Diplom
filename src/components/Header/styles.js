import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    marginRight: theme.spacing(2),
  },
  searchField: {
    marginRight: theme.spacing(2),
    width: 250,
  },
  searchButton: {
    textTransform: "none",
  },
  favoritesButton: {
    marginLeft: theme.spacing(1),
  },
}));

export default useStyles;
