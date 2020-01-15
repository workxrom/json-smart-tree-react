import React from "react";
import get from "lodash.get";

import { DivLeveled, KeyLine, Text } from ".";
import { Forest } from "../";

const Tree = props => {
  const {
    json = {},
    keyName,
    collaps,
    cuttedJson,
    setCuttedJson,
    index,
    level,
    onToggleCut,
    expanded,
    onExpand,
    path
  } = props;

  // Раскрываемый компонент или нет
  const isExpandable =
    json[keyName] &&
    (typeof json[keyName] === "object" ||
      (Array.isArray(json[keyName]) && json[keyName].length > 0));

  // Нахождение возможных "схлопываний"
  const foundCollaps = collaps.filter(({ test }) => get(json[keyName], test));
  const replaceToPath =
    foundCollaps.length > 0 ? get(foundCollaps[0], "replaceTo") : null;
  const cutPath = replaceToPath ? `${keyName}.${replaceToPath}` : null;

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

  let actualJson = json[keyName];
  let actualKeyName = keyName;
  // Проверка на возможное "схлопывание"
  if (replaceToPath && Number(cuttedJson[cutPath])) {
    actualJson = get(json[keyName], replaceToPath);
    actualKeyName = replaceToPath;
  }

  return (
    <DivLeveled key={keyName} index={index} level={level}>
      {replaceToPath && (
        <Text
          onClick={onToggleCut(cutPath)}
          type={Number(cuttedJson[cutPath]) ? "hidden" : "shown"}
        >{`${
          Number(cuttedJson[cutPath]) ? "hidden" : "shown"
        }: ${replaceToPath}`}</Text>
      )}
      <KeyLine
        isExpandable={isExpandable}
        isExpanded={expanded[index]}
        onExpand={onExpand}
        index={index}
        json={actualJson}
        keyName={keyName}
      />
      {isExpandable && expanded[index] && (
        <Forest
          json={actualJson}
          level={level + 1}
          collaps={collaps}
          path={`${path}.${actualKeyName}`}
        />
      )}
    </DivLeveled>
  );
};

export { Tree };
