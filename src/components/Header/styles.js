// Header styles.js
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  headerLeft: {
    display: "flex",
    alignItems: "center",
  },
  
  headerRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Выравнивание по центру
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-end", // Для более широких экранов
    },
  },
  title: {
    marginRight: theme.spacing(2),
  },
  searchField: {
    width: "100%", // Ширина 100% для адаптивности
    textAlign: "center", // Центрирование текста
    [theme.breakpoints.up("sm")]: {
      width: 500, // Ширина для более широких экранов
      textAlign: "left", // Возвращаем левое выравнивание на более широких экранах
    },
    [theme.breakpoints.down("xs")]: { // Медиа-запрос для всех мобильных устройств
      width: "calc(100% - 48px)", // Ширина поля ввода на мобильных устройствах (вычтем ширину иконки поиска и отступы)
      margin: 0, // Убираем отступы
      marginBottom: theme.spacing(1), // Добавляем небольшой отступ снизу
      marginTop: theme.spacing(1), // Добавляем отступ сверху
    },
  },
  searchButton: {
    textTransform: "none",
  },
  favoritesButton: {
    marginLeft: theme.spacing(1),
  },
}));

export default useStyles;
