import ProfileContent from "@/components/utility/ProfileContent";
import { auth } from "@clerk/nextjs";
import React from "react";

const page = () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <section className="w-full">
      <ProfileContent userId={userId} />
    </section>
  );
};

export default page;
