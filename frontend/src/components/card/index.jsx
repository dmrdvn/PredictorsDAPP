import React from "react";

const Card = ({ styles, children }) => {
  return <div className={styles}>{children}</div>;
};

export default Card;
