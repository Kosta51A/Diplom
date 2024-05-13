// ResultList.js styles
import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: "5%",
    width: "100%",
    height: "60%",
  },
  formControl: {
    margin: 10,
    minWidth: 150,
    maxWidth: 150,
    marginBottom: 30,
    maxHeight: 150,
    overflowY: "auto",
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%",
      marginBottom: "5%",
      margin: 5,
    },
  },
  loading: {
    width: "100%",
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    height: "68vh",
    overflow: "auto",
    [theme.breakpoints.down("xs")]: {
      height: "60vh",
    },
  },
}));
export default useStyles;