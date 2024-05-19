import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    width: "100%",
    height: "100%",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  list: {
    overflow: "auto",
    maxHeight: "calc(100vh - 120px)", // Adjusted to accommodate header and footer
    [theme.breakpoints.down("sm")]: {
      maxHeight: "calc(100vh - 160px)", // Adjusted for smaller screens
    },
  },
}));
