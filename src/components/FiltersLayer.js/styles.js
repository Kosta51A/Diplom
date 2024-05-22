import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2), // Increased border radius for the container
    boxShadow: theme.shadows[3],
    backgroundColor: "#cccccc",
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
    backgroundColor: "#E30B5D", // Raspberry color for the button
    color: "#ffffff", // White text color
  },
  dialogContent: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  inputLabel: {
    color: "#E30B5D", // Default color for input labels
  },
  menuPaper: {
    borderRadius: 20, // Rounded edges for the dropdown list
  },
  select: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E30B5D", // Default color for the select input border
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E30B5D", // Default color for the select input border on hover
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E30B5D", // Default color for the select input border when focused
    },
  },
}));
