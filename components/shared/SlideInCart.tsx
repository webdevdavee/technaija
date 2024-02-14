import { IUser } from "@/libs/database/models/user.model";
import SlideInCartItems from "./SlideInCartItems";
import { getUserById } from "@/libs/actions/user.action";
import { currentUserID } from "@/userID";

const SlideInCart = async () => {
  // Await the response from the getUserById function and store it in a variable
  const fetchedUser: IUser = await getUserById(currentUserID);

  return (
    <section>
      <SlideInCartItems fetchedUser={fetchedUser} />
    </section>
  );
};

export default SlideInCart;
