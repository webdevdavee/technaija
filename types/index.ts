type LoaderProp = {
  className: string;
};

type MainNavigation = {
  id: number;
  text: string;
  link: string;
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
  data: { id: number; text: string }[];
};

type FooterMenu2 = {
  id: number;
  title: string;
  data: { id: number; text: string }[];
};

type FooterMenu3 = {
  id: number;
  title: string;
  data: {
    id: number;
    text: string;
  }[];
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

type TCartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  photo: string;
  model: string;
  userId: string;
  category: string;
  productId: string;
};

type UserWishlist = {
  _id?: string;
  name: string;
  image: string;
  price: number;
};

type UpdateProductParams = {
  updatedProduct: {
    _id: string;
    name: string;
    price: number;
    sales_price?: number;
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
        _id: string;
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

type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

// type UpdateUserMetadata = {
//   userId: string;
//   currency: string;
// };

type GetProductsFilterParams = {
  categoryFilterArray?: string[];
  modelFilterArray?: string[];
  priceFilterOne?: string;
  priceFilterTwo?: string;
  limit: number;
  page: number;
};

type SearchParamProps = {
  searchParams: { [key: string]: string | string[] };
};

type ProductSortList = {
  id: number;
  text: string;
};

type Users = {
  _id: string;
  clerkId?: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

type CreateUserParam = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

type NewCartItem = {
  name: string;
  price: number;
  quantity: number;
  photo: string;
  model: string;
  category: string;
  userId: string;
  productId: string;
};

type CartParams = {
  product: NewCartItem;
  path: string;
};

type CartRemoveParams = {
  product: TCartItem;
  userId: string;
  path: string;
};

type UserCartCount = {
  _id: string;
  count: number;
};

type WishlistItem = {
  name: string;
  image: string;
  price: number;
  user?: string;
};

type WishlistParams = {
  product: WishlistItem;
  userId: string;
  path: string;
};

type Coupon = {
  _id: string;
  coupon: string;
  percentoff: number;
};

type CheckoutFormData = {
  userId: string;
  userPhoto: string;
  userCart: TCartItem[];
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  address: string;
  city: string;
  zipcode: string;
  phone: string;
};

type TOrders = {
  _id: string;
  orderId: string;
  firstname: string;
  lastname: string;
  email: string;
  amount: number;
  products: TCartItem[];
  date: string;
  status: string;
  channel: string;
  userId: string;
  userPhoto: string;
};

type CreateOrderParam = {
  orderId: string;
  firstname: string;
  lastname: string;
  email: string;
  amount: number;
  products: TCartItem[];
  date: string;
  status: string;
  channel: string;
  userId: string;
  userPhoto: string;
};

type GetUserOrdersParams = {
  limit: number;
  page?: number;
  userId: string;
  status?: string;
};

type ReduceCouponLimit = {
  couponCode: string;
};

type TBilling = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  address: string;
  city: string;
  zipcode: string;
  phone: string;
  isDefault: boolean;
};

type NewBilling = {
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  address: string;
  city: string;
  zipcode: string;
  phone: string;
  userId?: string;
  isDefault: false;
};

type UpdateBilling = {
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  address: string;
  city: string;
  zipcode: string;
  phone: string;
};

type CreateBillingDetailsParams = {
  detail: NewBilling;
  path: string;
};

type UpdateBillingDetailParams = {
  detailId: string;
  detail: UpdateBilling;
  path: string;
};
