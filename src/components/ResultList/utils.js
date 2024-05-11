//utils.js
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
    const priceLevelOrder = { "$": 1, "$$ - $$$": 2, "$$$$": 3 }; // Определяем порядок ценовых уровней
    return priceLevelOrder[a.price_level] - priceLevelOrder[b.price_level];
  };
  