import { getUserById } from "@/libs/actions/user.action";
import { IUser } from "@/libs/database/models/user.model";
import NavbarItems from "./NavbarItems";
import { currentUserID } from "@/userID";

const Navbar = async () => {
  // Await the response from the getUserById function and store it in a variable
  const fetchedUser: IUser = await getUserById(currentUserID);

  return <NavbarItems fetchedUser={fetchedUser} />;
};

export default Navbar;
