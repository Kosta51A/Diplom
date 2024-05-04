import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  favoritesButton: {
    color: "white",
  },
  logo: {
    maxWidth: 40, // Настройте размер логотипа по вашему желанию
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
