import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, onClick, name, variant, icon }) => {
  let bgColorClass = "";
  let textColorClass = "";
  let borderColorClass = "";
  let hoverColor = "";
  let heightClass = "";
  let widthClass = "";
  let hoverColorClass = "";

  if (name === "blue") {
    bgColorClass = "bg-blue-primary";
    textColorClass = "text-white";
    borderColorClass = "border-4 border-blue-cool";
    hoverColor = "hover:bg-blue-primary-darker";
    heightClass = "h-10 md:h-12";
    widthClass = "w-20 md:w-36";
  } else if (name === "green") {
    bgColorClass = "bg-green-light";
    textColorClass = "text-white";
    borderColorClass = "border-green-default";
    hoverColor = "hover:bg-green-default";
  } else if (name === "gold") {
    bgColorClass = "bg-gold-default";
    textColorClass = "text-white";
    borderColorClass = " border-2 border-gold-default";
    hoverColor = "hover:bg-gold-light";
  } else if (name === "login") {
    bgColorClass = "bg-white";
    textColorClass = "text-white";
    borderColorClass = "border-2 border-white";
    heightClass = "h-10 md:h-10";
    widthClass = "w-22 md:w-36";
    hoverColor = "hover:bg-gray-lightest";
  } else if (name === "filter") {
    bgColorClass = "bg-white";
    textColorClass = "text-white";
    borderColorClass = "border-2 border-white";
    heightClass = "h-8 md:h-10";
    widthClass = "w-20 md:w-[50%]";
    hoverColor = "hover:bg-gray-lightest";
  }

  let variantClass = "";
  if (variant === "outline") {
    variantClass = `border ${borderColorClass}`;
    hoverColorClass = `hover:${hoverColor}`;
  } else if (variant === "filled") {
    variantClass = `${bgColorClass} `;
    hoverColorClass = `hover:${hoverColor}`;
  }

  return (
    <button
      className={`flex items-center justify-center px-4 py-2  rounded-full font-bold text-sm md:text-lg ${textColorClass} ${variantClass} ${hoverColorClass} ${widthClass} ${heightClass} cursor-pointer hover:scale-110 ease-in duration-300 shadow-lg  shadow-gray-400`}
      onClick={onClick}>
      {icon && <span className='mr-2'>{icon}</span>}
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.element,
  variant: PropTypes.oneOf(["outline", "filled"]),
};

Button.defaultProps = {
  variant: "filled",
};
export default Button;
