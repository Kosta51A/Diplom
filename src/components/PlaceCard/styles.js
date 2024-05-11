// PlaceCard.js styles
// PlaceCard.js styles
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "auto", // Центрируем карточку по горизонтали
    borderRadius: "16px",
    overflow: "hidden",
    [theme.breakpoints.up("sm")]: {
      alignItems: "center", // Центрируем компонент на планшетах и выше
    },
  },
  media: {
    height: "240px",
    width: "100%", // Устанавливаем ширину изображения на 100%
    objectFit: "cover",
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
