export const filterByRating = (places, selectedRating) => {
    return places.filter((place) =>
      !selectedRating ? true : Number(place.rating) >= selectedRating
    );
  };

  export const sortByReviewCount = (a, b, sortByReviews) => {
    if (sortByReviews === "asc") {
      return a.num_reviews - b.num_reviews;
    } else if (sortByReviews === "desc") {
      return b.num_reviews - a.num_reviews;
    }
    return 0;
  };
  