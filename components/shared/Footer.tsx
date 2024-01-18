import Image from "next/image";
import { footerMenu1 } from "@/constants";
import { footerMenu2 } from "@/constants";
import { footerMenu3 } from "@/constants";
import { footerMenu4 } from "@/constants";
import { footerMenu5 } from "@/constants";
import FooterList from "./FooterList";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-12 w-full bg-[#F5F5F5]">
      <section className="px-20 py-12">
        <div className="flex items-start justify-start gap-60 flex-wrap">
          <FooterList data={footerMenu1} />
          <FooterList data={footerMenu2} />
          <FooterList data={footerMenu3} />
          <FooterList data={footerMenu4} />
        </div>
        <div className="w-full border-[1px] mt-24 mb-8"></div>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <p className="text-sm">&copy; {currentYear} Technaija</p>
            <ul className="flex gap-8">
              {footerMenu5.map((list) => (
                <Link key={list.id} href={"#"} className="text-sm">
                  {list.text}
                </Link>
              ))}
            </ul>
          </div>
          <Image
            width={300}
            height={300}
            src="/icons-payment.png"
            alt="payment gateways"
          />
        </div>
      </section>
    </footer>
  );
};

export default Footer;
