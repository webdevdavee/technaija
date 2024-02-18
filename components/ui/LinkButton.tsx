import Link from "next/link";

type Props = {
  link: string;
  classname: string;
  text: string | JSX.Element;
  icon?: string;
  disabled?: boolean;
};

const LinkButton = ({ link, classname, text, icon, disabled }: Props) => {
  return (
    <Link className={`w-fit ${classname}`} href={`/${link}`}>
      <button disabled={disabled && disabled}>{text}</button>
    </Link>
  );
};

export default LinkButton;
