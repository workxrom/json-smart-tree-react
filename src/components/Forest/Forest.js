import React, { useState, useCallback, useEffect } from "react";
import get from "lodash.get";

import { DivLeveled, Text, KeyLine } from "./components";

const Forest = ({ json, level = 0, collaps = [], path = "root" }) => {
  const [expanded, setExpanded] = useState({});
  const [cuttedJson, setCuttedJson] = useState({});

  useEffect(() => {
    const localStorageObject = JSON.parse(
      localStorage.getItem(`pathData.${path}`)
    );

    if (
      localStorageObject &&
      typeof localStorageObject !== "undefined" &&
      Object.keys(localStorageObject).length > 0
    ) {
      setExpanded(localStorageObject);
    } else {
      localStorage.setItem(`pathData.${path}`, JSON.stringify({}));
    }
  }, [path]);

  const onExpand = useCallback(
    index => () => {
      const expandedObject = {
        ...expanded,
        [index]: !expanded[index]
      };
      localStorage.setItem(`pathData.${path}`, JSON.stringify(expandedObject));
      setExpanded(expandedObject);
    },
    [expanded, path]
  );

  const onToggleCut = useCallback(
    cutPath => () => {
      localStorage[cutPath] = String(1 - Number(localStorage[cutPath]));
      console.log(
        `${cutPath}/ ${localStorage[cutPath]}/ ${typeof localStorage[cutPath]}`
      );

      setCuttedJson({
        ...cuttedJson,
        [cutPath]: localStorage[cutPath]
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

  return (
    <div>
      {Object.keys(json).map((key, index) => {
        const isExpandable =
          json[key] &&
          (typeof json[key] === "object" ||
            (Array.isArray(json[key]) && json[key].length > 0));

        // Нахождение возможных "схлопываний"
        const foundCollaps = collaps.filter(({ test }) => get(json[key], test));
        const replaceToPath =
          foundCollaps.length > 0 ? get(foundCollaps[0], "replaceTo") : null;
        const cutPath = replaceToPath ? `${key}.${replaceToPath}` : null;

        // Инициализация фильтров отображения
        if (replaceToPath && typeof cuttedJson[cutPath] !== "string") {
          if (typeof localStorage[cutPath] !== "string") {
            localStorage[cutPath] = "0";
          }
          setCuttedJson({
            ...cuttedJson,
            [cutPath]: localStorage[cutPath]
          });
        }

        let actualJson = json[key];
        let actualKey = key;
        if (replaceToPath && Number(cuttedJson[cutPath])) {
          actualJson = get(json[key], replaceToPath);
          actualKey = replaceToPath;
        }

        console.log("expanded", expanded);
        console.log("expanded[index]", expanded[index]);

        return (
          <DivLeveled key={key} index={index} level={level}>
            {replaceToPath && (
              <Text onClick={onToggleCut(cutPath)} type="hidden">{`${
                cuttedJson[cutPath] ? "hidden" : "shown"
              }: ${cuttedJson[cutPath]} ${replaceToPath}`}</Text>
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
              <Forest
                json={actualJson}
                level={level + 1}
                collaps={collaps}
                path={`${path}.${actualKey}`}
              />
            )}
          </DivLeveled>
        );
      })}
    </div>
  );
};

export { Forest };
