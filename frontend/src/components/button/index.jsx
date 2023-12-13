import { createElement } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

export default function Button({ size, children, onClick }) {
  return createElement(
    "button",
    {
      className: classNames("bg-[#A78NFA] rounded-[0.375rem]", {
        "bg-[#192435] border border-[white] border-1 px-2 py-2 hover:bg-[#f91880]":
          size === "normal",
      }),
      onClick: onClick,
    },
    children
  );
}

Button.propTypes = {
  size: PropTypes.oneOf(["normal", "small", "large"]),
};

Button.defaultProps = {
  size: "normal",
};
