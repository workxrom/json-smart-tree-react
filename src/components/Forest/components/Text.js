import React from "react";

const Text = ({ type, children, ...other }) => {
  let style = {
    fontWeight: "600",
    fontSize: "1.1rem",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
  };

  switch (type) {
    case "key":
      style = {
        ...style,
        color: "rgb(12, 127, 149)",
        marginRight: "0.5rem"
      };
      break;
    case "hidden":
      style = {
        ...style,
        color: "gray"
      };
      break;
    case "shown":
      style = {
        ...style,
        color: "rgb(80,80,80)"
      };
      break;
    case "text":
      style = {
        ...style,
        color: "purple"
      };
      break;
    default:
      // type === 'json'
      style = {
        ...style,

        color: "green",
        fontWeight: "400"
      };
      break;
  }
  return (
    <span style={style} {...other}>
      {String(children)}
    </span>
  );
};

export { Text };
