import React from "react";
import { Text, KeyInfo } from "./";

const KeyLine = ({
  isExpandable,
  onExpand,
  index,
  isExpanded,
  json,
  keyName,
  heighlight = false
}) => {
  const maxCharsInLine = 20;
  const jsonData = isExpandable
    ? `${JSON.stringify(json).slice(0, maxCharsInLine)}${
        JSON.stringify(json).length > maxCharsInLine ? "..." : ""
      }`
    : json;

  return (
    <div style={heighlight ? { background: "yellow" } : { background: "" }}>
      <Text type="key" onClick={isExpandable ? onExpand(index) : null}>
        {keyName}
      </Text>
      <Text type="json">{`"${jsonData}"
      `}</Text>
      {
        <KeyInfo
          isExpandable={isExpandable}
          isExpanded={isExpanded}
          onExpand={onExpand}
          index={index}
          json={json}
        />
      }
    </div>
  );
};

export { KeyLine };
