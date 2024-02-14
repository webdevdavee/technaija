import { getUserById } from "@/libs/actions/user.action";
import NavbarItems from "./NavbarItems";
import { currentUserID } from "@/userID";

const Navbar = async () => {
  // // Await the response from the getUserById function and store it in a variable
  // const fetchedUser: IUser = await getUserById(currentUserID);

  return <NavbarItems />;
};

export default Navbar;
