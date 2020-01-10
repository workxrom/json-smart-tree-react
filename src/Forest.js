import React, { useState, useCallback } from "react";
import get from "lodash.get";

import { DivLeveled, Text } from "./components";

const Forest = ({ json, level = 0, collaps = [] }) => {
  const [expanded, setExpanded] = useState({});

  const onExpand = useCallback(
    index => () =>
      setExpanded({
        ...expanded,
        [index]: !expanded[index]
      }),
    [expanded, setExpanded]
  );

  if (Object.keys(json).length === 0) {
    return (
      <DivLeveled level={level}>
        <Text type="text">{Array.isArray(json) ? "[ ]" : "{ }"}</Text>
      </DivLeveled>
    );
  }

  const foundCollaps = collaps.filter(({ test }) => get(json, test));
  if (foundCollaps.length > 0) {
    console.log("found collaps!", foundCollaps);
    return (
      <div>
        <Text type="hidden">{`hidden: ${foundCollaps[0].replaceTo}`}</Text>
        <Forest
          json={get(json, foundCollaps[0].replaceTo)}
          level={level}
          collaps={collaps}
        />
      </div>
    );
  }

  return (
    <div>
      {Object.keys(json).map((key, index) => {
        const isExpandable =
          json[key] &&
          (typeof json[key] === "object" ||
            (Array.isArray(json[key]) && json[key].length > 0));

        return (
          <DivLeveled index={index} level={level}>
            <div>
              <Text type="key" onClick={isExpandable ? onExpand(index) : null}>
                {key}
              </Text>
              <Text type="json">{`"${json[key]}"`}</Text>
              {`        `}
              {isExpandable && (
                <span>
                  <Text type="text">
                    {Array.isArray(json[key])
                      ? ` [] ${Object.keys(json[key]).length} items`
                      : ` {} ${Object.keys(json[key]).length} keys`}
                  </Text>
                  <button
                    style={{ marginLeft: "0.5rem" }}
                    onClick={onExpand(index)}
                  >
                    {expanded[index] ? "Скрыть" : "Открыть"}
                  </button>
                </span>
              )}
            </div>
            {isExpandable && expanded[index] && (
              <Forest json={json[key]} level={level + 1} collaps={collaps} />
            )}
          </DivLeveled>
        );
      })}
    </div>
  );
};

export { Forest };
