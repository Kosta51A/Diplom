import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: 25,
  },
  formControl: {
    margin: 10,
    minWidth: 180,
    marginBottom: 30,
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%", // Изменяем минимальную ширину на мобильных устройствах
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
    height: "80vh",
    overflow: "auto",
    [theme.breakpoints.down("xs")]: {
      height: "60vh", // Уменьшаем высоту списка на мобильных устройствах
    },
  },

}));
