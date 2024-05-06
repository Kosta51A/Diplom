// styles.js
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 400,
    margin: theme.spacing(2),
    borderRadius: 16,
    overflow: "hidden",
  },
  media: {
    height: 240,
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  reviewCount: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  link: {
    color: theme.palette.primary.main,
  },
  actions: {
    marginTop: "auto",
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
  },
  reviewIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
