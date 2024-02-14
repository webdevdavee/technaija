import Hero from "@/components/ui/Hero";
import FeaturedCategory from "@/components/ui/FeaturedCategory";
import FeaturedProduct from "@/components/shared/FeaturedProduct";
import CollectionBanner from "@/components/ui/CollectionBanner";
import Newsletter from "@/components/ui/Newsletter";
import QuickView from "@/components/ui/QuickView";
import { IUser } from "@/libs/database/models/user.model";
import { getUserById } from "@/libs/actions/user.action";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  // Await the response from the getUserById function and store it in a variable
  // The function takes a user id as an argument and returns a user object of type IUser
  const user: IUser = await getUserById(userId);

  return (
    <main>
      <QuickView />
      <Hero />
      <FeaturedCategory />
      <FeaturedProduct
        user={user}
        userId={userId}
        type="home"
        limit={4}
        title="Trending Cases"
        subtitle="Take these babies home with you"
      />
      <CollectionBanner />
      <FeaturedProduct
        user={user}
        userId={userId}
        type="home"
        limit={4}
        title="Popular Products"
        subtitle="View our best-selling phone cases and accessories"
      />
      <Newsletter />
    </main>
  );
}
