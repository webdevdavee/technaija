"use client";

type EventButtonProp = {
  text: string;
  onclick?: () => any;
  classname: string;
  isSubmitting?: boolean;
};

const EventButton = ({
  text,
  onclick,
  classname,
  isSubmitting,
}: EventButtonProp) => {
  return (
    <button disabled={isSubmitting} className={classname} onClick={onclick}>
      {isSubmitting ? "...submitting" : text}
    </button>
  );
};

export default EventButton;
