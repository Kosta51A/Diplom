import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#333",
    paddingBottom: theme.spacing(2), // Уменьшаем отступ снизу
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: theme.spacing(1), // Уменьшаем отступ снизу
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    color: "#fff", // Белый цвет текста
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1), // Уменьшаем отступ сверху
    width: "100%",
  },
  searchPaper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    borderRadius: 25, // Увеличиваем закругление
    width: "80%", // Увеличиваем ширину
    maxWidth: 800,
    backgroundColor: "#404040", // Изменяем цвет фона на светлый серый
    [theme.breakpoints.down("sm")]: {
      width: "90%", // Уменьшаем ширину для мобильных устройств
    },
  },
  searchField: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
    backgroundColor: "#404040", // Светлый серый цвет фона
  },
  searchButton: {
    textTransform: "none",
    borderRadius: 25, // Увеличиваем закругление
    backgroundColor: "#3f51b5", // Синий цвет кнопки
    color: "#fff", // Белый цвет текста кнопки
  },
  favoritesContainer: {
    display: "flex",
    alignItems: "center",
  },
  favoritesText: {
    marginRight: theme.spacing(1),
  },
}));

export default useStyles;
