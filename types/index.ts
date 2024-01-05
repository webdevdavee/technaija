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
