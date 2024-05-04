// PlaceCard.js
import React from "react";
import { Card, CardMedia, CardContent, Typography, Box, Link } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import PublicIcon from "@material-ui/icons/Public";
import RestaurantIcon from "@material-ui/icons/Restaurant";

const PlaceCard = ({ place, placeRef, selected }) => {
  React.useEffect(() => {
    if (selected) {
      placeRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected, placeRef]);

  return (
    <Card elevation={4}>
      <CardMedia
        style={{ height: 240 }}
        image={
          place.photo
            ? place.photo.images.large.url
            :"https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.webp"
        }
        title={place.name}
      ></CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography>
            {place.num_reviews} review{place.num_reviews > 1 && "s"}
          </Typography>
        </Box>
        {place.address && (
          <Typography
            gutterBottom
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <LocationOnIcon />
            {place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <PhoneIcon />
            {place.phone}
          </Typography>
        )}
        {place.website && (
          <Typography style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <PublicIcon />
            <Link href={place.website} target="_blank" rel="noopener noreferrer">
              {place.website}
            </Link>
          </Typography>
        )}
        
        {place.price_level && (
          <Typography style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <RestaurantIcon />
            Price Level: {place.price_level}
          </Typography>
        )}
        {place.opening_hours && (
          <Typography style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <RestaurantIcon />
            Status: {place.opening_hours.open_now ? "Open" : "Closed"}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PlaceCard;