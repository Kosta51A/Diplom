import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  searchField: {
    marginRight: theme.spacing(2),
  },
  searchButton: {
    marginLeft: theme.spacing(2),
  },
  favoritesButton: {
    marginLeft: theme.spacing(1),
  },
  searchIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
