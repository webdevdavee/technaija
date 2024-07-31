import Image from "next/image";
import {
  footerMenu1,
  footerMenu2,
  footerMenu3,
  footerMenu4,
  footerMenu5,
} from "@/constants";
import FooterList from "../utility/FooterList";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-12 w-full bg-[#F5F5F5] m:pb-12">
      <section className="px-20 py-12 m:px-6 xl:px-12">
        <div className="flex items-start justify-start gap-60 flex-wrap m:grid m:grid-cols-2 m:gap-20 m:justify-between xl:gap-20 xxl:gap-24">
          <FooterList data={footerMenu1} />
          <FooterList data={footerMenu2} />
          <FooterList data={footerMenu3} />
          <FooterList data={footerMenu4} />
        </div>
        <div className="w-full border-[1px] mt-24 mb-8"></div>
        <div className="flex items-center justify-between m:flex-col">
          <div className="flex gap-4 items-center m:mb-10">
            <p className="text-sm m:text-xs">&copy; {currentYear} Technaija</p>
            <ul className="flex gap-8">
              {footerMenu5.map((list) => (
                <Link key={list.id} href={"#"} className="text-sm m:text-xs">
                  {list.text}
                </Link>
              ))}
            </ul>
          </div>
          <div className="m:hidden">
            <Image
              width={300}
              height={300}
              src="/icons-payment.png"
              alt="payment gateways"
            />
          </div>
          <div className="xl:hidden xxl:hidden xxxl:hidden ultra:hidden">
            <Image
              width={200}
              height={200}
              src="/icons-payment.png"
              alt="payment gateways"
            />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
