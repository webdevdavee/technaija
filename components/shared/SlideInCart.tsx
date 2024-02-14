import { IUser } from "@/libs/database/models/user.model";
import SlideInCartItems from "./SlideInCartItems";
import { getUserById } from "@/libs/actions/user.action";
import { auth } from "@clerk/nextjs";

const SlideInCart = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  // Await the response from the getUserById function and store it in a variable
  // The function takes a user id as an argument and returns a user object of type IUser
  const user: IUser = await getUserById(userId);

  return (
    <section>
      <SlideInCartItems userId={userId} fetchedUser={user} />
    </section>
  );
};

export default SlideInCart;
