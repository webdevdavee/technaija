import Link from "next/link";

type Props = {
  link: string;
  classname: string;
  text: string | JSX.Element;
  icon?: string;
  disabled?: boolean;
};

const LinkButton = ({ link, classname, text, disabled }: Props) => {
  return (
    <Link className={`w-fit ${classname}`} href={`/${link}`}>
      <button disabled={disabled}>{text}</button>
    </Link>
  );
};

export default LinkButton;
