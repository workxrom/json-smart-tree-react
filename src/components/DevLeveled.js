import React from "react";

const DivLeveled = ({ index = 0, level = 0, children }) => (
  <div
    key={`${level}_${index}`}
    style={{
      marginLeft: `${level * 0.5}rem`,
      border: "1px solid white"
    }}
  >
    {children}
  </div>
);

export { DivLeveled };
