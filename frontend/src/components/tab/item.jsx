import { useTab } from "./context";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function Item({ children, id }) {
  const { active, setActive } = useTab();

  return (
    <button
      type="button"
      className="flex-auto text-center"
      onClick={() => setActive(id)}
    >
      <div
        className={classNames("h-[3rem] inline-flex items-center relative", {
          "font-bold": active === id,
          "text-thin": active !== id,
        })}
      >
        {children}

        {active === id && (
          <div className="h-[3px] absolute bottom-0 left-0 right-0  bg-[#1da1f2] rounded-t-full"></div>
        )}
      </div>
    </button>
  );
}

Item.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  id: PropTypes.string,
};
