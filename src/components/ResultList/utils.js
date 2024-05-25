// utils.js

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

  export const sortByPriceLevel = (a, b) => {
    const priceLevelOrder = { "$": 1, "$$ - $$$": 2, "$$$$": 3 };
    return priceLevelOrder[a.price_level] - priceLevelOrder[b.price_level];
  };

export const sortByCuisine = (a, b) => {
  const cuisinesA = a.cuisine ? a.cuisine.map(c => c.name) : [];
  const cuisinesB = b.cuisine ? b.cuisine.map(c => c.name) : [];

  const firstCuisineComparison = cuisinesA[0]?.localeCompare(cuisinesB[0]);
  if (firstCuisineComparison !== 0) {
    return firstCuisineComparison;
  }

  return cuisinesA[1]?.localeCompare(cuisinesB[1]);
};

