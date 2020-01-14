import React, { useState, useCallback } from "react";
import get from "lodash.get";

import { DivLeveled, Text, KeyLine } from "./components";

const Forest = ({ json, level = 0, collaps = [] }) => {
  const [expanded, setExpanded] = useState({});
  const [cuttedJson, setCuttedJson] = useState({});

  const onExpand = useCallback(
    index => () =>
      setExpanded({
        ...expanded,
        [index]: !expanded[index]
      }),
    [expanded, setExpanded]
  );

  const onToggleCut = useCallback(
    cutPath => () => {
      setCuttedJson({
        ...cuttedJson,
        [cutPath]: !cuttedJson[cutPath]
      });
    },
    [cuttedJson]
  );

  if (Object.keys(json).length === 0) {
    return (
      <DivLeveled level={level}>
        <Text type="text">{Array.isArray(json) ? "[ ]" : "{ }"}</Text>
      </DivLeveled>
    );
  }

  // if (foundCollaps.length > 0) {
  //   console.log("found collapses!", foundCollaps);

  //   const cutJson = cuttedJson[cutPath] ? get(json, cutPath) : json;

  //   return (
  //     <div>
  //       <Text onClick={onToggleCut(cutPath)} type="hidden">{`${
  //         cuttedJson[cutPath] ? "hidden" : "shown"
  //       }: ${foundCollaps[0].replaceTo}`}</Text>
  //       <Forest json={cutJson} level={level} collaps={collaps} />
  //     </div>
  //   );
  // }

  return (
    <div>
      {Object.keys(json).map((key, index) => {
        const isExpandable =
          json[key] &&
          (typeof json[key] === "object" ||
            (Array.isArray(json[key]) && json[key].length > 0));

        const foundCollaps = collaps.filter(({ test }) => get(json[key], test));
        const cutObject = foundCollaps.length > 0 ? foundCollaps[0] : null;
        const cutPath = get(cutObject, "replaceTo");
        const cutJson =
          cutPath && cuttedJson[cutPath] ? get(json[key], cutPath) : null;

        const actualJson = cutJson ? cutJson : json[key];

        if (cutPath && typeof cuttedJson[cutPath] !== "boolean") {
          setCuttedJson({
            ...cuttedJson,
            [cutPath]: true
          });
        }

        return (
          <DivLeveled index={index} level={level}>
            {cutObject && (
              <Text onClick={onToggleCut(cutPath)} type="hidden">{`${
                cuttedJson[cutPath] ? "hidden" : "shown"
              }: ${cutPath}`}</Text>
            )}
            <KeyLine
              isExpandable={isExpandable}
              isExpanded={expanded[index]}
              onExpand={onExpand}
              index={index}
              json={actualJson}
              keyName={key}
            />
            {isExpandable && expanded[index] && (
              <Forest json={actualJson} level={level + 1} collaps={collaps} />
            )}
          </DivLeveled>
        );
      })}
    </div>
  );
};

export { Forest };
