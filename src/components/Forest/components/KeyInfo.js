import React from "react";
import { Text } from ".";

const KeyInfo = ({ isExpandable, onExpand, index, isExpanded, json }) =>
  isExpandable ? (
    <span>
      <Text type="text">
        {Array.isArray(json)
          ? ` [] ${Object.keys(json).length} items`
          : ` {} ${Object.keys(json).length} keys`}
      </Text>
      <button style={{ marginLeft: "0.5rem" }} onClick={onExpand(index)}>
        {isExpanded ? "Скрыть" : "Открыть"}
      </button>
    </span>
  ) : null;

export { KeyInfo };
