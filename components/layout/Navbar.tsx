import NavbarItems from "../navigation/NavbarItems";
import { auth } from "@clerk/nextjs";
import { getTotalUserCart } from "@/libs/actions/cart.actions";

const Navbar = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  // Call server function to get the user's total carted products
  const userCart = await getTotalUserCart(userId);

  return <NavbarItems userCart={userCart} />;
};

export default Navbar;
