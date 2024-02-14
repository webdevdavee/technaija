import { getUserById } from "@/libs/actions/user.action";
import { IUser } from "@/libs/database/models/user.model";
import NavbarItems from "./NavbarItems";
import { auth } from "@clerk/nextjs";

const Navbar = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  // The function takes a user id as an argument and returns a user object of type IUser
  const user: IUser = await getUserById(userId);

  return <NavbarItems userId={userId} fetchedUser={user} />;
};

export default Navbar;
