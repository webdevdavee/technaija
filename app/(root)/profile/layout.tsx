import ProfileMenuWrapper from "@/components/utility/ProfileMenuWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative px-20 pt-6 pb-12 m:px-6 xl:px-12">
      <h1 className="text-center text-3xl font-medium py-6 capitalize">
        Profile
      </h1>
      <div className="pt-10 flex items-start justify-start gap-4 m:flex-col m:gap-10">
        <ProfileMenuWrapper />
        {children}
      </div>
    </section>
  );
}
