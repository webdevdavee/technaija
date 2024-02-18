"use client";

type EventButtonProp = {
  type: "submit" | "reset" | "button" | undefined;
  text: string | JSX.Element;
  onclick?: () => any;
  classname: string;
  disabled?: boolean;
};

const EventButton = ({
  type,
  text,
  onclick,
  classname,
  disabled,
}: EventButtonProp) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={classname}
      onClick={onclick}
    >
      {disabled ? "...submitting" : text}
    </button>
  );
};

export default EventButton;
