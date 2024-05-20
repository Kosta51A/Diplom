// PlaceCard.js
import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import PublicIcon from "@material-ui/icons/Public";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';
import useStyles from "./styles";

const PlaceCard = ({ place, placeRef, selected }) => {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  React.useEffect(() => {
    if (selected) {
      placeRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected, placeRef]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placeId: place.location_id, // Используем place_id вместо location_id
          placeName: place.name,
          placeAddress: place.address,
          user,
          comment,
          rating,
        }),
      });
      if (response.ok) {
        const review = await response.json();
        console.log('Review submitted:', review);
        setUser("");
        setComment("");
        setRating(0);
        setIsReviewFormVisible(false);
        alert('Review submitted successfully');
      } else {
        console.error('Failed to submit review');
        alert('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review');
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
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
    </Card>
  );
};

export default PlaceCard;

