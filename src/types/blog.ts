export interface BlogItem {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  restaurant_review_fields: RestaurantReviewFields;
  featuredImage: string;
}

interface RestaurantReviewFields {
  readTime: string;
}
