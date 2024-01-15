type MainNavigation = {
  id: number;
  text: string;
  link: string;
};

type MainIconNavigation = {
  id: number;
  src: string;
  alt: string;
  link?: string;
};

type HeroImages = {
  id: number;
  image: string;
  alt: string;
  text: string;
  subtext: string;
  link: string;
};

type FeaturedCategories = {
  id: number;
  text: string;
  subtext: string;
  image: string;
  link: string;
};

type FooterMenu1 = {
  id: number;
  title: string;
  data: [
    { id: number; text: string },
    { id: number; text: string },
    { id: number; text: string },
    { id: number; text: string },
    { id: number; text: string },
    { id: number; text: string }
  ];
};

type FooterMenu2 = {
  id: number;
  title: string;
  data: [
    { id: number; text: string },
    { id: number; text: string },
    { id: number; text: string },
    { id: number; text: string },
    { id: number; text: string }
  ];
};

type FooterMenu3 = {
  id: number;
  title: string;
  data: [
    { id: number; text: string },
    { id: number; text: string },
    { id: number; text: string },
    { id: number; text: string }
  ];
};

type FooterMenu4 = {
  id: number;
  title: string;
  data: [{ id: number; text: string }];
};

type FooterMenu5 = {
  id: number;
  text: string;
};

type UpdateProductParams = {
  updatedProduct: {
    _id: string;
    name: string;
    price: string;
    sales_price?: string;
    short_description?: string;
    description: string;
    reviews?: {
      _id?: string;
      user: string;
      email: string;
      date: string;
      comment: string;
      rating: number;
      saveDetails: boolean;
    }[];
    sku?: string;
    additional_information?: {
      model?: {
        id: string;
        text: string;
      }[];
    };
    category: string;
    original_category: string;
    gallery?: {
      id: string;
      image: string;
    }[];
    featured_image: string;
  };
  path: string;
};
