import Link from "next/link";

type Props = {
  link: string;
  classname: string;
  text: string;
  icon?: string;
};

const LinkButton = ({ link, classname, text, icon }: Props) => {
  return (
    <Link className={`w-fit ${classname}`} href={`/${link}`}>
      <button>{text}</button>
    </Link>
  );
};

export default LinkButton;
