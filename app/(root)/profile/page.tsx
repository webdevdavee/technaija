import Profile from "@/components/utility/Profile";
import { auth } from "@clerk/nextjs";
import React from "react";

const page = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <section className="relative px-20 pt-6 pb-12 m:px-6 xl:px-12">
      <h1 className="text-center text-3xl font-medium py-6 capitalize">
        Profile
      </h1>
      <Profile userId={userId} />
    </section>
  );
};

export default page;
