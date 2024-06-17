import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[3],

    backgroundColor: "#cccccc",
  },
  inputLabel: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  priceLevelContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  select: {
    width: "100%",
    borderColor: "#FFA500",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FFA500",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FFA500",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FFA500",
    },
  },
  clearButton: {
    margin: theme.spacing(0, 0),
    borderRadius: 20,
    backgroundColor: "#E30B5D",
    color: "#ffffff",
  },
}));

