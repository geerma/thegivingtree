import "./gift.css";

import giftBox from "../../assets/gift-box.svg";
import { useState } from "react";

type GiftProps = {
  item: string;
};

export const Gift = ({ item }: GiftProps) => {
  const [open, setOpen] = useState(false);

  const openBox = () => {
    setTimeout(function () {
      setOpen(true);
    }, 500);
  };

  return (
    <div className="individual_gift">
      {open == false ? (
        <img src={giftBox} width={200} height={200} onClick={() => openBox()} />
      ) : (
        <div>
          <p >{item}</p>
        </div>
      )}
    </div>
  );
};
