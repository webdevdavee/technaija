import Link from "next/link";
type FooterListProp = {
  data: FooterMenu1[] | FooterMenu2[] | FooterMenu3[] | FooterMenu4[];
};

const FooterList = ({ data }: FooterListProp) => {
  return (
    <section>
      {data.map((list) => (
        <div
          key={list.id}
          className="flex flex-col gap-2 items-start justify-start"
        >
          <h1 className="text-base font-semibold uppercase">{list.title}</h1>
          <ul className="flex flex-col gap-3 items-start justify-start">
            {list.data.map((item) => (
              <Link key={item.id} href={"#"} className="text-sm">
                {item.text}
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default FooterList;
