export const mainNavigation: MainNavigation[] = [
  { id: 1, text: "Home", link: "/home" },
  { id: 2, text: "Cases", link: "/cases" },
  { id: 3, text: "Accessories", link: "/accessories" },
  { id: 4, text: "Contact us", link: "/contact-us" },
  { id: 5, text: "About us", link: "about-us" },
];

export const mainIconNavigation: MainIconNavigation[] = [
  { id: 1, src: "/search.svg", alt: "search" },
  { id: 2, src: "/heart.svg", alt: "wishlist", link: "/wishlist" },
  { id: 3, src: "/shopping-bag.svg", alt: "cart", link: "/cart" },
];

export const heroImages: HeroImages[] = [
  {
    id: 1,
    image: "/hero (1).webp",
    alt: "hero-img",
    text: "The 2024 iPad Case Collection",
    subtext: "They are all made from recyclable material",
    link: "cases",
  },
  {
    id: 2,
    image: "/hero (2).webp",
    alt: "hero-img",
    text: "Your Phone Your Style",
    subtext: "Turn your phone into a work of art",
    link: "cases",
  },
  {
    id: 3,
    image: "/hero (3).webp",
    alt: "hero-img",
    text: "Your New Phone Needs The Perfect Fit",
    subtext: "Designed just for you, with high quality build",
    link: "cases",
  },
];

export const featuredCategories: FeaturedCategories[] = [
  {
    id: 1,
    text: "Accessories",
    subtext: "shop now",
    image: "/featured-category (1).webp",
    link: "/accessories",
  },
  {
    id: 2,
    text: "Android Cases",
    subtext: "shop now",
    image: "/featured-category (2).webp",
    link: "/android-cases",
  },
  {
    id: 3,
    text: "iPhone Cases",
    subtext: "shop now",
    image: "/featured-category (3).webp",
    link: "/iphone-cases",
  },
];

export const footerMenu1: FooterMenu1[] = [
  {
    id: 1,
    title: "Shop",
    data: [
      { id: 1, text: "Popular" },
      { id: 2, text: "New" },
      { id: 3, text: "Mattee Cases" },
      { id: 4, text: "Bio Cases" },
      { id: 5, text: "Clear Cases" },
      { id: 6, text: "Skude Cases" },
    ],
  },
];

export const footerMenu2: FooterMenu2[] = [
  {
    id: 2,
    title: "Help",
    data: [
      { id: 1, text: "FAQs" },
      { id: 2, text: "Reviews" },
      { id: 3, text: "Contact" },
      { id: 4, text: "Shipping" },
      { id: 5, text: "Returns" },
    ],
  },
];

export const footerMenu3: FooterMenu3[] = [
  {
    id: 3,
    title: "Account",
    data: [
      { id: 1, text: "Login" },
      { id: 2, text: "Register" },
      { id: 3, text: "Orders" },
      { id: 4, text: "Tracking" },
    ],
  },
];

export const footerMenu4: FooterMenu4[] = [
  {
    id: 4,
    title: "Store",
    data: [{ id: 1, text: "About Us" }],
  },
];

export const footerMenu5: FooterMenu5[] = [
  { id: 1, text: "Terms of service" },
  { id: 2, text: "Privacy policy" },
];
