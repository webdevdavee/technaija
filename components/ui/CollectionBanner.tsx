import Image from "next/image";
import Link from "next/link";

const CollectionBanner = () => {
  return (
    <section className="px-20 py-8 mb-12">
      <div className="flex items-center justify-between">
        <div className="group relative">
          <div className="overflow-hidden">
            <Image
              className="ease-in-out hover:ease-in-out duration-300 hover:duration-300 hover:scale-[1.1]"
              src="/banner (1).jpg"
              width={585}
              height={585}
              alt="banner"
            />
          </div>
          <div className="w-fit absolute bottom-[-13%] translate-x-[30%] bg-white px-10 py-7 capitalize flex flex-col gap-3 items-center justify-center">
            <p className="text-2xl mb-3 font-medium">must have accessories</p>
            <span>
              <Link href={"/shop?category=Accessories&Accessories=true"}>
                <span className="flex gap-2 items-center justify-center">
                  <p className="text-base">shop now</p>
                  <Image
                    className="rotate-180 duration-300 group-hover:translate-x-2 group-hover:transition group-hover:duration-300"
                    src="/arrow-back.svg"
                    width={20}
                    height={20}
                    alt="arrow-back"
                  />
                </span>
              </Link>
            </span>
          </div>
        </div>
        <div className="group relative">
          <div className="overflow-hidden">
            <Image
              className="ease-in-out hover:ease-in-out duration-300 hover:duration-300 hover:scale-[1.1]"
              src="/banner (2).jpg"
              width={585}
              height={585}
              alt="banner"
            />
          </div>
          <div className="w-fit absolute bottom-[-13%] translate-x-[20%] bg-white px-10 py-7 capitalize flex flex-col gap-3 items-center justify-center">
            <p className="text-2xl mb-3 font-medium">
              under NGN 10,000 collection
            </p>
            <span>
              <Link href={"/shop"}>
                <span className="flex gap-2 items-center justify-center">
                  <p className="text-base">shop now</p>
                  <Image
                    className="rotate-180 duration-300 group-hover:translate-x-2 group-hover:transition group-hover:duration-300"
                    src="/arrow-back.svg"
                    width={20}
                    height={20}
                    alt="arrow-back"
                  />
                </span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionBanner;
