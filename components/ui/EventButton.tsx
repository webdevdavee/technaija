import React from "react";

type EventButtonProp = {
  text: string;
  onclick: () => any;
  classname: string;
};

const EventButton = ({ text, onclick, classname }: EventButtonProp) => {
  return (
    <button className={classname} type="button" onClick={onclick}>
      {text}
    </button>
  );
};

export default EventButton;
