import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  Snackbar,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import MuiAlert from "@material-ui/lab/Alert";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import PublicIcon from "@material-ui/icons/Public";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import AddCommentRoundedIcon from "@material-ui/icons/AddCommentRounded";
import useStyles from "./styles";

// Компонент Alert для использования в Snackbar
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const PlaceCard = ({ place, placeRef, selected }) => {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  React.useEffect(() => {
    if (selected) {
      placeRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected, placeRef]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      showSnackbar("Please complete the CAPTCHA", "warning");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placeId: place.location_id,
          placeName: place.name,
          placeAddress: place.address,
          user,
          email,
          comment,
          rating,
          captchaValue,
        }),
      });
      if (response.ok) {
        const review = await response.json();
        console.log("Review submitted:", review);
        setUser("");
        setEmail("");
        setComment("");
        setRating(0);
        setCaptchaValue(null);
        setIsReviewFormVisible(false);
        showSnackbar("Review submitted successfully", "success");
      } else {
        const { error } = await response.json();
        console.error("Failed to submit review:", error);
        showSnackbar(`Failed to submit review: ${error}`, "error");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      showSnackbar("Error submitting review", "error");
    }
  };

  return (
    <Card elevation={3} className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.webp"
        }
        title={place.name}
      />
      <CardContent>
        <Typography variant="h5" align="center" gutterBottom>
          {place.name}
        </Typography>
        <Divider className={classes.divider} />
        <Box display="flex" alignItems="center">
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.reviewCount}
          >
            {place.num_reviews} review{place.num_reviews > 1 ? "s" : ""}
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <LocationOnIcon className={classes.icon} />
          {place.address}
        </Typography>
        {place.price_level && (
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <RestaurantIcon className={classes.icon} />
            Price Level: {place.price_level}
          </Typography>
        )}
        {place.phone && (
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <PhoneIcon className={classes.icon} />
            {place.phone}
          </Typography>
        )}
        {place.website && (
          <Typography variant="body2" color="textSecondary">
            <PublicIcon className={classes.icon} />
            <a
              href={place.web_url}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              Website
            </a>
          </Typography>
        )}
      </CardContent>
      <Box className={classes.actions}>
        {isReviewFormVisible ? (
          <form onSubmit={handleReviewSubmit} className={classes.reviewForm}>
            <TextField
              label="Name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <Rating
              name="rating"
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              required
            />
            <ReCAPTCHA
              sitekey="6Lco1OcpAAAAAIhNNxzDASEpegD4ZGtq8B7wWtf9"
              onChange={setCaptchaValue}
              className={classes.captcha}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.submitButton}
              style={{ width: "100%" }}
            >
              Submit
            </Button>
          </form>
        ) : (
          <Button
            startIcon={<AddCommentRoundedIcon />}
            onClick={() => setIsReviewFormVisible(true)}
            className={classes.reviewButton}
          >
            Leave a Review
          </Button>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default PlaceCard;
