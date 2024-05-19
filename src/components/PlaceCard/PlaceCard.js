import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Link, Divider } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import PublicIcon from "@material-ui/icons/Public";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';
import useStyles from "./styles";

const PlaceCard = ({ place, placeRef, selected }) => {
  const classes = useStyles();

  React.useEffect(() => {
    if (selected) {
      placeRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected, placeRef]);

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
          <Typography variant="body2" color="textSecondary" className={classes.reviewCount}>
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
            <Link href={place.web_url} target="_blank" rel="noopener noreferrer" className={classes.link}>
              Website
            </Link>
          </Typography>
        )}
      </CardContent>
      <Box className={classes.actions}>
        <Link href={place.write_review} target="_blank" rel="noopener noreferrer" className={classes.reviewLink}>
          <AddCommentRoundedIcon className={classes.reviewIcon} />
          Leave a Review
        </Link>
      </Box>
    </Card>
  );
};

export default PlaceCard;
