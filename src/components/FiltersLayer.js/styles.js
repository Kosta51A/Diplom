import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2), // Increased border radius for the container
    boxShadow: theme.shadows[3],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
    display: "flex",
    alignItems: "center",
  },
  formControlLabel: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  list: {
    overflow: "auto",
    maxHeight: "calc(100vh - 200px)",
  },
  clearButton: {
    margin: theme.spacing(2, 0),
    borderRadius: 20, // Rounded corners for the button
  },
  dialogContent: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
}));
