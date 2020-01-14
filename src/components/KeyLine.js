import React from "react";
import { Text, KeyInfo } from "./";

const KeyLine = ({
  isExpandable,
  onExpand,
  index,
  isExpanded,
  json,
  keyName
}) => (
  <div>
    <Text type="key" onClick={isExpandable ? onExpand(index) : null}>
      {keyName}
    </Text>
    <Text type="json">{`"${json}"`}</Text>
    {`        `}
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

export { KeyLine };
